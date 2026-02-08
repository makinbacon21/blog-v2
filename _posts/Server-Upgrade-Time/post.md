---
title: Server Upgrade Time!
date: 2021-07-14 00:47:06
categories:
- Projects
tags:
- guides
- vmware
- vm
- macos
- linux
- ubuntu
- esxi
- server
cover: /post/Server-Upgrade-Time/motherboard.jpg
---
(Updated 7/18/21)

It is finally time to upgrade the server. The broken 3400G I had is not performing as well as I'd like, and the 16 GB of RAM isn't doing it any favors either, as it runs multiple VMs and runs intensive tasks. I've taken it offline while I ship the 3400G in for an RMA, as I don't want to resell a broken product, and plan to add more storage, a new CPU, and more RAM while it's offline. Let's go over my planned upgrades:

## Upgrades
- 3400G --> 3700X

:::details Click to see a spec comparison

| Specs | 3400G | 3700X |
|-------|-------|-------|
| Cores/Threads | 4/8 | 8/16 |
| Max Boost Clock (GHz) | 4.2 | 4.4 |
| L3 Cache (MB) | 4 | 32 |
| Default TDP (W) | 65 | 65 |
| Max RAM Speed (MHz) | 2933 | 3200 |
| iGPU Cores | 11 | N/A |

:::

- 16GB DDR4-3200 --> 32GB DDR4-3200
- Adding some more HDD's I have lying around just for kicks
- Integrated Radeon RX Vega 11 Graphics --> Dell AMD Radeon HD 8490 1GB (ESXi display output) + MSI AMD Radeon RX 560 2GB Aero (macOS passthrough)

## Plans for the Future
First and foremost, I want to make sure ESXI remote management works well over NoIP port forwarding, because if it doesn't I need to solve that problem. I think it should but if it doesn't, I'll set up an old laptop or something as a vCenter server. My second priority will be getting the macOS VM correctly running Xamarin builds, preferably with hardware acceleration, but this will require a GPU to pass through, and that's another investment I'm not sure I want to make at this moment. After that, I want to get a Windows VM working as well as possible for any basic work I may need to do on the go, either via command-line access or graphical remote access. Lastly, I need to ensure that I can remotely manage server power in the event of a power failure or other mistake. This could be accomplished with an Arduino or Raspberry Pi, managed remotely, and hooked into the motherboard power switch header (or a splitter so the actual case button also works). This could operate under automatic power-on when power is restored or via a battery, but I don't really feel like dealing with battery backup logic.
