# CLAUDE.md - Shipwright Digital Business Cards

## Project Overview

This is a static website for **Shipwright**, a maritime services company, that hosts digital business cards for team members. The site is deployed via GitHub Pages at `cards.shipwright.biz`.

## Tech Stack

- **Static HTML/CSS** - No build system required
- **GitHub Pages** - Hosting
- **Node.js** - Asset generation only (QR codes, vCards)
- **Google Fonts** - Libre Caslon Text for headings

## Directory Structure

```
/
├── index.html              # Team directory page
├── styles.css              # Shared styles for all pages
├── generate-assets.js      # Node script to generate QR codes and vCards
├── package.json            # qrcode dependency for asset generation
├── CNAME                   # Custom domain: cards.shipwright.biz
├── [name].html             # Individual card pages (logo variant)
├── [name]-photo.html       # Individual card pages (avatar variant)
└── assets/
    ├── shipwright-header.jpg   # Banner image used on all cards
    ├── qr/
    │   └── [name]-qr.png       # QR codes linking to card URLs
    └── vcards/
        └── [name].vcf          # vCard files for contact download
```

## Card Page Variants

There are two HTML templates for individual cards:

### 1. Logo Variant (`[name].html`)
- Uses `.logo-wrapper` with company logo centered below banner
- Simpler design, no avatar
- Example: `spencer-barnes.html`

### 2. Avatar Variant (`[name]-photo.html`)
- Uses `.avatar-wrapper` with circular avatar (initials or photo)
- Small `.logo-badge` overlaying the avatar
- For employees with photos or who want the avatar style
- Example: `john-dixon-photo.html`

## Naming Conventions

- **File names**: `firstname-lastname.html` (lowercase, hyphenated)
- **URL slugs**: Same as filename (e.g., `cards.shipwright.biz/spencer-barnes.html`)
- **Assets**: `[slug]-qr.png`, `[slug].vcf`

## Brand Colors (CSS Variables)

```css
--color-primary: #c94a4a;     /* Red - CTA buttons */
--color-navy: #1a3a5c;        /* Navy - Headings, QR codes */
--color-teal: #2a7d8c;        /* Teal - Accent, links */
--color-text: #4a4a4a;        /* Body text */
--color-text-muted: #6b7280;  /* Secondary text */
```

## Adding a New Team Member

1. **Add employee data** to `generate-assets.js`:
   ```javascript
   {
     firstName: 'New',
     lastName: 'Person',
     email: 'nperson@shipwright.biz',
     phone: '555-123-4567',
     linkedin: 'https://www.linkedin.com/company/shipwright/',
     website: 'https://www.shipwright.biz'
   }
   ```

2. **Generate assets**:
   ```bash
   npm install  # First time only
   node generate-assets.js
   ```
   This creates:
   - `assets/qr/new-person-qr.png`
   - `assets/vcards/new-person.vcf`

3. **Create HTML card page** - Copy an existing card and update:
   - Title and meta description
   - Name in `<h1>`
   - Email link (both href and display text)
   - Phone link (both href and display text)
   - vCard download link and filename
   - QR code image src

4. **Add to index.html** - Add entry to `.card-grid` section:
   ```html
   <div class="employee-card">
     <h2>New Person</h2>
     <div class="contact">
       <a href="mailto:nperson@shipwright.biz">nperson@shipwright.biz</a>
       <a href="tel:+15551234567">(555) 123-4567</a>
     </div>
     <div class="card-links">
       <a href="new-person.html">View Card →</a>
     </div>
   </div>
   ```

## Key Files to Understand

- **`index.html`** - Contains inline styles for the team directory layout plus leader-row for principals
- **`styles.css`** - Shared card page styles, responsive breakpoints at 480px
- **`generate-assets.js`** - Contains `employees` array (source of truth for contact data)

## Phone Number Formatting

