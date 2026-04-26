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
            android: `${base}/GodSVG.Android_v`+version+`.zip`,
            linux: `${base}/GodSVG.Linux_v`+version+`.AppData.zip`,
            macos: `${base}/GodSVG.MacOS_v`+version+`.zip`,
            windows: `${base}/GodSVG.Windows_v`+version+`.zip`,
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
