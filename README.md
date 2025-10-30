# Uniwind Theme Switching Bug Reproduction

This repository reproduces a bug in the `uniwind` library where switching from "System" theme to a standalone theme that matches the device's current theme causes the app to break.

## Bug Description

When using `Uniwind.setTheme()` to switch themes, there's a bug that occurs when:

1. The app is currently set to "System" theme
2. The device is in dark mode (or light mode)
3. You try to switch to the standalone theme that matches the device theme (e.g., System with dark device → Dark standalone)

**The bug:** The app breaks/crashes when switching from "System" theme to a standalone theme that matches the current device theme.

**Working case:** Switching from "System" theme to the opposite standalone theme works fine (e.g., System with dark device → Light standalone).

## Reproduction Steps

1. **Set your device to dark mode** (or light mode for the opposite case)
2. **Open the app** - it should start with the default theme
3. **Switch to "System" theme** - this works fine, the app adapts to the device theme
4. **Try to switch to "Dark" standalone theme** (if device is dark) or "Light" standalone theme (if device is light)
5. **Observe the bug** - The app breaks/fails to switch properly

### Expected Behavior

You should be able to switch from "System" theme to any standalone theme (Light or Dark), regardless of what the device's current theme is.

### Actual Behavior

- ✅ Switching from "System" (dark device) → "Light" standalone works correctly
- ❌ Switching from "System" (dark device) → "Dark" standalone breaks the app
- ✅ Switching from "System" (light device) → "Dark" standalone works correctly
- ❌ Switching from "System" (light device) → "Light" standalone breaks the app

## Root Cause

The issue appears to be in how `uniwind` handles the transition from adaptive/system theme to a standalone theme when the standalone theme matches the device's current theme. The library likely doesn't properly detect that a change is needed because the effective theme (what's displayed) doesn't change, even though the theme mode (adaptive vs standalone) does change.

## Technical Details

- **Library:** `uniwind@1.0.0-rc.7`
- **Framework:** Expo with React Native
- **Theme Modes:** `"light" | "dark" | "system"`

The bug occurs when calling:

```tsx
Uniwind.setTheme("dark"); // or "light"
```

When the app is currently on `"system"` theme and the device theme matches the target standalone theme.

## Component Used

The bug is reproduced using the `ThemeSwitcher` component which uses:

- `useUniwind()` hook to get current theme state
- `Uniwind.setTheme()` to change themes

## Running the Reproduction

```bash
# Install dependencies
bun install

# Start the app
bun run ios    # for iOS
bun run android # for Android
bun run web    # for web
```

## Files

- `components/theme-switcher.tsx` - The theme switcher component that reproduces the bug
- `app/(tabs)/index.tsx` - Simple homepage with the theme switcher
- `app/_layout.tsx` - Root layout with uniwind setup
- `styles/globals.css` - CSS with theme variables
