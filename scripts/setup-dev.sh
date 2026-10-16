#!/usr/bin/env bash
set -euo pipefail

echo "==> Checking development environment requirements for FlexiRule..."

# Check Node.js version (engine requirement >=22.22.0)
if ! command -v node >/dev/null 2>&1; then
  echo "Error: Node.js is not installed." >&2
  exit 1
fi

NODE_VERSION=$(node -v | tr -d 'v')
MAJOR_NODE_VERSION=$(echo "$NODE_VERSION" | cut -d. -f1)

if [ "$MAJOR_NODE_VERSION" -lt 22 ]; then
  echo "Warning: Node.js version is $NODE_VERSION. Recommended >= 22.22.0."
else
  echo "✓ Node.js version $NODE_VERSION detected."
fi

# Check npm
if ! command -v npm >/dev/null 2>&1; then
  echo "Error: npm is not installed." >&2
  exit 1
fi
echo "✓ npm version $(npm -v) detected."

echo "==> Installing dependencies..."
if [ -f package-lock.json ]; then
  npm ci
else
  npm install
fi

echo "==> Running typecheck and Astro checks..."
npm run check

echo "==> Testing production build..."
npm run build

echo "✓ FlexiRule environment setup complete!"
