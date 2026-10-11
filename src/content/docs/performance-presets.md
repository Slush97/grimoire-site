---
title: Performance presets
description: Apply a community fps config to Deadlock without breaking your mods, and remove it cleanly when you want.
slug: performance-presets
order: 21
updated: 2026-10-11
---

# Performance presets

Open **Settings > Performance**, pick a config, and flip the switch at the top of the card to **On**. Then restart Deadlock. **Your mods keep working**, and you can turn it off at any time.

These are community-made configs that raise your frame rate by trimming graphics settings the game does not need.

## Turning one on

1. Go to **Settings > Performance**.
2. Click the config you want. **Balanced** is marked **Recommended**, so start there.
3. Flip the switch in the card's top right to **On**.
4. Restart Deadlock.

While it is on, clicking another config switches right away, and a message pops up with **Undo** in case you misclicked. Switching takes the old config out first, so you never end up with two stacked on top of each other.

While it is off, clicking a config only remembers your pick.

## The seven configs

| Card | Author | What you are trading |
|---|---|---|
| **Balanced** | Sqooky | A solid all-round gain that keeps the game looking close to normal. Start here |
| **Light** | Eskay | Close to Balanced, but keeps the full draw distance so buildings and players do not pop in |
| **Competitive** | dacooder | Tuned for ranked: strips visual noise while keeping the game readable |
| **Aggressive** | boot | Noticeable visual quality for a large frame-rate gain |
| **Maximum** | dacooder | Pushes settings as far as they go. The game will look distinctly worse |
| **Potato** | kaizuchanerus | For very low-end machines. Expect the game to look rough |
| **Preview** | Sqooky | The author's work in progress, badged **Experimental**. Newer changes, less testing |

If Balanced is not enough, work down the list.

They come from two community projects, Sqooky's OptimizationLock and dacooder's OptiLock. Open **Advanced** on the card for the credit and a **Source** link to the exact version applied.

## Why your mods keep working

Community fps configs are usually distributed as a whole replacement `gameinfo.gi`, and dropping one in wipes the section that tells the game where your mods are. That is the classic way to lose every mod at once.

Grimoire does not replace the file. It edits only the settings the config changes, and it **never touches the section that loads your mods**. Every line it changes is marked, so turning it off can put the original values back exactly.

It also writes a one-time backup of your `gameinfo.gi` the first time you apply.

## Gameplay settings are on by default

Some authors also change things that affect what you can see or how the camera is framed, not how fast the game runs: enemy outlines, glows, field of view, and so on.

**The author's visibility and camera settings are included by default.** Open **Advanced** and look under **Gameplay settings from the author** to turn off any you do not want. While the config is on, each change is written right away. **Developer and testing tools stay off** unless you turn them on.

## Video settings

Some configs (right now **Competitive**, **Maximum**, and **Preview**) also need certain in-game video settings to look right, and Grimoire sets those too. Your resolution, display mode, and frame cap are never touched. **Advanced** says how many it sets.

- **You changed one in game since?** **Advanced** says how many and offers **Put them back**.
- **Never launched Deadlock?** There is no video file yet. The card tells you to launch the game once and come back, then **Add video settings** finishes the job.

Turning the config off puts back the video settings Grimoire changed, except ones you have changed yourself since.

## Versions and updates

**Always use the newest version**, under **Advanced**, is on by default. It has Grimoire ask the config author's GitHub for a newer release when you open this page or apply. Offline, it uses the version bundled with Grimoire. When a newer one is out, the card says so and offers **Update**.

To stay on an older one, pick it from **Version**. **See every published version** lists the author's whole history and downloads the one you pick.

## After a game update

Deadlock updates overwrite `gameinfo.gi`, which removes the config and also stops your mods loading.

Grimoire notices. The banner at the top of the app offers **Fix now**, which gets your mods loading again and puts the config back in one go. Or open **Settings > Performance** and click **Restore**. Your hand edits come back too. Then restart the game.

If you took the config out of the file yourself, the card says it is no longer in `gameinfo.gi` and offers **Restore** or **Dismiss**.

If `gameinfo.gi` is empty or damaged and Grimoire still has its backup, the card offers **Restore backup**. With no backup, verify the game files in Steam instead.

## Turning it off

Flip the switch to **Off**. Grimoire takes the config out and restores your original values.

It also forgets any hand edits you made to the file (see below). Your pick of config, version, and gameplay settings is kept for next time.

## Editing by hand

Under **Advanced**, **Edit the file by hand** opens `gameinfo.gi` in a text editor of your choosing. Grimoire asks which one the first time, because `.gi` files often open in a word processor otherwise. **Change editor** switches it later.

If you edit values by hand, Grimoire spots it and the card says **Includes changes you made to the file by hand.** The next write (a gameplay toggle, an update, a restore) keeps your edits, so your tweaks survive game updates.

**Discard N manual edits** drops them. It acts on the config currently in the file, not whatever card is selected.
