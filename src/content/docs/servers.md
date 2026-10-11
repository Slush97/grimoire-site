---
title: Deadworks community servers
description: Browse community dedicated servers, let Grimoire fetch whatever content they need, and join through Steam.
slug: servers
order: 24
updated: 2026-10-11
---

# Deadworks community servers

The **Servers** tab lists Deadworks community dedicated servers. Pick one, click **Join**, and Grimoire downloads whatever custom content it needs before handing you to Steam.

Turn it on in **Settings > Experimental Features > Deadworks Servers**. You need your Deadlock folder set first (**Settings > Game setup**).

Joining works on Windows and Linux. Only *hosting* a server needs Windows.

## The list

Each row shows the server name, region, map, players, a lock if it has a password, how many content items it needs, and a ping. A green dot means **Online**. A grey dot means **Stale**: the registry has not heard from that server lately.

**Your own PC measures that ping.** It sends a small packet straight to every server in the list, each time the tab loads and each time you click **Refresh**. **So server operators can see your IP address before you ever join.** The app does not tell you this.

Filter with the search box (name or map), the region and map menus, and **Has space**. **Join** is greyed out on full servers.

## Joining

1. Click **Join**. Grimoire checks what content the server needs.
2. It makes sure `gameinfo.gi` is set up to load that content.
3. Custom maps and addons download and unpack, with progress.
4. Steam takes over and connects you. Accept any Steam prompt.

Content has versions, so anything you already have at the right version is skipped. Joining the same server again is usually instant.

**Quit Deadlock before you join a server that needs new content.** A running game can hold the files open. If that happens, Grimoire tells you to fully quit the game and try again.

Grimoire does not handle server passwords. Steam and the game ask for those after the handoff.

If you turned on **Mod safety** in Experimental Features, server addons go through the same check as your own mods. Choosing **Keep disabled** cancels the join and removes that content.

## Where content goes

Server content lands outside your mods:

- Maps go in `game/citadel/maps`
- Addons go in `game/citadel/deadworks_addons/vpks`

**It does not touch your mod setup.** It takes no load-order slot, does not count toward your mod limit, does not appear in **Installed**, and is not part of conflict detection.

It also loads after your own mods, so if a server addon and one of your mods change the same file, yours wins.

## Fix Configuration and server content

Once you have downloaded server content, Grimoire treats the line in `gameinfo.gi` that loads it as required. If it goes missing (a game update can wipe it), the gameinfo check reports it and **Fix Configuration** puts it back.

**Fix Configuration never deletes downloaded content.** It only repairs the line that loads it.

It also leaves alone search paths it does not manage, so a path the official Deadworks launcher or you added by hand stays in place.

## Cleaning up

There is no button to remove downloaded server content. To clear it, close Deadlock, delete the `deadworks_addons` and `deadworks_cache` folders under `game/citadel`, then run **Fix Configuration**. Downloaded maps stay in `game/citadel/maps`.

## Where the list comes from

The server list comes from the Deadworks registry (`api.deadworks.net`), a third-party service, not from Grimoire.

Grimoire only reads from it. It sends no heartbeat, no install ping, and nothing about you or your mods. The official Deadworks launcher does some of that. Grimoire does not.

Download links come from the server you are joining. Grimoire checks that each file is a real VPK, that its name is safe, and that it is not oversized before using it.

If the list is empty, no servers are registered right now.
