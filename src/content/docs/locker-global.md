---
title: General cosmetics and Global mods
description: Soul containers, spirit urns, HUDs, cursors, and other cosmetics that are not tied to a hero, plus Global mods that always win.
slug: locker-global
order: 12
updated: 2026-10-11
---

# General cosmetics and Global mods

**General** holds cosmetics that do not belong to one hero. It is the first card on the main **Locker** page, before the heroes. Click it, then pick a tab on the left. Click any card to turn that mod on or off.

Tabs with something in them are listed first.

## The tabs

Grimoire files most mods into a tab by looking at which game files they change:

| Tab | What it changes |
|---|---|
| **Soul Containers** | The soul orb |
| **Spirit Urns** | The carryable Idol (the urn) |
| **Hideout** | The hideout space |
| **Icon Packs** | Hero icons and portraits, for several heroes at once |
| **HUD** | The in-game interface |
| **Announcer / SFX** | Announcer lines and general sound effects |
| **Killstreak Music** | Killstreak tracks |

Two more tabs sit with them, **Cursors** and **Global**. Categories you made yourself come last, below a divider. Each has a section below.

Killstreak Music is picked from the mod's GameBanana category, not its files. Cards with a sound preview have a player so you can listen first.

## Moving a mod to another tab

1. Hover the card and click its three-dot menu (**Change category**).
2. Under **Move to General tab**, pick the right tab.

**Remove from General** takes the mod out of General entirely. Killstreak Music cards have no menu.

You can also file mods from **Installed**: select them, click **Tag**, and pick a tab under **General**.

The trash button on a card deletes the mod, after you confirm.

## Soul containers and spirit urns

Each replaces one prop model, so only one of each can load. Their cards show live 3D models, and they are **single-select**: turning one on turns off the others of the same type. The one in use is marked **Active**. Click it again to go back to the default.

A soul container and an urn can both be on at once.

## Building one from your own 3D model

Turn any `.glb` file into a soul container or spirit urn. Open the **Soul Containers** or **Spirit Urns** tab and click **Import Soul Container (GLB)** or **Import Spirit Urn (GLB)**.

1. Drop in a `.glb`, or click to browse.
2. Stand it upright with **Y-up**, **Z-up**, **Flip Y**, or **Auto**. If none of those work, rotate each axis by hand.
3. Check the size. A soul container is sized for you; tick **Hero scale** to see it at a hero's back hip, where it sits in game. For an urn, set **Size** (Source units, default 28).
4. Name it. Notes and **Mark as NSFW** are optional.
5. Click **Build & Import**.

Grimoire builds a normal local mod and turns it on. If one of the same type is already on, the bottom of the dialog lets you pick **Disable the current one** (the default) or **Keep both enabled** first.

**Export .vpk** builds the file and saves it to disk instead of installing it. Over 50,000 triangles, Grimoire warns you but still builds.

For the full walkthrough, see the [Sketchfab tutorial](/docs/locker-glb-tutorial).

## Cursors

The **Cursors** tab swaps the game's mouse pointer. Cursor mods are loose image files written into the game's cursor folder, so they take no load-order slot and only one set is active.

- **Get one:** click **Find cursors in Browse** and download one. It shows up here, and turns on right away only if **Settings > Preferences > Enable mods after download** is on.
- **Import your own:** click **Import** and pick a `.zip`, `.7z`, or `.rar`, or the `.bmp` files themselves. Imports turn on right away.
- **Switch:** click a card. **Default** puts Deadlock's own cursors back.

Restart Deadlock if it is open. **Launch Vanilla** keeps your custom cursor, so pick **Default** if you want the stock one. If a game update restores the stock cursors, Grimoire puts yours back the next time it starts or you **Launch Modded**.

## Global: mods that always win

A **Global** mod loads before every other mod, so it wins whenever two mods change the same file, whatever your load order says. **Shuffle on launch** never turns it off. Use it for the one mod you want on top of every skin.

1. Open the **Global** tab and click **Add mods**.
2. Tick the mods and click **Add to Global**.

Or, on **Installed**, open a mod's menu and click **Make Global**. **Remove from Global** (same menu, or the card menu on the Global tab) undoes it.

- Global is about which mod wins, not what kind it is. A Global skin still shows under its hero.
- Locker overrides (cards, sounds, colors) still beat Global mods.
- Global holds up to 95 mods.
- Close Deadlock before moving an enabled mod in or out of Global.

## Your own categories

Categories are your own piles, for finding mods faster. They never turn a mod on or off, move it, or change its load order.

- **Make one:** click **New category** under the tabs, or **New category...** in a card's menu.
- **Fill it:** open it and click **Add mods**, or tick it under **Categories** in any card's menu.
- **Rename or delete:** click **Manage**. Deleting a category never deletes its mods.

Categories are saved on this PC only. Profiles and share codes do not include them.

## Shuffle

**Shuffle on launch** (on the main Locker page) works here too. Add mods to the pool with the shuffle button on each card, and every launch picks one per tab. On your own categories, **Shuffle all** pools the whole category at once, but each mod still shuffles inside its own tab or hero. See [managing skins](/docs/locker-skins).

## These are ordinary mods

Apart from cursors, everything here is a normal mod, not a Locker override. It shows on **Installed**, takes a load-order slot (Global mods get their own folder, ahead of the rest), and can conflict with other mods. See [load order and the mod limit](/docs/load-order).
