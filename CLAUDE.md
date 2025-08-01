# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Native Expo habit tracker application using file-based routing and TypeScript. The project is configured for cross-platform development (iOS, Android, Web) with modern React Native architecture enabled.

## Development Commands

### Package Management
- Uses **pnpm** as the package manager
- Install dependencies: `pnpm install`

### Development Server
- Start development server: `pnpm start` or `npx expo start`
- Update all packages and dependencies: `pnpm update`
- Start for specific platforms:
  - Android: `pnpm run android`
  - iOS: `pnpm run ios` 
  - Web: `pnpm run web`

### Code Quality
- Lint code: `pnpm run lint`
- ESLint is configured with `eslint-config-expo`

### Project Reset
- Reset to blank project: `pnpm run reset-project`
- This moves current app to `app-example/` and creates a blank `app/` directory

## Architecture

### File-Based Routing
- Uses Expo Router with file-based routing in the `app/` directory
- Main layout: `app/_layout.tsx` (root layout with theme provider)
- Tab navigation: `app/(tabs)/_layout.tsx` 
- Home screen: `app/(tabs)/index.tsx`
- Explore screen: `app/(tabs)/explore.tsx`
- 404 page: `app/+not-found.tsx`

### Component Organization
- Reusable components in `components/` directory
- UI-specific components in `components/ui/`
- Themed components: `ThemedText`, `ThemedView` for automatic dark/light mode support

### Styling & Theming
- Uses React Navigation's theme system with automatic dark/light mode
- Color constants in `constants/Colors.ts`
- Custom hooks for theme management in `hooks/`

### Key Dependencies
- **Expo SDK 53** - Cross-platform development framework
- **Expo Router 5** - File-based navigation
- **React Native Reanimated** - Animations
- **React Navigation** - Navigation with bottom tabs
- **TypeScript** - Type safety with strict mode enabled

### TypeScript Configuration
- Path alias `@/*` maps to project root for cleaner imports
- Strict TypeScript settings enabled
- Includes Expo type definitions

### Development Features
- Haptic feedback on tab interactions
- Parallax scroll views
- Cross-platform icon system with SF Symbols (iOS) and other platforms
- Edge-to-edge display support on Android
- New React Native architecture enabled