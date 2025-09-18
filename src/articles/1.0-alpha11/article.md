---
slugcat: 1.0-alpha11
title: "New prerelease: GodSVG 1.0-alpha11"
tagline: Introducing themes! Choose between the default dark, light, and black/OLED themes, or make your custom theme.
author: MewPurPur
tags: release
date: 2025-09-18
release: 1.0-alpha11
prerelease: true
---

The 11th alpha of GodSVG introduces themes, with "Dark", "Light", and "Black (OLED)" presets. There are also many new options, enhancements, and major bugfixes.

## Configurable themes

GodSVG can now be themed through two new settings, "Base color" and "Accent color". They craft a theme for the whole application. The old default theme is now called the dark theme. Defining themes with just two colors required major changes to the theming logic, so GodSVG's looks have changed slightly across the board, even in the dark theme. In my opinion these changes are all for the better, but you can see a comparison here:

{% blogswitch "Old theme", "old_theme.webp", "Image of the old default theme", "New dark theme", "new_dark_theme.webp", "Image of the new dark theme" %}

There is also a new black theme and a light theme. The light theme was particularly challenging, it required me to implement highlighter presets, because the SVG text had to be dark for it. I think it turned out amazing in the end. Here's how both of them look:

{% blogcompare "Black (OLED)", "black_theme_example.webp", "Image demonstrating the black theme", "Light", "light_theme_example.webp", "Image demonstrating the light theme" %}

These are the main presets, but you can configure the base and accent colors to fine-tune the interface to your liking. Here's some footage of the possibilities:

{% blogvid "custom_theming.webm", "Video showcasing the ability to configure your own theme" %}

Aside from aesthetic preferences, themes serve important functional purposes. Light themes are useful in bright places, like under direct sunlight - GodSVG being so dark made it practically unusable when you're outside. Dark themes are more appropriate in dark places and help extend battery life. The black theme helps battery life even more, and it is particularly useful for OLED screens.

## Settings menu improvements

The description panel is now more persistent and doesn't hide when dropdowns or color pickers are active. This is very useful, given that in this update I've also added several preview types in the settings menu to instantly show you the effect of each setting.

For example, the basic description is now a preview type. I've improved it by adding warnings to some descriptions, to communicate when the setting has no effect in the current configuration, or when it can't be changed because of your platform.

Another preview type displays a code sample to demonstrate syntax highlighting colors. Yet another type of preview shows a colored label, which is used to demonstrate the valid, warning, and error text colors.

A more complex type is the formatter type, which shows how a curated SVG would be affected by the hovered formatter setting. I've wanted to add this for a long time, which is why these settings didn't have descriptions before ("Show, don't tell" as they say... wait, does this even apply to creative software?)

The coolest type of preview is easily the one that simulates a custom viewport, it is used to preview handle configs, selection rectangle settings, and the canvas and grid colors.

{% blogvid "setting_previews.webm", "Video demonstrating setting previews" %}

There's one other improvement. In the shortcuts tab, you can now undo your changes (unless, of course, you brick the "Undo" shortcut while you're inside it, then it won't be of any help). For other tabs, this hasn't been implemented yet.

## More configuration options

This update adds a lot more configurability than just themes. You can now also change the appearance of the animated selection rectangle - its thickness, speed, granularity, and colors.

Moreover, display settings are now in their own dedicated section, and there are a few new ones. You can now configure VSync and cap the max FPS of the application. You can also make it so GodSVG always keeps the screen on despite inactivity, preventing the screensaver from activating.

The panning speed in the viewport was too fast, especially with how inconsistent the sensitivity of touchpads is between devices. I've made it configurable with a new setting, and the default is now slightly slower.

{% blogvid "selection_rect.webm", "Video demonstrating selection rectangle configuration settings" %}

## Other improvements

I've added line numbers to the code editor.

The &lt;radialGradient&gt; element finally has support for "fx" and "fy" attributes. They were implemented alongside an improvement to the gradient previews, which improves its accuracy and takes all attributes into account.

{% blogimg "focal_gradient.webp", "Image demonstrating a radial gradient with a focal point" %}

