function setDownloadButtons() {
	const platform = detectOS();
	const mainDownloadDiv = document.getElementById("main-download");
	const dropBtnText = document.getElementById("dropbtn-text");
	const dropdownContent = document.querySelector(".download-buttons-container > * > .dropdown-content");

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

function initCarousel() {
	const images = document.querySelectorAll(".carousel-image");
	const dots = document.querySelectorAll(".carousel-dot");
	const leftArrow = document.querySelector(".carousel-arrow-left");
	const rightArrow = document.querySelector(".carousel-arrow-right");
	let currentIndex = 0;
	const totalImages = images.length;

	// Update active image and dot.
	function updateCarousel(newIndex) {
		images[currentIndex].classList.remove("active");
		dots[currentIndex].classList.remove("active");
		currentIndex = newIndex;
		images[currentIndex].classList.add("active");
		dots[currentIndex].classList.add("active");
	}

	function goNext() {
		updateCarousel((currentIndex + 1) % totalImages);
	}

	function goPrev() {
		updateCarousel((currentIndex + totalImages - 1) % totalImages);
	}

	leftArrow.addEventListener("click", goPrev);
	rightArrow.addEventListener("click", goNext);
	dots.forEach(dot => {
		dot.addEventListener("click", function() {
			updateCarousel(Number(this.getAttribute("data-index")));
		});
	});

	// Touch swipe support for mobile.
	let touchStartX = 0;
	let touchEndX = 0;

	const carouselContainer = document.querySelector(".carousel-container");
	carouselContainer.addEventListener("touchstart", function(e) {
		touchStartX = e.changedTouches[0].screenX;
	}, { passive: true });
	carouselContainer.addEventListener("touchend", function(e) {
		touchEndX = e.changedTouches[0].screenX;
		if (touchEndX < touchStartX - 50) {
			goNext();
		} else if (touchEndX > touchStartX + 50) {
			goPrev();
		}
	}, { passive: true });
}

// Initialize when DOM is loaded.
document.addEventListener("DOMContentLoaded", function() {
	setDownloadButtons();
	initCarousel();
});
