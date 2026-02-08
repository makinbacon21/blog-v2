---
title: Server is Up + ESXi macOS Guide
date: 2021-05-19 23:38:49
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
cover: /post/Server-is-Up-ESXi-macOS-Guide/esxi-1.webp
path: Server-is-Up-ESXi-macOS-Guide
---

I finally got my server working to perfection, but WAY different from my original plan. If you read my last post, you'll know I was planning to build an Ubuntu Server 21.04 server with macOS Big Sur virtualized using KVM for builds, storage, and repo management. I was, however, not pleased with the setup and management processes for the macOS VM, especially when it came to resource allocation and remote display output. This led me to VMware's ESXi server platform. ESXi is a type 1 hypervisor operating system, meaning that it provides a very thin management layer over top of the real hardware for VMs to run off with little performance impact versus bare metal. It includes an awesome Web-based GUI, allowing me to easily manage and monitor VMs, and perform actions like PCI device passthrough with a simple graphical interface instead of complex command line tools. Let's run through how and what I was able to accomplish with ESXi's help.

## Configuration
Installing ESXi was a piece of cake--I flashed a USB stick and followed the simple instructions on first boot to configure basic settings. The rest was all done from the intuitive remotely accessed GUI. In the following screenshot, you can get a glimpse of the interface, including the system actively monitoring the performance consumption of my active LineageOS build.

![ESXi Dashboard](/post/Server-is-Up-ESXi-macOS-Guide/esxi-1.webp)

To configure ESXi (after trial and error), I set up my VMs on my 32GB Optane NVMe drive, with the virtual storage disks on my 1TB SATA SSD. This is so my configuration and, more importantly, swapfiles can take advantage of NVMe speeds despite my lack of a larger sized spare NVMe drive. Meanwhile, I still get all the read/write speeds I need for my files.


I do have a few complaints about ESXi, though. The first is the lack of a built-in mechanism for roaming remote monitoring other than forwarding configuration and access ports through my router, which seems like a potential security risk. My second issue is the requirement for most VMs that the swapfile cannot be placed in a custom folder/datastore per VM. To make this happen, I had to put the VM config files on a separate disk from my storage for the VM, which while not too big of a hassle, just seems unnecessary. Another annoyance is the CPU usage meter--it measures and allocates CPU usage in GHz. The CPU should not be treated as one giant processor that goes to x GHz--it should be treated as individual cores, with specific IPC ratings and speeds. IPC or cores would be more acceptable metrics. One last complaint I have, though rather unimportant, is the lack of nano support. The built-in shell only includes vim, which I absolutely HATE.

## Ubuntu Server
As originally planned, an Ubuntu Server 21.04 install is present. I have it set as the dominant OS, with 8 GB of reserved RAM and the ability to hot add as much as it wants. VMWare tools installed automatically and works well, though I generally use SSH over the VMWare remote console, so I don't take advantage of many of the features. I had no configuration issues, and ESXi assigned it its own IP address, my only issue being that I've had trouble accessing it from my Terminus app on iOS. That is most likely a fault of some configuration error on the client side which I'll fix eventually. In any case, it works perfectly, and performs exactly as expected. I might want more RAM in the future, though, as my Android builds usually want way more than what I have.

## macOS Big Sur
macOS was a challenge to add, but once I got it up and running it was fine. The main obstacle for me was getting the macOS installer to boot despite the AMD processor ESXi is running on. The instructions for getting macOS up and running were a bit complex, so I'll include them here for anyone else doing the same thing themselves.

### Step 1: Enable SSH on ESXi
![Enabling SSH on ESXi](/post/Server-is-Up-ESXi-macOS-Guide/esxi-2.webp)

### Step 2: Connect to ESXi over SSH
```bash
ssh root@<ip-address>
```

### Step 3: Download ESXi Unlocker from GitHub
```bash
wget https://github.com/hugepants/esxi-unlocker/releases/download/3.0.1/esxi-unlocker-301.tgz
```

### Step 4: Unzip and install ESXi Unlocker
```bash
tar xzvf esxi-unlocker-<version>.tgz
./esxi-install.sh
```

### Step 5: Disable SSH on ESXi and reboot the server
![Rebooting ESXi](/post/Server-is-Up-ESXi-macOS-Guide/esxi-3.jpg)

### Step 6: Acquire and upload macOS 11.x installer ISO
Follow another guide--I recommend using [this one](https://www.wikigain.com/create-macos-big-sur-iso-image/)

### Step 7: Create new macOS VM with default settings for macOS 11 and give it the installer ISO
![Making VM](/post/Server-is-Up-ESXi-macOS-Guide/esxi-4.jpg)

### Step 8: Add to VMX file
Either download and edit the file or use the "Edit Configuration..." option in VM Options
```
smc.present = "TRUE"
smc.version = "0"
```

### Step 9: Emulate SMBIOS
1. Download CorpNewt's GenSMBIOS script [here](https://github.com/corpnewt/GenSMBIOS) and run either the .bat or command script
2. Install MacSerial, then generate an SMBIOS for a MacPro7,1
3. Repeat until the output [here](https://checkcoverage.apple.com/) results in an "invalid" serial
4. Set Mac Address as static in the VM's Network Adapter properties, noting the value
5. Add the following to your VMX file based on the output from GenSMBIOS:
```
smbios.reflectHost = "FALSE"
hw.model.reflectHost = "FALSE"
hw.model = "MacPro7,1"
board-id.reflectHost = "FALSE"
board-id = "Mac-27AD2F918AE68F61"
serialNumber.reflectHost = "FALSE"
serialNumber = "<your-serial>"
efi.nvram.var.MLB.reflectHost = "FALSE"
efi.nvram.var.MLB = "<your-board-serial>
efi.nvram.var.ROM.reflectHost = "FALSE"
efi.var.ROM = "<your-macaddress>"
ethernet0.checkMacAddress = "FALSE"
```
6. Clear all vars starting with `ethernet0` aside from the one you just added and `ethernet0.pciSlotNumber`

### Step 10 (AMD Only): Set cpuids
```
cpuid.0.eax = “0000:0000:0000:0000:0000:0000:0000:1011”
cpuid.0.ebx = “0111:0101:0110:1110:0110:0101:0100:0111”
cpuid.0.ecx = “0110:1100:0110:0101:0111:0100:0110:1110”
cpuid.0.edx = “0100:1001:0110:0101:0110:1110:0110:1001”
cpuid.1.eax = “0000:0000:0000:0001:0000:0110:0111:0001”
cpuid.1.ebx = “0000:0010:0000:0001:0000:1000:0000:0000”
cpuid.1.ecx = “1000:0010:1001:1000:0010:0010:0000:0011”
cpuid.1.edx = “0000:0111:1000:1011:1111:1011:1111:1111”
```


You should now have a bootable macOS 11 VM, and it should be relatively easy to configure from here.
