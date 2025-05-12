import { HtmlBasePlugin, InputPathToUrlTransformPlugin } from "@11ty/eleventy";
import markdownIt from "markdown-it";
import path from "node:path";
import * as sass from "sass";
import { readdirSync } from "node:fs";

export default async function(eleventyConfig) {
	const isDebug = process.argv.some(str => str.includes("serve") || str.includes("watch"));
	const returnData = {
		dir: {
			input: "src",
      		includes: "_includes",
			data: "_data",
			output: "_site"
		},
		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
	};

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

			// Map dependencies for incremental builds.
			this.addDependencies(inputPath, result.loadedUrls);

			return async (data) => {
				return result.css;
			};
		},
	});

	// Blog things
	eleventyConfig.addShortcode("blogimg", function(name, alt) {
		/** @type {string[]} */
		const e = this.page.url.split('/');
		const slug = e[e.length-1];
		return `![${alt}](/assets/blog/${slug}/${name})`
	});
	/** @type {markdownIt.Options} */
	const mdOptions = {
		html: true,
		breaks: true,
		linkify: true,
	};
	eleventyConfig.addTemplateFormats("md");
	eleventyConfig.addExtension("md", {
		outputFileExtension: "html",

		/** @param {string} inputContent; @param {string} inputPath */
		compile: async function(inputContent, inputPath) {
			// FIXME: Skipping files does not currently work; it writes files with "null" or "undefined" as content instead.
			//        https://www.11ty.dev/docs/languages/custom/#skipping-a-template-from-inside-of-the-compile-function
			if (!inputPath.startsWith("./src/articles/")) {
				return;
			}

			const md = markdownIt(mdOptions);
			let rendered = md.render(inputContent)
			return () => rendered;
		}
	});
	const articlesPath = path.join(returnData.dir.input, "articles");
	readdirSync(articlesPath)  // Moving over media files.
		.filter(file => file != "articles.json")
		.forEach(file => {
			const article = path.join(articlesPath, file);
			eleventyConfig.addPassthroughCopy({ [path.join(article, "media")]: `/assets/blog/${file}` });
			eleventyConfig.addPassthroughCopy({ [path.join(article, "cover.webp")]: `assets/blog/${file}/cover.webp` });
		});

	return returnData;
};