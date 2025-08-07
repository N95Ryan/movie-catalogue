import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Système de grille
export const GRID = {
  // Marges principales
  MARGIN_HORIZONTAL: 20,
  MARGIN_VERTICAL: 16,
  
  // Espacements
  SPACING_XS: 4,
  SPACING_SM: 8,
  SPACING_MD: 12,
  SPACING_LG: 16,
  SPACING_XL: 20,
  SPACING_XXL: 24,
  
  // Largeurs
  CARD_WIDTH: SCREEN_WIDTH - 40, // Écran - marges
  CAROUSEL_CARD_WIDTH: 280,
  
  // Hauteurs
  CARD_HEIGHT: 320,
  CAROUSEL_HEIGHT: 450,
  
  // Rayons de bordure
  BORDER_RADIUS_SM: 8,
  BORDER_RADIUS_MD: 12,
  BORDER_RADIUS_LG: 16,
  BORDER_RADIUS_XL: 24,
  
  // Padding
  PADDING_SM: 8,
  PADDING_MD: 12,
  PADDING_LG: 16,
  PADDING_XL: 20,
};

// Couleurs du thème
export const COLORS = {
  BACKGROUND: '#1C1C1C',
  SURFACE: '#2A2A2A',
  SURFACE_LIGHT: '#3A3A3A',
  TEXT_PRIMARY: '#FFFFFF',
  TEXT_SECONDARY: '#9CA3AF',
  ACCENT: '#FF9500',
  BORDER: '#3A3A3A',
};

// Typographie
export const TYPOGRAPHY = {
  H1: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 32,
  },
  H2: {
    fontSize: 20,
    fontWeight: '500' as const,
    lineHeight: 28,
  },
  H3: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  BODY: {
    fontSize: 28,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  CAPTION: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  SMALL: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
};
