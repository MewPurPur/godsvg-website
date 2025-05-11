Converting PNG to WebP with FFmpeg:

```
for file in *.png; do
	ffmpeg -i "$file" -lossless 1 "${file%.png}.webp"
done
```
