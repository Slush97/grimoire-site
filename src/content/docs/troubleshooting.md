---
title: Fixing mods that do not load
description: The first thing to try, what a Deadlock update breaks, crashes, and how to handle the other common failures.
slug: troubleshooting
order: 6
updated: 2026-10-11
---

# Fixing mods that do not load

Go to **Settings > Game setup** and click **Fix Configuration**. That fixes most cases. Then restart Deadlock fully.

When Grimoire spots the problem itself, it shows a banner at the top of the window with a **Fix now** button. That does the same repair, and also puts back your [performance config](/docs/performance-presets) if the same game update removed it.

## Why this is almost always the answer

Mods live in your addons folder, but the game only looks there because of lines Grimoire writes into `game/citadel/gameinfo.gi`. Installing a mod puts the file in place. It does nothing until `gameinfo.gi` says to load it.

Anything that rewrites or replaces that file breaks mod loading, while every mod still looks fine in Grimoire. **Fix Configuration** writes the lines back and leaves the rest of the file alone.

## After a Deadlock update

Game updates often overwrite `gameinfo.gi`. If mods vanished right after patch day, that is why. Run **Fix Configuration**.

A patch can also break a mod for real, especially a hero skin if Valve changed that hero's model. If **Fix Configuration** brings back every mod except one, that mod needs an update from its author.

If a new hero, ability, or stat is missing in game, look for an **outdated mods** button on **Installed**. Those mods ship an old copy of a game data file, which wipes out what Valve added since. Click the button, then **Disable all** until the authors update.

## After verifying game files in Steam

Same cause. Verifying puts back Valve's `gameinfo.gi`. Run **Fix Configuration** afterward.

## Deadlock crashes on launch

If the banner says Deadlock's config is missing paths the game needs to start, click **Fix now**. An older Grimoire could remove those paths.

If a mod is crashing the game, Grimoire can sometimes tell which one. When Deadlock's crash report names a file from one of your mods, that mod gets a **Possible crash cause** tag on **Installed**, and **Launch Modded** shows a warning icon. Click either to see the error, then disable that mod and restart Deadlock to check. It is a hint, not proof.

**Settings > Support > Deadlock crashes** lists every crash report Grimoire can find.

## Hero names or other translated art are missing

If the banner says an older Grimoire removed Deadlock's language paths, click **Fix now**.

## If gameinfo.gi is missing

**Settings > Game setup** says so, and lists similar files it found nearby (a `.bak`, or the `gameinfo.gi.grimoire-bak` copy Grimoire saves before its first edit). Click **Open Game Folder**, rename one of them back to `gameinfo.gi`, then run **Fix Configuration**.

If there is nothing to restore, or Grimoire says it couldn't repair the config: in Steam, right-click Deadlock > **Properties** > **Installed Files** > **Verify integrity of game files**, then run **Fix Configuration**.

## If you also use another mod manager

Two managers editing `gameinfo.gi` overwrite each other, and whichever ran last wins. **Fix Configuration** puts Grimoire's lines back.

Pick one manager per install instead of switching back and forth. To bring your mods over, see [installing mods](/docs/installing-mods).

## Only one mod is missing

Another mod may be winning the same files. Check **Conflicts**. See [when two mods conflict](/docs/conflicts).

## "GameBanana is rate-limiting Grimoire"

Too many requests in a short time, usually from queueing a lot of downloads at once. Wait a minute and retry. Nothing is broken and nothing is lost.

## Downloads are slow or keep failing

Go to **Settings > Maintenance > Download servers** and click **Test now**. Grimoire tests a few GameBanana servers from your PC and picks the fastest.

## Leftover files in the addons folder

**Settings > Maintenance > Cleanup Addons Folder** > **Cleanup** removes leftover archive downloads (`.zip`, `.7z`). It does not touch your mods.

## Something else

1. Go to **Settings > Support** and describe what happened under **Share a bug report**.
2. If the game crashed, tick up to 10 crashes under **Deadlock crashes** to include them.
3. Click **Generate report**, then **Copy report**.
4. Post it on [GitHub](https://github.com/Slush97/grimoire/issues) or in [Discord](https://discord.gg/KgYGHEMq2P).
