# CLAUDE.md - Habit Tracker Project Documentation

This file provides comprehensive guidance to Claude Code (claude.ai/code) when working with this habit tracker repository.

## Project Overview

This is a React Native Expo habit tracker application built with TypeScript, Convex for real-time data synchronization, and file-based routing. The project is configured for cross-platform development (iOS, Android, Web) with modern React Native architecture enabled.

### Core Features
- **Daily Habit Completion**: One-tap habit completion with streak tracking
- **Real-time Sync**: Convex-powered data synchronization across devices
- **User Authentication**: Simple email-based authentication
- **Progress Tracking**: Visual progress indicators and statistics
- **Habit Management**: Create, edit, and organize habits with categories
- **Streak Tracking**: Automatic calculation of current and longest streaks

## Architecture & Implementation

### Technology Stack
- **React Native**: Cross-platform mobile development
- **Expo SDK 53**: Development framework and tooling
- **TypeScript**: Type-safe JavaScript development
- **Convex**: Real-time database and backend platform
- **Expo Router 5**: File-based navigation system
- **React Native Reanimated**: Animations and interactions

### Database Schema (Convex)
```typescript
// Users table
export interface User {
  _id: Id<"users">;
  email: string;
  name?: string;
  avatar?: string;
  createdAt: number;
}

// Habits table
export interface Habit {
  _id: Id<"habits">;
  userId: Id<"users">;
  name: string;
  description?: string;
  category: string;
  frequency: "daily" | "weekly" | "custom";
  reminderTimes: string[];
  color: string;
  icon: string;
  goal?: number;
  createdAt: number;
  updatedAt: number;
}

// Completions table
export interface Completion {
  _id: Id<"completions">;
  habitId: Id<"habits">;
  userId: Id<"users">;
  completedAt: number;
  notes?: string;
}

// User settings table
export interface UserSettings {
  _id: Id<"userSettings">;
  userId: Id<"users">;
  notificationPreferences: {
    reminders: boolean;
    streakAlerts: boolean;
    motivationalMessages: boolean;
  };
  theme: "light" | "dark" | "auto";
  timezone: string;
}
```

### Key Database Functions

#### Habits (`convex/habits.ts`)
- `getUserHabits`: Get all habits for a user
- `getTodayHabits`: Get today's habits
- `createHabit`: Create a new habit
- `updateHabit`: Update habit details
- `deleteHabit`: Delete a habit and its completions

#### Completions (`convex/completions.ts`)
- `getTodayCompletions`: Get today's completions
- `isHabitCompletedToday`: Check if habit is completed today
- `completeHabit`: Mark habit as completed
- `uncompleteHabit`: Remove today's completion
- `getHabitStreak`: Calculate current and longest streaks

#### Users (`convex/users.ts`)
- `getUserByEmail`: Get user by email
- `createUser`: Create new user with default settings
- `updateUser`: Update user profile

### Custom Hooks

#### `useUser`
- Manages user authentication state
- Handles sign-in/sign-out operations
- Persists user ID in AsyncStorage

#### `useHabits`
- Provides access to user's habits
- Handles habit creation and management
- Real-time habit data updates

#### `useCompletions`
- Manages habit completion state
- Provides one-tap completion functionality
- Tracks completion status in real-time

#### `useStats`
- Calculates user statistics and progress
- Provides streak data and analytics
- Real-time stat updates

## File Structure

