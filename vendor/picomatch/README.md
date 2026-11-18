# Local picomatch security backport

The developer toolchain and the bundled Vite example use this archive to address [GHSA-fc5q-39xc-vjpf](https://github.com/advisories/GHSA-fc5q-39xc-vjpf) while a patched upstream release is pending. The package retains the upstream name, version and MIT license. Both lockfiles pin this repository's archive to a commit and record its SHA-512. A cold dependency install downloads it from GitHub.

The parser keeps the upstream literal and flat character-class rewrites. Before emitting any other repeated extglob, it requires nonempty, prefix-free literal alternatives. It raises a syntax error for unsupported repeated expressions. Ordinary globstars, wildcards outside repetition, and non-repeating extglobs follow the upstream implementation.

To reproduce the archive, download picomatch 4.0.7 with `npm pack picomatch@4.0.7 --ignore-scripts`, verify the upstream integrity recorded in `picomatch-4.0.7.json`, and extract it. Apply `picomatch-4.0.7.patch` at the extracted package root with `git apply --unidiff-zero`, then pack the result with npm 12.2.2 and `--ignore-scripts`. The manifest records all resulting file hashes.

CI checks the installed files before accepting the local mitigation for that advisory. It runs the full npm audit for each lockfile and fails on every other moderate or higher finding. Replace the pin, archive, and local mitigation together when an upstream release addresses the advisory.
