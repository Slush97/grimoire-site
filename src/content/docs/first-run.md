---
title: Setting up Grimoire for the first time
description: Point Grimoire at your Deadlock install and let it configure the game so mods will load.
slug: first-run
order: 1
updated: 2026-10-11
---

# Setting up Grimoire for the first time

Open Grimoire and work through the three steps on the welcome screen. It finds Deadlock on its own in most cases, so usually the only thing you do is click **Fix**.

Grimoire needs Deadlock installed through Steam.

## Step 1: Deadlock Location

Grimoire checks every Steam library that Steam knows about and shows **Detected** with the path. A library on a second drive is fine.

If it shows **Not Found**, click **Browse** and pick the Deadlock folder yourself. You want the folder that contains a `game` folder, usually:

- Windows: `C:\Program Files (x86)\Steam\steamapps\common\Deadlock`
- Linux: `~/.steam/steam/steamapps/common/Deadlock`
- Linux with Flatpak Steam: `~/.var/app/com.valvesoftware.Steam/.steam/steam/steamapps/common/Deadlock`
- Mac: Deadlock has no Mac version, so it has to live in a CrossOver bottle. Grimoire looks inside your CrossOver bottles, for example `~/Library/Application Support/CrossOver/Bottles/<bottle>/drive_c/Program Files (x86)/Steam/steamapps/common/Deadlock`

Auto-detect also says **Not Found** when `game/citadel/gameinfo.gi` is missing. See Step 2.

## Step 2: Game Files

This checks `gameinfo.gi`, the file that decides whether Deadlock loads mods at all.

If it says **Needs Setup**, click **Fix**. It turns to **Ready**. Skip this and mods install fine but do nothing in game.

If the file is gone entirely, **Fix** cannot help. In Steam, right-click Deadlock > **Properties** > **Installed Files** > **Verify integrity of game files**, then try again.

## Step 3: Autoexec

This one is optional. `autoexec.cfg` holds console commands that run when the game starts, and the Crosshair and Autoexec tabs write to it.

Click **Create** if you want it, or ignore it. If you already have one, it shows **Found** and Grimoire keeps your settings.

Click **Get Started**. It unlocks once steps 1 and 2 are done. Grimoire opens **Browse** and starts downloading the GameBanana mod list in the background. **Skip for now** closes the screen without finishing.

## Coming from another mod manager

Open **Installed** and use **Import from other mod managers** (once you have mods, it is the two-arrow button in the toolbar). It brings over mods, profiles and crosshairs from Deadlock Mod Manager, or from another manager's export file.

## Changing any of this later

Everything above lives in **Settings > Game setup**. You can click **Auto-detect**, pick a different folder, or click **Fix Configuration** at any time.

If a game update breaks mod loading, Grimoire usually shows a banner at the top of the window. Click **Fix now**. If there is no banner, go to **Settings > Game setup** and click **Fix Configuration**. See [fixing mods that do not load](/docs/troubleshooting).

To see the welcome screen again, use **Settings > Maintenance > Reset Setup Wizard**. It shows on the next launch, and your mods and settings stay as they are.

## What Grimoire writes to your disk

All inside your Deadlock folder:

- Mods go in `game/citadel/addons` as numbered `pak01_dir.vpk` files. Disabled mods move to `addons/.disabled` instead of being deleted. Past 99 enabled mods, Grimoire adds `addons1`, `addons2` and so on. See [load order](/docs/load-order).
- `game/citadel/grimoire` holds Locker overrides and any mod you mark Global. See [Global mods](/docs/locker-global).
- `game/citadel/gameinfo.gi` gets Grimoire's folders added to its search paths. Lines from Valve and other tools stay. Before its first edit, Grimoire saves a copy as `gameinfo.gi.grimoire-bak`.
- Each mod folder gets a `replays` link pointing at `game/citadel/replays`, so downloaded replays still play.
- `game/citadel/cfg/autoexec.cfg`, only if you asked for it.

Grimoire doesn't collect usage data. [What leaves your machine](/docs/privacy) lists every request it makes.