```
habit-tracker/
├── app/                    # Main application screens
│   ├── _layout.tsx        # Root layout with providers
│   ├── index.tsx          # Entry point (redirects to today tab)
│   ├── +not-found.tsx     # 404 error screen
│   ├── constants.ts        # App-wide constants and configuration
│   ├── styles.ts          # Shared styles and theme
│   └── (tabs)/            # Tab-based navigation
│       ├── _layout.tsx    # Tab navigation layout
│       ├── today.tsx      # Today's habits screen
│       ├── habits.tsx     # Habits management screen
│       ├── stats.tsx      # Statistics screen
│       ├── explore.tsx    # Explore/social features screen
│       └── profile.tsx    # User profile screen
├── components/            # Reusable UI components
│   ├── HabitCard.tsx     # Habit display component
│   ├── ThemedText.tsx    # Themed text component
│   ├── ThemedView.tsx    # Themed view component
│   └── ui/               # UI-specific components
├── convex/               # Backend database and functions
│   ├── schema.ts         # Database schema definition
│   ├── habits.ts         # Habit-related functions
│   ├── completions.ts    # Completion-related functions
│   └── users.ts          # User-related functions
├── hooks/                # Custom React hooks
│   ├── useUser.ts        # User authentication hook
│   ├── useHabits.ts      # Habits data hook
│   ├── useCompletions.ts # Completions data hook
│   └── useStats.ts       # Statistics hook
└── assets/               # Static assets
```

## App Refactoring Summary

### Changes Made

#### 1. Removed Unused Dependencies
- **Removed**: SpaceMono font loading from `_layout.tsx`
- **Removed**: Unused `react-native-reanimated` global import
- **Deleted**: `assets/fonts/SpaceMono-Regular.ttf` (91KB file)
- **Deleted**: `assets/fonts/` directory (now empty)

#### 2. Created Centralized Configuration
- **Added**: `constants.ts` - App-wide constants, colors, spacing, and tab configuration
- **Added**: `styles.ts` - Shared styles to reduce code duplication
- **Added**: `README.md` - Documentation for app folder structure

#### 3. Refactored Tab Layout
- **Before**: Hardcoded tab configuration in `_layout.tsx`
- **After**: Centralized `TAB_CONFIG` in `constants.ts`
- **Benefit**: Easier to add/remove tabs, consistent configuration

#### 4. Refactored Screen Components
- **explore.tsx**: Reduced from 35 lines to 15 lines (57% reduction)
- **today.tsx**: Removed duplicate styles, used shared styles
- **profile.tsx**: Removed duplicate styles, used shared button/form styles
- **+not-found.tsx**: Simplified using shared styles

#### 5. Created Shared Styles
- **commonStyles**: Container, header, title, subtitle, loading, empty states
- **buttonStyles**: Primary and destructive button styles
- **formStyles**: Input and form container styles

### Code Reduction

| File | Before | After | Reduction |
|------|--------|-------|-----------|
| explore.tsx | 35 lines | 15 lines | 57% |
| today.tsx | 152 lines | 89 lines | 41% |
| profile.tsx | 246 lines | 108 lines | 56% |
| +not-found.tsx | 33 lines | 25 lines | 24% |
| _layout.tsx | 30 lines | 15 lines | 50% |
| **Total** | **496 lines** | **252 lines** | **49%** |

### Benefits

#### 1. Maintainability
- **Centralized configuration**: Colors, spacing, and tab config in one place
- **Shared styles**: No more duplicate style definitions
- **Consistent theming**: All screens use the same design tokens

#### 2. Developer Experience
- **Easier to add new screens**: Just import shared styles
- **Easier to modify themes**: Change constants.ts to update entire app
- **Better documentation**: README explains structure and usage

#### 3. Performance
- **Reduced bundle size**: Removed unused font file (91KB)
- **Faster loading**: No font loading overhead
- **Cleaner imports**: Removed unnecessary global imports

#### 4. Code Quality
- **DRY principle**: No duplicate style definitions
- **Single source of truth**: Colors and spacing defined once
- **Type safety**: Constants are properly typed with `as const`

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

## User Journey Implementation

### Primary Journey: Daily Habit Completion

#### Flow
1. **Open App**: User opens the app to see today's habits
2. **View Today's Habits**: Dashboard shows all habits due for today
3. **Mark Completion**: One-tap to mark habits as completed
4. **See Progress**: Immediate visual feedback showing completion status
5. **Celebrate Streaks**: Special animations for maintaining streaks

#### Key Features
- **Quick Completion**: One-tap habit completion with haptic feedback
- **Visual Status**: Clear visual indicators (checkmarks, progress bars)
- **Streak Counter**: Prominent display of current and longest streaks
- **Today's Focus**: Dashboard prioritizes today's habits over all habits
- **Completion History**: Easy access to mark missed days as completed

