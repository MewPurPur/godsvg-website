import fs from "node:fs"
import path from "node:path"

// Release download link generator

export default function(configData) {
    return function(version=null) {
        if (version == null) version = configData.godsvg.version;
        const base = `https://github.com/MewPurPur/GodSVG/releases/download/${version != "latest" ? "v"+version : version}`;
        const platformToDownload = {
            android: `${base}/GodSVG.Android.apk`,
            linux:   `${base}/GodSVG.Linux.zip`,
            macos:   `${base}/GodSVG.MacOS.zip`,
            windows: `${base}/GodSVG.Windows.zip`
        }

        // Reading release data
        const releasesPath = path.join(configData.eleventy.directories.data, "releases.json")
        const releasesFile = fs.readFileSync(releasesPath, { encoding: "utf-8" });
        const releasesJson = JSON.parse(releasesFile)[version];

        // Creating the object
        const output = {}
        releasesJson.platforms.forEach(platform => {
            output[platform] = platformToDownload[platform];
        });
        return output;
    }
}
