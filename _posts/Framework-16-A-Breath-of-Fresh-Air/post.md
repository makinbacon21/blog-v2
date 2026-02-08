---
layout: post
title: 'Framework 16: A Breath of Fresh Air'
date: 2024-07-06 04:07:17
categories:
- Reviews
tags:
- framework
- laptop
- linux
- fedora
cover: /post/Framework-16-A-Breath-of-Fresh-Air/desktop.jpg
---

Hello! I'm back. Switchroot has released LineageOS 21 (Android 14), SCCS has released a number of new services, and I'm currently interning at NVIDIA. Maybe I'll cover some of these milestones in the future as there are some super cool new topics to write about, but for now I'll stick to covering something quite interesting--my new laptop.

## What happened to the Surface?

I loved my Surface Laptop Studio. It performed well, had a satisfying and tactile keyboard, and fulfiled the 2-in-1 niche I desired for use in school. The physical design of the device included a fantastic spot for holding and charging the pen, the best style hinge I've ever seen on a 2-in-1, and the only haptic trackpad I haven't yelled at (unlike the Dell Precision I use for work or the last many generations of MacBooks).

HOWEVER. The build quality of this machine was far below anything I've ever seen from Surface before. It was riddled with issues, and within a mere two years it was missing keys and falling apart. Replacing the SSD resulted in horrible instability due to a lacking power budget, and every time I had to open the machine I had to order $15 replacement rubber feet and re-ruin the irreplacable fake metal tape comprising a good 5-10% of the bottom surface. The palmrest buckled and bent inward. The hinge egan behaving oddly and getting stuck sometimes. All this on top of the inherent design flaws and terrible specs for 2024...it was time for a change.

![Surface keyboard](/post/Framework-16-A-Breath-of-Fresh-Air/surface-kb.jpg)

<p style="text-align:center">The rapidly degrading keyboard on my Surface</p>

![Surface bottom](/post/Framework-16-A-Breath-of-Fresh-Air/surface-bottom.jpg)

<p style="text-align:center">The adhesive-covered and tapeless bottom of my Surface</p>

## Pre-Arrival

### Selecting the Framework 16

I was drawn to the Framework by the promise of a high-quality machine with ports I wouldn't need dongles for, reparable and upgradable components, and OOTB compatibility with most mainstream Linux distros. The 16 was a necessity for me as I can't work productively on a 13 inch display. 16-inch 16:10? About perfect for me. Plus, it had the option of a high-perforamance AMD APU and a pretty fantastic RDNA3-based 7700S dGPU (just like the 7900XTX in my desktop). Throw in the option for a numpad (cope and seethe, numpad haters) and a maximum of 6(+1 for dGPU) ports, and I was sold.

![Laptop showing desktop background](/post/Framework-16-A-Breath-of-Fresh-Air/desktop.jpg)

<p style="text-align:center">The Framework 16 showing desktop background</p>

### The Purchasing Process

Framework's site is fantastic, and their customization options were second to none. It felt like one of those build & price tools on car sites, but where I could actaully afford to purchase the end result. It felt both personal and fun, and I was able to create something specific to me for barely more than another computer of the same caliber. As a matter of fact, if you count an equivalently spec'd Surface, it was a bargain. I chose two USB-C modules for the highest-bandwidth port slots, HDMI and DP for the next highest, and a microSD and a USB-A for the lowest. The dGPU, as mentioned before, came with a USB-C just for DP alt mode.

The downside of this process was the wait. I pre-ordered my Framework Laptop 16 on April 1, and I was placed in Batch 19, estimated for Q2 2024. It finally shipped and arrived in June, and I've heard new orders are estimated for mere weeks from now, with the Laptop 13 shipping much faster.

## The Experience

### Unboxing & Building

![Framework Box](/post/Framework-16-A-Breath-of-Fresh-Air/box.jpg)

<p style="text-align:center">The Framework 16 (DIY Edition) new in box</p>

