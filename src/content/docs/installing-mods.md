---
title: Installing mods
description: Install from Browse, from a GameBanana 1-Click link, from a collection or a list of links, from files on your disk, or from another mod manager.
slug: installing-mods
order: 2
updated: 2026-10-11
---

# Installing mods

Open **Browse**, find a mod, and click **Install**. Grimoire downloads it, unpacks it, and adds it to your mods turned off. Click **Enable** on the card (in **Browse** or **Installed**) to turn it on.

To skip that step, turn on **Settings > Preferences > Enable mods after download**.

## From Browse

**Browse** is GameBanana's Deadlock section, inside Grimoire.

1. Search, or open **Filters**: **Hero**, **Category**, **Content** (show, blur, or hide NSFW), and **Added**.
2. Sort by **Popularity**, **Recently Added**, **Recently Updated**, **Most Viewed**, or **Name (A-Z)**.
3. Click **Install** on a card, or open the mod to pick a file first.

Downloads go into a queue, so you can queue several and keep browsing. Archives (`.zip`, `.7z`, `.rar`) are unpacked for you. If one holds several VPKs, Grimoire asks which ones to install.

The **Added** filter and the **Name (A-Z)** sort need Grimoire's local copy of the GameBanana catalog. It syncs in the background, and those options tell you while it does.

Installing a different file from a mod you already have turns the old file off. To keep both on, turn off **Settings > Preferences > Switch variants instead of stacking them**.

## From a 1-Click link

GameBanana mod pages have a **1-Click Install** button. Clicking it hands the mod to Grimoire. The first time, your browser asks whether to open Grimoire. Allow it.

If the archive holds files a Deadlock mod should not need (like `.exe`, `.dll`, or scripts), Grimoire shows **Suspicious files detected** and lists them. Only `.vpk` files are ever installed, so those files never reach your game either way. Still, check the mod's GameBanana page before you click **Install anyway**.

Some authors turn off 1-Click for their mod. Grimoire tells you when that happens. Install it from **Browse** instead.

## From a collection or a list of links

1. On **Browse**, open the **Import** menu next to the search box and choose **GameBanana**.
2. Paste a collection URL, or a list of mod, sound, or WiP links (up to 100).
3. Click **Fetch**. Pick a variant for any mod that has several, or leave it to get the most popular file.
4. Click **Queue**.

**Save as profile** turns the same list into a profile. See [saving and swapping mod profiles](/docs/profiles).

## From files you already have

Drop `.vpk` files or archives anywhere on the Grimoire window. Or go to **Installed** and click **Add local mods** (the file button in the toolbar).

Names come from the filenames, and you can edit them before importing. **Import as one mod with variants** turns several files into one card you can switch between.

Local imports are turned on as soon as they land, unless you turned on the experimental mod safety review (see [experimental features](/docs/experimental-features)).

One catch: drag the `.zip` itself, not a file you dragged out of an open zip window.

## From DeadlockForge

Turn on **Settings > Preferences > Allow DeadlockForge 1-click installs**. Mods you build on deadlockforge.net can then go straight to Grimoire. It asks before each install, and the mod arrives turned off.

## From another mod manager

1. On **Installed**, open the **Import or export** menu.
2. Pick your other manager (Grimoire looks for Deadlock Mod Manager), or choose **Import from file...** for a `mod-interchange.json` export.
3. Choose what to bring over: mods, profiles, and crosshairs.

Mods in the shared addons folder get moved and renamed for Grimoire, so the other manager may lose track of them. That is fine: two managers on one install fight anyway. See [fixing mods that do not load](/docs/troubleshooting).

## Next

Your mods show up on **Installed**. From there you can enable, disable, reorder, and delete them. See [load order and the mod limit](/docs/load-order).
