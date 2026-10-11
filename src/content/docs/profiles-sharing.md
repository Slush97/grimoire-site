---
title: Sharing a profile
description: Send your loadout to someone as a share code or a file, import one you were sent, and know exactly what leaves your machine.
slug: profiles-sharing
order: 19
updated: 2026-10-11
---

# Sharing a profile

Click the share icon on any profile card. The **Export Profile** window gives you **Save .modprofile.json file** for a file, or **Copy share code** for one line of text you can paste into Discord.

Both hold the same thing: a list of which GameBanana mods to get and what order to put them in. No mod files are included, so both are small.

## What leaves your machine

**Making a share code or a file sends nothing anywhere.** Grimoire builds it on your PC, and it only goes where you paste or send it.

Here is everything inside, so you know what you are handing over:

- The profile's name
- For each mod: its GameBanana mod and file IDs, its place in the load order, and whether it is on
- For each mod: its name, category, file name, thumbnail link, and whether it is marked NSFW, so the other side can show it
- Your console commands and crosshair, if the profile has them
- Your Grimoire version and the time you exported

There is no Steam ID, no account, and nothing about your PC. The export window shows the totals before you copy, for example "12 mods included · crosshair · 3 autoexec commands".

**Importing** someone else's code talks only to GameBanana: one lookup per mod, then the downloads. No account, no Grimoire server.

**Publishing to Discover** is the only way a profile goes up to a Grimoire server. See the last sections below.

## Before you share

**Local mods do not travel.** Anything you installed from your own disk rather than from GameBanana is left out, because the other person has no way to fetch it. Grimoire warns you and lists what it skipped.

If your loadout is built around hand-installed VPKs, the person receiving it gets an incomplete version of it.

**Your console commands and crosshair go along**, if the profile has them. That is usually what you want, but check them before you post a code in public.

## Importing one

1. On **Profiles**, click **Import**.
2. Paste the share code, or use **Or load from file**.
3. Click **Parse & resolve**. Grimoire looks up every mod on GameBanana.
4. Review what it found, then click **Import**.

Grimoire downloads the mods it can get and creates a new profile from them. Importing always creates a new profile; it never changes one you already have.

**Importing does not switch your setup.** You still have to click **Apply** on the new profile. New downloads land disabled, unless you turned on **Settings > Preferences > Enable mods after download**.

**A shared crosshair comes along with no checkbox.** If the profile has one, applying it replaces your crosshair. To keep yours, expand the new profile on **Profiles** and click **Remove** in its crosshair section before you apply.

## What the resolve step is telling you

Each mod gets a status:

| Status | Meaning |
|---|---|
| **exact** | The exact file the sharer used is still on GameBanana |
| **On disk** | You already have it, so it is not downloaded again |
| **upgraded** | The original file is gone, so a different file from the same mod is used instead |
| **unresolvable** | The mod is gone from GameBanana. It cannot be imported and is left out |

**upgraded** is the one to watch. You get a different file than the sharer had: the mod's most downloaded file that is still up. That is usually fine and occasionally is not. Pick another file from the row's variants if you need to.

Unresolvable mods cannot be ticked. There is nothing to do about them beyond finding a replacement yourself.

## Adjusting before you import

You do not have to take the whole thing:

- Untick any mod you do not want.
- **Skip NSFW** drops adult content in one click.
- Rename it in **Save as**.
- Click a row's variant count to pick a different file than the sharer pinned, or several. **Show all variants** loads the file list for every mod at once.
- If the profile carries console commands, a bar offers **Include N autoexec commands**. **It is ticked by default**, so untick it if you do not want someone else's commands written into your `autoexec.cfg`.

## If a share code is too long

Big loadouts make long codes. If one is too long for a chat message, send the `.modprofile.json` file instead. It holds exactly the same thing.

Grimoire also refuses to import a share code that unpacks to more than 256 KB, and tells you to use the file. A normal loadout is nowhere near that.

## Publishing to Discover

Publishing needs **Grimoire Social** turned on in **Settings > Experimental Features**, and a Steam sign-in (on **Discover**, or in **Settings > Grimoire Social**). Once you are signed in, profile cards get a globe icon, **Publish to Discover**.

You give a title (up to 80 characters) and an optional description (up to 1000). The first time, you also tick a terms box.

Profiles with no GameBanana mods cannot be published, since there would be nothing for anyone to install.

## What publishing uploads

Publishing sends the profile to **Grimoire Social**, the Grimoire developer's own server (`grimoire-social.slusheliott.workers.dev`, on Cloudflare). It uploads:

- The title and description you typed
- The full share code, so everything listed under **What leaves your machine** above, including the profile's own name, your console commands, and your crosshair

The terms notice only names the title, description, and mod list. The rest goes up too.

The published profile is tied to your Steam account and shows your Steam name and avatar. Anyone can open it and import it. You sign in on Steam's own page, so Grimoire never sees your password.

For editing, unpublishing, and deleting your account, see [Discover](/docs/discover).

## The format

Share codes start with `mp1:` and files end in `.modprofile.json`.

**This format is Grimoire-only.** Other mod managers do not read it, whatever the file extension suggests.

To hand your setup to another mod manager, use **Export for other mod managers** in the import menu on **Installed** (the two-arrows button). That writes a different kind of bundle, mod files included, that other managers can import.