The best comparison I have to the Framework Laptop 16 (DIY Edition) unboxing edition was my Valve Index kit. It wasn't quite that polished, but it was similar in structure. The main body was in the center, with various modular accessories in their own boxes surrounding it. The instructions for assembly were simple and even annotated on the inside of the device itself--the screws are marked in order and installing and the SSD I bought separately and the provided RAM kit was very easy. Everything was pretty much ready to go and it booted first try off my standard Ventoy stick.

![Framework with empty interior](/post/Framework-16-A-Breath-of-Fresh-Air/interior-empty.jpg)

<p style="text-align:center">The Framework 16 internals with unpopulated RAM and SSD slots</p>

### The Hardware

I have really enjoyed my Framework so far. Very, very much actually. There were a numnber of happy suprises about it--for example, the keyboard and screen were not only leagues better than I expeected, but the keyboard is the best I've ever used on a laptop. It feels *natural*.

![Framework with full internals](/post/Framework-16-A-Breath-of-Fresh-Air/interior-full.jpg)

<p style="text-align:center">The Framework 16 internals, all populated</p>

The general build quality is top notch, with plastic components being very robust and the main chassis being a very high-quality rigid alloy. The magnetic display bezel looks extremely clean and does not look removable at first glance. I may attempt to engrave something on the bottom bezel later. I also didn't realize there were hardware webcam and mic switches before it arrived--nice touch. The vents are discrete and the main touch surfaces barely heat up past what I would consider comfortable (my SLS keyboard deck would frequently feel like an iron).

![Framework keyboard](/post/Framework-16-A-Breath-of-Fresh-Air/keyboard.jpg)

<p style="text-align:center">The Framework 16 keyboard</p>

The laptop is not without its downsides, though. First and foremost is an overarching theme of poor tolerances for modular components. Of course, it's hard to get these rigt, but the palmrest area is at the edge of what I'd consider "acceptable." The touchpad module warps upwards at the corners, making them not quite flush with anything adjacent, and the spacers are *awful*. They have little rigidity, causing them to slightly bend inwards if not placed on an exterior edge (my config is touchpad-spacer-spacer, so I have this issue), and the tolderances so poor that they are not flush and do not stay totally in place if pushed a bit. I may look for some other spacers with a more robust design if this continues to be an issue. The expansion modules wiggle a bit in their sockets, but since they are on the underside of the device I rarely notice.

![Framework deck tolerance issues](/post/Framework-16-A-Breath-of-Fresh-Air/tolerances.jpg)

<p style="text-align:center">The Framework 16 deck, highlighting tolerance issues</p>

Another weird issue is the shape. The screen only occupies about 80-90% of the vertical space on the lid--I haven't really looked inside, but it eludes me why this isn't a 3:2 panel with another 1.5 inches of space. It's just blank plastic. I'd say the body could be shrunken depth-wise, but the space matches an important dual-side fan on the deck. The dGPU also sticks another inch off the back if attached, which is a bit awkward but of course understandable given thermal constraints.

Overall, a well-made device--a lot higher quality than I expected originally--with a couple of weird beta-product-esque flaws.

### The Software

I'm running my OS of choice--the latest Fedora release (40 at this time). This has been a clean and stable experience, with the one vaguely annoying issue sourcing from yet another Steam issue reported years ago and still ignored: on machines with an iGPU and a dGPU, Steam appears to request it be run on the dGPU but tries to manually draw on the iGPU--resulting in a blank black window in many cases. Quite annoying, but can be mitigated by using the `.desktop` file entries for games instead of the one for Steam itself.

Everything has been ultra stable--battery and fan profiles have been perfect, all my games run, and I've had no issue with compatibility of any program I've actually wanted to run. My desktop is on Fedora as well and it seems F40 is a pretty perfect replacement for Windows.

![Framework booting up](/post/Framework-16-A-Breath-of-Fresh-Air/bootup.jpg)

<p style="text-align:center">The Framework 16 booting up</p>

## Conclusion

I am quite pleased with my purchase. The Framework Laptop 16 is the ideal machine for me. I miss having a 2-in-1, but well...stay tuned for future projects. The keyboard is perfect, the screen has far exceeded my expectations, and the graphical performance is spectacular for a laptop. I'm excited to keep playing around with it and possibly produce custom parts for it in the future.
s
