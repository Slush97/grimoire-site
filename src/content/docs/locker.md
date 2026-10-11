---
title: What the Locker is
description: The Locker sorts your cosmetics by hero, and applies a second kind of cosmetic that sits outside your mod list entirely.
slug: locker
order: 7
updated: 2026-10-11
---

# What the Locker is

The Locker is your installed cosmetics, sorted by hero instead of by install date. It also applies a second kind of cosmetic, the Locker override, that does not live in your mod list at all.

That split explains most of how the Locker behaves.

## Two kinds of thing in one tab

**Skins are ordinary mods.** A skin in the Locker is the same file you see on **Installed**, filed under the hero it changes. Turning it on here turns it on there. It takes a load-order slot, it can conflict with other mods, and it counts toward your mod limit.

**Cards, ability sounds, ability colors, and trippy skins are Locker overrides.** You did not install these as mods. Grimoire builds them for you and keeps them in a separate place. They take no load-order slot, they do not count toward your mod limit, and they always win.

## How overrides work

Grimoire keeps a folder called `grimoire` next to your addons folder, and lists it **first** in the game's search paths. Each override type gets one file at the front of that folder.

What you will notice:

- **They always win.** Being first in the search order means an override beats every mod, whatever your load order says. If you applied a hero card and a skin also ships card art, you get the Locker one.
- **They are free.** They sit outside your mod slots, so applying a card to every hero costs nothing from your mod limit.
- **Launch Vanilla leaves them on.** Vanilla stashes your mods, not your overrides. For a fully clean game, remove the overrides first.

Overrides need the game's `gameinfo.gi` set up. Grimoire does that for you the first time you apply one. If it cannot, you get an error, and **Settings > Game Configuration > Fix Configuration** is the fix. See [first-time setup](/docs/first-run).

## Global mods

**Global** is a setting for ordinary mods, not an override. A Global mod moves into that same `grimoire` folder, behind the override files. It beats every normal mod on any file they share, but a Locker override still beats it. **Shuffle on launch** never turns it off. It is still a mod you can turn off or delete as usual, and you can have up to 95.

Use **Make Global** in a mod's menu on **Installed**, or the **Global** tab under **General** in the Locker. **Remove from Global** puts it back with your other mods.

## Restart to see changes

Mods mount when the game starts. Nothing you apply in the Locker shows up in a running game. It takes effect the next time you **Launch Modded**.

## Finding your way around

The main Locker page is a grid of heroes. **Gallery** shows portraits. **List** is denser, and opens a hero's skins in place.

- **Hide empty** drops heroes with no skins or sounds. Click it again (**Show all**) to undo.
- The star favorites a hero. Favorites sort first and never get hidden.
- In **Gallery**, icons on a hero show what they have (skin, sound, card, effects). Filled is on in game, outline is installed but off.

Two piles sit outside the hero list:

- **General** holds cosmetics not tied to a hero: soul containers, spirit urns, HUDs, icon packs, cursors, and more. It also has the **Global** tab and any categories you make. Older versions called it Global. See [General cosmetics](/docs/locker-global).
- **Unassigned** holds mods Grimoire could not match to a hero. It only shows in **List** view. Pick a hero from **Tag as hero...** to file one. You can also tag from **Installed**: select mods, then **Tag**.

## Inside a hero

Clicking a hero opens four sections:

| Section | What it holds |
|---|---|
| **Skins** | Your installed skin mods for this hero. See [skins](/docs/locker-skins) |
| **Sounds** | Your tagged sound mods, grouped by ability. Greyed out until you tag one. See [ability sounds](/docs/locker-sounds) |
| **Cards** | Card art, from your mods or your own images. See [hero cards](/docs/locker-cards) |
| **Effects** | Ability colors, and trippy paint for the body and gun. See [ability effects](/docs/locker-effects) |

Sounds, Cards, and Effects are labelled **Experimental** in the app. There is no switch to turn them on. They work, but expect rough edges.

## Undoing all of it

The **Locker overrides** button on **Installed** lists every applied card, sound, color, and trippy skin across all heroes, and removes them one at a time or a tab at a time. See [reviewing and removing overrides](/docs/locker-overrides).