- Display format: `(XXX) XXX-XXXX`
- Tel link format: `+1XXXXXXXXXX` (no dashes)

## External Resources

- Company logo: Hosted on Squarespace CDN
- Google Fonts: Libre Caslon Text
- Favicon: Inline SVG anchor emoji

## Special Index.html Features

- **Leader row**: John Dixon and Corey Page displayed prominently with ", P.E." suffix
- **Card grid**: All other team members
- **Footer**: Office address and main phone number

## Development Workflow

1. No build step required - edit HTML/CSS directly
2. Test locally by opening HTML files in browser
3. Commit and push to deploy via GitHub Pages

---

## Git Workflow - Step by Step

**IMPORTANT FOR AI ASSISTANTS**: Always walk the user through git commands step by step. Never assume they know git. Provide explicit commands they can copy and paste.

### Checking Current Status

Before any git operation, check where you stand:

```bash
# Step 1: See what branch you're on and what files have changed
git status

# Step 2: See recent commits
git log --oneline -5
```

### Getting Latest Changes from GitHub

When you need to sync your local repo with GitHub:

```bash
# Step 1: Fetch the latest from GitHub (downloads but doesn't change your files)
git fetch origin main

# Step 2: See if you're behind
git status

# Step 3: Pull the changes into your local branch
git pull origin main
```

### After Someone Else Pushes Changes (Including AI)

If changes were pushed to a branch (e.g., by Claude), you need to pull them:

```bash
# Step 1: Fetch all remote branches
git fetch origin

# Step 2: Switch to the branch with changes (if not already on it)
git checkout <branch-name>

# Step 3: Pull the latest changes
git pull origin <branch-name>
```

### Merging a Feature Branch into Main

After reviewing changes on a feature branch:

```bash
# Step 1: Switch to main branch
git checkout main

# Step 2: Make sure main is up to date
git pull origin main

# Step 3: Merge the feature branch
git merge <branch-name>

# Step 4: Push the merged main to GitHub
git push origin main
```

### Creating a Pull Request (Alternative to Direct Merge)

If you prefer reviewing on GitHub:

1. Go to: `https://github.com/yourmaritimepartner/cards`
2. Click "Pull requests" tab
3. Click "New pull request"
4. Select your feature branch to merge into main
5. Review changes and click "Create pull request"
6. After review, click "Merge pull request"

### Saving Your Own Changes

When you've edited files and want to save to GitHub:

```bash
# Step 1: See what changed
git status

# Step 2: Add the files you want to save
git add <filename>
# Or add everything:
git add .

# Step 3: Commit with a message describing what you did
git commit -m "Your description here"

# Step 4: Push to GitHub
git push origin main
```

### If You Get Merge Conflicts

If git says there's a conflict:

```bash
# Step 1: Open the conflicted file in your editor
# Look for lines with <<<<<<< and >>>>>>>

# Step 2: Edit the file to keep what you want, remove the conflict markers

# Step 3: Mark as resolved and commit
git add <filename>
git commit -m "Resolve merge conflict in <filename>"
```

---

## Code Quality - Optimize at the Right Time

Reference: https://abseil.io/fast/hints.html

When writing code, choose the faster alternative if it does not significantly impact readability or complexity. Don't defer all performance concerns to "later" - a system built with no regard for performance ends up with a flat profile where there are no obvious hotspots to fix.

However, prefer clear, idiomatic code when performance impact is negligible. It's easier to read, debug, and for compilers to optimize over time.

**Balance these principles:**
- Write simple, readable code as the baseline
- Choose efficient approaches when the cost to readability is minimal
- Don't micro-optimize prematurely, but don't ignore efficiency either
- Profile before optimizing complex code paths

---

## Important Notes

- The `generate-assets.js` employee list may be out of sync with actual HTML files - always verify both when adding/removing employees
- Some employees have both `.html` and `-photo.html` variants
- The company logo is externally hosted - do not modify the Squarespace URL
