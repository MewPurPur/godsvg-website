function setDownloadButtons() {
	const platform = detectOS();
	const mainDownloadDiv = document.getElementById("main-download");
	const dropBtnText = document.getElementById("dropbtn-text");
	const dropdownContent = document.querySelector(".tall-buttons-container > * > .dropdown-content");

	if (platform) {
		mainDownloadDiv.innerHTML = `
		<a href="${downloads[godsvg.version][platform]}" class="download-button">
			<img src="assets/platforms_${platform}.svg" class="platform-icon" alt="${platform} logo">
			<div>
				<div class="small-text">Download for</div>
				<div class="big-text">${platformInfo.displayNames[platform]}</div>
			</div>
		</a>`;
		dropBtnText.innerText = "Other platforms";

		// Remove the current platform
		dropdownContent.childNodes.forEach(platformButton => {
			if (platformButton?.tagName?.toLowerCase() != "a") return;
			if (platformButton.getAttribute("platform") == platform) {
				platformButton.remove();
			}
		});
	} else {
		mainDownloadDiv.style.display = "none";
	}

	// TODO: Close dropdown when clicking outside.
	/*const dropdown = document.querySelector("summary.dropbtn");
	document.addEventListener("click", function() {
		dropdown.open = !dropdown.open;
	});*/
}

function toggleContent(tab_idx) {
	const featuresContent = document.getElementById("features-content");
	const faqContent = document.getElementById("faq-content");
	const donateContent = document.getElementById("donate-content");
	const tabs = document.querySelectorAll(".tab");

	if (tab_idx === 0) {
		featuresContent.style.display = "block";
		faqContent.style.display = "none";
		donateContent.style.display = "none";
	} else if (tab_idx === 1) {
		featuresContent.style.display = "none";
		faqContent.style.display = "block";
		donateContent.style.display = "none";
	} else if (tab_idx === 2) {
		featuresContent.style.display = "none";
		faqContent.style.display = "none";
		donateContent.style.display = "block";
	}

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

// Initialize when DOM is loaded.
document.addEventListener("DOMContentLoaded", function() {
	setDownloadButtons();
});
