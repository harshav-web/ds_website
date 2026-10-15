# Data Science Laboratory and Learnings

Personal laboratory website for **HARSHAVARDHAN REDDY V.**

- Roll number: 24102a030074
- Branch: Data Science · Semester: 5th
- Subject: Data Science · Code: 2410ds006
- Assistant professor: S BOSU BABU
- University: Mohan Babu University
- GitHub: harshav-web

## Deploy to GitHub Pages

1. Unzip this download on your computer.
2. Create a GitHub repository and upload **the contents of this folder**, including the hidden `.github` folder. Do not upload only the ZIP.
3. Use `main` as the default branch.
4. In the repository, open **Settings → Pages → Build and deployment → Source → GitHub Actions**.
5. Open the **Actions** tab. Run “Deploy to GitHub Pages” if it has not already started.
6. After the workflow completes, your website URL appears under **Settings → Pages**.

This source export uses React and TanStack Router with hash navigation (`#/lab`, `#/modules`) so page refreshes work on GitHub Pages. All assets use repository-relative paths. No hosting credentials or paid backend is required.

## Run locally

Install Node.js 22 or later, then run:

```sh
npm install
npm run dev
```

To create production files, run `npm run build`. GitHub Actions performs this automatically.

## Included

- Home with profile access beside the laboratory heading.
- Complete academic ID card with the supplied photograph.
- Six experiments, 26 practical sections, editable Python programs, and companion videos.
- Real Python execution in a Web Worker through Pyodide, including pandas, NumPy, Excel support, Matplotlib, and Seaborn.
- Add personal experiments; entries survive refreshing the same browser.
- Modules tab between Laboratory and GitHub. Add notes or import TXT/Markdown notes, separating pages with a line containing `---`. Read with animated next/previous page controls.
- Light/dark appearance and phone-friendly pages.

## Important details

Personal experiments and modules are saved in the current browser only; they are not uploaded to GitHub or shared between devices. This ZIP includes the starter module, not visitor-added data. Module import supports TXT and Markdown, not PDF.

Python and video tutorials require an internet connection. The first Python run downloads packages and can take a little time. The API example contacts JSONPlaceholder. Other examples use included sample data.

The LinkedIn name was supplied without an exact profile URL, so the LinkedIn button opens a people search. Replace `linkedinUrl` in `src/data/student.ts` with your verified LinkedIn profile URL when available.

The portrait is included as `public/images/student-photo.png`, so this website is independent of Lovable asset hosting.