### Secondary Journeys

#### Habit Management
- Create and manage habits with categories, colors, and icons
- Real-time habit data synchronization across devices
- Habit completion tracking with streak calculation

#### Progress Tracking
- View statistics and analytics
- Analyze patterns and trends
- Set goals and celebrate achievements

#### Social Engagement (Planned)
- View leaderboards and rankings
- Share achievements and milestones
- Discover habits from community
- Connect with accountability partners

## Key Components

### `HabitCard`
- Displays habit information with color and icon
- Shows completion status with visual indicators
- Provides one-tap completion with haptic feedback
- Displays streak information

### `ThemedText` & `ThemedView`
- Automatic dark/light mode support
- Consistent theming across the app
- Reusable themed components

### Navigation Structure
- **Today Tab** (Home): Main dashboard for daily completion
- **Habits Tab**: Habit management and organization
- **Stats Tab**: Progress tracking and analytics
- **Explore Tab**: Social features and community
- **Profile Tab**: Settings and user information

## Environment Setup

The app uses the following environment variables (automatically configured by Convex):

- `EXPO_PUBLIC_CONVEX_URL`: Convex deployment URL
- `CONVEX_DEPLOYMENT`: Convex deployment identifier

## Getting Started

1. **Install Dependencies**:
   ```bash
   pnpm install
   ```

2. **Start Convex Development Server**:
   ```bash
   npx convex dev
   ```

3. **Start Expo Development Server**:
   ```bash
   pnpm start
   ```

4. **Run on Device/Simulator**:
   - Scan QR code with Expo Go app
   - Or press 'i' for iOS simulator
   - Or press 'a' for Android emulator

## Testing

To test the implementation:

1. Open the app and sign in with an email
2. Create sample habits using the "Create Sample Habits" button
3. Navigate between Today and Habits tabs
4. Tap habit cards to mark them as completed
5. Observe real-time updates and visual feedback

## Future Enhancements

### Phase 1: Core Completion Journey ✅
- Today dashboard with habit completion
- Convex database implementation
- One-tap completion with animations
- Basic streak tracking

### Phase 2: Habit Management ✅
- Habit creation and editing
- Category organization
- Reminder setup
- Settings and preferences

### Phase 3: Notifications (Planned)
- Push notification implementation
- Reminder scheduling system
- Notification permission handling
- Background notification processing

### Phase 4: Progress Tracking ✅
- Statistics and analytics
- Progress visualization
- Achievement system
- Goal setting features

### Phase 5: Social Features (Planned)
- Convex authentication system
- Community features implementation
- Leaderboards and achievements
- Real-time data synchronization

### Phase 6: Polish & Testing (Planned)
- UI/UX refinements
- Performance optimization
- Comprehensive testing
- App store preparation

## Success Metrics

### Primary Journey Metrics
- **Daily Completion Rate**: Percentage of habits completed each day
- **Streak Retention**: Users maintaining streaks over time
- **Session Duration**: Time spent completing daily habits
- **Return Rate**: Users returning the next day

### Technical Metrics
- **App Performance**: Monitor launch time and responsiveness
- **Crash Rate**: Track application stability
- **Battery Impact**: Monitor battery usage
- **Sync Performance**: Track real-time synchronization efficiency

## Risk Mitigation

### Primary Journey Risks
- **Completion Friction**: Ensure one-tap completion is truly simple
- **Notification Fatigue**: Allow users to customize notification frequency
- **Data Loss**: Implement robust backup and sync mechanisms
- **Performance Issues**: Optimize for quick habit completion

### Technical Risks
- **Notification Reliability**: Implement fallback mechanisms
- **Network Connectivity**: Handle offline scenarios gracefully
- **Platform Updates**: Stay current with React Native and Expo updates
- **Privacy Concerns**: Clear privacy policy and user controls

This implementation provides a solid foundation for the habit tracking app with real-time data synchronization and a smooth user experience focused on the primary journey of daily habit completion.