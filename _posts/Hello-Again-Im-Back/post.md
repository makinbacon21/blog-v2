---
layout: post
title: Hello Again! I'm back.
categories:
- Commentary
date: 2023-05-09 02:39:54
tags:
- commentary
- sccs
- switch
- concord
- yellowstone
- molly
- web
- server
cover: /post/Hello-Again-Im-Back/swr-3.jpg
---

Cover image: Switchroot Android 11 (dev build) running on a Nintendo Switch OLED.

Hello! If you're new to this page, I'm Thomas and this is my blog. Why on Earth do I have a blog? Well, I do a ton of fun, awesome, ridiculous stuff that some people might think is cool (or want to do themselves and need references). Stuff I've written about before:

- Building a server from my old computer parts and set it up with totally-overkill enterprise-grade virtualization software
- Setting up a macOS VM to replace my old Hackintosh setups
- Building out my self-hosted Web infra, using Traefik v2 and Docker
- I thought Windows 11 was going to be good

Of course, those are just a few vaguely interesting things I did in high school. I've done a lot more (cooler) stuff since then, and things have been going super well--so well, in fact, that I haven't had the time to update this site. So here we are. Up to speed. Let's get updated.

## School

As some of my readers may know, I'm an engineering and CS double major at Swarthmore, a Liberal Arts school known for their, well, liberal arts, in addition to a great engineering program. As someone who tries to be somewhat well-rounded and surrounded by diverse perspectives, it's a pretty perfect place. I'm pretty much done with my sophomore year now, and I think I've pretty much settled in (two years later). I've been up to some fun stuff closer to what I usually talk about here, so let's take a look.

### SCCS

