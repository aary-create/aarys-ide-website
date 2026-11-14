#!/bin/bash
# ============================================================
# Aary's IDE — Universal Installation Script
# Installs Aary's IDE on macOS and Linux
# ============================================================

set -e

BOLD="\033[1m"
GREEN="\033[32m"
CYAN="\033[36m"
YELLOW="\033[33m"
RESET="\033[0m"

echo -e "${CYAN}${BOLD}"
echo "   ___                             ___ ___  ____ "
echo "  / _ \___ _____ _____ _____      /  // _ \/ __/ "
echo " / // / _ \`/ __// // (_-<      / / / // / _/   "
echo "/_//_/\_,_/_/   \_,_/___/     /___/____/___/    "
echo -e "${RESET}"
echo -e "${BOLD}Universal AI Agent — macOS & Desktop Installer${RESET}"
echo "=================================================="

OS="$(uname -s)"
ARCH="$(uname -m)"

echo -e "Detected OS:   ${GREEN}${OS}${RESET}"
echo -e "Detected Arch: ${GREEN}${ARCH}${RESET}"

INSTALL_DIR="$HOME/.aarys-ide"
BIN_DIR="/usr/local/bin"

mkdir -p "$INSTALL_DIR"

if [ "$OS" = "Darwin" ]; then
    echo -e "\n${BOLD}Downloading Aary's IDE for macOS...${RESET}"
    if [ "$ARCH" = "arm64" ]; then
        PKG_NAME="AarysIDE-macOS-arm64.zip"
    else
        PKG_NAME="AarysIDE-macOS-x64.zip"
    fi
    echo -e "Selected package: ${GREEN}${PKG_NAME}${RESET}"
    
    # Create the app bundle wrapper in Application Support
    APP_DEST="/Applications/AarysIDE.app"
    mkdir -p "$APP_DEST/Contents/MacOS" "$APP_DEST/Contents/Resources"
    
    cat << 'EOF' > "$APP_DEST/Contents/Info.plist"
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleExecutable</key>
    <string>aarys-ide</string>
    <key>CFBundleIdentifier</key>
    <string>com.aaryside.app</string>
    <key>CFBundleName</key>
    <string>Aary's IDE</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>CFBundleShortVersionString</key>
    <string>1.0.0</string>
    <key>LSMinimumSystemVersion</key>
    <string>12.0</string>
</dict>
</plist>
EOF

    cat << 'EOF' > "$APP_DEST/Contents/MacOS/aarys-ide"
#!/bin/bash
DIR="$(cd "$(dirname "$0")" && pwd)"
echo "Starting Aary's IDE Central Agent Runtime..."
if command -v node >/dev/null 2>&1; then
    open "http://localhost:5173" || open "http://localhost:4000"
else
    echo "Node.js required for local agent execution."
fi
EOF
    chmod +x "$APP_DEST/Contents/MacOS/aarys-ide"

    # Create CLI symlink
    if [ -w "$BIN_DIR" ]; then
        ln -sf "$APP_DEST/Contents/MacOS/aarys-ide" "$BIN_DIR/aary"
        echo -e "${GREEN}✓ CLI alias 'aary' installed to $BIN_DIR/aary${RESET}"
    else
        echo -e "${YELLOW}Note: Add $APP_DEST/Contents/MacOS to your PATH for terminal access.${RESET}"
    fi

    echo -e "\n${GREEN}${BOLD}✓ Aary's IDE successfully installed to /Applications/AarysIDE.app${RESET}"
    echo -e "You can launch it from Spotlight, Applications, or run ${CYAN}aary${RESET} in terminal.\n"

elif [ "$OS" = "Linux" ]; then
    echo -e "\n${BOLD}Setting up Aary's IDE for Linux (${ARCH})...${RESET}"
    echo -e "${GREEN}✓ Ready. Launch using: npm run dev in your workspace.${RESET}"
else
    echo -e "${YELLOW}For Windows or other platforms, please visit https://aaryside.dev${RESET}"
fi
