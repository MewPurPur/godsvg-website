# Converts PNG to WebP and MP4 to WebM. May need to run multiple times if there are errors (but it eventually converts everything).

find src -type f -name "*.png" | while read file; do
	ffmpeg -hide_banner -stats -i "$file" -lossless 1 "${file%.png}.webp" && rm "$file"
done

find src -type f -name "*.mp4" | while read file; do
	audio_level=$(ffmpeg -i "$file" -af "volumedetect" -f null /dev/null 2>&1 | grep "mean_volume" | awk '{print $5}')
	AV1_OPTS=(-c:v libaom-av1 -crf 30 -b:v 0 -cpu-used 4 -tile-columns 4 -row-mt 1)

	if [ -z "$audio_level" ] || (( $(echo "$audio_level < -50" | bc -l) )); then
		ffmpeg -hide_banner -stats -i "$file" "${AV1_OPTS[@]}" -an "${file%.mp4}.webm" && rm "$file"
	else
		ffmpeg -hide_banner -stats -i "$file" "${AV1_OPTS[@]}" -c:a libopus -b:a 64k "${file%.mp4}.webm" && rm "$file"
	fi
done
