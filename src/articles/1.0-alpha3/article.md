---
slugcat: 1.0-alpha3
title: "New prerelease: GodSVG 1.0-alpha3"
tagline: After four months of development, I'm proud to present GodSVG's next big step forward, a prerelease with big improvements in all areas.
author: MewPurPur
tags: release
date: 2024-04-18
release: 1.0-alpha3
prerelease: true
---

After four months of development, I'm proud to present GodSVG's next big step forward: Alpha 3. This prerelease has big improvements in all areas.

# Viewport improvements

Finally, I've implemented infinite zoom - something every self-respecting SVG editor should have. Until now, zooming in could easily get very laggy, and big SVGs couldn't even be fully zoomed in. Now SVGs remain crisp at every zoom level and don't cause lag spikes.

I've also made handles in the viewport far more useful. Right-clicking them now opens the same context popup as in the inspector. Shapes can also now be added at a desired position by right-clicking the empty space of the viewport.

{% blogvid "viewport_actions.webm", "Video of adding and adjusting a shape from the viewport" %}

{% gh "Kiisu-Master" %} and I also improved the viewport controls. Zooming can now be centered on the cursor, and middle mouse is now nicer to use.

# Functional improvements

A number of improvements in this prerelease add new powers to GodSVG.

The ability to drag and drop in the inspector has been implemented by me, {% gh "SeremTitus" %}, and {% gh "Kiisu-Master" %}. This finally enables you to adjust the SVG hierarchy without needing the code editor.

{% blogvid "drag_and_drop.webm", "Video of using elements drag and drop" %}

I've added the ability to change the type of path commands. I've also added an initial version of an optimizer, which uses this new ability in some limited ways. Unlike attribute formatting, the "Optimize" action must be triggered manually.

The important transform attribute has been implemented by me and {% gh "DevPoodle" %}. It comes with its own widget for convenience. Handles for editing it from the viewport are planned for the future.

{% blogimg "transforms.webp", "Image of the transform field and its popup" %}

New elements can now be added in the inspector by right-clicking the empty space.

The SVG renderer - [ThorVG](https://github.com/thorvg/thorvg) - saw a lot of bugfixes in the last four months, improving the accuracy of the presented graphic and the rasterized PNGs on export.

GodSVG's performance has been greatly improved. Rebuilding an SVG with a large number of paths is much faster now, as I've sped up the construction of pathdata fields considerably. This is a risky change, so I'll watch out for regressions. {% gh "Kiisu-Master" %} also fixed an issue that caused a lot of strain on the GPU on some systems.

# A lot more configurability

I've reworked the UI of the settings menu, which allowed us to expand it with a lot more settings. Attribute formatting settings have been expanded and moved there, and XML formatting settings were added. I've also implemented settings for theming and I made shortcuts configurable (which also serves as documentation!)

{% blogvid "settings.webm", "Video of the new settings menu" %}

The scaling approach of GodSVG was changed to reduce the blurriness and give the user more control over the size of the layout, thanks to a new UI scale setting implemented by {% gh "Kiisu-Master" %}.

# UX improvements

I've improved the color picker by adding numbers next to the sliders for more precise configuration of colors, as well as Undo/Redo functionality.

I've also improved the fallback file dialog and added an option to set it as the default. If you like it, you can now choose it over the OS file dialog in the settings.

And finally, {% gh "Kiisu-Master" %} has added a Save functionality with a Ctrl+S shortcut. The implementation is a bit awkward at the moment, but it's still a quicker way to save an SVG than exporting.

# Internal improvements

{% gh "Kiisu-Master" %} helped me a lot with some internal improvements. Translations have been moved to the .po format, which is a much better experience for translators. There are now also workflows for continuous integration with Windows and Linux. If you're logged into Github, you can now test the latest development builds. MacOS workflows will be added soon.

# Other goodies

- The &lt;stop&gt; element has been implemented by {% gh "RedFurryDemon" %}. Although it can't be added through the GUI, this makes it easier to edit it in imported graphics or ones made through the code editor.
- Translations in Bulgarian and German have been available since the first alpha release, and {% gh "Vovkiv" %} has now also added Russian and Ukrainian.
- I've refined the "About" dialog.
- A lot of smaller improvements and bugfixes by me, {% gh "Qainguin" %}, {% gh "ilikefrogs101" %}, {% gh "Kiisu-Master" %}... too many to list. I'll start listing them when GodSVG becomes more stable.