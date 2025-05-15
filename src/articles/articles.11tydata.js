export default {
	layout: "article.njk",
	tags: "articles",
	eleventyComputed: {
		isRetroactive: data => {
			let postTs = new Date(data.page.date).getTime();
			return postTs < new Date("2025-05-10").getTime();
		}
	},
	permalink: function ({ slugcat }) {
		return `/article/${this.slugify(slugcat)}/index.html`;
	},
};