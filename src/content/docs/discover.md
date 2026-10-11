---
title: Discover
description: Browse mod loadouts published by other Grimoire players, import them, and publish your own.
slug: discover
order: 23
updated: 2026-10-11
---

# Discover

**Discover** is a feed of mod loadouts published by other Grimoire players. Importing one needs no account. Liking and publishing need you to sign in with Steam.

Turn it on in **Settings > Experimental Features > Grimoire Social**.

What gets shared is a **recipe, not the mods**. A published profile is a list of which GameBanana mods to fetch, so importing one downloads them from GameBanana the same way Browse does.

## Browsing and importing

**Top** and **New** sort the feed. Cards show thumbnails, title, who published it, when, how many mods, and likes. **Featured** marks profiles the maintainer picked.

Profiles that contain NSFW mods are left out of the feed unless **Settings > Privacy & Content > NSFW content** is set to **Show**.

Click any card to open it. Grimoire looks up each mod on GameBanana and shows you what it found. Tick what you want and import.

This is the same import flow as a share code, so you can deselect mods, **Skip NSFW**, and swap variants. See [sharing a profile](/docs/profiles-sharing).

Importing reports nothing back. Nobody is told you imported their profile, and there is no view or download counter.

## Signing in

Click **Sign in with Steam**. Your browser opens Steam's own login page.

**Grimoire never sees your password.** You log in on Steam's site, and Grimoire only gets a session token afterward. That token stays in Grimoire's background process and never reaches the part of the app that draws the interface.

What becomes public is your **Steam display name and avatar**, shown on anything you publish.

**If your system has no keyring** (common on Linux), Grimoire will not save your session to disk unencrypted. **Settings > Grimoire Social** shows a **Session only** badge, and you sign in again each launch. That is on purpose.

## Publishing

Click **Publish profile** on Discover and pick a local profile. Or, on the **Profiles** page, click the globe button (**Publish to Discover**) on a profile. Add a title and an optional description, then click **Publish**.

Know what goes with it. The notice you accept before your first publish mentions the title, description, and mod list, but the upload also carries the rest of the profile:

- Your **console commands** from `autoexec.cfg`
- Your **crosshair settings**
- The **local name** you gave the profile
- Your Grimoire version and the export time

Viewers see a crosshair badge and an autoexec command count. If your autoexec has anything you would not post publicly, take it out of the profile first.

Local mods are left out, since nobody else could download them. The dialog lists which ones.

Limits: 80 characters of title, 1000 of description, 100 mods, and one publish every ten minutes.

## After publishing

**Your profile** (a tab next to **Top** and **New**) lists everything you have published.

**You cannot change the mod list of a published profile.** **Edit** only changes the title and description. To change the mods, unpublish and publish again, which resets the likes and gives it a new link.

**Remove**, then **Confirm**, unpublishes it. People who already imported it keep their copy.

## Reporting

When signed in, open a profile and click **Report**. You can add a note.

Reports go to one maintainer who reviews them by hand. There is no automated scanning and no notification back to you. Profiles can be removed and accounts banned for breaking community guidelines.

There are no comments anywhere in Discover.

## Background activity

Worth knowing, because it is not obvious: **while Grimoire Social is on, Grimoire checks for new published profiles every 2 minutes for as long as the app is open**, even if you never open Discover. That is what puts the count badge on the Discover tab.

If you would rather it did not, turn the **Grimoire Social** switch off.

One more detail: if you have ever signed in, Grimoire checks your saved session at startup even with the switch off. **Sign out** in **Settings > Grimoire Social** to stop that. (Turn the switch on first to see that page.)

## Deleting your account

**Settings > Grimoire Social > Delete account.**

Deleted for good: your account, your Steam link, and every like you gave.

Kept: your published profiles stay stored on the server but stop showing anywhere, so people who imported them keep working links. Any reports you filed are also kept.

Signing in again creates a brand new account. It does not bring back the old one.

Other devices you are signed in on are not logged out right away. Those sessions expire on their own.
