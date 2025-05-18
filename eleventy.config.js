import { HtmlBasePlugin, InputPathToUrlTransformPlugin } from "@11ty/eleventy";
import pluginRss from "@11ty/eleventy-plugin-rss";
import path from "node:path";
import * as sass from "sass";
import markdownIt from "markdown-it";
import fs from "node:fs";
import htmlmin from "html-minifier-terser";

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
	eleventyConfig.addGlobalData("site.url", "https://godsvg.com")
	eleventyConfig.addGlobalData("godsvg.version", "1.0-alpha9")

	// Plugins
	eleventyConfig.addPlugin(HtmlBasePlugin);
	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);
	eleventyConfig.addPlugin(pluginRss);

	// Filters & Shortcodes
	eleventyConfig.addAsyncFilter("pageExists", async function(url) {
		return this.ctx.collections.all.some(page => {
			const collectionUrl = page.url.replaceAll('/', ' ').trim();
			const argUrl = url.replaceAll('/', ' ').trim();
			return collectionUrl == argUrl;
		});
	});
	eleventyConfig.addAsyncShortcode("fetch", async function(url, type="text") {
		const page = await fetch(url);
		return await page.text();
	});

	// Assets
	eleventyConfig.addPassthroughCopy("src/assets");
	eleventyConfig.addPassthroughCopy("src/scripts");
	eleventyConfig.addPassthroughCopy("editor");

	// Dynamic collections
	eleventyConfig.addCollection("webPages", function(collectionsApi) {
		return collectionsApi.getAll()
			.filter(item => item.url.endsWith('/') || item.url.endsWith("html"))
			.filter(item => !["/404.html"].includes(item.url));
	});

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
				<img src="${url}" alt="${alt}" />
			</div>
		`.replaceAll('\t', "").replaceAll("    ", "")
	});

	eleventyConfig.addShortcode("blogcompare", function() {
		const args = [...arguments];
		const e = this.page.url.split('/').filter(e => e.length > 1);
		const slug = e[e.length-1];

		const items = args.length % 3 === 0 ? args : args.slice(0, args.length - 1);

		let html = '<div class="article-compare"><div class="article-compare-content">';

		for (let i = 0; i < items.length; i += 3) {
			const label = items[i];
			const img = items[i + 1];
			const alt = items[i + 2];

			html += `
				<div class="article-compare-side">
				<div class="article-compare-label">${label}</div>
				<img src="/assets/blog/${slug}/${img}" alt="${alt}" />
				</div>
			`;
		}

		html += '</div></div>';
		return html.replaceAll('\t', "").replaceAll("    ", "");
	});

	eleventyConfig.addShortcode("blogvid", function(name, alt) {
		const e = this.page.url.split('/').filter(e => e.length > 1);
		const slug = e[e.length-1];
		const url = `/assets/blog/${slug}/${name}`;
		return `
			<div class="article-video">
				<video controls preload="metadata" aria-label="${alt}">
					<source src="${url}">
					${alt ? `<p>${alt}</p>` : ''}
				</video>
			</div>
		`.replaceAll('\t', "").replaceAll("    ", "")
	});

	eleventyConfig.setLibrary("md", markdownIt({
		html: true,
		breaks: true,
		linkify: false,
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

	eleventyConfig.addShortcode("gh", function(username) {
		// Strip any leading "@".
		const clean = username.replace(/^@/, "");
		return `<a href="https://github.com/${clean}" target="_blank" rel="noopener noreferrer">${clean}</a>`;
	});

	// Minifying on release (https://github.com/terser/html-minifier-terser?tab=readme-ov-file#options-quick-reference)
	eleventyConfig.addTransform("htmlmin", function (content) {
		const out = (this.page.outputPath || "");
		if (out.endsWith(".html") || out.endsWith(".xml")) {
			const minified = htmlmin.minify(content, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: !isDebug,
				collapseInlineTagWhitespace: true,
				preserveLineBreaks: true,
				conservativeCollapse: true,
				collapseBooleanAttributes: true,
				minifyCSS: true,
				minifyJS: true,
			});
			return minified;
		}
		return content;
	});

	return returnData;
};