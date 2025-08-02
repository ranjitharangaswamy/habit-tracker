// App-wide constants
export const APP_CONSTANTS = {
  COLORS: {
    PRIMARY: '#0a7ea4',
    SUCCESS: '#4CAF50',
    ERROR: '#FF3B30',
    WARNING: '#FF9500',
    TEXT_PRIMARY: '#000000',
    TEXT_SECONDARY: '#666666',
    BACKGROUND: '#FFFFFF',
  },
  SPACING: {
    SMALL: 8,
    MEDIUM: 16,
    LARGE: 24,
    XLARGE: 32,
  },
  FONTS: {
    TITLE: {
      fontSize: 32,
      fontWeight: 'bold',
      lineHeight: 40,
    },
    SUBTITLE: {
      fontSize: 16,
      opacity: 0.7,
      lineHeight: 22,
    },
    BODY: {
      fontSize: 16,
      lineHeight: 22,
    },
    CAPTION: {
      fontSize: 14,
      lineHeight: 18,
    },
  },
} as const;

// Tab configuration
export const TAB_CONFIG = [
  {
    name: 'today',
    title: 'Today',
    icon: 'house.fill',
  },
  {
    name: 'habits',
    title: 'Habits',
    icon: 'list.bullet',
  },
  {
    name: 'stats',
    title: 'Stats',
    icon: 'chart.bar.fill',
  },
  {
    name: 'explore',
    title: 'Explore',
    icon: 'paperplane.fill',
  },
  {
    name: 'profile',
    title: 'Profile',
    icon: 'person.fill',
  },
] as const; 