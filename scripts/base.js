// Global script for every page, mainly for utilities.

/**
 * Returns a string if the platform is found, else null. This can't be 100% reliable.
 * @returns {string | null}
 */
function detectOS() {
	const userAgent = navigator.userAgent,
		platform = navigator?.userAgentData?.platform || navigator?.platform,
		macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
		windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
		// iosPlatforms = ['iPhone', 'iPad', 'iPod'],

	if (macosPlatforms.indexOf(platform) !== -1) {
		return 'macos';
	// } else if (iosPlatforms.indexOf(platform) !== -1) {
	// 	return 'ios';
	} else if (windowsPlatforms.indexOf(platform) !== -1) {
		return 'windows';
	} else if (/Android/.test(userAgent)) {
		return 'android';
	} else if (/Linux/.test(platform)) {
		return 'linux';
	}
	return null;
}
