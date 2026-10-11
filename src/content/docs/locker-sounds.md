---
title: Per-ability sounds
description: Pick one sound mod per ability, then tune its volume and pitch, without the mods fighting each other.
slug: locker-sounds
order: 10
updated: 2026-10-11
---

# Per-ability sounds

Open a hero in the **Locker**, click **Sounds**, and pick one sound mod for each ability. Only your pick plays for that ability. The panel is labelled **Experimental** in the app.

## Getting sound mods in here

**Sounds** is greyed out until the hero has at least one sound mod. Grimoire matches most sound mods to a hero by itself. When it can't, tag the mod yourself:

1. On **Installed**, click **Select multiple mods** and pick the sound mods.
2. Click **Tag**, then pick the hero under **Hero**.

For a single mod, open its menu and use **Set Locker tag** instead. Sound mods with no hero also show under **Unassigned** on the Locker page in **List** view, where **Tag as hero...** files them.

Only mods from GameBanana's **Sounds** section (and your own [Door Stuck swaps](/docs/door-stuck-sounds)) show up here. A sound mod you imported from your own files lands under the hero's **Skins** instead, even after you tag it.

## Picking a sound per ability

Each ability gets its own box: abilities 1 to 3, then the ult (marked **Ult**). Inside are the sound mods that change that ability.

1. Click the mod you want. It says **Use** until you pick it, then **Applied**.
2. To go back to the default sound, click the applied one again.

A mod that changes more than one ability shows an **also** tag with the others (for example "also a1, a3"). If the mod page has a sound preview, you can play it right there.

The source mod can be turned off. Grimoire copies the sound when you pick it. Do not delete the source mod, though: the next time you change any pick, picks whose source mod is gone get dropped.

## Volume and pitch

Once you pick a source, two sliders appear under it:

- **Volume**, from -12 to +12 dB.
- **Pitch**, from 0.5x to 2x.

They change the sound's own settings in the game files, not a filter on top. Changes save by themselves a moment after you stop dragging. **Reset** puts both back.

## Other sounds

Voice lines and sounds not tied to one ability go under **Other sounds**. They can't be split per ability, so each one turns the whole mod **On** or **Off**, like any other mod.

## Why picks beat your load order

Sound mods often overlap. If two enabled mods both change the ult, your load order decides which one you hear.

A pick here copies just that ability's sound into a Locker file that loads before every mod. So you can take the ult from one mod and an ability from another, and you get exactly what you picked. See [what the Locker is](/docs/locker).

## Restart to hear it

Sounds load when the game starts. Your picks play the next time you **Launch Modded**. If Deadlock is already open, restart it.

## Removing them

Click the applied source again to undo one ability.

To see every pick across every hero, open **Installed**, click the **Locker overrides** button, and go to **Ability Sounds**. You can remove picks one at a time or all at once there, and tune volume and pitch too. See [reviewing and removing overrides](/docs/locker-overrides).
