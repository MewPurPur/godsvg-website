function setDownloadButtons() {
	const platform = detectOS();
	const mainDownloadDiv = document.getElementById("main-download");
	const otherDownloadsDiv = mainDownloadDiv.nextElementSibling;

	if (platform) {
		mainDownloadDiv.innerHTML = `
		<a href="${downloads[godsvg.version][platform]}" class="download-button">
			<img src="assets/platforms_${platform}.svg" class="platform-icon" alt="${platform} logo">
			<div>
				<div class="small-text">Download for</div>
				<div class="big-text">${platformInfo.displayNames[platform]}</div>
			</div>
		</a>`;
		const dropdownButton = otherDownloadsDiv.querySelector(".dropdown-trigger");
		if (dropdownButton) {
			dropdownButton.childNodes[0].textContent = "Other downloads";
		}
	} else {
		mainDownloadDiv.style.display = "none";
	}

	const links = otherDownloadsDiv.querySelectorAll("[platform]");
	links.forEach(link => {
		if (link.getAttribute("platform") === platform) {
			link.remove();
		}
	});
}

function toggleContent(tab_idx) {
	const content = [
		document.getElementById("features-content"),
		document.getElementById("faq-content"),
		document.getElementById("donate-content")
	];

	for (var i = 0; i < 3; i++) {
		content[i].style.display = (tab_idx === i) ? "block" : "none";
	}

	const tabs = document.querySelectorAll(".tab");

	tabs.forEach(function(tab, index) {
		if (index === tab_idx) {
			tab.classList.add("selected");
			tab.classList.remove("hover");
			tab.style.cursor = "default";
		} else {
			tab.classList.remove("selected");
			tab.style.cursor = "pointer";
		}
	});
}

function activateTab(tabIndex) {
	toggleContent(tabIndex);
	const container = document.getElementById("tab-container");
	if (container) {
		container.scrollIntoView({ behavior: "smooth", block: "start" });
	}
}

// Initialize when DOM is loaded.
document.addEventListener("DOMContentLoaded", function() {
	setDownloadButtons();
	const hash = window.location.hash.toLowerCase();
	if (hash === "#features") {
		activateTab(0);
	} else if (hash === "#faq") {
		activateTab(1);
	} else if (hash === "#donate") {
		activateTab(2);
	}
});
