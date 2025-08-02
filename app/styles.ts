import { Platform, StyleSheet } from 'react-native';
import { APP_CONSTANTS } from './constants';

// Common styles used across multiple screens
export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingBottom: Platform.OS === 'ios' ? 100 : 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: APP_CONSTANTS.SPACING.XLARGE,
  },
  header: {
    paddingHorizontal: APP_CONSTANTS.SPACING.MEDIUM,
    marginBottom: APP_CONSTANTS.SPACING.LARGE,
  },
  title: {
    ...APP_CONSTANTS.FONTS.TITLE,
    marginBottom: APP_CONSTANTS.SPACING.SMALL,
    paddingTop: 4,
    paddingBottom: 4,
  },
  subtitle: {
    ...APP_CONSTANTS.FONTS.SUBTITLE,
    textAlign: 'center',
    paddingTop: 2,
    paddingBottom: 2,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 24,
    paddingTop: 2,
    paddingBottom: 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: APP_CONSTANTS.SPACING.XLARGE,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 30,
    marginTop: 16,
    marginBottom: 8,
    paddingTop: 3,
    paddingBottom: 3,
  },
  emptySubtitle: {
    ...APP_CONSTANTS.FONTS.SUBTITLE,
    textAlign: 'center',
    paddingTop: 2,
    paddingBottom: 2,
  },
});

// Button styles
export const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: APP_CONSTANTS.COLORS.PRIMARY,
    paddingHorizontal: APP_CONSTANTS.SPACING.XLARGE,
    paddingVertical: APP_CONSTANTS.SPACING.MEDIUM,
    borderRadius: 8,
    minWidth: 200,
    alignItems: 'center',
  },
  primaryText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
    paddingTop: 2,
    paddingBottom: 2,
  },
  destructive: {
    backgroundColor: APP_CONSTANTS.COLORS.ERROR,
    paddingVertical: APP_CONSTANTS.SPACING.MEDIUM,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  destructiveText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
    paddingTop: 2,
    paddingBottom: 2,
  },
});

// Form styles
export const formStyles = StyleSheet.create({
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: APP_CONSTANTS.SPACING.MEDIUM,
    marginBottom: APP_CONSTANTS.SPACING.MEDIUM,
    fontSize: 16,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: APP_CONSTANTS.SPACING.XLARGE,
  },
}); 