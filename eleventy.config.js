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
	eleventyConfig.addGlobalData("godsvg.version", "1.0-alpha15")
	eleventyConfig.addGlobalData("site.url", isDebug ? "" : "https://godsvg.com")

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

			return () => result.css;
		},
	});

	// Blog things
	eleventyConfig.addShortcode("blogimg", function(name, alt) {
		const e = this.page.url.split('/').filter(e => e.length > 1);
		const slug = e[e.length - 1];
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
		const slug = e[e.length - 1];

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

	eleventyConfig.addShortcode("blogswitch", function(label1, img1, alt1, label2, img2, alt2) {
		const e = this.page.url.split('/').filter(e => e.length > 1);
		const slug = e[e.length - 1];
		const uniqueId = Math.random().toString(36).substr(2, 9);

		const html = `
		<script>
		if (!window.toggleSwitch) {
			window.toggleSwitch = function(id) {
				const title = document.getElementById('switch-title-' + id);
				const img1 = document.getElementById('switch-img1-' + id);
				const img2 = document.getElementById('switch-img2-' + id);

				if (img1.classList.contains('active')) {
					img1.classList.remove('active');
					img2.classList.add('active');
					title.textContent = '${label2}';
				} else {
					img2.classList.remove('active');
					img1.classList.add('active');
					title.textContent = '${label1}';
				}
			};
		}
		</script>
		<div class="article-switch">
			<div class="article-switch-inner">
				<div class="article-switch-header">
					<div class="article-switch-title" id="switch-title-${uniqueId}">${label1}</div>
					<button class="article-switch-toggle" onclick="toggleSwitch('${uniqueId}')">Switch</button>
				</div>
				<div class="article-switch-content">
					<img id="switch-img1-${uniqueId}" class="active" src="/assets/blog/${slug}/${img1}" alt="${alt1}" />
					<img id="switch-img2-${uniqueId}" src="/assets/blog/${slug}/${img2}" alt="${alt2}" loading="lazy" />
				</div>
			</div>
		</div>
		`;
		return html.replaceAll('\t', "");
	});

	eleventyConfig.addShortcode("blogcomparetoswitch", function(label1, img1, alt1, label2, img2, alt2, label3, img3, alt3) {
		const e = this.page.url.split('/').filter(e => e.length > 1);
		const slug = e[e.length - 1];
		const uniqueId = Math.random().toString(36).substr(2, 9);

		const html = `
		<script>
		if (!window.toggleSwitch) {
			window.toggleSwitch = function(id) {
				const title = document.getElementById('switch-title-' + id);
				const img2 = document.getElementById('switch-img2-' + id);
				const img3 = document.getElementById('switch-img3-' + id);

				if (img2.classList.contains('active')) {
					img2.classList.remove('active');
					img3.classList.add('active');
					title.textContent = '${label3}';
				} else {
					img3.classList.remove('active');
					img2.classList.add('active');
					title.textContent = '${label2}';
				}
			};
		}
		</script>
		<div class="article-compare">
			<div class="article-compare-content">
				<div class="article-compare-side">
					<div class="article-switch-title">${label1}</div>
					<img src="/assets/blog/${slug}/${img1}" alt="${alt1}" />
				</div>
				<div class="article-switch" style="margin:0">
					<div class="article-switch-inner">
						<div class="article-switch-header">
							<div class="article-switch-title" id="switch-title-${uniqueId}">${label2}</div>
							<button class="article-switch-toggle" onclick="toggleSwitch('${uniqueId}')">Switch</button>
						</div>
						<div class="article-switch-content">
							<img id="switch-img2-${uniqueId}" class="active" src="/assets/blog/${slug}/${img2}" alt="${alt2}" />
							<img id="switch-img3-${uniqueId}" src="/assets/blog/${slug}/${img3}" alt="${alt3}" loading="lazy" />
						</div>
					</div>
				</div>
			</div>
		</div>
		`;
		return html.replaceAll('\t', "");
	});

	eleventyConfig.addShortcode("blogvid", function(name, alt) {
		const e = this.page.url.split('/').filter(e => e.length > 1);
		const slug = e[e.length - 1];
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

	eleventyConfig.addShortcode("gh", function(username) {
		// Strip any leading "@".
		const clean = username.replace(/^@/, "");
		return `<a href="https://github.com/${clean}">${clean}</a>`;
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

	// XML / RSS things
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addTemplateFormats("xsl");
	eleventyConfig.addWatchTarget("**/*.xsl");
	eleventyConfig.addExtension("xsl", {
		outputFileExtension: "xsl",
		compile: function (inputContent, inputPath) {
			return function (data) {
				return inputContent;
			};
		},
	});

	// Minifying on release (https://github.com/terser/html-minifier-terser?tab=readme-ov-file#options-quick-reference)
	eleventyConfig.addTransform("htmlmin", function (content) {
		const out = (this.page.outputPath || "");
		if (out.endsWith(".html")) {
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
