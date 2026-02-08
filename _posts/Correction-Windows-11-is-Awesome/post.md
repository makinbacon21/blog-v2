---
title: 'Correction: Windows 11 is Awesome'
date: 2021-07-04 23:20:18
categories:
- Reviews
tags:
- windows 11
- windows
- reviews
- ui
- design
cover: /post/Correction-Windows-11-is-Awesome/desktop.jpg
---

My previous post, [Windows 11 and Inconsistent UI Modernization](https://thomasmak.in/post/Windows-11-and-Inconsistent-UI-Modernization), included my (less-than-stellar) impressions of the new Windows 11 UI changes present in a leaked dev build. I wrote about inconsistencies in the interface, lack of major changes to the overall workflow, and lack of significant change from Windows 10. I recently installed the latest Windows 11 Insider Build on my Surface Pro 7 and custom desktop rig, and I cannot possibly overstate my enthusiasm for the latest changes.

![Windows 11 Desktop with Notifications Flyout Expanded](/post/Correction-Windows-11-is-Awesome/desktop.jpg)

## Look and Feel
Windows 11 finally completes (aside from a few exceptions) the long-awaited transformation of the Windows UI to new WinUI controls and classic shell analogs. From rounded corners on windows to Windows 7-like rounded classic shell buttons, Windows 11 feels cleaner, friendlier, and more modern. Windows 11 feels like the natural progression of Windows 7 into the modern era, whereas 10 felt more like a Windows 8 version made less crappy. The new Taskbar looks great, with much nicer active window indicators and progress bars which I'm not sure I noticed in the leaked build. My favorite aesthetic improvement is the new Action Center, which takes the planned Windows 10X Action Center and splits it. I personally think that the calendar flyout should reincorporate 10's Agenda view and possibly stretch vertically, and notifications should move to above Quick Actions in the System Tray part of the Action Center. Not only is the Quick Actions view smaller, but Now Playing cards show there already, which feels right for a notification view. All in all though, the new design looks more modern and feels cleaner. Widgets view looks great, especially on desktop, though I did notice high RAM consumption from the multiple Edge WebView2 controls it employs. Animations are cleaner across the board, and everything feels connected with well-developed translation and resizing effects. Everything feels much more unified, whereas 10 felt like a hodge-podge of legacy Windows Shell components, Metro UI stuff left over from 8, some attempt at modernizing the Metro UI from ~2015, and a few new WinUI controls that belong in 11.

![Windows 11 Desktop with Action Center and Snap Dialog Visible](/post/Correction-Windows-11-is-Awesome/desktop2.jpg)

![Windows 11 Fluent Settings Application](/post/Correction-Windows-11-is-Awesome/settings.jpg)

## Audio
Windows 11 also features a whole new array of sound effects--and I love them. Windows 10's sound effects were loud, long, annoying, and not really appealing. In contrast, Windows 11 brings subtler, more modern, much more appealing sounds to Windows. From notifications to device disconnects, sounds sound way better. This overall contributes to the modern, clean vibes of Windows 11, and compliment its visuals well.

## Problems
Windows 11, although great, still has its issues. The main issue is of course the disgusing continuation of Control Panel. The new Settings app is more than sufficient for most settings, and can open pop up windows directly. However, not only do the pop up windows not support Dark Mode, but Control Panel both exists and does not support Dark Mode. This issue must be eliminated. These pop up windows need Dark Mode--they've received a visual refresh with the shell component changes in Windows 10, but yet they do not include Dark Mode support as of yet. Control Panel needs to be destroyed. Desparately. A few dialogs still need porting--namely, full-featured network adapter options and Windows 7 backup and restore, but all in all it needs to go. Another problem is that mousing over Taskbar icons yields the old un-rounded previews from 10. This is inconsistent with the Windows 11 aesthetic and feels out of place. Other than that, it's just some random feature removal stuff like Start's un-resizeability and the inability to drag icons to the Taskbar for pinning.

![Windows 11's Gross Windows Tools Menu](/post/Correction-Windows-11-is-Awesome/control.jpg)

## Specs
People have come down hard on Microsoft for their harsh minimum spec requirements for Windows 11. They are not entirely unjustified--Windows 11 unnecessarily kills of entire generations of worthy machines due to seemingly arbitrary limits. The TPM requirement I somewhat understand due to the increasing threat of cyberattacks and ransomware, especially with the hard lower limit only being TPM 1.2. However, the attempt to kill off 6th generation Intel and 1st generation Ryzen CPUs is absolutely ridiculous and unjustifiable. From what I've heard, they're relaxing these requirements, but if they go through with requiring 2nd generation Ryzen/7th generation Intel CPUs or higher, a lot of machines will die for no good reason.

![Windows 11 System Requirements Page](/post/Correction-Windows-11-is-Awesome/win11reqs.jpeg)

## Development Info
Windows 11 effectively kills off the Reveal highlight effect, one of the first Fluent effects released, which I personally am happy with. Reveal was a very busy, very unnecessary, very graphically intensive effect that did little for the interface aside from complicate what should have been minimalistic appearances. The Acrylic material is still here and is in use across many app and shell surfaces, and is now complimented by the new Mica material. Mica is an opaque, soft, dynamic material meant for app backgrounds. It seems to be applied by default to NavigationView controls, and is seeen in the latest builds of the [XAML Controls Gallery app](https://www.microsoft.com/en-us/p/xaml-controls-gallery/9msvh128x2zt). It essentially takes on some color from the desktop background, but does not show detail through itself like Acrylic does. Acrylic is now recommended mainly for panel use, seen in the new Start Menu and Taskbar, in addition to other controls. Another development topic that interested me was the ability to develop Widgets--there is no API documentation on Widget development yet, but I hope it comes soon.

![XAML Controls Gallery Using Windows 11 Design Principles](/post/Correction-Windows-11-is-Awesome/xamlcontrols.jpg)

## Conclusion
Overall, I am very hyped for Windows 11. I'm daily driving it on both my laptop and my desktop, and the experience is phenomenal. Everything feels smooth, modern, and rather consistent (except for the few exceptions outlined above), and navigating the interface feels natural. The experience adapts to the device I'm on in screen size and device capabilities, but syncs enough of my data to feel like one continuous environment. Windows 11 feels more productive, more consistent, more modern, and even closer to what a modern Windows OS should be. This may not be an exhaustive list of everything I love and dislike about Windows 11, but it serves as a pretty great summary.
