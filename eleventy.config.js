import { HtmlBasePlugin, InputPathToUrlTransformPlugin } from "@11ty/eleventy";
import path from "node:path";
import * as sass from "sass";
import markdownIt from "markdown-it";
import fs from "node:fs";

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
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
	eleventyConfig.addAsyncFilter("pageExists", async function(url) {
		return this.ctx.collections.all.some(page => {
			const collectionUrl = page.url.replaceAll('/', ' ').trim();
			const argUrl = url.replaceAll('/', ' ').trim();
			return collectionUrl == argUrl;
		});
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
		const e = this.page.url.split('/').filter(e => e.length > 1);
		const slug = e[e.length-1];
		const url = `/assets/blog/${slug}/${name}`;
		return `
			<div class="article-image">
				<a href="${url}">
					<img src="${url}" alt="${alt}" />
				</a>
				<div class="article-image-metadata">
					<span>${name}</span>
				</div>
			</div>
		`.replaceAll('\t', "").replaceAll("    ", "")
	});
	eleventyConfig.setLibrary("md", markdownIt({
		html: true,
		breaks: true,
		linkify: true,
	}));
	eleventyConfig.amendLibrary("md", (mdLib) => mdLib.enable("code"));
	const articlesPath = path.join(returnData.dir.input, "articles");
	fs.readdirSync(articlesPath)  // Moving over media files.
		.filter(filename => {
			filename = path.join(articlesPath, filename);
			return fs.existsSync(filename) && fs.lstatSync(filename).isDirectory();
		})
		.forEach(dir => {
			const inDir = path.join(articlesPath, dir);
			const outDir = eleventyConfig.getFilter("slugify")(dir);
			eleventyConfig.addPassthroughCopy({ [path.join(inDir, "media")]: `/assets/blog/${outDir}` });
			eleventyConfig.addPassthroughCopy({ [path.join(inDir, "cover.webp")]: `/assets/blog/${outDir}/cover.webp` });
		});

	// Minifying on release (https://github.com/terser/html-minifier-terser?tab=readme-ov-file#options-quick-reference)
	if (!isDebug) {
		eleventyConfig.addTransform("htmlmin", function (content) {
			if ((this.page.outputPath || "").endsWith(".html")) {
				let minified = htmlmin.minify(content, {
					useShortDoctype: true,
					removeComments: true,
					collapseWhitespace: true,
					collapseBooleanAttributes: true,
					minifyCSS: true,
					minifyJS: true
				});
				return minified;
			}
			return content;
		});
	}

	return returnData;
};