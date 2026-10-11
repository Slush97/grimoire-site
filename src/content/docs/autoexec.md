---
title: Console commands and launch options
description: Build an autoexec.cfg of console commands that run at game start, and set Steam launch options without leaving Grimoire.
slug: autoexec
order: 17
updated: 2026-10-11
---

# Console commands and launch options

The **Autoexec** tab builds `autoexec.cfg`, the file Deadlock runs at startup. Add commands, click **Save**, restart the game.

Nothing is written until you click **Save**. Adding and removing commands only changes the list on screen, and **You have unsaved changes** shows next to **Save** until you do.

## Adding commands

**Premade Commands** on the left is a searchable list of 22 commands, grouped into Performance, Network, HUD & UI, Minimap, Matchmaking, and Mouse & Sensitivity. Each row says what the command does and shows the exact command.

Click a row to add it. Rows already in your list show a check mark.

For anything not in the list, type it into the box at the top of **Your Commands** and press Enter or click **Add**. The same command cannot be added twice.

Your list builds up on the right under **Your Commands**. Each row has a trash icon to remove it. **Clear** empties the whole list after a confirmation, and **Copy** copies every command to the clipboard.

## Commands you already had

If your `autoexec.cfg` already had lines in it, Grimoire lists them under **Already in autoexec.cfg**, read-only.

It does not absorb, move, or delete them. Grimoire writes its own commands into a marked-off section of the file and leaves everything else where it was, which is why those rows have no remove button.

**Clear** only clears the commands Grimoire manages. The read-only rows still count toward the number in **Your Commands**, so the count can be higher than what **Clear** removes.

## Grimoire does not check your commands

There is no validation. A typo gets written to the file as is, with no warning.

Nothing checks for contradictions either. Add both `fps_max 0` and `fps_max 240` and both get written, with the last one winning.

One quirk to know: a `//` comment at the end of a line gets stripped when the file is read back. Type `echo hi // my note`, save, and the row comes back as `echo hi`. A `//` inside a word, like in a link, is kept.

## Launch options

The **Launch Options** card sets the arguments Steam passes to Deadlock, like `-high` or `-nojoy`. It has its own **Save** button. The **Save** on **Your Commands** does not cover it.

Saving only stores the value in Grimoire. Grimoire writes it into Steam's config **right before it launches the game**, and only if Steam is closed at that moment. Three consequences:

- **Close Steam, then launch from Grimoire.** If Steam is already running, Grimoire skips the write, because Steam would overwrite it. Nothing tells you at launch time; the card shows a warning while Steam is running.
- **Launching from Steam uses whatever Steam has.** That is your value only if an earlier Grimoire launch wrote it.
- **An empty card clears Steam's launch options.** If you set launch options in Steam itself, copy them into this card too. Otherwise the next Grimoire launch with Steam closed replaces them with nothing.

When your saved value differs from Steam's, the card shows Steam's under **In Steam now**. If it says **Steam config not found**, launch Deadlock from Steam once, then come back.

## Sharing the file with the Crosshair tab

The [Crosshair tab](/docs/crosshair) writes to the same `autoexec.cfg`.

They do not fight. Each owns its own marked-off section, and every save re-reads the file first, so neither overwrites the other even with both tabs open. Anything you wrote yourself outside those sections is kept.

Two things to know:

- **Commands run before crosshair settings.** If you put a `citadel_crosshair_` command in this tab and also apply a crosshair preset, the preset wins.
- **Applying a profile replaces your commands.** A profile carries the commands that were in this tab when it was saved, so applying an old profile can quietly undo changes you made since. A profile saved with no commands clears them. See [profiles](/docs/profiles).

## Do you need +exec autoexec?

Some Source games need `+exec autoexec` in their launch options to run the file at all. Grimoire does not add it for you, though the file it writes carries a comment suggesting it.

If your commands are not taking effect and the file is definitely saved, add `+exec autoexec` to **Launch Options** and see whether that fixes it.
