---
layout: post
title: Adventures in Android Docking
date: 2023-11-30 20:34:07
categories:
- Projects
tags:
- writeup
- switch
- android
- docking
cover: /post/Adventures-in-Android-Docking/proper-rotation.jpg
---

Hello again! Today I'm doing somewhat of a writeup on a Switchroot-related feature I've been fighting with for quite some time now, and that dates back to the early days of the project.

## Switch Docking

For those unaware, the Nintendo Switch is a somewhat unique form-factor (well it was before the copycats anyway) built for hybrid gaming. The pitch is simple--play games on the internal screen on battery power at a lower power setting, then drop in a dock (USB-C DP to HDMI, usually powered) to connect to a TV. The internal display controller (`tegradc.0`) kills output, and the external display controller (`tegradc.1`) takes over. This works fine enough on the stock operating system (generally referred to as HOS), but replicating this functionality in Android has been a challenge. Let's dive in.

## The History of STB Mode

As it turns out, the Switch was not the first NVIDIA-designed board intended to be used in a somewhat hybrid way. The Shield Tablet is a fantastic example--it had a feature called Console Mode that would kill the internal display and swap over to an external display for a higher resolution experience than the alternative (Mirror Mode). Unfortunately, the Shield Tablet K1 [launched with Android L, and received updates up to N](https://en.wikipedia.org/wiki/Nvidia_Shield_Tablet#Software_updates)--all pre-[Treble](https://android-developers.googleblog.com/2017/05/here-comes-treble-modular-base-for.html) and pre-[VNDK](https://source.android.com/docs/core/architecture/vndk), with no [HIDL](https://source.android.com/docs/core/architecture/hidl#:~:text=HAL%20interface%20definition%20language%20or,collected%20into%20interfaces%20and%20packages.)-based Hardware Abstraction Layers (HALs), meaning the hardware compositor code had to be heavily redone between the last Shield Experience release for the tablet and the modern Shield Experience versions for the Shield TV lineup. Given most of the console mode stuff was there, and modern Shield Experience versions don't appear to even have internal targets with internal screens, what is still there from the Shield Tablet and other devices has become bitrot.

![Picture of the Shield Tablet K1 with the Console/Mirror Mode dialog open](/post/Adventures-in-Android-Docking/consolemode.jpg)

<p style="text-align:center">Shield Tablet K1 showing Console/Mirror dialog, credit AnandTech</p>

There still exists a `stb.mode` property in the hwcomposer HAL--it seems that early versions of this HAL did sorta target the Shield Portable 2 prototype (`loki`), which would have had a similar feature. Support died after the project was canned late in development, but the vestiges are still there. Finding props to control various aspects of the `hwcomposer` HAL was instrumental in coming up with a cohesive solution--this was done with a combination of online sources for older versions (JXD notoriously dumped an entire BSP on GitHub) and ol' reliable--`strings`.

```bash
$ strings ./vendor/lib64/libnvhwcomposer.so | grep stb.mode
stb_mode
ro.vendor.tegra.stb.mode
persist.vendor.tegra.stb.mode
```

And yes, STB mode does in fact work. It does, to its credit, kill the internal screen and switch fully to the external display, years after any device using it came close to shipping. This replicates the display portion of docking...or does it?

## Shape-Rotaters

Turns out, something far more serious bitrotted away during the years without a tablet target. The NVIDIA `hwcomposer` HAL no longer properly supports display rotation (without crazy issues). On Switchroot Android Q, which used blobs from Shield Experience 8 (Android P), the issue faced was corruption, static, and hitching during rotation, irrespective of display orientation. The dev at the time, bylaws, was unable to find a suitable workaround, so he ended up just forcing the compositor to `surfaceflinger`--essentially software compositing via the default Android frameworks.

Android R has a different issue--one that is more annoying configuration-wise but is able to be worked around. You see, the Switch display isn't a landscape panel despite its most common orientation (and the only one supported on HOS) being landscape. The panel is portrait, and the display is set to 270° default orientation in the device-tree nodes for each supported panel (`nvidia,out-rotation = <270>;`). However, when this is done on Android R with the Shield Experience 9 blobs, the output is garbled and useless, seemingly some blend of portrait mode on one side of the screen and extra garbage on the other. It looks like (and likely is the result of) garbled matrix ops used for rotation the display. Clearly whatever handles setting the default rotation and setting fb and render size is messed up (note the same happens when setting default to `<0>` and using a `hwcomposer` prop to set rotation). This does not occur when using `surfaceflinger` as the compositor, but of course we want a better workaround this time, so something else must be used. After some research into `surfaceflinger` (the Android frameworks backend rather than the backup compositor), I discovered a useful prop clearly meant for devices without a good way of setting default panel rotation: `ro.surface_flinger.primary_display_orientation`.

This fully-userspace, frameworks-level method of setting default orientation solves the issue of needing to use the hwcomposer to rotate the display, but presents issues of its own. Specifically, it means the `hwcomposer`'s idea of what the fb looks like is 90° out of phase with what is really going on, and it means that Android wants to rotate whatever the "primary" display is--if you think back to the STB Mode section, you might see the issue. The former manifests itself when STB mode is disabled: the hwcomposer thinks it is doing Mirror Mode, and shows on the external display a portrait-orientation image of 270°-rotated content. The latter (as alluded to) manifests itself when STB mode is enabled: since the internal display dies and the externnal becomes display 0 to Android, *it rotates this content as well*. Isn't that just swell?

![Portrait-orientation image of 270°-rotated Android launcher on television](/post/Adventures-in-Android-Docking/rotation.jpg)

<p style="text-align:center">Messed up rotation using STB Mode on Android R</p>

## Anatomy of a DockService

No matter which method you use (`surfaceflinger` compositor, STB mode, or no STB mode), workarounds are needed to get a proper picture. Thus, `DockService` was created by bylaws as a Java-based (yea, I know) service to pick up Intents: `ACTION_HDMI_PLUGGED`, `ACTION_SCREEN_ON`, `ACTION_USER_PRESENT`, and `POWER_UPDATE_INTENT` (this one is more complicated). The Android Q `DockService` was structured for the software compositing setup, and would manually set `WindowManager` and `DisplayManager` parameters like display density, which was hacky but usually worked.

### Android Q DockService

This `DockService` is kinda hacky and hardcodes a lot of stuff but it works pretty reliably when hardware composition is disabled. Let's take a deeper look.

#### Q Screen On Handling

On `ACTION_SCREEN_ON`, it would manually dismiss `keyguard` (lock screen), and clear forced density if it had been disconnected in sleep:

```java
case Intent.ACTION_SCREEN_ON:
    Log.i(TAG, "Screen on");

    DisplayUtils.setInternalDisplayState(!mExternalDisplayConnected);

    // Unlock device automatically if docked and reset res otherwise to work around broken HWC rotation
    try {
        if (mExternalDisplayConnected) {
            mWindowManager.dismissKeyguard(null, null);
        } else {
            mWindowManager.clearForcedDisplaySize(0);
        }
    } catch (Exception ex) {
        Log.w(TAG, "Failed to dismiss keyguard and reset resolution");
    }
    break;
```

That `setInternalDisplayState()` method is a hacky way of replicating STB Mode functionality--here, it just kills `tegradc.0` so Android can still see two displays, but the internal one doesn't show anything:

```java
    public static void setInternalDisplayState(boolean state) {
        Log.d(TAG, "setInternalDisplayState: " + String.valueOf(state));
        try {
            FileOutputStream enableFile = new FileOutputStream("/sys/bus/platform/devices/tegradc.0/enable");
            byte[] buf = new byte[2];

            buf[0] = (byte) (state ? '1' : '0');
            buf[1] = '\n';

            enableFile.write(buf);
            enableFile.close();
        } catch (IOException e) {
            Log.w(TAG, "Failed to write display state");
        }
    }
```

#### Q HDMI Plug State Handling

`ACTION_HDMI_PLUGGED` is a bit more complicated. It has to be split firstly into plugged-in and unplugged paths, and then split further into ATV and non-ATV handling because of the different scaling methods. ATV is pretty simple--ATV UI always runs/scales at 1080p pre-Android R, and the external display becomes display 0, so the service sets display size to 1080p and display density to `320` (fairly standard and looks OK on different size TVs).

```java
// On ATV always force 1080p for UI when docked, external display also always uses id 0
mWindowManager.setForcedDisplaySize(0, 1920, 1080);
mWindowManager.setForcedDisplayDensityForUser(0, 320, UserHandle.USER_CURRENT);
```

On unplug, it just unsets this:

```java
// Restore default resolution and density for built-in display
mWindowManager.clearForcedDisplaySize(0);
mWindowManager.clearForcedDisplayDensityForUser(0, UserHandle.USER_CURRENT);
```

For tablet, more must be done. The service enumerates external displays and scales based on user-set display size, with density being set based on `160` @ 1080p.

```java
android.view.Display[] displays = mDisplayManager.getDisplays(DisplayManager.DISPLAY_CATEGORY_PRESENTATION);
if (displays == null || displays.length == 0) {
    Log.e(TAG, "Failed to get available displays");
    return;
}
final int externalDisplayId = displays[0].getDisplayId();
final Point displaySize = new Point();

for (int i = 0; i < displays.length; i++)
    Log.i(TAG, "Display idx: " + String.valueOf(i) + " id: " + String.valueOf(displays[i].getDisplayId()));

// Preserve user/default set built-in display resolution.
mWindowManager.getBaseDisplaySize(0, displaySize);
oldDisplayWidth = displaySize.x;
oldDisplayHeight = displaySize.y;

// Scale built-in display to new resolution for smooth transition
mWindowManager.getInitialDisplaySize(externalDisplayId, displaySize);
mWindowManager.setForcedDisplaySize(0, displaySize.x, displaySize.y);

// Set new resolution to external display also.
mWindowManager.setForcedDisplaySize(externalDisplayId, displaySize.x, displaySize.y);

// Set density based off standard 32" TV (1920x1080 @ 160dpi)
mWindowManager.setForcedDisplayDensityForUser(externalDisplayId, 160, UserHandle.USER_CURRENT);
```

Regardless of ATV or tab, the service then updates state and falls through to `ACTION_SCREEN_ON`.

```java
mExternalDisplayConnected = connected;

updatePowerState(context, mExternalDisplayConnected);
...
```

Note that we keep glossing over power state handling--we won't go into detail on this here (today), but this is just a mechanism for setting max clocks via the `nvcpl`-based userspace limiter. Higher clocks (basically NVIDIA Shield stock clocks) are allowed while docked, and lower clocks (closer to standard HOS settings) are allowed while in handheld. These are just limits and kernel still handles frequency scaling etc..

### Android R DockService

I've almost completely rewritten `DockService` to be cleaner and allow for hardware composition with the Android R workarounds. We left off with there being issues there, but now we'll dig into how I got around this. We will use the solution that does not use STB Mode, as the STB Mode solution doesn't really work. I am working on ways to get this working, but for now this is easier.

#### R Screen On Handling

```java
Log.i(TAG, "Screen on");

DisplayUtils.setInternalDisplayState(!(mExternalDisplayConnected
    && sharedPrefs.getBoolean(
    "disable_internal_on_external_connected", false)));

// Unlock device automatically if docked and reset res otherwise to
// work around broken HWC rotation
try {
    if (mExternalDisplayConnected) {
        mWindowManager.dismissKeyguard(null, null);
    }
} catch (Exception ex) {
    Log.w(TAG, "Failed to dismiss keyguard and reset resolution");
}

break;
```

Here, we reference a new preference `disable_internal_on_external_connected` which allows us to choose whether the internal display is killed (we are using the same `setInternalDisplayState` method as before). Not much else has changed, although we are no longer having to clear forced display properties.

### R HDMI Plug State Handling

This is where things get interesting.

```java
if (mExternalDisplayConnected)
    DisplayUtils.setDisplayMode(1, mDisplayService,
        mWindowManager, sharedPrefs);
else
    DisplayUtils.setDisplayMode(0, mDisplayService,
        mWindowManager, sharedPrefs);

mExternalDisplayConnected = connected;

updatePowerState(context, mExternalDisplayConnected);
```

We've cut out all the manual scaling logic and replaced it with a forced display mode set method calling native `hwcomposer` interface methods. This method overrides the wonky internal logic of the `hwcomposer` HAL's default mode setting, and allows default mode to be set, read, and applied via the Android native SharedPreferences interface. NOTE: ideally, the `hwcomposer` default mode stuff would work right, so it's possible this will change in a future revision of the service. The method then forces Android to update rotation and refresh the UI.

```java
public static void setDisplayMode(int display, INvDisplay displayService,
            IWindowManager windowManager, SharedPreferences sharedPrefs) {
    int index = 0; // default 0 for internal

    try {
        // grab pref for external displays
        if (display > 0) {
            String displayUid = String.valueOf(DisplayUtils.makeDisplayLabel(
                        displayService.edidGetInfo(display), display).hashCode());
            HwcSvcDisplayMode defMode = displayService.getMode(display,
                                HwcSvcModeType.HWC_SVC_MODE_TYPE_MAX_1080P_60HZ);

            String modeString = sharedPrefs.getString(("mode_" + displayUid),
                                                    String.valueOf(defMode.index));

            Log.i(TAG, "Setting mode index " + modeString
                                                + " for display uid " + displayUid);
            index = Integer.parseInt(modeString);
        }

        // manually set hwc mode and force android to update rotation
        displayService.modeSetIndex(display, index);
        windowManager.updateRotation(true, true);
    } catch (RemoteException e) {
        Log.e(TAG, "Failed to set mode!");
    }
}
```

That `defMode` stuff is new--I realized it was bad UX for the default state to be 640x480 until changed, and manually set that. Requesting the `MAX` mode instead yielded the same results as letting the HAL decide the mode (likely because it uses the same logic)--some 4K TVs would show only 1/4 of the screen. Don't ask me why.

## Limitations

Unfortunately this solution has issues. It doesn't fully kill the internal rendering display, so it's still sort-of mirroring. This results in slightly under what would be the maximum performance, and has been reported to prevent the usage of high-refresh-rate displays at their true refresh rate (the rate is set to match but the content only renders/play at 60, presumably to match internal panel). This also is somewhat reliant on NVIDIA's unstable display service interface (`INvDisplay`), which has been known to change drastically with no warning. Putting `NvAccProxy.apk`, a piece of the NvAccessories suite, in JADX is a surefire way to see the current interface (because the JNI interface is included, detailed, and easily reverse-engineered), but that will need to be verified every time blobs are updated from Shield Experience. Another annoying bug is the first time you dock, no video shows. You need to undock and dock again. Why? Who knows. Maybe some race condition with the mode setting. Likely, using the internal `hwcomposer` stuff would work better, but like I said before, that has caused issues thus far. There have also been reports of some displays not working at all. I haven't been able to replicate any of this behavior, but I don't have much reason to doubt it--it's definitely a finnicky solution.

![Screenshot of JADX showing decompiled NvAccProxy](/post/Adventures-in-Android-Docking/jadx-accproxy.png)

<p style="text-align:center">JADX decompilation of NvAccProxy</p>

## Conclusions and Future Work

The overarching message here is that it's quite complicated to work around bitrot code in a closed-source library, but it can be a fun challenge when there is a suitable motivation--and here there certainly is. Docking my Switch OLED and streaming *Ghostrunner* via GeForce Now in 4K60 is quite the experience. In the future, I'd like to try and get a decent picture using STB Mode--and hopefully resolve some of those issues while doing it. I've thought of some ways to do this--maybe using HDMI autorotation (another option in the HAL) and booting using portrait would work, using the IMU to autorotate to landscape on boot. Kind of a weird UX, but whatever. The biggest obstacle there is actually the Switch Lite (it has no integrated IMU and only has one in Sio, the serial-attached Lite controller), but the Lite doesn't dock at all, so everything could be if'd by sku. Interesting prospect if possible. If I ever get the time or care, I'd love to HIDL-ize DockService and write it as a C++ HAL. I doubt I'll ever get around to it though.

Thanks for reading!
