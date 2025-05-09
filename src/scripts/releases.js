document.addEventListener("DOMContentLoaded", function() {
    const platform = getOS();
    
    const downloadBtns = document.querySelectorAll(".release-download");
    downloadBtns.forEach(downloadBtn => {
        downloadBtn.href = downloads[downloadBtn.getAttribute("version")][platform];
    });
    
    const platformOption = document.querySelectorAll(".platform-option");
    platformOption.forEach(optionBtn => {
        if (optionBtn.getAttribute("platform") == platform) {
            optionBtn.classList.add("active");
        }
    });
    const platformIcons = document.querySelectorAll("img.platform-icon");
    platformIcons.forEach(iconImg => {
        if (iconImg.src.includes(platform)) {
            iconImg.classList.add("active");
        }
    });
});

