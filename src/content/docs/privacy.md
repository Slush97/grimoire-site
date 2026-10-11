---
title: Privacy and what leaves your machine
description: Every network request Grimoire can make, who receives it, what it contains, when it happens, and how to turn it off.
slug: privacy
order: 25
updated: 2026-10-11
---

# Privacy and what leaves your machine

Grimoire doesn't collect usage data. This page lists every network request the app can make: who gets it, what is in it, when it happens, and how to turn it off.

Every request shows the receiving server your IP address. Requests to GameBanana, deadlock-api.com and Steam also say `Grimoire/<version>` in the User-Agent header.

## On every launch

These happen on their own, without a click.

- **Update check (GitHub).** Usually runs twice per launch: when the window loads, and again 5 seconds after start. There is no timer after that. It reads Grimoire's release list and a small version file from github.com. The update library (electron-updater) adds a random ID to these requests. It creates the ID on the first check and saves it as `.updaterId` in Grimoire's data folder. Grimoire itself never receives it. **Turn off:** there is no setting. Installs from apt, AUR, Flatpak, Snap or Nix never check, because your package manager handles updates.
- **Catalog refresh (GameBanana).** If your local copy of the Deadlock catalog is more than a day old, Grimoire downloads the whole catalog again. Otherwise it asks for the 50 most recently updated Mods, Sounds and WiPs. No setting.
- **Installed mod check (GameBanana).** The Installed page asks for the current file list of every installed mod that came from GameBanana, at most once per 30 minutes per mod. This lets GameBanana see which mods you have. Thumbnails for your mods also load from GameBanana. **Turn off:** open a mod and turn on **Ignore updates** to skip it.
- **One font (Google Fonts).** The window loads the font used for the Grimoire title from fonts.googleapis.com and fonts.gstatic.com. A cached copy is reused once you have it. No setting.
- **Language files (GitHub).** Only if you downloaded a language. Each launch asks raw.githubusercontent.com whether the file changed, and downloads it again only if it did.

Three opt-in features below also run at launch once you turn them on: the Grimoire Social session check, the Discover badge, and match data contribution.

## When you open or click something

- **Browse, search, open a mod, install.** All go to GameBanana: gamebanana.com, api.gamebanana.com, images.gamebanana.com and its file servers. One-click install links from GameBanana's site only accept GameBanana download links.
- **Settings > Maintenance.** Opening it loads GameBanana's download server list. **Test now** downloads a small sample from three servers.
- **Settings > Updates.** **Check for Updates** and switching between **Stable** and **Nightly** run the update check above. **Download Update** downloads the installer from GitHub.
- **Settings > Appearance > Language & region.** Opening it loads the language list from raw.githubusercontent.com. Choosing a language downloads that language once.
- **Settings > Performance.** With **Always use the newest version** on (the default), opening the card asks GitHub for the newest release of the selected preset from its author's repository, at most every 5 minutes, and again right before **Apply**. These requests carry no version or ID. **Turn off:** switch off **Always use the newest version**. See [performance presets](/docs/performance-presets).
- **Locker > a hero > Sounds.** Ability icons load from deadlock-api.com's image server (assets-bucket.deadlock-api.com).
- **Copying an image** downloads it again from where it is hosted.

## Images and links

- Images inside mod descriptions, updates and comments, and inside release notes, load from whatever site the author linked. That site sees your IP when the image shows.
- Profile pictures load from Steam.
- If the app has no built-in art for a hero (usually a brand new one), the Locker tries deadlock.wiki.
- Links to GameBanana, GitHub, Discord, Ko-fi and statlocker.gg open in your browser. Grimoire doesn't contact those sites itself.

## Stats Dashboard

**Settings > Experimental Features > Stats Dashboard.** Off by default.

When you open the Stats tab, Grimoire sends the numeric Steam account ID of each player you track to api.deadlock-api.com, a community-run service, to get rank and match history. It loads hero and rank data from assets.deadlock-api.com (cached for a day), and each player's public name and avatar from steamcommunity.com. See [player stats](/docs/stats).

