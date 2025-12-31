Perfect! Now I can provide you with a comprehensive recommendation for a **cross-platform (Android + iOS/iPadOS) PoC with camera input and AI image processing**.

## **Recommended Approach: React Native + Expo with Claude Vision API**

### **Why React Native/Expo is Ideal for Your PoC**

Given your requirements (camera + AI image processing + cross-platform), **React Native with Expo** is the optimal choice:

✅ **Single Codebase:** ~85-95% code sharing between iOS and Android  
✅ **Excellent Camera Support:** Industry-leading camera libraries  
✅ **JavaScript/TypeScript:** Easier for Claude Code to work with (better ecosystem than Dart/Flutter)  
✅ **Rapid PoC Development:** 2-3 weeks vs 4-6 weeks for native  
✅ **Mature AI/ML Integration:** Native support for on-device and cloud AI  
✅ **Your Background:** As a .NET developer, TypeScript will feel more familiar than Dart

### **Technology Stack**

```
📱 Framework: React Native 0.76+ with Expo SDK 51+
📸 Camera: react-native-vision-camera (gold standard for camera work)
🧠 AI Processing: Claude API (Sonnet 4.5) for image analysis
🏗️ Architecture: MVVM-like pattern with hooks
⚡ State Management: Zustand or Redux Toolkit
🎨 UI: React Native Paper (Material Design) or NativeBase
🔧 Development: Claude Code for accelerated development
```

---

## **Architecture Overview**

```
your-camera-ai-poc/
├── CLAUDE.md                    # Claude Code context
├── ROADMAP.md                   # Feature planning
├── app.json                     # Expo configuration
├── src/
│   ├── screens/
│   │   ├── CameraScreen.tsx     # Main camera interface
│   │   └── ResultScreen.tsx     # AI analysis results
│   ├── components/
│   │   ├── CameraPreview.tsx
│   │   └── ImageAnalysis.tsx
│   ├── services/
│   │   ├── cameraService.ts     # Camera operations
│   │   ├── claudeService.ts     # Claude API integration
│   │   └── imageProcessor.ts    # Image preprocessing
│   ├── hooks/
│   │   ├── useCamera.ts
│   │   └── useImageAnalysis.ts
│   ├── types/
│   │   └── index.ts
│   └── utils/
│       ├── imageUtils.ts        # Resize, compress, convert
│       └── constants.ts
├── package.json
└── tsconfig.json
```

---

## **Key Implementation Components**

### **1. Camera Integration (react-native-vision-camera)**

**Why this library:**
- 📸 Highest performance (60+ FPS)
- 🎬 Frame processors for real-time processing
- 🧩 Plugin ecosystem for face detection, object detection
- 📱 Full iOS and Android support
- 🔧 Actively maintained (17k+ stars)

**Installation:**
```bash
npx expo install react-native-vision-camera
npx expo install react-native-worklets-core  # For frame processors
```

**Basic Camera Component:**
```typescript
// src/screens/CameraScreen.tsx
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';

export function CameraScreen() {
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const cameraRef = useRef<Camera>(null);

  const capturePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePhoto({
        flash: 'off',
        enableShutterSound: true,
      });
      
      // Process with Claude
      await analyzeWithClaude(photo.path);
    }
  };

  if (!hasPermission) {
    return <PermissionScreen onRequest={requestPermission} />;
  }

  return (
    <Camera
      ref={cameraRef}
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
      photo={true}
    />
  );
}
```

### **2. Claude Vision API Integration**

**Service Layer:**
```typescript
// src/services/claudeService.ts
import Anthropic from '@anthropic-ai/sdk';
import * as FileSystem from 'expo-file-system';

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

export async function analyzeImage(imagePath: string, prompt: string) {
  try {
    // Read image as base64
    const imageBase64 = await FileSystem.readAsStringAsync(imagePath, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/jpeg',
                data: imageBase64,
              },
            },
            {
              type: 'text',
              text: prompt,
            },
          ],
        },
      ],
    });

    return response.content[0].text;
  } catch (error) {
    console.error('Claude API Error:', error);
    throw error;
  }
}
```

**Image Preprocessing (Critical for API efficiency):**
```typescript
// src/utils/imageUtils.ts
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

export async function optimizeImageForClaude(imagePath: string) {
  // Claude recommends max 1568px on long edge
  const optimized = await manipulateAsync(
    imagePath,
    [{ resize: { width: 1568 } }],  // Maintains aspect ratio
    { 
      compress: 0.8,
      format: SaveFormat.JPEG 
    }
  );
  
  return optimized.uri;
}
```

---

