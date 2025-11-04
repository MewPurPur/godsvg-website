# Converts PNG to WebP and MP4 to WebM. May need to run multiple times if there are errors (but it eventually converts everything).

find src -type f -name "*.png" | while read file; do
	ffmpeg -hide_banner -stats -i "$file" -lossless 1 "${file%.png}.webp" && rm "$file"
done

find src -type f -name "*.mp4" | while read file; do
	audio_level=$(ffmpeg -i "$file" -af "volumedetect" -f null /dev/null 2>&1 | grep "mean_volume" | awk '{print $5}')
	AV1_OPTS=(-c:v libaom-av1 -crf 30 -b:v 0 -cpu-used 4 -tile-columns 4 -row-mt 1)
	ffmpeg -hide_banner -stats -i "$file" "${AV1_OPTS[@]}" -an "${file%.mp4}.webm" && rm "$file"
done

find src -type f -name "*.webm" | while read -r file; do
	if ffmpeg -i "$file" 2>&1 | grep -q "Audio:"; then
		temp="${file%.webm}.tmp.webm"
		AV1_OPTS=(-c:v copy)
		ffmpeg -hide_banner -stats -i "$file" -c:v copy -an "$temp" && mv "$temp" "$file"
	fi
done
