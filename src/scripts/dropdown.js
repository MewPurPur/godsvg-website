document.addEventListener("DOMContentLoaded", () => {
	const platform = detectOS();

	document.querySelectorAll("[platform]").forEach(option => {
		if (option.getAttribute("platform").split("_")[0] === platform) {
			option.classList.add("active");
		}
	});

	document.querySelectorAll("img.platform-icon").forEach(icon => {
		if (icon.src.includes(platform)) {
			icon.classList.add("active");
		}
	});

	function closeDropdown(dropdown) {
		dropdown.classList.remove("open");

		const trigger = dropdown.querySelector(".dropdown-trigger");

		if (trigger) {
			trigger.setAttribute("aria-expanded", "false");
		}
	}

	document.addEventListener("click", e => {
		const trigger = e.target.closest(".dropdown-trigger");

		if (trigger) {
			e.stopPropagation();

			const dropdown = trigger.closest(".dropdown");
			const isOpen = dropdown.classList.contains("open");

			document.querySelectorAll(".dropdown").forEach(closeDropdown);

			if (!isOpen) {
				dropdown.classList.add("open");
				trigger.setAttribute("aria-expanded", "true");
			}

			return;
		}

		document.querySelectorAll(".dropdown").forEach(dropdown => {
			if (!dropdown.contains(e.target)) {
				closeDropdown(dropdown);
			}
		});
	});

	document.addEventListener("keydown", e => {
		if (e.key === "Escape") {
			document.querySelectorAll(".dropdown").forEach(closeDropdown);
		}
	});
});