## **Claude Code Workflow for Cross-Platform Development**

### **Initial Setup with Claude Code**

```bash
# Initialize Expo project
npx create-expo-app camera-ai-poc --template blank-typescript
cd camera-ai-poc

# Start Claude Code
claude

# Initialize context
/init
```

**CLAUDE.md Template for Cross-Platform:**
```markdown
# Camera AI PoC - Cross-Platform Mobile App

## Project Overview
Cross-platform mobile app (iOS + Android) that captures photos and analyzes them using Claude's Vision API.

## Tech Stack
- React Native 0.76+ with Expo SDK 51+
- TypeScript
- react-native-vision-camera for camera operations
- Claude Sonnet 4.5 API for image analysis
- React Navigation for routing
- Zustand for state management

## Architecture
- MVVM-like pattern with React hooks
- Service layer for external APIs
- Utility layer for image processing
- Type-safe throughout with TypeScript

## Coding Standards
- Functional components with hooks only (no class components)
- TypeScript strict mode enabled
- ESLint + Prettier for code formatting
- Modular, single-responsibility components
- Async/await for all promises
- Error boundaries for fault tolerance

## Platform-Specific Considerations
- Use Platform.select() for platform-specific code
- Test camera permissions on both iOS and Android
- iOS requires camera usage description in app.json
- Android requires CAMERA permission

## PoC Scope (1-2 Weeks)
✅ Camera capture with front/back switching
✅ Photo preview before analysis
✅ Claude API integration for image analysis
✅ Loading states and error handling
✅ Basic UI with results display
❌ Photo gallery/history (out of scope)
❌ Advanced filters or editing (out of scope)
❌ Offline mode (out of scope)

## Example Use Cases
1. Document scanning and text extraction
2. Object identification
3. Scene description
4. Product analysis
5. Receipt/invoice processing
```

### **Development Workflow with Claude Code**

**Phase 1: Camera Setup (Day 1-2)**
```bash
claude

# In Plan Mode
"Create a plan for implementing camera functionality with react-native-vision-camera. 
Include: permission handling, camera preview, photo capture, and front/back camera toggle."

# Review plan, then implement
"Implement the camera screen with all components from the plan. Use TypeScript and follow React Native best practices."

# Test on both platforms
"Add platform-specific permission handling for iOS and Android"
```

**Phase 2: Image Processing (Day 3-4)**
```bash
"Create an image processing utility that:
1. Resizes images to 1568px max dimension
2. Compresses to ~80% quality
3. Converts to JPEG format
4. Returns base64 encoded string"

"Add a service layer for Claude API integration with proper error handling and TypeScript types"
```

**Phase 3: UI & State Management (Day 5-6)**
```bash
"Create a results screen that displays:
- Captured photo thumbnail
- Claude's analysis with markdown rendering
- Loading state with progress indicator
- Error state with retry option
Use React Native Paper components"

"Implement navigation between camera and results screens using React Navigation"
```

**Phase 4: Polish & Testing (Day 7)**
```bash
"Add comprehensive error handling for:
- Camera permission denial
- Network failures
- Claude API errors
- Image processing failures"

"Test the complete flow on iOS simulator and Android emulator. Fix any platform-specific issues."
```

---

## **Advanced Features (Optional)**

### **Real-Time Frame Processing**
For real-time analysis (e.g., scanning documents continuously):

```typescript
import { useFrameProcessor } from 'react-native-vision-camera';

const frameProcessor = useFrameProcessor((frame) => {
  'worklet';
  
  // Process frames in real-time
  // Can call native ML models or send to Claude API
  // Use throttling to avoid API spam
  
}, []);

return (
  <Camera
    device={device}
    frameProcessor={frameProcessor}
    // ...
  />
);
```

### **On-Device ML Pre-Processing**
Combine with TensorFlow Lite or MLKit for fast pre-screening:

```bash
npm install vision-camera-image-labeler  # Google ML Kit
```

```typescript
const frameProcessor = useFrameProcessor((frame) => {
  'worklet';
  
  // Quick on-device check
  const labels = labelImage(frame);
  
  if (labels[0].confidence > 0.8) {
    // Only send high-confidence frames to Claude
    sendToClaude(frame);
  }
}, []);
```

---

## **Cost & Performance Optimization**

### **Image Optimization Strategy**
```typescript
// Aggressive optimization for PoC
export async function prepareForClaude(imagePath: string) {
  const optimized = await manipulateAsync(
    imagePath,
    [
      { resize: { width: 800 } },  // Smaller = faster + cheaper
    ],
    { 
      compress: 0.7,
      format: SaveFormat.JPEG 
    }
  );
  
  return optimized.uri;
}
```

