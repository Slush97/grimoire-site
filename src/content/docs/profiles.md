---
title: Saving and swapping mod profiles
description: Save your current loadout as a named profile and switch between setups without reinstalling anything.
slug: profiles
order: 18
updated: 2026-10-11
---

# Saving and swapping mod profiles

A profile is a saved list of which mods you have **enabled**, in what order. Create one on the **Profiles** tab, then click **Apply** later to get that setup back.

Profiles store no mod files, only references, so they cost nothing on disk and switching is fast.

## Creating one

1. Open **Profiles**.
2. Type a name under **Create New Profile**.
3. Click **Create Profile**, or press Enter.

It captures whatever is enabled right now. The card shows **Active**, which means "the last profile you created or applied", not "your install matches this right now". Nothing is written to your game.

## The quick menu on Installed

You do not have to leave **Installed**. The **Enabled** header has a **Profiles** button (it shows the active profile's name once you have one). From it you can apply any profile, **Update** the active one, **Save current as...**, or **Delete a profile...**. **Manage profiles** opens the full page.

Saving from this menu never includes a crosshair. Search and filters do not narrow what gets saved: every enabled mod goes in.

## What a profile remembers

| Saved | Not saved |
|---|---|
| Which mods are enabled, local mods too | Disabled mods |
| Their load order | The mod files themselves |
| The commands from the **Autoexec** tab | Locker overrides (cards, ability sounds, ability colors, trippy skins) |
| Your crosshair, if you tick **Include current crosshair** | Anything in Settings, including your performance config |

Four of those surprise people.

**Only enabled mods are recorded.** A disabled mod is simply not in the profile.

**Console commands are always saved**, with no checkbox. Only the commands Grimoire manages count, not lines you typed into `autoexec.cfg` yourself. See [console commands](/docs/autoexec).

**The crosshair is opt-in.** The **Include current crosshair** box only shows when the Crosshair tab is on and a crosshair preset is applied. You cannot add a crosshair to an existing profile later, and **Update** keeps whatever crosshair the profile already has.

**Locker overrides are invisible to profiles.** They are never saved and never turned off by applying one. Locker skins are ordinary mods, so those do get saved and switched. See [what the Locker is](/docs/locker).

## Applying one

Click **Apply** on the profile you want. On the active profile the same button says **Re-apply**.

Applying is not additive. **Any enabled mod that is not in the profile gets turned off**, Global mods included. That is the point of a profile, but it catches people who expect it to just add things.

It also writes the profile's console commands back, replacing the ones you have now. A profile saved with no commands clears them. Your crosshair is only replaced if the profile has one.

Grimoire takes an automatic snapshot first, so a wrong apply can be undone. See [snapshots](/docs/snapshots).

Things that can stop or shrink an apply:

- **The game is running.** If Deadlock has any of the mods that need to move loaded, the whole apply is refused before anything changes. Close the game and retry.
- **A file is locked.** Mods locked by another process are skipped and counted, and Grimoire tells you how many. The rest still applies.
- **A mod is gone.** An entry whose mod is no longer installed is skipped without a message. Applying never downloads anything, so a profile can apply smaller than you expect.
- **Mod safety is on.** With **Settings > Experimental Features > Mod safety** turned on, Grimoire asks before enabling a mod with scripts you have not trusted yet. Say no and no mods change.

## Update is not Apply

These sit next to each other and do opposite things.

- **Apply** overwrites *your install* from the saved profile.
- **Update** overwrites *the saved profile* from your install: enabled mods, their order, and your console commands.

**Update** has no undo, which is why it asks first. You can turn that prompt off with **Settings > Preferences > Confirm before updating a profile**.

## Renaming and deleting

The pencil icon renames in place (Enter saves, Esc cancels). The trash icon deletes after a confirmation.

**Deleting a profile does not uninstall anything.** Your mods stay exactly as they are; you just lose the saved list.

## Seeing what is inside

The chevron expands a card to show every mod in the profile, its console commands, and its crosshair if it has one. A mod with several files shows as one row with a file count.

If a profile has a crosshair you no longer want, **Remove** in that crosshair section drops just the crosshair and leaves everything else alone.

## Sharing, and profiles from other managers

Profiles can be exported as a share code or a file, and published to Discover. See [sharing a profile](/docs/profiles-sharing).

Importing from Deadlock Mod Manager, or from another manager's export file, can bring its profiles over too. Use the import menu on **Installed** (the two-arrows button once you have mods). Those profiles show up here like any other.