## Grimoire Social and Discover

**Settings > Experimental Features > Grimoire Social.** Off by default. It talks to Grimoire's own server at grimoire-social.slusheliott.workers.dev.

- **Browsing Discover** works without an account.
- **Signing in** opens your browser on Steam's own sign-in page, so Grimoire never sees your password. It creates a Grimoire Social account tied to your Steam ID, with your Steam display name and avatar. Your session is saved in your system's keychain. On Linux without a keychain it lasts until you close the app.
- **Publishing** uploads a title, a description, and a share code. The code lists each mod's GameBanana ID and file, its name, original file name and thumbnail link, whether it is on, and the load order. It also carries the profile's crosshair and autoexec commands if it has them, plus your Grimoire version. Mods not from GameBanana are left out.
- **Likes and reports** send the profile ID, and a report sends the reason you type.
- **While the toggle is on**, Grimoire asks for the newest profiles every 2 minutes for as long as it is open, to drive the sidebar badge. If you are signed in, these requests include your session.
- **If you have signed in before**, Grimoire checks your saved session once at launch, even with the toggle off. To stop it, turn the toggle on, then **Settings > Grimoire Social > Sign out**.
- **Delete account** in the same place removes your account, your likes and your published profiles.

Copying a share code or exporting a profile file uploads nothing. See [Discover](/docs/discover).

## Deadworks Servers

**Settings > Experimental Features > Deadworks Servers.** Off by default.

Opening the Servers tab loads the server list from api.deadworks.net, a registry run by the Deadworks project. To show a ping, your machine sends one small packet straight to every listed server, so those operators see your IP before you join. Joining downloads the server's required files from wherever its listing points, then hands the address to Steam. See [servers](/docs/servers).

## Contributing match data

**Settings > Privacy & Content > Contribute match data to deadlock-api.com.** Off by default.

Grimoire reads Steam's own download cache on your machine for replay links to matches you viewed in-game. It checks at launch and every 15 minutes, and uploads only new ones to api.deadlock-api.com. Each entry is the match ID, the server cluster, one download key for that match, and the fixed name `grimoire`. No account ID or username.

## Discord Rich Presence

**Settings > Preferences > Discord Rich Presence.** Off by default.

Grimoire talks only to the Discord app on your machine. It tells Discord which page you are on, how many mods you have installed, which hero you are customizing in the Locker, and how long Grimoire has been open. Discord then shows that on your profile. Discord loads hero images from deadlock.wiki itself.

## DeadlockForge and Fix Unknown Mods

**Settings > Preferences > Allow DeadlockForge 1-click installs** sends nothing. It makes Grimoire listen on your own machine (127.0.0.1, ports 43110 to 43114) for files from deadlockforge.net, and it asks before installing anything. Off by default.

**Settings > Experimental Features > Fix Unknown Mods** searches GameBanana by hero and category, and downloads small pieces of possible matches. The comparison happens on your machine. Nothing from your files is uploaded. Off by default.

## Things Electron does on its own

Grimoire is built on Electron. On Windows and Linux, Electron downloads a spell-check dictionary for your system language from Google's servers and keeps it on disk. It sends nothing you type. Grimoire doesn't turn this off.

Electron's crash reporter is not enabled. Crash information stays on your machine.

## Bug reports

**Generate report** under **Settings > Support > Share a bug report** builds a report from app and system info and the end of your log. It removes home folder paths, Steam IDs, tokens and email addresses before you see it.

Nothing is sent. You read it, copy it, and paste it yourself.

## Verifying what you downloaded

Grimoire is open source, so you can read the code or build it yourself.

Every release ships a `SHA256SUMS` file. Check your download against it with `sha256sum -c SHA256SUMS` on Linux, or `Get-FileHash <file>` in PowerShell.

Releases also publish build provenance attestations that tie each installer to the exact commit and workflow run that built it:

```
gh attestation verify <file> --owner Slush97
```

Windows installers are not code-signed, so Windows warns about an unknown publisher on first run. Click **More info**, then **Run anyway**.
