# Habit Tracker App

Built by [Ranjitha Rangaswamy](https://ranjitharangaswamy.com)

A comprehensive habit tracking mobile application built with React Native, Expo, and Convex for real-time data synchronization. The app helps users build and maintain positive habits through automated reminders, streak tracking, and social features.

## 🚀 Features

### Core Features
- **Daily Habit Completion**: One-tap habit completion with streak tracking
- **Real-time Sync**: Convex-powered data synchronization across devices
- **User Authentication**: Simple email-based authentication
- **Progress Tracking**: Visual progress indicators and statistics
- **Habit Management**: Create, edit, and organize habits with categories
- **Streak Tracking**: Automatic calculation of current and longest streaks

### User Journey
1. **Open App**: User opens the app to see today's habits
2. **View Today's Habits**: Dashboard shows all habits due for today
3. **Mark Completion**: One-tap to mark habits as completed
4. **See Progress**: Immediate visual feedback showing completion status
5. **Celebrate Streaks**: Special animations for maintaining streaks

## 🛠️ Technology Stack

- **React Native**: Cross-platform mobile development
- **Expo SDK 53**: Development framework and tooling
- **TypeScript**: Type-safe JavaScript development
- **Convex**: Real-time database and backend platform
- **Expo Router 5**: File-based navigation system
- **React Native Reanimated**: Animations and interactions

## 📱 Screenshots

The app features a clean, intuitive interface with:
- **Today Tab**: Main dashboard for daily habit completion
- **Habits Tab**: Habit management and organization
- **Stats Tab**: Progress tracking and analytics
- **Explore Tab**: Social features and community (planned)
- **Profile Tab**: Settings and user information

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- pnpm (recommended) or npm
- Expo CLI
- iOS Simulator (for iOS development)
- Android Emulator (for Android development)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd habit-tracker
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Start Convex Development Server**:
   ```bash
   npx convex dev
   ```

4. **Start Expo Development Server**:
   ```bash
   pnpm start
   ```

5. **Run on Device/Simulator**:
   - Scan QR code with Expo Go app
   - Or press 'i' for iOS simulator
   - Or press 'a' for Android emulator

## 🏗️ Project Structure

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

## 🗄️ Database Schema

The app uses Convex for real-time data synchronization with the following schema:

### Users
```typescript
interface User {
  _id: Id<"users">;
  email: string;
  name?: string;
  avatar?: string;
  createdAt: number;
}
```

### Habits
```typescript
interface Habit {
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
```

### Completions
```typescript
interface Completion {
  _id: Id<"completions">;
  habitId: Id<"habits">;
  userId: Id<"users">;
  completedAt: number;
  notes?: string;
}
```

## 🧪 Testing

To test the implementation:

1. Open the app and sign in with an email
2. Create sample habits using the "Create Sample Habits" button
3. Navigate between Today and Habits tabs
4. Tap habit cards to mark them as completed
5. Observe real-time updates and visual feedback

## 📊 Development Commands

### Package Management
- Install dependencies: `pnpm install`
- Update packages: `pnpm update`

### Development Server
- Start development server: `pnpm start` or `npx expo start`
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

## 🔧 Environment Setup

The app uses the following environment variables (automatically configured by Convex):

- `EXPO_PUBLIC_CONVEX_URL`: Convex deployment URL
- `CONVEX_DEPLOYMENT`: Convex deployment identifier

## 📈 Development Phases

### ✅ Phase 1: Core Completion Journey
- Today dashboard with habit completion
- Convex database implementation
- One-tap completion with animations
- Basic streak tracking

### ✅ Phase 2: Habit Management
- Habit creation and editing
- Category organization
- Reminder setup
- Settings and preferences

### ✅ Phase 4: Progress Tracking
- Statistics and analytics
- Progress visualization
- Achievement system
- Goal setting features

### 🔄 Phase 3: Notifications (Planned)
- Push notification implementation
- Reminder scheduling system
- Notification permission handling
- Background notification processing

### 🔄 Phase 5: Social Features (Planned)
- Convex authentication system
- Community features implementation
- Leaderboards and achievements
- Real-time data synchronization

### 🔄 Phase 6: Polish & Testing (Planned)
- UI/UX refinements
- Performance optimization
- Comprehensive testing
- App store preparation

## 🎯 Success Metrics

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Expo](https://expo.dev) for the amazing development framework
- [Convex](https://convex.dev) for real-time database and backend services
- [React Native](https://reactnative.dev) for cross-platform mobile development

## 📞 Support

For support, email support@habittracker.com or join our Discord community.

---

**Built with ❤️ using React Native, Expo, and Convex**
