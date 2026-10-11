---
title: Load order and the mod limit
description: Lower numbers win. How to reorder mods, make one always win, merge and delete them, and what happens past 99.
slug: load-order
order: 3
updated: 2026-10-11
---

# Load order and the mod limit

**Lower numbers load first and win.** When two enabled mods change the same game file, the one higher up the **Enabled** list on **Installed** is the one you see in game.

## Reordering

1. On **Installed**, set the sort to **Load order** and clear the search box and filters. Dragging is off otherwise, because the list is not in load order.
2. Drag an enabled mod to a new spot. Or click its load-order number and type a new one.

Only enabled mods have a load order. When you turn a mod back on, it goes back to its old slot if that slot is still free.

You can drag disabled mods too, and pinned ones stay on top, but that only tidies the list. It does nothing in game.

If your numbers look messy after a lot of adding and removing, click **Fix order** (the wrench button in the toolbar). It renumbers your enabled mods 1, 2, 3 and up without changing their order.

## When order matters

Most of the time it does not, because most mods touch different files. It matters when two mods overlap, which is what the **Conflicts** tab shows. You can pick the winner right from there. See [when two mods conflict](/docs/conflicts).

## Making one mod always win

Right-click a mod on **Installed** and choose **Make Global**.

A Global mod loads before every other mod, so it wins every overlap no matter where the rest sit. Shuffling skins never turns it off. It shows a **Global** badge instead of a number, and reordering does not move it.

You can have up to 95 Global mods. To undo it, choose **Remove from Global**.

Only Locker overrides (hero cards, ability sounds, ability colors, trippy skins) beat a Global mod. See [what the Locker is](/docs/locker).

## How many mods you can have

Up to 990 enabled at once. Disabled mods do not count.

Each addon folder holds 99 mods. Past that, Grimoire spills into extra folders (`addons1`, `addons2`, and so on, up to `addons9`) and adds each one to the game's config. You do not have to do anything.

The numbers on **Installed** run straight through every folder, so the rule still holds: higher up the list wins.

## Merging mods together

Select two or more mods on **Installed**, then click **Merge** in the selection bar. Grimoire combines them into one VPK.

Worth doing when you have many small mods you always run together.

Before you do:

- **Strict mode** stops the merge if two of the sources touch the same file. With it off, the higher-priority mod wins and the merge goes through.
- The originals stay in your disabled folder, so you can **Unmerge** later.
- Local mods (imported from disk, not GameBanana) merge fine, but they are not in the share code. If you delete their disabled originals, unmerging cannot bring them back.
- When a source gets an update on GameBanana, the merged card says how many sources are outdated. Open the merged mod and click **Update 1 source** (the number matches yours). Grimoire downloads the new files and rebuilds the merge.

## Selecting and deleting

To work on many mods at once, click **Select multiple mods** (the checkbox button in the toolbar), or Shift-click a mod card. Shift-click another card to select everything in between. The selection bar can **Enable**, **Disable**, **Merge**, or **Delete** them.

To delete one mod, right-click it and choose **Delete**. A merged mod has no **Delete**: use **Unmerge**.

Deleting removes the file and cannot be undone. If you only want a mod out of the way, disable it instead.
