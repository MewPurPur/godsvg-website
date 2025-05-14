export default {
    layout: "article.njk",
    tags: "articles",
	permalink: function ({ slugcat }) {
		return `/article/${this.slugify(slugcat)}/index.html`;
	},
};
