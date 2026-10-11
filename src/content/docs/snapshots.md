---
title: Snapshots and rolling back
description: Automatic recovery points taken before risky operations, and how to use one to undo a bad update or a wrong profile.
slug: snapshots
order: 20
updated: 2026-10-11
---

# Snapshots and rolling back

A snapshot records **every mod you have installed**, enabled and disabled, so you can get back to a known-good setup. Grimoire takes them automatically before anything risky, and you can take one yourself.

They live on the **Profiles** tab, in the **Snapshots** card. Click the card's chevron to see the list.

## When Grimoire takes one

Automatically, before these. Each snapshot is labelled with what triggered it:

| Label | Taken before |
|---|---|
| **Before mod update** | An update replaces installed files. One per update run, even for a big update-all |
| **Before applying profile** | A profile apply, since it turns off anything not in the profile |
| **Before DMM import** | Importing mods from Deadlock Mod Manager |
| **Before mod import** | Importing another mod manager's export file |

**Snapshot now** takes one on demand, labelled **Manual snapshot**. Worth doing before you go experimenting.

## How they differ from profiles

| | Profile | Snapshot |
|---|---|---|
| Records | Only enabled mods | Every installed mod, on and off |
| Created | By you, deliberately | Automatically, before risky operations |
| Console commands and crosshair | Yes | **No** |
| Local mods | Yes | **No** |

Two gaps worth knowing. A snapshot **does not** back up your console commands or crosshair, despite living on the same page as profiles that do. And it skips local mods, the same as sharing does.

## Restoring one

Click **Restore** on the snapshot you want.

**This is not a one-click undo**, which surprises people. Restore opens the import window with the snapshot already loaded. Mods you still have are reused, missing ones are downloaded again from GameBanana, and the result is a **new profile**.

You then apply that profile to actually get back to the old state.

The upside of doing it this way is that a snapshot can rescue you even from mods you have since deleted, because it can fetch them again.

## Undoing a bad update

The most common use. A mod updates, something breaks, and you want the old set back:

1. Open **Profiles** and expand **Snapshots**.
2. Find the one labelled **Before mod update** from around when it broke.
3. Click **Restore**, wait for the list to load, then click **Import**.
4. Click **Apply** on the profile it created.

Check the list in step 3. If the author removed or archived the old file on GameBanana, that mod shows **upgraded**, and you get a different file, which may be the broken new one. See [what the statuses mean](/docs/profiles-sharing).

## Housekeeping

**Snapshots are never cleaned up automatically.** One is written before every update run, so they pile up.

They are only lists of mod IDs, not copies of files, so the disk cost is tiny. Still, the list gets long. Tick the box at the top of the list to select them all (or tick single rows), then click **Delete N**.

**Deleting a snapshot does not touch your installed mods.** It only removes the recovery point.
