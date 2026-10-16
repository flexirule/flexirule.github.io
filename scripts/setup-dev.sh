#!/usr/bin/env bash
set -eo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

cd "${PROJECT_ROOT}"

echo "==> Setting up development environment..."

# 1. Read target Node.js version from .nvmrc
NVMRC_FILE="${PROJECT_ROOT}/.nvmrc"
if [ ! -f "${NVMRC_FILE}" ]; then
  echo "Error: .nvmrc file not found at ${NVMRC_FILE}" >&2
  exit 1
fi

TARGET_NODE_VERSION="$(tr -d '[:space:]' < "${NVMRC_FILE}")"
TARGET_NODE_VERSION="${TARGET_NODE_VERSION#v}"

if [ -z "${TARGET_NODE_VERSION}" ]; then
  echo "Error: .nvmrc is empty or contains an invalid version format." >&2
  exit 1
fi

echo "==> Target Node.js version (from .nvmrc): v${TARGET_NODE_VERSION}"

# Helper function to compare semver versions ($1 >= $2)
version_ge() {
  [ "$(printf '%s\n%s' "$2" "$1" | sort -V | head -n1)" = "$2" ]
}

# 2. Attempt to load nvm if available in standard locations
if ! command -v nvm >/dev/null 2>&1 && ! declare -f nvm >/dev/null 2>&1; then
  if [ -s "${NVM_DIR:-$HOME/.nvm}/nvm.sh" ]; then
    # Source nvm script
    . "${NVM_DIR:-$HOME/.nvm}/nvm.sh"
  elif [ -s "/usr/local/opt/nvm/nvm.sh" ]; then
    . "/usr/local/opt/nvm/nvm.sh"
  fi
fi

# 3. Use fnm or nvm to switch to target Node.js version if available
if command -v fnm >/dev/null 2>&1; then
  echo "==> Switching Node.js version using fnm..."
  fnm use "${TARGET_NODE_VERSION}" >/dev/null 2>&1 || fnm use >/dev/null 2>&1 || true
elif declare -f nvm >/dev/null 2>&1; then
  echo "==> Switching Node.js version using nvm..."
  nvm use "${TARGET_NODE_VERSION}" >/dev/null 2>&1 || nvm use >/dev/null 2>&1 || true
fi

# 4. Verify Node.js installation
if ! command -v node >/dev/null 2>&1; then
  echo "Error: Node.js is not installed or not available in PATH." >&2
  echo "Please install Node.js v${TARGET_NODE_VERSION} or activate nvm/fnm." >&2
  echo "Example with nvm: nvm install ${TARGET_NODE_VERSION} && nvm use ${TARGET_NODE_VERSION}" >&2
  exit 1
fi

CURRENT_NODE_VERSION="$(node -v | tr -d '[:space:]')"
CURRENT_NODE_VERSION="${CURRENT_NODE_VERSION#v}"

echo "==> Active Node.js version: v${CURRENT_NODE_VERSION}"

if ! version_ge "${CURRENT_NODE_VERSION}" "${TARGET_NODE_VERSION}"; then
  echo "Error: Active Node.js version (v${CURRENT_NODE_VERSION}) is less than required version (v${TARGET_NODE_VERSION})." >&2
  echo "Please switch to Node.js v${TARGET_NODE_VERSION} or higher:" >&2
  echo "  nvm install ${TARGET_NODE_VERSION} && nvm use ${TARGET_NODE_VERSION}" >&2
  echo "  or" >&2
  echo "  fnm install ${TARGET_NODE_VERSION} && fnm use ${TARGET_NODE_VERSION}" >&2
  exit 1
fi

# 5. Verify npm installation
if ! command -v npm >/dev/null 2>&1; then
  echo "Error: npm is not installed or not available in PATH." >&2
  echo "Please install npm to continue." >&2
  exit 1
fi

CURRENT_NPM_VERSION="$(npm -v | tr -d '[:space:]')"
echo "==> Active npm version: v${CURRENT_NPM_VERSION}"

# 6. Install dependencies
echo "==> Installing dependencies with 'npm install --no-audit --no-fund'..."
npm install --no-audit --no-fund

# 7. Run type and Astro checks
echo "==> Running type and Astro checks with 'npm run check'..."
npm run check

# 8. Build static website
echo "==> Building static website with 'npm run build'..."
npm run build

echo "==> Development environment setup completed successfully!"