The [Swarthmore College Computer Society (SCCS)](https://www.sccs.swarthmore.edu/) was founded by Stallman worshippers in the 90s. Not that there's anything wrong with that--their epic tale of stringing cables between dorms to form the first network on campus is one for the ages, and we wouldn't be here without them. We pretty much do unpaid labor for the school--their IT department writes sites with only UI and not UX in mind, and contracts companies that write services with neither, so we pick up the slack. Unusable course registration portal with unreadable and inaccurate schedule view? Meet the [SCCS Course Planner](https://schedule.sccs.swarthmore.edu/). Mobile ["dash"](https://dash.swarthmore.edu/) stretched to fit a desktop screen? Meet the (upcoming) new SCCS Reserved Student Digest (new name tbd).

![RSDv2 Dev Build](/post/Hello-Again-Im-Back/rsdv2.png)

I should mention, we're not entirely unpaid. The school has paid for consoles, a TV, gaming computers, peripherals, and awesome speaker systems that we get to use in our private rooms. Plus, part of why we're unpaid is purely out of values--we want to maintain our individuality and independence from the school administration, and taking their money would obligate us to, well, do what they say more of the time.

![SCCS Lounge](/post/Hello-Again-Im-Back/sccs.jpg)

But yea. Cool club. Great services. And great hardware! We currently have four enterprise-grade servers (all old and most not even able to run any real production code) which we fully maintain ourselves and use to host our plethora of services. We're in the progress of migrating our infrastructure to more modern, redundant, and portable systems, so we can update our machines without all hell breaking loose or fail over to another server if the main one is down. The biggest parts of this are containerization (via Docker), virtualization (via Proxmox), and complete service rewrites for the outdated and unfixable stuff. Case in point: we had a service called Airpool that helped students connect for rides to and from the airport. In Airpool's Git repo, there was a node_modules folder but no package.json. In its folder on our main production server, there were neither. The Python backend had a totally broken venv. No wonder it stopped working. This falls into the rewrite category, and a complete reboot in Next.JS (our main framework of choice) will be one of my projects in the coming year with some of my clubmates. Anyway, on to more fun stuff.

### Makerspace

This semester, I've been working at the Makerspace on campus. It's a cute little spot, in a brand-new building, with everything a hobbyist maker (like myself) might need. My job has been to make sure no one chops their arm off, and so far no one has, so I guess I'm doing a good job. It's also a great opportunity to build cool stuff--I made my parents a custom Scrabble board for Christmas, and it turned out pretty well if I do say so myself

![Scrabble Board](/post/Hello-Again-Im-Back/scrabble.jpg)

It's also been great for my sleep schedule--I have 2/3 of my weekly shifts from 7:30-11 PM, and since it's so close to my dorm, I just walk right back and go to sleep. This is in stark contrast from when most of my shifts were 4-7:30, and I'd walk back to the SCCS lounge and do whatever till 1 AM or later. Good stuff.

### Dining (Yea Tech is Involved)

This fall, our new and long-awaited Dining Center opened to the public. And much like every major game release of this year, it was met with pain, anger, and lots of yelling due to its incomplete and unsatisfactory state. The whole place reeks of tech showsmanship--everything from the completely broken and unusable *contactless condiment dispensers* to the completely disfunctional virtual menus (more on this in a bit). There were complaints from everyone, not the least of which from yours truly, who has approximately the same number of life-threatening, highly severe allergic reactions before and after the opening of the Dining Center. Yes--20 years vs. 6 months.

![Swarthmore Dining Center](/post/Hello-Again-Im-Back/dc.jpg)

[Image Credit](https://www.swarthmore.edu/swarthmore-dining/dining-locations-hours)

The biggest issue for me was the consistent mislabelling--as part of their wonderful tech signalling, they had apparently contracted the world's worst company for automating this kind of thing (that being the parsing of ingredients and creation of digital menus). Here is the progression of issues:

1. The system takes ~1-3 minutes to load after *every button press* and is extremely unintuitive
2. The school only employed 1 person who actually knew how to work the system, and he also had a large number of other duties
3. Because inputting recipes could take up to 45 minutes each on a good day, the staff resorted to *guessing* what was in different things and *assuming* nothing ever changed.

As a result, nothing was labelled right for months. I would email them with long lists of issues, and each time would get the same response: "Yea, it seems like labelling per item on the glass is the best way to go." They would then proceed to do that for one day, then go back to just the digital system with no warning or fixes in place. At some point, however, things started to take a turn--the staff began to better understand what was going on, options became more regular and less varied, and items were inputed far in advance...and they hired me. I don't do anything super high-functioning; I just input items and recipes into the awful system, but I get paid for it, and it's saved me a trip to the ER a few times. It also doesn't hurt to have the numbers of the people in charge.

But yea. The operable lesson here is "Tech showsmanship might win some stupid people over on tours, but you run the risk of a wrongful death suit if you screw up too badly." Oh and "Don't subscribe to a service that has `HtmlGen` in the URL. It won't be good.

## Switchroot

School isn't all I've been working on. Switchroot Android 11 is well on its way--I plan to ship a beta this coming week, once I test upgrading from 10 and get the final APK from the developer of Console Launcher. I will admit, I feel a bit bad shipping a non-OSS, freemium app as the stock launcher...but Trebuchet will still be there as an option, and Console Launcher is an *amazing* experience on the Switch.

![Switchroot Android 11 With Console Launcher](/post/Hello-Again-Im-Back/swr-1.jpg)

11 will ship with a ton of new features, which I'll probably cover more in-depth later on in a dedicated post. I'm super excited to get this out becuase it's been a ton of hard work, but the product is really something I can be proud of. The highlight feature is Mariko support--the credit there of course goes to CTCaer, the main kernel dev, but I had to do some messing about to make sure things didn't implode on our end there. And of course, we will be shipping an ATV build as well.

![Switchroot Android TV 11](/post/Hello-Again-Im-Back/swr-2.jpg)

Once I get the beta out, there're a few features I want to build out this summer--I want to fix a couple unimportant things that died between 10 and 11, and get a couple more QoL things in there. After I finish that, I'll probably be pretty much done with the project. Maintaining a separate tree from the rest of the Tegra devices isn't super fun and probably won't be feasible if I ever want to get 12, 13, or something later booting. Plus, I want to work more on my other devices. I picked up a `yellowstone` (Google Project Tango), a `molly` (Google ADT-1 Developer Kit), and a `concord` (NVIDIA Jetson AGX Orin) last summer, and I'm exited to get the older ones booting modern things and the Orin booting nonstandard things. Plus, I have a few other plans for the Orin. More to come.

![NVIDIA Jetson AGX Orin](/post/Hello-Again-Im-Back/orin.jpg)

## Summer Objectives (Server, SCCS, Switchroot)

I have a few things I definitely want to accomplish this summer:

- Migrate server to Proxmox
- Get macOS Ventura running properly on Proxmox
- Build out a basic Airpool v2 UI and basic backend framework in Next.JS
- Get RSDv2 into a shippable beta state
- Make sure infra is ready for transfer to our new server in the fall
- Get Switchroot Android 11 out the door
- Get `concord` booting Android
- Make substantial progress on my other Orin project

## Conclusion

But yea that about wraps it all up. Thanks for stopping by, and I promise there will be more in-depth, techy content coming quite soon.
