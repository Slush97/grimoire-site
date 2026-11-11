---
title: Player stats
description: Track rank, match history, and hero performance for any Steam account, and understand exactly what gets sent where.
slug: stats
order: 15
updated: 2026-11-09
---

# Player stats

**Stats** shows Deadlock ranked data for Steam accounts you choose to track. Turn it on in **Settings > Experimental Features > Stats Dashboard**, then add a player.

There is no login. You never give Grimoire a password, and there is no account to make.

## Adding a player

1. Enable **Stats Dashboard**. A **Stats** item appears in the sidebar.
2. Open it and click **Add a player**, top right.
3. Pick an account under **Detected Steam users**, or paste an ID into **Steam ID or Account ID...** and press Enter.

Grimoire reads your local Steam login file to suggest accounts, which is why yours probably appears without you typing anything. That check is entirely local.

Pasting works with an account ID, a SteamID64, or a `steamcommunity.com/profiles/<digits>` URL. **Vanity URLs do not work.** If your profile is `steamcommunity.com/id/yourname`, open it and grab the numeric ID instead.

You can track more than one account. Hover one in the dropdown and click the star (**Set as primary**). The primary account is selected automatically when you open the tab.

## The four tabs

| Tab | What it shows |
|---|---|
| **Overview** | Your rank and badge, a ranked trajectory chart, recent matches, and lifetime per-hero performance |
| **Matches** | Match history grouped by day, with hero, result, K/D/A, and souls |
| **Social** | Best teammates and frequent opponents, by win rate together |
| **Leaderboard** | The regional top 50 for NA, EU, Asia, SA, and OCE, per ranked season |

**Leaderboard** works without tracking anyone. The other three need a player selected.

Under the rank, the Overview shows where you stand this season (**Top 21%**), your ranked win streak, and how many demotion protection shields you have left. The thin bar along the bottom of the rank tile is your progress to the next subrank. Hover it for the points.

Ranked games show the rank points they gave or took next to the result, with a shield when demotion protection was used. Street Brawl games carry a **Brawl** tag, because their souls and K/D don't compare with normal games.

Click any match to open its scoreboard: how the souls lead moved over the match, then both teams with K/D/A, souls, last hits, damage, healing, rank and final build.

A new season's leaderboard stays empty for a while. Until it fills, the tab shows the previous season, and you can switch seasons yourself. If a player you track is on the board, their row is highlighted. The leaderboard only knows Steam names, so on rare occasions it can point at the wrong account.

## Refreshing

Nothing polls in the background. Data loads when you open the tab and when you press **Refresh**.

**Refresh** pulls new matches since the last one it saw, so it gets faster over time rather than slower.

## Where the Overview numbers come from

The **Overview** tiles for Matches, Win Rate, KDA, and best streak are built from **matches Grimoire has recorded locally**. When you add an account it records the whole match history deadlock-api.com has for it, then adds new matches as you refresh.

**Hero Performance** on the same page is lifetime data straight from the API, so the two can differ slightly for matches the service hasn't processed yet.

## Where the data comes from

`deadlock-api.com`, a community-run service. It is not Valve and not affiliated with Grimoire.

A match appears only once that service has ingested it. If it never ingests a match, that match never shows up here, and there is nothing Grimoire can do about it.

The **Social** tab needs at least 3 shared matches with someone before they appear.

## What leaves your machine

Stats is off by default and sends nothing until you turn it on and add an account. Once you do, these requests happen:

- **api.deadlock-api.com** receives the **numeric account ID** of any player you track, to look up their profile, rank, match history, and hero stats. On the Social tab it also receives the IDs of teammates and opponents it is resolving names for. Opening a match scoreboard sends the match ID and the IDs of the players in it, to get their names.
- **steamcommunity.com** receives the SteamID64 of each tracked player, to fetch the current display name and avatar.
- **api.deadlock-api.com** is also asked for hero, rank and item artwork, the list of ranked seasons, and how many players hold each rank this season. No account ID is involved.
- **statlocker.gg** is only contacted when you click a Statlocker link, which opens in your browser.

Every request carries your IP address and Grimoire's version, as any web request does. No API key, no cookies, no login token, and nothing about your mods.

What those third parties log on their end is their business and not something Grimoire can speak to.

## Contributing match data

Separately, **Settings > Privacy & Content** has **Contribute match data to deadlock-api.com**. It is **off by default** and works whether or not Stats is enabled.

Switched on, it reads replay keys that Steam has already cached for matches you viewed in game, and uploads them so the community service can fetch those matches. It checks again every 15 minutes while Grimoire is open. Under the switch, a line shows how many keys you have sent so far.

It sends **four numbers per match**: the match id, the server cluster, and two download keys. Each upload also carries a fixed `grimoire` tag, the same for every user, so the service knows which app sent it. No account ID, no player name, nothing about you or your mods.

## Stored on your machine

Everything fetched is cached in a `stats.db` file in Grimoire's app data folder.

The trash icon next to a player in the dropdown (**Remove player**) deletes that account and all of its recorded matches and snapshots. It does not ask first. There is no single button that wipes the whole stats database, so to clear everything, remove each player, or delete the file.
