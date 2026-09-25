# For Indira

A small, multi-page birthday website for Indira’s birthday on **27 September 2026**.

## Open it locally

Double-click `index.html` or right-click it and choose **Open with > Microsoft Edge / Google Chrome**. No installation or build step is needed.

## Add photos later

Put your images in `assets/photos/` using these exact filenames:

- `indira-hero.jpg` — the main photo on the home page
- `our-story.jpg` — the story page photo
- `memory-01.jpg` through `memory-04.jpg` — the memories gallery

JPG, PNG, and WebP all work. If a file is missing, the site keeps the designed placeholder instead of showing a broken image.

## Pages

- `index.html` — the welcome page and countdown
- `story.html` — the three-chapter story timeline
- `gallery.html` — the photo memory archive
- `letter.html` — the birthday letter, with a print/save button

The homepage includes a **Watch your video** button that opens `assets/photos/birthday_love_story_THE_FINAL_EDIT.mp4` in a modal player. The letter page is protected by a simple browser-side DOB gate; enter `27091998` in `DDMMYYYY` format to reveal it.

To change the letter or wording, edit the text directly in the relevant HTML file. To change the birthday date, update the `data-countdown` value in `index.html` and the visible date text where needed.
