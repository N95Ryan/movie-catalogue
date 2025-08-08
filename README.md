# Movie Catalogue App

A simple React Native movie catalogue application built with Expo.

## Features

- **Welcome Screen**: Personalized greeting with user profile
- **Search Bar**: Movie search with gradient design
- **Now Playing**: Interactive carousel with smooth animations
- **Coming Soon**: List of upcoming movies
- **Dark Theme**: Modern dark UI design

## Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **Expo Router** for navigation
- **Animated API** for smooth animations
- **Linear Gradient** for visual effects

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

3. Run on your preferred platform:

```bash
npm run android
npm run ios
npm run web
```

## Project Structure

```
app/
├── components/          # Reusable UI components
│   ├── WelcomeBoard.tsx
│   ├── SearchBar.tsx
│   ├── NowPlaying.tsx
│   ├── ComingSoon.tsx
│   └── MovieCard.tsx
├── _layout.tsx         # Root layout configuration
└── index.tsx          # Main home screen
```

## Components

- **WelcomeBoard**: User greeting and profile display
- **SearchBar**: Search input with gradient background
- **NowPlaying**: Animated movie carousel with pagination
- **ComingSoon**: List of upcoming movies
- **MovieCard**: Individual movie card with animations

## Development

This project uses a simplified architecture with:

- Local CSS styles in each component
- Mock data for UI development
- Minimal dependencies for better performance
- Clean and readable code structure
