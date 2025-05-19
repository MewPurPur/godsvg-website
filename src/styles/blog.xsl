<xsl:stylesheet
	version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:atom="http://www.w3.org/2005/Atom"
	exclude-result-prefixes="atom"
>
	<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
	<xsl:template match="/">
		<html xmlns="http://www.w3.org/1999/xhtml">
			<head>
				<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
				<title>Web Feed • <xsl:value-of select="atom:feed/atom:title"/></title>
				<link rel="stylesheet" type="text/css" href="/styles/blog.xsl.css"></link>
			</head>
			<body>
				<section class="alert">
					<p><strong>This is a web feed</strong>, also known as an RSS feed.</p>
					<p><strong>Subscribe</strong> by copying the address bar URL into your feed reader.</p>
					<a target="_blank">
						<xsl:attribute name="href">
							<xsl:value-of select="atom:link[@rel='self']/@href"/>
						</xsl:attribute>
						<xsl:value-of select="atom:link[@rel='self']/@href"/>
					</a>
				</section>
				<section>
					<xsl:apply-templates select="atom:feed" />
				</section>
				<section>
					<h2>Recent entries</h2>
					<xsl:apply-templates select="atom:feed/atom:entry" />
				</section>
			</body>
		</html>
	</xsl:template>

	<!-- Feed preview info -->
	<xsl:template match="atom:feed">
		<h1>
			<xsl:value-of select="atom:title"/> - Web Feed Preview
		</h1>
		<p>This RSS feed provides the latest posts from the <xsl:value-of select="atom:title"/></p>
		<a class="head_link" target="_blank" href="https://godsvg.com">
			Back to website &#x2192;
		</a>
		<h2>What is a web feed?</h2>
		<p>
			A web feed, or alternatively called an RSS feed, is a data format that users can plug into some feed readers <i>(or some browsers)</i> in order to get notifications when new posts are available.
		</p>    
		<ul>
			<li>
				<strong>Lightweight</strong>. There is no CSS styling or any fancy rendering required when using RSS feeds.
			</li>
			<li>
				<strong>View everything</strong>. Unlike mailing lists, past entries will always be available to you.
			</li>
			<li>
				<strong>Privacy-first</strong>. While we do no data-collecting, ads, or any fancy JavaScript framework wizardry,
				other websites do collect your data and web feeds are a great way to read blogs while avoiding them doing so, as feeds only download XML files and never send anything away from your device.
			</li>
		</ul>
		
		<!--
			Leaving this for GodSVG 2, when we inevitably get bought out by Microsoft - FlooferLand
		 -->
		<!--p>
			We use JavaScript and collect private user information on https://godsvg.com industries, so this is a great alternative to viewing our posts for the odd viewers that don't wish us to send their Real Name, Phone Number, Email Address, Public IP Address, and more identifiable information to our partners.
		</p-->
	</xsl:template>

	<!-- Tiny blog post previews -->
	<xsl:template match="atom:entry">
		<div class="entry">
			<h3>
				<a target="_blank">
					<xsl:attribute name="href">
						<xsl:value-of select="atom:link[@rel='alternate']/@href"/>
					</xsl:attribute>
					<xsl:value-of select="atom:title"/>
				</a>
			</h3>
			<p>
				<xsl:value-of select="atom:summary" disable-output-escaping="yes" />
			</p>
			<small>
				Published: <xsl:value-of select="atom:updated" />
			</small>
		</div>
	</xsl:template>
</xsl:stylesheet>
