# 🎬 Movie Mate App

A **React Native + Expo** mobile application built as part of the Panda Hub technical test.  
The app displays a list of popular movies from **The Movie Database (TMDB)** API with a detail view for each movie.

## 📋 Features

- **Welcome Screen**: Personalized greeting with user profile picture
- **Search Bar**: Gradient-styled search input with interactive functionality
- **Now Playing**: Interactive, animated carousel of currently playing movies
- **Coming Soon**: Vertical list of upcoming movies with sample data
- **Detail Screen**: Full movie information (overview, release date, rating, etc.)
- **Pixel-perfect UI**: Matches provided design specifications
- **Responsive**: Tested on Android and iOS simulators

## 🛠 Tech Stack

- **Framework**: [React Native](https://reactnative.dev/) with [Expo](https://docs.expo.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Navigation**: [React Navigation](https://reactnavigation.org/)
- **State Management**: React Hooks with custom hooks
- **HTTP Requests**: [Axios](https://axios-http.com/) with typed interfaces
- **API**: [The Movie Database (TMDB)](https://developer.themoviedb.org/docs)
- **Image Handling**: Expo Image for optimized performance
- **UI Components**: Custom components with animations

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Android Studio / Xcode (for mobile development)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd movie-mate
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Run on your preferred platform**

   ```bash
   # Android
   npm run android

   # iOS
   npm run ios

   # Web
   npm run web
   ```

## 📁 Project Structure

```
app/
├── components/
│   ├── WelcomeBoard.tsx      # Welcome header with user profile
│   ├── SearchBar.tsx         # Interactive search input UI
│   ├── NowPlaying.tsx        # Animated movie carousel
│   ├── ComingSoon.tsx        # Upcoming movies list
│   └── MovieCard.tsx         # Reusable movie card component
├── _layout.tsx               # Navigation layout
└── index.tsx                 # Main entry screen
```

## 🎨 Key Components

### WelcomeBoard

- Personalized greeting with user profile
- Responsive layout with proper spacing
- Dark theme integration

### SearchBar

- Gradient-styled input with focus states
- Interactive search functionality
- Clear button for user convenience

### NowPlaying

- Smooth animated carousel
- Pagination dots for navigation
- Movie cards with ratings and details

### ComingSoon

- Vertical list of upcoming movies
- Thumbnail images with rating badges
- Responsive grid layout

### MovieCard

- Reusable component for movie display
- Support for poster images and fallbacks
- Rating display with star icons
- Smooth animations and interactions
