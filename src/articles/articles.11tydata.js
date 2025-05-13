export default {
    layout: "article.njk",
    tags: "article",
	permalink: function ({ slugcat }) {
		return `/article/${this.slugify(slugcat)}/index.html`;
	},
};
