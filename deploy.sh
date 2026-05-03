#!/usr/bin/env bash
# deploy.sh — local development & build helper for Faryn Studio
# Usage:
#   ./deploy.sh          → install deps + start dev server
#   ./deploy.sh build    → production build
#   ./deploy.sh preview  → build then preview locally
#   ./deploy.sh clean    → remove node_modules and dist

set -e

MODE="${1:-dev}"

check_node() {
  if ! command -v node &>/dev/null; then
    echo "Error: Node.js not found. Install it from https://nodejs.org (v18 or later)."
    exit 1
  fi
  NODE_MAJOR=$(node -e "process.stdout.write(process.versions.node.split('.')[0])")
  if [ "$NODE_MAJOR" -lt 18 ]; then
    echo "Error: Node.js v18+ required (found v$(node -v | tr -d v))."
    exit 1
  fi
}

install_deps() {
  if [ ! -d node_modules ]; then
    echo "→ Installing dependencies..."
    npm install
  else
    echo "→ Dependencies already installed (node_modules exists)."
  fi
}

case "$MODE" in
  dev)
    check_node
    install_deps
    echo ""
    echo "→ Starting development server at http://localhost:5173"
    echo "  Press Ctrl+C to stop."
    echo ""
    npm run dev
    ;;

  build)
    check_node
    install_deps
    echo "→ Building for production..."
    npm run build
    echo ""
    echo "✓ Build complete. Output is in ./dist"
    ;;

  preview)
    check_node
    install_deps
    echo "→ Building for production..."
    npm run build
    echo ""
    echo "→ Starting preview server at http://localhost:4173"
    echo "  Press Ctrl+C to stop."
    echo ""
    npm run preview
    ;;

  clean)
    echo "→ Removing node_modules and dist..."
    rm -rf node_modules dist
    echo "✓ Clean complete."
    ;;

  *)
    echo "Unknown command: $MODE"
    echo "Usage: ./deploy.sh [dev|build|preview|clean]"
    exit 1
    ;;
esac
