---
title: Recoloring abilities and painting skins
description: Repaint a hero's ability effects in one color, a rainbow, a gradient, or a trippy pattern, and paint a moving pattern onto their body and gun.
slug: locker-effects
order: 11
updated: 2026-10-11
---

# Recoloring abilities and painting skins

Open a hero in the **Locker** and click **Effects**. The **Abilities** tab repaints their ability effects. The **Body + Gun** tab paints a pattern onto the hero model. Effects is labelled **Experimental** in the app.

Not every hero is supported yet. For those, Effects says it is not available for that hero rather than half-working.

## Abilities: four modes

The Abilities tab covers particles, projectiles, and the ult body. Pick a mode, tune it, then click its apply button (**Apply Color**, **Apply Rainbow**, **Apply Gradient**, or **Apply Trippy**).

- **Single Color** turns everything one color. Pick one of nine presets, or set it with the sliders.
- **Rainbow** spreads the hero's own ability colors across the whole spectrum.
- **Gradient** does the same over a color ramp. Pick one of eight preset ramps (Fire, Ice, Sunset, and so on), or **Custom** to set a hue for each stop.
- **Trippy** paints the particles with a moving pattern. See below.

**Only one mode is active at a time.** They share one slot per hero, so applying a gradient replaces a color, and applying Trippy replaces either.

## The sliders

- **Single Color** has **Hue**, **Saturation**, and **Brightness**.
- **Rainbow** and **Gradient** have **Rotation** (where the colors start), **Saturation**, and **Brightness**. Tick **Animated** to make the colors sweep over each effect's lifetime instead of sitting still.

Saturation and brightness matter more than they look. A pale effect recolored by hue alone comes out washed out. Raise saturation for a deep color, or lower it and raise brightness for a pastel.

In Single Color mode, the preview is a real ability texture run through your recolor. In Rainbow and Gradient it is only a rough swatch.

## Trippy

1. Pick a pattern from the strip (Confetti, Liquid, Galaxy, Lava, and ten more).
2. Set **Intensity** (how strong the paint is) and **Phase** (where the pattern starts).
3. Set **Animation**. **Off** bakes a still paint. **Sweep**, **Loop**, and **Cycle** move the color in game, and **Animation strength** sets how much.
4. Under **Paint**, choose **All VFX**, **Abilities**, or **Gun FX**.
5. Click **Apply Trippy**.

Gun FX means the weapon's effects: muzzle flash, tracers, impacts. It does not change how the gun itself looks. That is the Body + Gun tab.

The swatch shows the pattern and its speed, but not the difference between Sweep, Loop, and Cycle. You only see that in game.

## Body + Gun

This tab paints a moving pattern onto the hero's body and gun textures. The paint scrolls in game.

1. Pick a pattern, then set **Intensity** and **Phase**.
2. Set **Scroll speed**.
3. Under **Paint**, choose **Body + Gun**, **Body**, or **Gun**.
4. Click **Apply Paint**.

Body + Gun stacks with the Abilities tab instead of replacing it. You can run a gradient on the abilities and a painted body at the same time.

## Applying takes a moment the first time

Grimoire re-encodes every affected texture, which can take up to a minute the first time for a given look. The same look is instant after that.

Effects load when the game starts, so they show up the next time you **Launch Modded**. If Deadlock is already open, restart it.

## Exporting instead of applying

On the Abilities tab, **Export .vpk** saves the look as a standalone addon file instead of applying it in Grimoire. Use it to keep a look or share it. Body + Gun has no export.

## Removing them

Click **Remove** on either tab to undo it for that hero.

To see everything across every hero, open **Installed** and click the **Locker overrides** button. Abilities picks (Trippy included) are under **Ability Colors**. Body + Gun paint is under **Trippy Skins**. See [reviewing and removing overrides](/docs/locker-overrides).
