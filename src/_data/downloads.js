import fs from "node:fs"
import path from "node:path"

// Release download link generator.

export default function(configData) {
    return function(version=null) {
        if (version == null) version = configData.godsvg.version;
        const base = `https://github.com/MewPurPur/GodSVG/releases/download/${version != "latest" ? "v"+version : version}`;
        const platformToDownload = {
            android_old: `${base}/GodSVG.Android.apk`,
            linux_old: `${base}/GodSVG.Linux.zip`,
            macos_old: `${base}/GodSVG.MacOS.zip`,
            windows_old: `${base}/GodSVG.Windows.zip`,
            android: `${base}/GodSVG_v`+version+`.Android.zip`,
            linux: `${base}/GodSVG_v`+version+`.Linux.AppImage.zip`,
            macos: `${base}/GodSVG_v`+version+`.MacOS.zip`,
            windows: `${base}/GodSVG_v`+version+`.Windows.zip`,
        }

        // Reading release data.
        const releasesPath = path.join(configData.eleventy.directories.data, "releases.json")
        const releasesFile = fs.readFileSync(releasesPath, { encoding: "utf-8" });
        const releasesJson = JSON.parse(releasesFile)[version];

        // Creating the object.
        const output = {}
        releasesJson.platforms.forEach(platform => {
            output[platform] = platformToDownload[platform];
        });
        return output;
    }
}
