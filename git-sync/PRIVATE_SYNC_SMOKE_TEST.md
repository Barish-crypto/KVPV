# Private GitHub auto-sync smoke test

This documentation-only commit verifies that the local KVPV auto-pull service can fetch and fast-forward from a private GitHub repository.

- No game code, build artifact, native host settings, account data, or runtime behavior is modified by this file.
- Expected local state after the next successful poll: status `verified` (or later `up_to_date`) and `git rev-parse --short HEAD` equals the commit SHA containing this file.
- Browser extension hot reload is not tested by this documentation-only commit.
