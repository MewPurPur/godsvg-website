## GodSVG Website

This is the source code for the GodSVG website. This is a basic website built with Eleventy. It's open source, just like GodSVG, however, potential changes should be discussed in advance by opening an issue on this repository.

## Contributing

To start working on the project, do the following steps:

1. Clone the repository: `git clone https://github.com/MewPurPur/godsvg-website.git`

2. Open the repository and check whether you have Node.js installed by running `node --version` in a terminal. If the command is not found or it reports a number lower than 18, you will need to download and install Node.js.

3. Run `npm install` to intall dependencies.

4. Run `npx @11ty/eleventy --serve` to host a development web server (useful if you want the website to automatically refresh when files change), or alternatively `--watch` to rebuild the files without a web server.

Using an IDE like VSCode, with an extension for Nunjucks syntax highlighting that parses HTML files, is also recommended, as this website uses nunjucks syntax inside HTML files as opposed to `njk` files in order to improve JS/HTML/CSS completion for inline scripts. For example [Better Nunjucks](https://marketplace.visualstudio.com/items/?itemName=ginfuru.better-nunjucks).

The site is set to be built manually, rather than after each PR, so don't worry if you don't see your changes right away.

## Useful command

The script that can be run from the root folder - `./script-optimize-media.sh` - converts PNG to WebP and MP4 to WebM, this should be run every time new media is added.
