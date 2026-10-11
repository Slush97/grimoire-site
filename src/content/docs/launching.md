---
title: Launching modded or vanilla
description: Start Deadlock with your mods on, start a session without them, or test one mod by itself.
slug: launching
order: 5
updated: 2026-10-11
---

# Launching modded or vanilla

Use the buttons at the bottom of the sidebar. **Launch Modded** starts Deadlock with your enabled mods. **Launch Vanilla** starts it with your mods off for that session, without uninstalling anything.

Both go through Steam. If Steam is closed, it opens first.

If the buttons are greyed out and say to configure your Deadlock path, go to [first-time setup](/docs/first-run).

Want one button instead of two? Turn on **Settings > Appearance > Combine launch buttons**. See [customizing how Grimoire looks](/docs/appearance).

## Launch Modded

If **Shuffle on launch** is on in the Locker, your shuffled skins re-roll first. See [managing skins in the Locker](/docs/locker-skins).

If Grimoire thinks a mod caused your last crash, **Launch Modded** shows a warning icon. Click it for details. See [fixing mods that do not load](/docs/troubleshooting).

## Launch Vanilla

Vanilla is for one session without mods: a scrim, a bug you want to confirm is not a mod, or a clean look at something.

What happens:

1. Grimoire moves your enabled mods (Global ones too) out of the game folders and holds them.
2. Deadlock launches.
3. About 10 seconds after the game is up, Grimoire moves them back.

Your mods, your load order, and your profiles stay as they were. Nothing is uninstalled and nothing is renumbered.

The game only reads mods when it starts, so the session stays vanilla until you quit, even after the mods are back.

**Locker overrides stay on.** Hero cards, ability sounds, ability colors, trippy skins, and a cursor you picked in the Locker are not in your mod list, so vanilla leaves them alone. If you need a fully stock game, remove them first. See [reviewing and removing Locker overrides](/docs/locker-overrides).

## If a vanilla session gets stuck

While mods are held, the sidebar shows **Vanilla: N stashed** with a **Restore** button, and **Launch Vanilla** is greyed out.

- Click **Restore** to put them back now.
- Or click **Launch Modded**. It restores them first, then launches.
- If Grimoire closed or crashed mid-session, it restores them the next time it opens.
- If the game never starts, Grimoire restores them after a minute anyway.

If a restore fails, Deadlock is probably still holding the files. Close the game, then click **Restore**.

## Testing one mod by itself

Right-click a mod on **Installed** and choose **Start with only this enabled**. Grimoire turns off every other mod and launches the game.

A banner on **Installed** shows which mod you are testing. Click **Restore mods** to turn the others back on.

## Stop Game

While Deadlock runs, the launch buttons turn into **Stop Game**. It closes the game, and forces it if the game does not respond. If a vanilla session was active, it also puts your mods back.

## Mods are enabled, but the game is unmodded

That is almost always `gameinfo.gi`, not launching. See [fixing mods that do not load](/docs/troubleshooting).
