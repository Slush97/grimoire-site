---
title: Hero cards
description: Apply card art from an installed mod, or build your own from your images, one portrait variant at a time.
slug: locker-cards
order: 9
updated: 2026-10-11
---

# Hero cards

Open a hero, go to **Cards** (labelled **Experimental**), and click a card to swap that hero's card art: the portraits the game shows in menus and the HUD. Click the applied card again to go back to the default.

There is no setting to turn this on. It works, but expect rough edges.

## Applying card art from a mod

Grimoire scans your installed mods for card art and shows what it finds for this hero. The mod does not need to be on, and it does not need to be a card mod. If a skin happens to ship portraits, they show up here. The scan can take a moment (**Decoding portraits...**).

Each box is one mod file, labelled with its file name, with its portraits side by side (**Card**, **Vertical**, **Low HP**, **Gloat**, and so on). **A card is applied as a full set**: clicking a box applies all of its portraits together. That keeps the hero looking consistent instead of mixing art from three sources. The applied box says **Applied**.

Each hero gets one card. Applying a new one replaces the old one, including a custom card you built.

If it says "No card art found in your installed mods", none of your mods carry art for this hero. You can still build your own.

## Building your own

**Upload your own** lets you supply the images yourself.

1. Click a slot. Each slot is one portrait variant, at a fixed size (shown under it).
2. Choose a PNG, JPG, or WebP.
3. Crop it. The frame is locked to that variant's shape so the result is never stretched. Drag to move, scroll or use the slider to zoom.
4. Click **Use crop**.
5. Repeat for any other slots you want to change.
6. Click **Apply custom card**.

**You only have to fill the slots you care about.** Any slot you leave empty stays at the game default, so changing one portrait does not mean finding six images. The X on a filled slot clears it.

If your image is smaller than the slot, Grimoire warns that it will be upscaled and may look soft. It still works, it just will not be crisp.

After you apply, the button says **Applied** until you change a slot, then **Update custom card**. **Revert** takes your custom card off. An applied custom card's images come back when you reopen the hero, so you can edit it later.

## Exporting instead of applying

**Export VPK** saves your custom card as a standalone `.vpk` file instead of applying it, then shows the file in your file browser. Use this to share a card with someone or keep a copy outside Grimoire. It needs at least one filled slot.

Exporting does not apply it. If you want both, apply it and export it.

## What applying actually does

Applied cards go into the Locker's own override file, not into your mod list.

They cost nothing from your mod limit, and they beat any mod that ships competing card art regardless of your load order. See [what the Locker is](/docs/locker) for the mechanism.

Restart Deadlock to see the change. Applied cards mount the next time you **Launch Modded**.

To remove a card later, click the applied card again, or use the **Locker overrides** button on **Installed**, which lists every applied card in one place. See [reviewing and removing overrides](/docs/locker-overrides).
