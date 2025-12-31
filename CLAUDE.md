# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Cross-platform mobile application (iOS + Android) that captures photos via camera and analyzes them using Claude's Vision API. This is a proof-of-concept built with React Native and Expo.

## Technology Stack

- **Framework**: React Native 0.76+ with Expo SDK 51+
- **Language**: TypeScript (strict mode)
- **Camera**: react-native-vision-camera
- **AI Processing**: Claude API (Sonnet 4.5) for image analysis
- **Navigation**: React Navigation
- **State Management**: Zustand or Redux Toolkit
- **Development Tools**: ESLint, Prettier

## Architecture

The codebase follows a modular MVVM-like pattern with React hooks:

```
src/
├── screens/        # Main UI screens (CameraScreen, ResultScreen)
├── components/     # Reusable components (CameraPreview, ImageAnalysis)
├── services/       # External API integrations (cameraService, claudeService)
├── hooks/          # Custom React hooks (useCamera, useImageAnalysis)
├── utils/          # Utility functions (imageUtils - resize, compress, convert)
├── types/          # TypeScript type definitions
```

### Key Architectural Principles

- **Service Layer**: All Claude API interactions go through `claudeService.ts`
- **Image Preprocessing**: Images must be optimized before sending to Claude API (max 1568px, 80% compression)
- **Platform Abstraction**: Use `Platform.select()` for platform-specific code
- **Error Boundaries**: All API calls and camera operations have comprehensive error handling

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npx expo start

# Run on iOS simulator
npx expo run:ios

# Run on Android emulator
npx expo run:android

# Type checking
npx tsc --noEmit

# Linting
npm run lint

# Format code
npm run format
```

## Platform-Specific Considerations

### iOS
- Camera usage description required in `app.json` under `ios.infoPlist.NSCameraUsageDescription`
- Test on physical device recommended (camera features limited in simulator)

### Android
- CAMERA permission must be declared in `app.json`
- Test camera permissions on both Android 12+ and earlier versions

### Windows Development Notes
- Do NOT use `ping -n 10 127.0.0.1 > nul` for delays (creates a file named `nul`)
- Use proper async/await patterns instead

## Claude API Integration

### Image Optimization Strategy
Before sending images to Claude API:
1. Resize to max 1568px on longest edge
2. Compress to ~80% quality (JPEG)
3. Convert to base64
4. Use `expo-image-manipulator` for all preprocessing

### Cost Optimization
- Average cost per image: ~$0.004-0.008
- Implement caching with AsyncStorage to avoid re-analyzing identical images
- Consider on-device ML pre-screening for high-frequency operations

## Coding Standards

- **Components**: Functional components with hooks only (no class components)
- **Async Operations**: Always use async/await (never raw promises)
- **Type Safety**: TypeScript strict mode enabled - all functions must be fully typed
- **Error Handling**: All API calls wrapped in try/catch with user-friendly error messages
- **Modularity**: Single-responsibility principle - one concern per file/function

## PoC Scope

### In Scope
- Camera capture with front/back switching
- Photo preview before analysis
- Claude API integration for image analysis
- Loading states and error handling
- Basic UI with results display

### Out of Scope (for initial PoC)
- Photo gallery/history
- Advanced filters or editing
- Offline mode
- Real-time frame processing (optional enhancement)

## Common Use Cases

1. Document scanning and text extraction
2. Object identification
3. Scene description
4. Product analysis
5. Receipt/invoice processing

## Testing

- Camera features MUST be tested on physical devices (simulators have limitations)
- Integration tests for Claude API service should use mock responses
- Create demo mode for simulator testing without camera hardware
