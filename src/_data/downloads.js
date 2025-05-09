// Release download link generator

export default function(configData) {
    return function(version=null) {
        if (version == null) version = configData.godsvg.version;
        if (version != "latest") {
            version = "v" + version;
        }
        const base = `https://github.com/MewPurPur/GodSVG/releases/download/${version}`;
        
        return {
            android: `${base}/GodSVG.Android.apk`,
            linux:   `${base}/GodSVG.Linux.zip`,
            macos:   `${base}/GodSVG.MacOS.zip`,
            windows: `${base}/GodSVG.Windows.zip`
        }
    }
}
