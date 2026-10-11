---
title: Replacing a hero's sound with your own
description: Swap any ability sound or voice line for your own MP3, with trimming and volume matching.
slug: door-stuck-sounds
order: 26
updated: 2026-10-11
---

# Replacing a hero's sound with your own

The experimental **Door Stuck** tab replaces any of a hero's sounds with an MP3 of yours and installs it as a normal mod. Turn it on in **Settings > Experimental Features > Door Stuck**.

The tab is called Door Stuck in the sidebar and **Foundry** at the top of the page. Same thing, mid-rename.

Swapping sounds is the one thing in the tab that makes something. The rest is browsing.

## Finding the sound

Door Stuck opens on a grid of heroes. Pick one, and you get four sections on the left. Two of them hold sounds:

- **Abilities** holds gameplay sounds, grouped as abilities, weapon, movement, melee, and other. Around thirty per hero. Ability groups show the real ability icon, and the ult is marked **ULT**.
- **Voice** holds spoken lines. Around sixteen hundred per hero.

Voice only shows the first 500 lines, so **search is how you find a line**, not scrolling.

**Browse full catalog** (on the hero grid) has a **Sound** tool with the same rows and the same **Swap** button, plus a hero picker.

## Doing the swap

1. Pick your hero, then open **Abilities** or **Voice**.
2. Click the play button on a row to **Audition** the original. Worth doing, since the names are not always obvious.
3. Click **Swap** on the row you want.
4. Drop in an MP3, or click to pick one.
5. Trim it with the start and end handles on the waveform. **Play selection** plays what you kept, and **Reset** goes back to the whole clip.
6. Optionally tick **Match the original volume** so your clip is as loud as the sound it replaces.
7. Name it, set looping if it matters (**Loop: auto**, **Loop: on**, or **Loop: off**), and click **Forge & install**.

The result is installed **and already turned on**, even though the message says to enable it on Installed. Find it on **Installed**, or under that hero's **Sounds** in the Locker. Remove it like any other mod.

## MP3 only

No WAV, no OGG, no FLAC. Convert first if you have something else.

## What "replaces all clips" costs you

Many Deadlock sounds are pools that pick randomly between several clips. That is what stops abilities sounding repetitive.

A swap replaces **every clip in the pool** with your one file. The swap panel tells you how many. That is usually what you want for an ability, but think twice for anything you hear constantly.

There is no way to replace just one clip of a pool, and no undo except removing the mod.

## The rest of the tab

Everything else in Door Stuck is look-only for now.

**Icons & Textures** (in a hero) and the catalog's **Library**, **Items**, and **Texture** tools browse the game's ability icons, item icons, hero images, hero model textures, and ability VFX textures. You can search, filter by hero, and click any of them to see it full size.

**None of them can be swapped, exported, or saved.** If you came to replace an icon or a texture, that does not exist yet.

**Appearance** (in a hero) and **Recolor** (in the catalog) are not really Door Stuck features. They are the Locker's Effects panel shown here too, sharing the same one-per-hero slot. See [recoloring abilities and painting skins](/docs/locker-effects).

## Rough edges

This tab is experimental in a stronger sense than most. Test your swap in game before you trust it, and keep your original MP3 in case you need to redo it.
