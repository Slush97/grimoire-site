---
title: Designing a crosshair
description: Build a custom crosshair with a live preview, save it as a preset, and get it into the game.
slug: crosshair
order: 16
updated: 2026-10-11
---

# Designing a crosshair

The **Crosshair** tab is experimental: turn it on in **Settings > Experimental Features > Crosshair Designer**. **Moving the sliders does not change anything in the game.** To use a crosshair you save it as a preset, then apply that preset. This catches almost everyone.

## Getting a crosshair into the game

1. Open **Crosshair** and adjust it until the preview looks right.
2. Under the preview, in **Saved Presets**, click **Save current**, type a name, and click **Save**.
3. Hover the tile you just made and click the play icon (**Apply to Game**).
4. Restart Deadlock.

Step 3 is the one people miss. The apply button only appears when you hover a preset tile, and there is no apply button anywhere else on the page. Clicking the tile itself only loads it into the editor.

The applied tile gets a highlighted border.

## The controls

The panel on the right has four tabs.

**Lines** sets the four lines: **Gap**, **Height**, **Width**, and **Opacity**, plus **Outline Width**, **Outline Gap**, and **Outline Opacity** under **Outline**.

**Dot** has its own **Size**, **Opacity**, and the same three outline sliders.

**The dot starts invisible.** Its **Opacity** starts at zero, so dragging **Size** does nothing until you raise it. The tab shows a reminder while it is at zero.

**Color** has a color picker, six quick swatches, **Red**, **Green**, and **Blue** sliders, and a separate **Outline color**.

**Game** has two toggles. **Static Gap** keeps the gap fixed instead of letting it grow with weapon spread. **Disable Hero Crosshairs** forces your crosshair onto heroes that would otherwise use their own.

Every slider's number is also a text field, so you can type an exact value instead of dragging. **Reset** at the top puts the editor back to Grimoire's starting crosshair.

## Tuning it live

Restarting the game for every tweak is miserable. Use **Copy Code** instead.

It copies the whole crosshair as one line of console commands. Open the console in game (the button's hint says F7), paste, and the change is immediate.

This does not save anything. Once you like what you see, come back and save it as a preset.

**Pin Window** keeps Grimoire on top of the game while you tweak. It pins the whole app, not just this tab.

## Starting from your in-game crosshair

**Import from Game** loads your in-game crosshair into the editor.

It reads `machine_convars.vcfg` in the game's `game/citadel/cfg` folder, which Deadlock writes when you change a crosshair setting **in the game's own settings menu**. If you have never touched those, Grimoire tells you to change any crosshair setting in game once and try again.

**On current Deadlock builds this can bring back an old crosshair, or find nothing.** Since the 2026-09-29 game update, Deadlock saves that file under your Steam folder instead, and Grimoire still reads the copy in the game folder. If the import looks wrong, build the crosshair by hand.

Importing only fills the editor. You still need to save and apply it.

## Presets

Presets are stored by Grimoire, not in your game folder, so verifying or reinstalling Deadlock will not lose them. Crosshairs you import from another mod manager land here as presets too.

Two limitations worth knowing:

- **Presets cannot be renamed or edited in place.** Loading one, tweaking it, and saving creates a second preset. There is also no check on duplicate names, so it is easy to end up with two tiles that look identical.
- **Deleting the preset you have applied also removes the crosshair from your config.** The confirmation only asks about deleting the preset, so this comes as a surprise.

**Deselect Active** (it shows while a preset is applied) removes the crosshair from your config and keeps every preset. A game that is already running keeps its crosshair until you restart it.

## What the preview shows

The preview sits on a real game scene: pick **Street**, **Sandbox**, or **Plain** in its top left. Move your mouse over it and the crosshair follows, the way your aim would. The zoom buttons go from 0.5x to 3x.

The **1080p**, **1440p**, and **4K** switch draws the crosshair the way the game does at that screen height, including how thin lines round to whole pixels. It starts on your screen's resolution. Preset tiles always draw at 1440p, so a tile may not match the big preview exactly.

The lines are exact. A small round dot can differ by a shade at its edge.

What it cannot show:

- **Spread.** Turning **Static Gap** off changes real in-game behavior and nothing in the preview.
- **Disable Hero Crosshairs** has no preview either.

## Where it gets written

Applying a preset writes crosshair settings into `game/citadel/cfg/autoexec.cfg`, in its own marked-off section.

The [Autoexec tab](/docs/autoexec) writes to the same file in a different section, and the two do not interfere. Anything else already in that file is left alone.

One exception worth knowing: if you have hand-written `citadel_crosshair_` lines in your autoexec, Grimoire pulls them into its crosshair section, where the next apply or **Deselect Active** overwrites them.

Applying a profile that includes a crosshair also replaces whatever is applied. The Crosshair tab can still highlight your old preset afterwards, but the profile's crosshair is the one in the file. See [profiles](/docs/profiles).
