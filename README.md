# Color - AI Image Analysis App

Cross-platform mobile app (iOS + Android) that captures photos and analyzes them using Claude's Vision API.

## Tech Stack

- React Native 0.76+ with Expo SDK 51+
- TypeScript
- react-native-vision-camera for camera operations
- Claude Sonnet 4.5 API for image analysis
- React Navigation for routing

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI
- iOS Simulator (macOS) or Android Emulator

### Installation

1. Clone the repository:
```bash
git clone https://github.com/dariy-ai/color.git
cd color
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env and add your Claude API key
```

### Running the App

```bash
# Start development server
npx expo start

# Run on iOS simulator
npx expo run:ios

# Run on Android emulator
npx expo run:android
```

## Project Structure

```
src/
├── screens/        # Main UI screens
├── components/     # Reusable components
├── services/       # External API integrations
├── hooks/          # Custom React hooks
├── utils/          # Utility functions
├── types/          # TypeScript type definitions
```

## Features (Planned)

- Camera capture with front/back switching
- Photo preview before analysis
- Claude API integration for image analysis
- Loading states and error handling
- Results display

## Development

See [CLAUDE.md](CLAUDE.md) for detailed development guidelines and architecture information.

## License

MIT
