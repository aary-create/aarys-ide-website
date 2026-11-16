// ============================================================
// Aary's IDE — Download Website Interactive Controller
// Real file downloads, OS detection, interactive preview & smooth scrolling
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  detectUserOS();
  setupDeviceSwitcher();
  setupClipboard();
});

// Detect user's Operating System
function detectUserOS() {
  const userAgent = window.navigator.userAgent.toLowerCase();
  let detected = 'mac';

  if (userAgent.includes('android')) {
    detected = 'android';
  } else if (userAgent.includes('mac') || userAgent.includes('darwin')) {
    detected = 'mac';
  } else if (userAgent.includes('win')) {
    detected = 'windows';
  } else if (userAgent.includes('linux')) {
    detected = 'linux';
  }

  // Highlight appropriate card
  const cards = document.querySelectorAll('.download-card');
  cards.forEach((card) => {
    if (card.dataset.os === detected) {
      card.classList.add('featured');
    } else {
      card.classList.remove('featured');
    }
  });

  const heroBadge = document.getElementById('detected-os-badge');
  if (heroBadge) {
    const osLabels = {
      mac: 'macOS (Apple Silicon & Intel)',
      android: 'Android Phones & Tablets',
      windows: 'Windows 10 / 11 (x64 & ARM)',
      linux: 'Linux (Debian / Fedora / Arch)',
    };
    heroBadge.textContent = `Optimized for your ${osLabels[detected] || 'Device'}`;
  }
}

// Switch between Mac and Android preview mockups
function setupDeviceSwitcher() {
  const tabs = document.querySelectorAll('.tab-btn');
  const macView = document.getElementById('mac-preview-mockup');
  const androidView = document.getElementById('android-preview-mockup');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const target = tab.dataset.target;
      if (target === 'mac') {
        macView.style.display = 'block';
        androidView.style.display = 'none';
      } else {
        macView.style.display = 'none';
        androidView.style.display = 'block';
      }
    });
  });
}

// Copy terminal installation command
function setupClipboard() {
  const copyBtn = document.getElementById('copy-cmd-btn');
  const cmdText = document.getElementById('cmd-text');

  if (copyBtn && cmdText) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(cmdText.textContent.trim()).then(() => {
        const original = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        copyBtn.style.color = '#10b981';
        setTimeout(() => {
          copyBtn.textContent = original;
          copyBtn.style.color = '';
        }, 2000);
      });
    });
  }
}

// Real Download Action Trigger using GitHub Releases CDN
function triggerDownload(osType) {
  const GITHUB_RELEASE_BASE = 'https://github.com/aary-create/aarys-ide-website/releases/download/v1.0.0';

  const downloads = {
    mac_arm: {
      url: `${GITHUB_RELEASE_BASE}/AarysIDE-macOS-arm64.zip`,
      fallbackUrl: 'downloads/AarysIDE-macOS-arm64.zip',
      filename: 'AarysIDE-macOS-arm64.zip',
      label: 'macOS Apple Silicon (M1/M2/M3/M4)'
    },
    mac_intel: {
      url: `${GITHUB_RELEASE_BASE}/AarysIDE-macOS-x64.zip`,
      fallbackUrl: 'downloads/AarysIDE-macOS-x64.zip',
      filename: 'AarysIDE-macOS-x64.zip',
      label: 'macOS Intel'
    },
    android_apk: {
      url: `${GITHUB_RELEASE_BASE}/AarysIDE-Android-v1.0.0.apk`,
      fallbackUrl: 'downloads/AarysIDE-Android-v1.0.0.apk',
      filename: 'AarysIDE-Android-v1.0.0.apk',
      label: 'Android Universal APK'
    }
  };

  const item = downloads[osType] || downloads.mac_arm;

  // Direct same-origin download to avoid cross-domain mobile blocks
  window.location.href = item.fallbackUrl;

  showDownloadNotice(item.filename, item.label);
}

function showDownloadNotice(filename, label) {
  const notice = document.createElement('div');
  notice.style.position = 'fixed';
  notice.style.bottom = '24px';
  notice.style.right = '24px';
  notice.style.background = '#0f172a';
  notice.style.border = '1px solid #6366f1';
  notice.style.borderRadius = '12px';
  notice.style.padding = '16px 20px';
  notice.style.color = '#fff';
  notice.style.boxShadow = '0 10px 30px rgba(0,0,0,0.6)';
  notice.style.zIndex = '9999';
  notice.style.fontSize = '14px';
  notice.style.lineHeight = '1.5';
  notice.innerHTML = `<div style="font-weight: 700; color: #10b981; margin-bottom: 4px;">✓ Downloading ${filename}</div><div>Your download for <strong>${label}</strong> has started via GitHub Releases CDN.</div>`;
  
  document.body.appendChild(notice);
  setTimeout(() => {
    notice.style.opacity = '0';
    notice.style.transition = 'opacity 0.5s ease';
    setTimeout(() => notice.remove(), 500);
  }, 4000);
}
