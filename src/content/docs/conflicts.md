---
title: When two mods conflict
description: What a conflict means, when it matters, and how to pick a winner, turn a mod off, or ignore it.
slug: conflicts
order: 4
updated: 2026-10-11
---

# When two mods conflict

A conflict means two enabled mods change the same game file. For that file, the mod that loads first wins. Open **Conflicts** in the sidebar, then either pick a winner under **Wins shared files** or click **Ignore** if the game already looks right.

A conflict is not an error. The game still starts, and both mods still load. Everything else from both mods still shows up in game. **How conflicts work** at the top of the page shows a quick picture of this.

## When it matters

**It matters** when both mods replace the same model, like two skins for one hero. Only the winner shows up, and the other most likely does not load at all.

**It usually does not matter** when the mods share a few files and are otherwise unrelated.

If the game looks right, leave it alone or ignore it.

## Picking a winner

Under each conflict card there is a button for each mod. The current winner has a crown.

1. Click the mod you want to win.
2. Grimoire moves it to load right before the other one.

The pair stays listed, because both mods still touch the same files. The right one wins now. To reorder by hand instead, see [load order and the mod limit](/docs/load-order).

If the card says **Both use pak05** (or another number), the two mods share one load-order slot and the buttons read **Resolve by load order**. Click either one to split them. The conflict goes away.

If either mod is **Global**, these buttons cannot change the winner. A Global mod always beats a normal one. To let the normal mod win, right-click the Global one on **Installed** and choose **Remove from Global**.

## Turning one off

Click **Disable** on the mod you care less about (on its thumbnail in grid view, or the red X in list view). It moves to your disabled mods. Turn it back on from **Installed** any time.

## Ignoring

Ignoring only hides the report. It changes nothing about how the game loads your mods.

- **Ignore** on a card hides that pair.
- **Shared files** opens the list of files the pair shares. **Ignore** on a row hides just that file for this pair. Right-click a row for **Ignore in all mods**, which stops that file from ever counting.
- Right-click a mod's thumbnail and choose **Ignore this mod everywhere** to hide every conflict that mod is part of.
- **Ignore all** at the top hides every active pair at once. It is hidden while you search.

Everything you ignore is listed at the bottom of the page under **Ignored**, **Ignored files**, **Ignored in all mods**, and **Ignored mods**. Click **Unignore** (or **Restore all** for a pair's files) to bring it back. **Clear ignored** restores every ignored pair.

To hide every conflict, turn on **Settings > Preferences > Ignore conflicts by default**. While it is on, the page says there are no conflicts even when there are.

## Finding one conflict

Type in the search box at the top. It matches mod names and shared file paths. When a file path matches, that card's file list opens for you.

## If a conflict looks wrong

Grimoire skips files that nearly every mod carries and that change nothing in game: readmes, license and credits files, mod info files, the engine's default fallback textures, and the panorama image compiler file. Locker overrides never show up here either.

If you still see a conflict you do not believe, open **Shared files** and look at the paths. If they are files no mod should ship, [report it](https://github.com/Slush97/grimoire/issues).