When you press `Ctrl` while dragging a bezier curve handle, it will now align itself smoothly to the previous curve or line. This new utility was implemented by {% gh "Jordyfel" %}. Note that this currently doesn't work around the ends of subpaths.

Godot Engine, the tool we use to make GodSVG, just had a new version that we've migrated to. This new version finally made it possible to address the blurriness of icons at high UI scales.

{% blogcompare "Before", "blurry_icons.webp", "Image of the old blurry icons", "After", "sharp_icons.webp", "Image of the new sharp icons" %}

The new Godot Engine update also added options that allowed me to reduce the executable size a little bit - despite all the new features, alpha 11 has a smaller executable size on all platforms.

The camera is now saved individually for each tab. When you open a tab for the first time, it'll be centered like before, but if you switch to another time and then back, the camera will be the same way you left it. This is session-based, nothing is preserved after closing GodSVG.

The custom file dialog got a few small improvements. Undo and Redo buttons were added. The "Folder up" button and directory path field were changed into a more readable widget. Right-clicking now has a new option to show files and folders in the file manager.

{% blogvid "new_file_dialog_nav.webm", "Video demonstrating the new file dialog navigation" %}

The logic for handling unstable markup (markup that can't be parsed) has been improved. If you import an SVG with a small parsing mistake, it won't automatically reset to an empty SVG anymore, instead it will focus on the code editor and prompt you to solve the issue. It won't reset to an empty SVG unless you make actions outside of the code editor.

## Fixed formatters and parsers

GodSVG's formatters and parsers have had their issues addressed in this release.

The two most complex parsers - for pathdata and transform lists - had many edge cases, and if an imported SVG had those edge cases, it could get corrupted. This shouldn't happen with compliant SVGs anymore thanks to a rewrite to these parsers. The new implementations are very elaborate and should finally be fully robust.

The option to remove unrecognized XML structures wasn't working correctly and was removed for now. Formatting an XML with spaces instead of tabs was not working correctly for closing tags, which has now been fixed. Shortening numbers using exponents was not working correctly for small negative numbers - also fixed.

## Other bugfixes

In the viewport, the graphic was displayed incorrectly when percentages were used in SVGs with a different width and height from the viewbox. When exporting the graphic, elements would be misplaced. This has now been addressed.

On the experimental Android build, immersive mode was disabled, which basically means it's not forced to fullscreen anymore. Phones usually have rounded corners and camera cutouts, which made things around the edges hard, if not impossible to click, and this has now been addressed by this change.

I reworked the shortcut system, which should result in shortcuts no longer triggering erroneously when dialogs or popups are around. Buttons that are bound to a shortcut also received some fixes - their highlight no longer triggers if the shortcut isn't accessible, and it triggers properly if the button is hovered. Also, the highlight duration now updates if the shortcut is pressed again during it.

Smaller bugfixes:

- Fixed undefined behavior with tab tooltips in rare scenarios (by {% gh "HuntJSparra" %})
- Various fixes to the selection rectangle
- Fixed tab navigation not working in the "About" menu and the settings menu
- Fixed equal sign in the wrong place within an element not triggering error syntax highlighting immediately
- Fixed "Show savedata folder" option showing even if it can't be used
- Fixed color picker not synchronizing when using a color keyword and then changing to the old color
- Fixed issue where the rotation of elliptical path commands uses different precision in the element than the field representing it
- Various small fixes and tweaks to UI elements throughout the application
- Fixed various issues with reference images
- Fixed built-in file dialog not hiding the search field when you start typing the file name
- Small fixes to the nametoken validation logic with foreign characters
- MacOS: Fixed GodSVG not showing up when choosing "Open With..." on SVG files
- Web: Asterisks for unsaved tabs are now removed (since tabs aren't bound to files on web)

## Translations

In the "About" menu in the app, you can now easily copy translators' emails as you hover them.

Thanks to {% gh "freeducks-debug" %}, {% gh "williamchange" %}, {% gh "Kiisu-Master" %}, {% gh "JinEnMok" %}, and {% gh "jas31415" %} for keeping existing translations up to date!
