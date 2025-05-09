## GodSVG Website

This is the source code for the GodSVG website. This is a basic website built with Eleventy. It's open source, just like GodSVG, however, potential changes should be discussed in advance by opening an issue on this repository.

## Contributing

1. Clone the repository, then follow the ["Install/run part of Eleventy's docs"](https://www.11ty.dev/docs/#install-eleventy)

    - An extension for Nunjucks syntax highlighting that parses HTML files is also recommended _(for example [Better Nunjucks](https://marketplace.visualstudio.com/items/?itemName=ginfuru.better-nunjucks))_, as this website uses nunjucks syntax inside HTML files as opposed to `njk` files in order to improve JS/HTML/CSS completion for inline scripts.

2. Install `npx`, and use `npx @11ty/eleventy --serve` to host a development web server, or alternatively `--watch` in order to rebuild the files without a web server.

    - _Note: The web server is especially useful if you want the website to automatically refresh when file(s) change._
