# Specification

## Summary
**Goal:** Build a mobile-friendly web app for controlling a sand table over Wi‑Fi, including pattern browsing/running, custom G-code generation tools, LED control, live status monitoring, optional cloud pattern storage, and in-repo documentation.

**Planned changes:**
- Apply a clean, minimal, premium design system across the app with responsive layout for phones/tablets and full dark mode support.
- Implement navigation and screens for: Pattern Gallery, Pattern Detail/Run Control, Custom Pattern Creator, LED Control, Live Status Dashboard, and Settings/Connection.
- Build a Pattern Gallery with sample placeholder patterns, pattern tiles (name/thumbnail/duration), and client-side filter/sort by name and duration.
- Add Pattern Run Controls (Start, Pause, Stop, Home, Retrace) with confirmation dialogs for risky actions and an always-visible Emergency Stop control; disable/adjust controls based on machine state.
- Create Settings/Connection flow to configure HTTP base URL and optional WebSocket URL, show connection status and last error, and provide a Test Connection action.
- Implement a shared controller command protocol layer for sending commands (R, S, H, P<n>, LED:R,G,B, SPD:XXX) via HTTP and optionally WebSocket with timeout/ack handling and user-visible error feedback.
- Build a Live Status Dashboard showing X-Y position, current pattern, progress (% + bar), machine state (Running/Paused/Homing/Idle), error alerts, and freshness indication with polling fallback.
- Implement LED Control with on/off, RGB/HSV picker, brightness, modes (Static/Breathing/Rainbow/Pattern-synced), and saving/applying per-pattern lighting presets.
- Implement Custom Pattern Creator with freehand sketch canvas, image upload, and text prompt input mapped to built-in deterministic generators; generate G-code preview with speed/scale adjustments and allow export (download) and/or send to controller.
- Add a toolpath preview/simulation component (SVG/canvas) with animated playback and scrubber for predefined and custom patterns.
- Add optional Motoko canister “Cloud patterns” storage for user-created patterns (name, createdAt, optional thumbnail, G-code) and per-pattern LED presets; integrate frontend read/write with Internet Identity.
- Add safety & recovery UX including auto-resume prompt after reload based on stored session + refreshed status.
- Add in-repo documentation: architecture diagram, screen-by-screen UI breakdown, controller protocol spec, error handling strategy, and brief G-code generation approach description.

**User-visible outcome:** Users can connect the app to a sand table controller over Wi‑Fi, browse/run patterns with safety controls and emergency stop, monitor live machine status, create and preview custom patterns that export/send as G-code, control LEDs with presets, optionally save patterns/presets to cloud storage, and view project documentation describing the system and protocol.
