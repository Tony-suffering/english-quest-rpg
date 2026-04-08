#!/bin/bash

# ═══════════════════════════════════════════════════════════
# Content Quality Improvement Loop
# Orchestrates: audit -> report -> fix generation
#
# Usage:
#   bash scripts/run-quality-loop.sh           # full cycle
#   bash scripts/run-quality-loop.sh --audit   # audit only
#   bash scripts/run-quality-loop.sh --fixes   # fixes only (requires prior audit)
# ═══════════════════════════════════════════════════════════

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

cd "$ROOT_DIR"

# Colors for terminal output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

MODE="${1:-full}"

echo ""
echo -e "${BLUE}================================================================${NC}"
echo -e "${BLUE}         Content Quality Improvement Loop${NC}"
echo -e "${BLUE}================================================================${NC}"
echo ""

# Step 1: Audit
if [[ "$MODE" == "full" || "$MODE" == "--audit" ]]; then
  echo -e "${YELLOW}=== Step 1: Running Content Audit ===${NC}"
  echo ""

  if ! node scripts/audit-content.mjs; then
    echo -e "${RED}ERROR: Audit script failed.${NC}"
    exit 1
  fi

  echo ""
  echo -e "${GREEN}Audit complete.${NC}"
  echo ""
fi

# Step 2: Show Report
if [[ "$MODE" == "full" || "$MODE" == "--audit" ]]; then
  echo -e "${YELLOW}=== Step 2: Audit Report ===${NC}"
  echo ""

  if [[ -f "$SCRIPT_DIR/audit-report.txt" ]]; then
    cat "$SCRIPT_DIR/audit-report.txt"
  else
    echo -e "${RED}No audit report found. Run audit first.${NC}"
    exit 1
  fi

  echo ""
fi

# Step 3: Generate Fixes
if [[ "$MODE" == "full" || "$MODE" == "--fixes" ]]; then
  echo -e "${YELLOW}=== Step 3: Generating Fix Instructions ===${NC}"
  echo ""

  if [[ ! -f "$SCRIPT_DIR/audit-data.json" ]]; then
    echo -e "${RED}ERROR: audit-data.json not found. Run audit first.${NC}"
    echo "  Usage: bash scripts/run-quality-loop.sh --audit"
    exit 1
  fi

  if ! node scripts/improve-content.mjs; then
    echo -e "${RED}ERROR: Fix generation failed.${NC}"
    exit 1
  fi

  echo ""
  echo -e "${GREEN}Fix instructions generated.${NC}"
  echo ""
fi

# Summary
echo -e "${BLUE}================================================================${NC}"
echo -e "${BLUE}                        Summary${NC}"
echo -e "${BLUE}================================================================${NC}"
echo ""
echo "  Generated files:"

if [[ -f "$SCRIPT_DIR/audit-report.txt" ]]; then
  SIZE=$(wc -c < "$SCRIPT_DIR/audit-report.txt")
  echo "    scripts/audit-report.txt  ($SIZE bytes)"
fi

if [[ -f "$SCRIPT_DIR/audit-data.json" ]]; then
  SIZE=$(wc -c < "$SCRIPT_DIR/audit-data.json")
  echo "    scripts/audit-data.json   ($SIZE bytes)"
fi

if [[ -f "$SCRIPT_DIR/content-fixes.json" ]]; then
  SIZE=$(wc -c < "$SCRIPT_DIR/content-fixes.json")
  FIXES=$(node -e "const fs=require('fs'); const d=JSON.parse(fs.readFileSync(process.argv[1],'utf-8')); console.log(d.summary.totalFixes)" "$SCRIPT_DIR/content-fixes.json")
  echo "    scripts/content-fixes.json ($SIZE bytes, $FIXES fixes)"
fi

echo ""
echo "  Next steps:"
echo "    1. Review audit-report.txt for quality overview"
echo "    2. Review content-fixes.json for specific fix instructions"
echo "    3. Run 'claude' to apply fixes with AI assistance"
echo "    4. Re-run this script to verify improvements"
echo ""
