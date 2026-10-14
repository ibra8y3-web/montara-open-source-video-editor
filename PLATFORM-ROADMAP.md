# MONTARA Platform Roadmap

## Current runtime

The current code is a local-first React/Vite editor core. It runs in a modern browser and includes local FFmpeg WASM trim/mute to MP4. It can be installed as a PWA after adding a service worker and manifest.

## Native packaging decision

The next implementation slice should wrap the same UI in **Tauri 2** for Windows, Linux and macOS, and use **Capacitor** or a dedicated mobile shell for Android/iOS. Native video export should use FFmpeg through a local process/plugin rather than relying only on browser `MediaRecorder`.

## Non-negotiable quality rule

A platform is not marked supported until its package is built in CI and a real import → edit → export flow has been exercised on that platform. No fake download links or placeholder binaries are allowed.
