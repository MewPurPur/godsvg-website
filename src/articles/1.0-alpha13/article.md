---
slugcat: 1.0-alpha13
title: "New prerelease: GodSVG 1.0-alpha13"
tagline: This prerelease fixes a regression that prevented users from exporting their SVGs to other image formats.
author: MewPurPur
tags: release
date: 2025-11-04
release: 1.0-alpha13
prerelease: true
---

This prerelease fixes a major regression from the previous alpha. The rework to the dropdown widget broke it inside the export configuration dialog, making it impossible to choose an image format for exporting other than SVG. Now this has been fixed and you can once again export as PNG, JPEG, or WebP.

When this bug was reported, I was already starting to work on some other things, so I decided to include those too. Popups can now have submenus, which may be utilized more in the UI in the future, but for now it's only used for the tab actions popup.

{% blogimg "submenu.webp", "A submenu with various options to close multiple tabs." %}

The prerelease also fixes a regression where changing the theme didn't immediately update some colors. It also slightly tweaks the base color of the default light theme.

## Translations

Thanks to {% gh "AlejandroMoc" %} for helping to keep existing translations up to date.
