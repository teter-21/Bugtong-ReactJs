# Bugtong-Bugtong: targeted improvements

The six original riddles, answers, and letter banks are unchanged, and the project remains Create React App (`react-scripts`).

## Changes
- Click a letter in the bank to fill the first empty answer slot. The existing pre-filled hint letters remain.
- Click a placed letter to return it to the bank; duplicate letters are tracked independently.
- Reset works when clicking any part of its button.
- Incomplete and incorrect responses show an inline message instead of a browser alert.
- Progress indicator, instructions, completion message, and a working Try Again button.
- Responsive sizing for mobile phones and improved keyboard focus states.
- Open Graph image dimensions in `public/index.html` now match the supplied `preview.png` (3370 × 1574).

## Deploy
Run `npm install` and `npm run build`. Your build directory remains `build`.
For Cloudflare Workers, keep your existing deploy command:
`npx wrangler deploy --assets ./build --compatibility-date 2026-11-10`

## Note
A complete build could not be verified in the editing environment due to dependency-install timeout. Run `npm run build` before publishing. This update does not address LinkedIn's crawler connectivity error; it only corrects the preview metadata dimensions.
