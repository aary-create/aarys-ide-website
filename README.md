# Aary's IDE — Official Download & Showcase Website

> The official landing page and multi-platform distribution website for Aary's IDE.

## 🚀 1-Click Deployment to Vercel

1. Push or import this repository to your GitHub account as `aarys-ide-website`.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Select `aarys-ide-website` from your GitHub repositories.
4. Leave settings as default:
   - **Framework Preset**: *Other*
   - **Root Directory**: `./`
   - **Build Command**: *None*
   - **Output Directory**: `./`
5. Click **Deploy**!

Vercel will automatically read `vercel.json` and host:
- The responsive landing page
- Live interactive device preview (macOS and Android)
- Direct downloads for macOS (`AarysIDE-macOS-arm64.zip`, `AarysIDE-macOS-x64.zip`) and Android (`AarysIDE-Android-v1.0.0.apk`) with proper content-disposition and mime types.

## 📦 Directory Structure

```
├── index.html        # Main landing page, showcase & download matrix
├── styles.css        # Modern dark-mode styling, ambient glows & mockups
├── script.js         # Interactive device switcher & OS auto-detection
├── vercel.json       # Vercel deployment headers, MIME types & CDN caching
└── downloads/        # Bundled download artifacts
    ├── AarysIDE-macOS-arm64.zip
    ├── AarysIDE-macOS-x64.zip
    ├── AarysIDE-Android-v1.0.0.apk
    └── install.sh
```
