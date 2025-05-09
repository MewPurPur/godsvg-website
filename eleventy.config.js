import { HtmlBasePlugin, InputPathToUrlTransformPlugin } from "@11ty/eleventy";
import path from "node:path";
import * as sass from "sass";

export default async function(eleventyConfig) {
	const isDebug = process.argv.some(str => str.includes("serve") || str.includes("watch"));

	// Data
	eleventyConfig.addGlobalData("godsvg.version", "1.0-alpha8")

	// Plugins
	eleventyConfig.addPlugin(HtmlBasePlugin);
	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);

	// Filters & Shortcodes
	eleventyConfig.addFilter("pageExists", function(url) {
		return this.ctx.collections.all.some(page => page.filePathStem === url);
	});
	
	// Assets
	eleventyConfig.addPassthroughCopy("src/assets");
	eleventyConfig.addPassthroughCopy("src/scripts");
	eleventyConfig.addPassthroughCopy("editor");

	// Sass / Scss
	eleventyConfig.addTemplateFormats("scss")
	eleventyConfig.addExtension("scss", {
		outputFileExtension: "css",
		useLayouts: false,

		compile: async function (inputContent, inputPath) {
			let parsed = path.parse(inputPath);
			if(parsed.name.startsWith("_")) {
				return;
			}

			// https://sass-lang.com/documentation/js-api/interfaces/stringoptions/
			let result = sass.compileString(inputContent, {
				style: isDebug ? "expanded" : "compressed",
				loadPaths: ["src/styles"]
			});

			// Map dependencies for incremental builds
			this.addDependencies(inputPath, result.loadedUrls);

			return async (data) => {
				return result.css;
			};
		},
	});

	return {
		dir: {
			input: "src",
      		includes: "_includes",
			data: "_data",
			output: "_site"
		},
		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
	};
};