**Cost Estimates (Claude Sonnet 4.5):**
- Input: $3 per 1M tokens (~750 images)
- Output: $15 per 1M tokens
- **Average per image: ~$0.004-0.008** (very affordable for PoC)
- **100 test images: ~$0.40-0.80**

### **Caching Strategy**
```typescript
// Cache results to avoid re-analysis
import AsyncStorage from '@react-native-async-storage/async-storage';

async function analyzeWithCache(imageHash: string, imagePath: string) {
  const cached = await AsyncStorage.getItem(`analysis_${imageHash}`);
  
  if (cached) {
    return JSON.parse(cached);
  }
  
  const result = await analyzeImage(imagePath, prompt);
  await AsyncStorage.setItem(`analysis_${imageHash}`, JSON.stringify(result));
  
  return result;
}
```

---

## **Expo Configuration (app.json)**

```json
{
  "expo": {
    "name": "Camera AI PoC",
    "slug": "camera-ai-poc",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "plugins": [
      [
        "react-native-vision-camera",
        {
          "cameraPermissionText": "$(PRODUCT_NAME) needs camera access to capture photos for AI analysis",
          "enableMicrophonePermission": false
        }
      ]
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourcompany.cameraai",
      "infoPlist": {
        "NSCameraUsageDescription": "We need camera access to analyze images with AI"
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.yourcompany.cameraai",
      "permissions": ["CAMERA"]
    }
  }
}
```

---

## **Testing Strategy**

```bash
# iOS Simulator
npx expo run:ios

# Android Emulator
npx expo run:android

# Physical devices (recommended for camera testing)
npx expo start
# Scan QR code with Expo Go app
```

**Claude Code Testing Prompts:**
```bash
"Create a test suite for the image processing utilities using Jest"

"Add integration tests for the Claude API service with mock responses"

"Create a demo mode that works without camera hardware for simulator testing"
```

---

## **Comparison: React Native vs Flutter for This Use Case**

| **Criteria** | **React Native** | **Flutter** |
|------------|-----------------|-------------|
| **Camera Libraries** | ⭐⭐⭐⭐⭐ react-native-vision-camera | ⭐⭐⭐⭐ camera plugin |
| **Claude Code Integration** | ⭐⭐⭐⭐⭐ Excellent (JavaScript) | ⭐⭐⭐ Good (Dart) |
| **AI/ML Ecosystem** | ⭐⭐⭐⭐⭐ TensorFlow.js, MLKit | ⭐⭐⭐⭐ tflite, MLKit |
| **PoC Speed** | ⭐⭐⭐⭐⭐ 1-2 weeks | ⭐⭐⭐⭐ 2-3 weeks |
| **Your Background (.NET)** | ⭐⭐⭐⭐ TypeScript familiar | ⭐⭐⭐ Dart less familiar |
| **Community Size** | ⭐⭐⭐⭐⭐ Massive | ⭐⭐⭐⭐ Growing |

**Verdict:** React Native + Expo wins for camera + AI PoC with Claude Code.

---

## **Complete Sample Implementation**

```typescript
// App.tsx - Main entry point
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraScreen from './src/screens/CameraScreen';
import ResultScreen from './src/screens/ResultScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

---

## **Timeline: 1-2 Week PoC**

**Week 1:**
- Days 1-2: Expo setup + Camera implementation
- Days 3-4: Claude API integration + Image processing
- Days 5-6: UI/UX + Navigation
- Day 7: Testing + Bug fixes

**Week 2 (Optional enhancements):**
- Real-time frame processing
- On-device ML pre-filtering
- UI polish
- Performance optimization

---

## **Next Steps**

1. **Set up development environment:**
   ```bash
   npm install -g expo-cli
   npx create-expo-app camera-ai-poc --template blank-typescript
   cd camera-ai-poc
   npm install react-native-vision-camera @anthropic-ai/sdk
   ```

2. **Initialize Claude Code:**
   ```bash
   claude
   /init
   ```

3. **Start with Plan Mode:**
   ```bash
   "Create a detailed implementation plan for a cross-platform camera app with Claude Vision integration. Think deeply about the architecture, data flow, and error handling."
   ```

4. **Get your Claude API key:**
   - Visit https://console.anthropic.com/
   - Create API key
   - Add to `.env` file (use `expo-dotenv`)

---

**Bottom Line:** React Native + Expo with Claude Vision API is the fastest, most maintainable path to a cross-platform camera + AI PoC. With Claude Code as your development partner, you can build a working prototype in 7-10 days that runs beautifully on both iOS and Android from a single codebase.
