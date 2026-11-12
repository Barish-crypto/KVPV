# KVPV Source Manager

Local web app for browsing, searching, editing, and reviewing the current repository.

## Start

From the repository root, run:

```powershell
npm.cmd run source-manager
```

Or double-click `tools\source-manager\start-source-manager.bat`. Open `http://127.0.0.1:4180` and press `Ctrl+C` in the terminal to stop the server. Set `KVPV_SOURCE_MANAGER_PORT` to choose another port.

The server binds only to `127.0.0.1`. It lists Git-tracked files and non-ignored untracked files, skips ignored content such as `node_modules`, and rejects paths outside the repository. File editing is limited to regular text files up to 2 MB. Search scans files up to 2 MB, with an 80 MB scan budget and 500-result limit.

Git status and diff are read-only. Commit operates only on the explicitly selected changed files; Pull uses `--ff-only`; Push and both commands require confirmation in the UI. The Scripts panel only offers `build` and `test`, after confirmation. If either script fails, its output is shown and recognized source file/line references become buttons that open the file in the editor at that line. A build may rewrite generated bundles, so review the resulting diff before committing.

This tool is intended for a trusted local machine. It has no login; do not expose it to a LAN or public network.
