# KVPV V1 - GitHub Extension

## Project Overview

This repository contains the source code for the KVPV V1 automation tool, designed for the game "KVPV". The tool provides automation for various aspects of gameplay including combat, boss fights, daily activities, and more.

## Repository Structure

```
KVPV_TU_DONG_GITHUB_EXTENSION/
├── src/                  # Source code files (131 files)
├── windows-app/          # Windows application files
├── edge-addon/           # Edge browser extension
├── git-sync/             # GitHub auto-sync tools
├── build.cjs             # Build script
├── test.cjs              # Test script
├── package.json          # Project metadata and scripts
├── README.md             # Project documentation
└── AGENTS.md             # This file - Project Map
```

## Key Scripts

- `npm run build` - Run the build script to generate FULL, patches, and MANIFEST.json
- `npm run test` - Run tests
- `npm run live` - Watch for source changes and rebuild
- `npm run test:browser` - Run browser-based tests

## Development Workflow

1. Edit source files in `src/`
2. Run `npm run build` to build the FULL, patch, and MANIFEST.json files
3. Run `npm run test` to test the built code
4. Run `npm run live` to watch for source changes and rebuild automatically

## GitHub Integration

The project includes a `git-sync/` directory for automatically syncing code from GitHub to Windows. This is configured once and allows automated updates. The sync process involves:

1. Setting up a private GitHub repository with the source code
2. Running `CAI_GITHUB_AUTO_SYNC.bat` to configure automatic sync
3. Pushing changes to the GitHub repository to trigger automatic download and update on Windows

This setup enables automated updates where code changes pushed to GitHub are automatically pulled to Windows within approximately 60 seconds, with Native Host performing checks and updates to the game.

## Key Features

- **Combat Automation**: Fully automated boss fighting using native skills
- **Daily Activities**: Automation for daily quests, events and activities
- **Boss Fighting**: Specific automation for different types of boss encounters
- **Tian Quan (Heavenly Warrior)**: Special automation for Tian Quan battles
- **Eight Floor Event**: Automation for the 8-floor event
- **Honor Target**: Automation for Honor Target events

## Important Notes

- The system uses native game client features for combat instead of external skill selection
- Focus is maintained using `KVPV_GIU_FOCUS.js` to prevent focus-related issues
- The system does not consume KNB (KVN Battle Points) automatically
- Updates are handled through patching or full reload, no F5 needed
- The system is designed to work with Edge browser extensions