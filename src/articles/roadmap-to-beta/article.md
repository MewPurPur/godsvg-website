---
slugcat: roadmap-to-beta
title: "Roadmap to beta-ready GodSVG"
tagline: Let's go over why GodSVG is still in alpha after more than 3 years of development. What are the remaining obstacles?
author: MewPurPur
tags: misc
date: 2026-06-21
---

The cover artwork for this blog post was drawn by CoilleNohy.

A few days ago marked three years since I open-sourced GodSVG. Despite more than two years of alpha releases, it still isn't beta-ready. Let's go over why.

## Where we are right now

Most of the last year was spent improving stability, usability, and polish. The UI was refined, themes were added, keyboard focus navigation was introduced, and countless bugs were fixed. While the changes may not be obvious at a glance, they significantly improved the day-to-day experience of using GodSVG. The 16th alpha will release in a few days, fixing more bugs and improving the experience further.

If GodSVG is relatively stable now, why is it still in alpha?

In short, there are a handful of foundational problems that affect the editor's future. Once those are addressed, I expect the transition from alpha to beta to be relatively quick. I'll go over these foundational problems in detail in the rest of the article.

## Reason 1: The inspector needs a big rework

GodSVG's inspector hasn't been significantly touched since the early alphas. The issues with the current inspector boil down to elements only being able to expose a limited set of attributes. Supporting more attributes currently means making the inspector heftier, so I've decided against adding more for the time being. This is why things like stroke-dasharrays are still not accessible through the UI and need to be manually typed into the code editor.

I've avoided spending much time fixing issues in the current inspector, of which there are many. After considering many reworks and their tradeoffs, I've concluded that I need to move away from the current monolithic design and make a more standard inspector, with a hierarchy of elements and a list of attributes for the current selected ones. There are some downsides to this, so my ideas have some non-standard aspects, but I'll see how they work out in practice.

I could make a basic inspector fairly quickly, but I wouldn't be satisfied with that. I want an implementation that I trust will scale well into the future and support things like:
- More attributes and elements
- Non-native attributes and elements
- Proper focus navigation and fast keyboard navigation
- Editing the same attribute of multiple elements at once
- Custom inspector widgets, such as GUI for gradients
- Attribute-specific options, such as baking a transform
- Element-specific options, such as templates for paths (for example, easy regular shapes and stars)
- And more

This rework has been pending for a long time and it blocks a lot of further work.

## Reason 2: Handles need a big rework

Unlike the inspector, where I already feel like I have a clear direction, the viewport's handle system is a more intricate problem. Its shortcomings are obvious, but coming up with a solution that doesn't introduce new usability issues has proven much harder.

The most critical shortcomings I've identified are:

- New bezier handles have the new point and the controls overlap and also move with the main point if the command is relative, which is extremely inconvenient (can be partially solved without a rework, but I'd rather not complicate the system without fixing it)
- If multiple handles overlap, you might be simply unable to select the one you want from the viewport
- There are unexpected behaviors around paths, especially with some relative commands, horizontal or vertical lines, and path closures; moving a handle around can move other ones in very unexpected ways

A rework should solve this, which is already a tall order, but there are other problems. The reality is that handles are simply very awkward to use and need more than patchwork.

Handles have few convenience utilities and many aspects of them are half-baked. A lot of things are ambiguous, such as horizontal and vertical handles being constrained but looking the same as regular lines, or polygons and polylines looking the same as paths, but lacking shortcuts. Controls are unintuitive, being unable to select multiple handles and move them at once. Transformation mechanics don't exist. Handles have no viewport navigation, like "View in Inspector" but for handles.

This rework has been pending for longer than the inspector rework, but it doesn't block as many things, so it's a little less urgent.

## Reason 3: Smaller blockers

There isn't much else blocking a beta release. Only three other things come close, but I might reluctantly publish a beta even if some of them are missing.

**Support for numeric units:** Many SVGs have units like "mm", "pt", "px" for some numeric attributes. This is currently unsupported by GodSVG and those units will be wiped, breaking some valid SVGs. And I want to prevent all common cases of GodSVG breaking valid SVGs before entering beta. This has been challenging because not all numeric attributes support units, so many fundamental systems need changing.

**Support for text:** Godot Engine - the tool used to make GodSVG - currently doesn't support text in its SVGs. Even if text elements become native, they won't render, and external tools would be required to view the text and and export it to raster formats. An option to bake the text into a path has been considered, but not tried yet - it will always be a good manual option to have and it could be used automatically in the rendering step. This is somewhat blocked by the inspector rework, as it would be contextual for text elements. Since there's a chance that these issues are resolved on their own by the tools GodSVG is built on top of, I want to delay this as much as possible, as all the other blockers are things I can only solve myself.

**Code editor native tooling:** Aside from adding more standard text editor tooling, such as Search & Replace, I've been thinking of integrating the native SVG elements into it more deeply, for example knowing where a circle element starts and ends in the code, so that hovering it inside the text editor is reflected in the whole application. This might require foundational changes, so I think it would be nice to look into it during the alpha phase.

## Why am I not focusing more on the blockers?

These blockers have been thought about extensively. I've made several unsuccessful attempts to rework handles, the inspector, solve the issue with numeric units, and understand the deal with Godot Engine and its SVG text rendering.

These attempts have slowed down over the last year, as every release cycle, I found some quick wins that were unrelated to the reworks and would still improve the workflows of many users. These quick wins are running out, so big reworks should soon return to the forefront.

Once the big blockers are lifted, you can expect a few more alphas to realize their potential and make sure they work well. This could be followed by a relatively short beta phase, since most of the polishing work has been already done over the last year. Basically, I've traded a longer alpha phase for a shorter beta phase, and I don't think this was a bad decision, personally.

GodSVG is a hobby project that I dedicate a lot of effort and time to try and push to the finish line. But of course, most of my time goes to my day job and spending time on things like sleeping, chores, staying healthy, having some social life. As of now, supporting me by donating is the best way to help me work faster and get the tool beta-ready.
