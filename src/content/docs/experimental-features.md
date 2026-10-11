---
title: Experimental features
description: The eight optional features behind switches in Settings, what each one unlocks, and which are worth turning on.
slug: experimental-features
order: 22
updated: 2026-10-11
---

# Experimental features

If you read about a feature and cannot find it, it is probably switched off in **Settings > Experimental Features**. All eight switches there are off by default.

Experimental means still in development and maybe rough. None of these will damage your install, and you can turn each one back off.

## What each switch unlocks

| Switch | What you get |
|---|---|
| **Stats Dashboard** | A **Stats** tab with ranked score, match history, and hero performance. See [player stats](/docs/stats) |
| **Crosshair Designer** | A **Crosshair** tab for building custom crosshairs. See [designing a crosshair](/docs/crosshair) |
| **Grimoire Social** | A **Discover** tab for publishing profiles and importing other players' profiles, plus a **Grimoire Social** page in Settings for your Steam sign-in. See [Discover](/docs/discover) |
| **Fix Unknown Mods** | Adds automatic matching to **Fix unknown** on Installed: it compares unknown local VPKs byte for byte against GameBanana to recover names and thumbnails. The manual search there works without it |
| **Imprint installed mods** | Gives each newly installed mod a small identity mark so an orphaned file can be recognized later, plus an **Imprint installed mods** button on Installed for the mods you already have |
| **Mod safety** | Checks mods for scripts and asks before enabling one that has them. Imported mods stay disabled until you review them. Adds a **Mod safety** page in Settings |
| **Deadworks Servers** | A **Servers** tab for browsing and joining community servers. See [Deadworks community servers](/docs/servers) |
| **Door Stuck** | A tab for browsing the game's own files, swapping hero sounds, and recoloring abilities. See [replacing a hero's sound](/docs/door-stuck-sounds) |

A new tab shows up in the sidebar as soon as you flip its switch.

**Performance presets are no longer here.** They shipped for everyone and live in **Settings > Performance**. See [performance presets](/docs/performance-presets).

## Which to turn on

**Safe and useful.** Crosshair Designer is solid and does something most players want.

**Useful, but they go online.** Stats, Grimoire Social, and Deadworks Servers all talk to outside services, which is why they stay off until you ask. Each page says exactly what gets sent.

**Situational.** Fix Unknown Mods helps if you have a pile of mystery VPKs from another manager. Try the manual search in **Fix unknown** first (the app recommends it). Auto matching checks GameBanana for every unknown mod, so a big library can hit rate limits. Turn it off again when you are done.

Imprint installed mods only matters if you move VPK files between PCs or might lose your Grimoire data.

Mod safety is for people who install script mods (HUD and menu mods) from authors they do not know. It was built against a hole Valve has since closed, which is why it is off by default.

**Rough.** Door Stuck is mostly an asset browser. Two parts change your game: swapping a hero's sound, and **Recolor** (the same tool as the Locker's [Effects](/docs/locker-effects) panel).

## Labeled Experimental, no switch

Some features are on for everyone and only carry an **Experimental** label in the app. Do not look for a switch:

- In the Locker: the **Hero Card**, **Sounds by Ability**, and **Effects** sections
- In **Settings > Performance**: presets marked **Experimental**

## Door Stuck naming

The switch and the tab say **Door Stuck**, but the page itself is titled **Foundry**. They are the same thing. The switch has no description in the app.

## Developer Mode

Below the feature switches. It points Grimoire at a dummy folder instead of your real Deadlock install, for testing without game files.

**You almost certainly do not want this.** It replaces your real game path, so everything looks broken while it is on. If Grimoire has stopped seeing your game, check whether this got switched on.
