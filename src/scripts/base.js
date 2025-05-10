// Global script for every single page
// Mainly for utilities

/**
 * Returns a string if the platform is found, else null
 * @returns {string | null}
 */
function getOS() {
	const userAgent = navigator.userAgent,
		platform = navigator?.userAgentData?.platform || navigator?.platform,
		macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
		windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
		unixPlatforms = ["Linux", "BSD", "GNU"],
		iosPlatforms = ["iPhone", "iPad", "iPod"];

	if (windowsPlatforms.indexOf(platform) !== -1) {
		return "windows";
	} else if (macosPlatforms.indexOf(platform) !== -1) {
		return "macos";
	} else if (unixPlatforms.indexOf(platform) !== -1) {
		return "linux";
	} else if (/Android/.test(userAgent)) {
		return "android";
	}
	return null;
}
