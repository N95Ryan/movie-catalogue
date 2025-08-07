# Movie Catalogue App 🎬

A mobile movie catalogue application developed with React Native, Expo, and TypeScript as part of a technical challenge for a Frontend Developer position at Panda Hub.

## 📱 About the Project

This application demonstrates pixel-perfect implementation of a movie catalogue interface, fetching data from The Movie Database (TMDB) API. The app features a modern, responsive design with smooth navigation between screens, emphasizing attention to detail and code quality.

### Main Features

- **Pixel-Perfect List Screen**: Display of popular movies with poster, title, and rating
- **Detailed Movie Screen**: Complete information about each movie (synopsis, release date, rating)
- **Smooth Navigation**: Use of React Navigation for screen transitions
- **Responsive Design**: Interface adapted for Android and iOS with exact pixel matching
- **Clean Architecture**: Modular component structure with TypeScript

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation
- **State Management**: React Hooks
- **HTTP Requests**: Axios with typed interfaces
- **User Interface**: Custom components with light/dark theme support
- **API**: The Movie Database (TMDB)
- **Image Handling**: Expo Image for optimized loading

## 🚀 Installation and Setup

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- Expo Go (mobile app for testing)
- iOS Simulator or Android Emulator

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd movie-catalogue
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the application**

   ```bash
   npm start
   # or
   npx expo start
   ```

### Launch Options

Once the application is started, you can:

- **Test on mobile**: Scan the QR code with Expo Go
- **iOS Simulator**: Press `i` in the terminal
- **Android Emulator**: Press `a` in the terminal
- **Web version**: Press `w` in the terminal

## 📁 Project Structure

```
movie-catalogue/
├── app/                    # Navigation and screens (Expo Router)
│   ├── (tabs)/            # Navigation tabs
│   │   ├── index.tsx      # Movie list screen
│   │   └── explore.tsx    # Movie detail screen
│   └── _layout.tsx        # Main layout
├── components/             # Reusable components
│   ├── ui/                # UI components
│   ├── ThemedText.tsx     # Themed text component
│   ├── ThemedView.tsx     # Themed view component
│   └── ParallaxScrollView.tsx
├── services/              # API services
│   └── api.ts            # TMDB API service with Axios
├── types/                 # TypeScript interfaces
│   └── movie.ts          # Movie data types
├── constants/              # Application constants
│   └── Colors.ts          # Color definitions
├── hooks/                  # Custom hooks
│   └── useColorScheme.ts  # Theme hook
├── assets/                 # Static resources
│   ├── images/            # Images and icons
│   └── fonts/             # Custom fonts
└── package.json           # Dependencies and scripts
```

## 🎯 Implemented Features

### Movie List Screen

- Fetch popular movies from TMDB API (`/movie/popular`)
- Display movie posters, titles, and ratings
- Responsive grid layout with pixel-perfect spacing
- Light/dark theme support
- Optimized image loading with Expo Image

### Movie Detail Screen

- Complete movie information display
- Synopsis and release date formatting
- Rating display with visual indicators
- Navigation back to list with smooth transitions
- Backdrop image support

### Technical Architecture

- **TypeScript**: Strict typing for API responses and components
- **Modular Components**: Clean, reusable component structure
- **API Service**: Centralized TMDB API calls with error handling
- **Theme Management**: Automatic light/dark theme support
- **Performance**: Optimized image loading and smooth animations

## 🔧 Available Scripts

```bash
npm start          # Start the application
npm run android    # Launch on Android
npm run ios        # Launch on iOS
npm run web        # Launch web version
npm run lint       # Check code with ESLint
```

## 📝 Technical Notes

### TMDB API Integration

- Uses public TMDB API without authentication
- Typed API responses for type safety
- Centralized API service with Axios
- Image URL generation for posters and backdrops
- Error handling and loading states

### Compatibility

- Tested on iOS and Android simulators
- Support for different screen sizes and densities
- Portrait orientation optimized
- Support for devices with notch and safe areas

**Developed with ❤️ for Panda Hub**
