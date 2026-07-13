# Converts PNG to WebP and MP4 to WebM.

find src -path '*/assets/press-kit/*' -prune -o -type f -name "*.png" -print | while read -r file; do
	ffmpeg -nostdin -y -hide_banner -stats -i "$file" -lossless 1 "${file%.png}.webp" && rm "$file"
done

find src -path '*/assets/press-kit/*' -prune -o -type f -name "*.mp4" -print | while read -r file; do
	AV1_OPTS=(-c:v libaom-av1 -crf 30 -b:v 0 -cpu-used 4 -row-mt 1)
	ffmpeg -nostdin -y -hide_banner -stats -i "$file" "${AV1_OPTS[@]}" -an "${file%.mp4}.webm" && rm "$file"
done

find src -path '*/assets/press-kit/*' -prune -o -type f -name "*.webm" -print | while read -r file; do
	if ffmpeg -i "$file" 2>&1 | grep -q "Audio:"; then
		temp="${file%.webm}.tmp.webm"
		ffmpeg -nostdin -y -hide_banner -stats -i "$file" -c:v copy -an "$temp" && mv "$temp" "$file"
	fi
done
