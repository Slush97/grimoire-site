---
title: "Tutorial: a custom soul container from Sketchfab"
description: Take a free 3D model off Sketchfab and turn it into a working soul container or spirit urn, start to finish.
slug: locker-glb-tutorial
order: 13
updated: 2026-10-11
---

# Tutorial: a custom soul container from Sketchfab

Grimoire turns any `.glb` file into a soul container or spirit urn. Sketchfab is the easiest place to get one. Budget about fifteen minutes for your first, and most of that is picking a model.

A spirit urn works the same way, with a few differences that are called out below.

## 1. Find a model

On [Sketchfab](https://sketchfab.com), search for what you want, then set two filters that matter:

- **Downloadable.** Most models on the site are view-only. Without this filter you will fall in love with something you cannot have.
- **License.** Every downloadable model has one. Most are Creative Commons and require crediting the author.

Keep the triangle count in mind. Sketchfab shows it on the model page, and a soul orb is a small prop that is on screen all the time. Under 50,000 triangles is comfortable. Above that, Grimoire warns you.

## 2. Download it as GLB

Click **Download 3D Model** and pick **GLB**. If it arrives as a `.zip`, open it and take out the file ending in `.glb`.

The **glTF** option gives you a `.gltf` with separate `.bin` and texture files. Grimoire will not take that. Download the GLB instead, or convert it to a single `.glb` first.

## 3. Import it

1. In Grimoire, open **Locker** and click the **General** card (the first one, before the heroes).
2. Open the **Soul Containers** tab, or **Spirit Urns** for an urn.
3. Click **Import Soul Container (GLB)**, or **Import Spirit Urn (GLB)**.
4. Drop your `.glb` onto the dropzone, or click to browse.

The preview shows up a moment later. It is built the same way as the final mod, so trust its shape and size.

## 4. Get it facing the right way

Most Sketchfab models arrive rotated wrong. This is normal.

A soul container starts on **Y-up** and an urn on **Auto**. If the model is lying down or upside down, try **Auto**, **Y-up**, **Z-up**, and **Flip Y**. For anything else, rotate each axis by hand.

Soul containers only:

- **Facing yaw** turns the model in place once it stands up.
- **Lock in place** (on by default) keeps the orb from tumbling in game. Facing yaw only works while it is on.

## 5. Check the size

This is the step people skip and regret.

**Soul container:** Grimoire sizes it for you, fitting the model's longest side to the stock orb. Tick **Hero scale** to see a hero next to it with the orb at their back hip, exactly where it sits in game, and check that it looks right and faces the right way. With Hero scale off, **Vanilla shell** draws a faint outline of the stock orb around your model, which is the faster sanity check.

**Spirit urn:** there is no hero preview. Set **Size** in Source units instead. The default of 28 is a good start, because an urn is bigger than a soul orb. Tick **Sit base on the ground** to anchor it by its base instead of its center, which is usually right for something that rests on a surface. Confirm the size in game.

## 6. Pick a soul glow

Soul containers only. Three choices under **Soul glow**:

- **Recolor** (the default) tints the glow to your model's main color. Usually the best-looking option.
- **Keep gold** ships the stock gold glow unchanged.
- **None** ships no particles, and the base game glow plays instead.

## 7. Build it

1. Check the name (it starts as the file name). Add notes or tick **Mark as NSFW** if you want.
2. If you already have a soul container (or urn) turned on, the bar at the bottom asks what to do with it. **Disable the current one** is the default. **Keep both enabled** leaves it on, but only one can load in game.
3. Click **Build & Import**.

Grimoire builds a normal local mod and turns it on. It shows up in the Locker and on **Installed**, and you delete it like any other mod. **Launch Modded** to see it.

Want a file instead of an install? **Export .vpk** builds it and saves it to disk.

## If something looks wrong

**The model has no texture in the preview.** Your GLB probably points at outside texture files instead of having them built in. Export it again with textures embedded.

**Grimoire says it has no mesh geometry.** The file loaded but has no actual mesh, usually a scene with only lights or cameras.

**It rejects the file.** It only takes `.glb`. A `.gltf`, `.fbx`, or `.obj` needs converting first.

**It warns about triangles.** Over 50,000 and it tells you. It still builds. A very heavy model can hurt in-game performance, so simplify the mesh if you can.

## Sharing what you made

The license on the Sketchfab model still applies to the VPK you built from it. Most Creative Commons licenses require crediting the original author, and some ban commercial use or sharing the file at all.

Check the license on the model page before you post your container anywhere, and credit the author.
