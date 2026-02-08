---
title: Building a New Server
date: 2021-04-25 16:24:52
categories:
- Projects
tags:
- vmware
- vm
- macos
- linux
- ubuntu
- server
cover: /post/Building-a-New-Server/server-1.png
---

For a few months, I threw Ubuntu Server on an old HP Pavilion desktop I took from my grandparents after building them a new PC. With an AMD A8-5500, 8GB (+ the extra 4GB stick I had lying around) of DDR3-somespeedicantremember RAM, and an old HDD, the machine wasn't anything to marvel at. I did enjoy having a server for offloading Android builds and storing local repos I didn't want taking up space on my main rig. However, due to some recent hardware swapping, I've come into possession of a Ryzen 5 3400G and Aorus B450 Pro Wi-Fi, with 16GB of DDR4-3200 RAM. My new power supply comes today, so I will be putting this all together to replace the old server, now with a massive performance gain.

![My Box of Assorted Parts](/post/Building-a-New-Server/server-1.png)

## The Specs
- CPU: Ryzen 5 3400G--4C/8T, Zen+, 3.7-4.2 GHz, TDP 65W
- GPU: Integrated RX Vega 11 Graphics--11C
- RAM: 16GB DDR4-3200
- MB: Aorus B450 Pro Wi-Fi
- Storage: WD Blue 1TB SATA SSD + whatever HDDs I have lying around


## The Plan

- The idea is to have an all-in-one, headless solution for all the builds I need to offload, plus as a convenient place for my large local repos. Here are a few goals I have for the project:
Ubuntu Server 21.04 LTS
- Key-based SSH target with SSHFS support for file browsing
- VS Code Server for remote repository management and coding
- Port forwarding for remote access
- Virtualized macOS 11 (Big Sur) accelerated by KVM (maybe with GPU passthrough?) running headlessly for Xamarin/MAUI builds, but with graphical interface over VNC

The first four should be simple enough--flash Ubuntu Server as usual and setup OpenSSH in conjunction with port forwarding on my router for remote access, then just run VS Code over SSH for automated server setup. Virtualized macOS 11 might give me some trouble, but I have a vague idea of what needs to happen. I plan to use [foxlet/macOS-Simple-KVM: Tools to set up a quick macOS VM in QEMU, accelerated by KVM. (github.com)](https://github.com/foxlet/macOS-Simple-KVM) to set up a macOS 11 VM, using Step 2b in the README to run the machine headlessly with remote VNC access for GUI. I might try and pass through the GPU using the guide at [macOS-Simple-KVM/guide-passthrough.md at master · foxlet/macOS-Simple-KVM (github.com)](https://github.com/foxlet/macOS-Simple-KVM/blob/master/docs/guide-passthrough.md), but I'm not 100% sure yet. I've heard the Vega integrated GPUs don't play well with macOS, which is odd because I'm fairly certain they have platform support for them...I guess we'll find out. In any case, when this is over I should have remote access to Linux for builds and repos, in addition to macOS for Xamarin and .NET MAUI builds. I'll post the results when I'm finished, in addition to any unusual steps I take to get things working.
