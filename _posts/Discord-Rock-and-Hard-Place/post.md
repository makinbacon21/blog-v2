---
title: 'Discord: Between a Rock and a Hard Place'
date: 2026-02-13 21:07:00
categories:
- Commentary
tags:
- Discord
- regulation
- censorship
cover: /post/Discord-Rock-and-Hard-Place/rock-hard-place.jpg
path: Discord-Rock-and-Hard-Place
---

Hello! Haven't posted in a while, but here I am. Get a load of my new site! Maybe I'll do a post explaining how I built it (it was not hard), but I'll leave you to browse [the repo](https://github.com/makinbacon21/blog-v2) for now.

Today I'd like to collect my thoughts on the new Discord situation (if you aren't familiar, details below), as I think some perspectives haven't yet been explored and a lot of the discorse has not been, well, *solution-oriented*. As per usual, opinions are my own and do not reflect those of my employer.

## Discord Age Verification

The big issue everyone is talking about today is [Discord's new approach to age verification](https://discord.com/press-releases/discord-launches-teen-by-default-settings-globally). They have announced that content marked NSFW/18+ will require users of all jurisdictions (previously something similar was used where legally required) to upload government ID to view. This doesn't seem great! Not necessarily about the NSFW content specifically, but about the *precedent*. Internet censorship and the required upload of government ID has become much more prevalent as of late. Marketed as being for the protection of children or as a counterterrorism effort, it is clear that governments and technology companies want to know what you are doing online to a greater extent, track this behavior, and control how people are allowed to speak, create, and interact. A lot of these points have been discussed by people who put a lot more effort into their posts, so I won't delve too deep into the government tracking bit. Instead, let's focus on Discord and their situation.

### Background

Discord, as previously mentioned, [implemented ID upload](https://discord.com/safety/adapting-discord-for-the-uk-online-safety-act) back in July to comply with restrictions in certain areas, similar to many other sites that enable unmoderated communication and include possibly 18+ content. The UK's [Online Safety Act](https://www.gov.uk/government/publications/online-safety-act-explainer/online-safety-act-explainer) has been a major motivator, along with some [newish US state laws](https://action.freespeechcoalition.com/age-verification-resources/state-avs-laws/). The blame for implementing this solution can be placed pretty squarely on the governments in these situations--if they say you must use an approved verification method to operate there, so it must be. The new development is its expansion this coming March to be universal rather than juridiction by jurisdiction.

Discord claims they will be using entirely local, on-device verification for facial scans in places where this is acceptable, and that they have a trusted third party for ID verification (following [a previous scandal](https://discord.com/press-releases/update-on-security-incident-involving-third-party-customer-service) where 70,000 IDs they stored for their in-house verification for the UK leaked via a third-party customer service company that had access). This reduces some of the security concern, especially with local verification, but of course Discord is a closed-source application and cannot be directly audited to ensure this is true. Presumably it would be clear from internet traffic, but you ever know. WhatsApp, for example, implements the open-source Signal protocol for end-to-end encryption (E2EE) but [still sends metadata](https://www.techradar.com/computing/cyber-security/whatsapp-encryption-isnt-the-problem-metadata-is) back to Meta (ironic). *Sidenote: please ignore the stupid VPN recommendation in that linked article. That is not how VPNs work.* Anyway, point being, if we don't know how it's being verified or if data is being collected, we don't know if there is a privacy concern as there was with their previous verification method.

### Reactions

Across the Web, people have been flipping out over this change--myself included. I am not happy about this! Invasions of your privacy and further encroachments on the independence of the World Wide Web are not good, and the privacy concerns make it worse. I simply do not want to (and will not) upload my ID or facial scan for an application that is neither government nor finance related. Some users have pitched leaving the platform, but for where? Matrix? Matrix is janky and much less convenient. Revolt? TeamSpeak? There are reasons no one uses the alternatives. They just aren't very good. Really, Discord is a hugely unprofitable endeavor--it's an unattractive business to be in, and decentralized solutions that make that part easier are much more janky in practice. Plus, communities are resistant to change, and getting everyone you know on Discord to somewhere else would be a Herculean effort. From what I've seen (admittedly anecdotal), the only thing that would really make people leave is if these checks expanded to fit *everything*, not just content marked as 18+ (plus, just for 18+ is at least somewhat justifiable). So let's look at that scenario, where Discord (or some government) decides this type of intervention is needed.

## Why Verify Age?

This is a general question, not just why Discord would want to. Why verify age? Why not just ask if 18+? Why go through these intrusive steps? A few reasons, it turns out.

The first is the obvious one: adult content. Protecting children from adult content has become somewhat of a talking point across media. Different people have different takes, and I'm not here to espouse one--just to point out that some such content can be very harmful to children (duh). It's been somewhat of an open secret that Discord is frequently used to share explicit images and more, hence the NSFW channel tag in the first place. The main counterpoint to requiring intensive verification for adult content is that parents should be responsible for how their kids interact with the internet. I generally agree with this! A responsible parent would likely not allow their children to use this type of platform (at least unsupervised or unbeknownst) until the child is old enough to understand what they might find online, how to avoid it, and why they may want to. An irresponsible parent doesn't care, and their iPad child may find and see whatever they have access to--so it may be valid to say the *parent* is at fault.

Let's ignore that point then, as there isn't much more to say on it, and regardless it is difficult to argue. Parents may or may not know better, kids can bypass restrictions, many kids are required to have devices for school now, etc., so it's hard to establish hard criteria. Let's move on to a point I find a bit more nuanced--grooming, child abduction, abuse, and the fantastic example of Roblox.

## The Rock and the Hard Place

The Rock in this scenario is a hard block on accessing a platform without comprehensive age verification, and the ensuing backlash. The Hard Place, on the other hand, is Roblox--doing *nothing* and allowing abuse to take place--which results in similar backlash. If you aren't familiar with the state of the Roblox platform and what goes on there, highly recommend checking out [Schlep](https://www.youtube.com/@RealSchlep) on YouTube, who works with others to out child predators on Roblox and bring them to justice. Similarly, everyone knows abuse happens on Discord. In fact, one of the main themes in videos like Schlep's is the predators getting victims to switch their conversation off of Roblox (where adult content and chats are moderated), often to Discord (where content is largely unmoderated). This almost makes Discord worse! You meet the predator on Roblox, sure, but then you are taken somewhere where there are no protections. Like a kidnapper finding a kid at the park, then luring them to some dark alley. Would you tell the parent they should have kept a closer eye on their child? Would you tell them they should have followed them down the slide, hovered 10 feet behind them? Probably not! And Roblox is a kids' game! And Discord, without verification, is an app you *don't even need to install*, and can suddenly access *everything*. YOU DO NOT NEED AN EMAIL! YOU DO NOT NEED AN ADMIN PASSWORD! This is the issue. And not one that is solved by only regulating pages marked as 18+.

### Devil's Advocate

If Discord does nothing, they are the problem for enabling abuse. Even their efforts to estimate age based on usage have been met with backlash, as this creates a detailed, account-linked server-side profile of you. That doesn't sound good! If they do too much, they are censoring the internet and invading privacy. I don't envy them. So what can be done? I did say this was solution-oriented, after all.

## Potential Solutions

I think Discord is jumping over tons of obvious intermediary steps and going directly to the extreme. Whether because of laziness (they already have these features for the UK), government request (maybe more jurisdictions are planning to require this), or flat-out stupidity, they seem to have overfit the model here.

Let's refresh ourselves on the issues we want to address:
- Unrestricted, frictionless, full platform access for children
- Adult content
- DM-based child predation
- Privacy concerns

The first thing that comes to mind is low-hanging fruit--add some friction to account creation. Why no email requirement? Not even some second factor for authentication? I propose requiring an email or phone number the way most other platforms do. I think this addresses the first issue quite well, as kids (with responsible parents) would likely need the same parental supervision they'd need to make a Roblox account. I also see no downsides--privacy-focused users can just gen a private inbox on some site or some other anonymized mail system.

Another possible solution would be an expansion of Discord's age profiling feature. An account that registers as 18+ but is suspected to not be could be asked to verify some other form of communication. It's not perfect, but again it's a method of adding friction. If they wanted to appease privacy-focused users, they could move the profiling to client-side, meaning your interactions would be kept track of by your machine. Gameable? Yes, but not easily.

A huge common-sense improvement they could take in my opinion would be to rework account creation to prompt for, but not obviously penalize for, age. As someone who was once a tween making accounts for things, what would most often stop me from putting my real age in was obvious blocking of content and obvious restrictions. Discord currently does not prompt for age *at all*. They could go for one of two approaches--either prompt for age on signup and don't make the restrictions obvious, or apply the restrictions by default and have a somewhat hidden button to activate the full set of features (here would be a great place for contact info verification too). I would think that most people, especially young people and those new to the platform, would just put their birthday in and not think twice about it. Restrictions could include blocking DMs from unknown users, conversation scanning (again, could be client-side) for potentially NSFW topics, and being able to see NSFW channels.

A great solution dating back to *my* childhood is parental account locking--when I would play Xbox Live games with my friends on my 360, I would be blocked from doing things like entering voice/video calls with random strangers via Microsoft's fantastic parental controls system. Discord has the "Family Center" but it seems super limited and poorly advertised, and again when a kid can just open a new browser tab and have a clean "adult" account in seconds, this is totally broken.

Note ALL of these are easier than government ID verification and facial scanning, and NONE of them are nearly as extreme.

## Conclusion

Perhaps companies and states looking to implement protections for children should speak to child psychologists, privacy experts, and other concerned groups before enacting these policies. Assuming their intentions are actually pure, that is--government and advertiser tracking manifests itself in many ways, and this could be one of them.

This has been somewhat rambly. The main takeways I'd like people to come away with:
- ID-based verification has privacy concerns and is highly invasive
- Closed-source programs and third-party services performing the verification can further these concerns
- Discord has skipped basic intermediary protections present on other platforms and jumped straight to an unnecessary extreme
- One might question if they have alternative motives for implementing these systems given they have almost no other protections

Thanks for reading!
