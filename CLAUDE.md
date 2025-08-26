# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a universal GLB 3D model configurator built with React, TypeScript, and Three.js/React Three Fiber. The application allows users to load any GLB file and modify individual material colors in real-time. It features a professional dark-themed UI inspired by automotive configurators.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production  
npm run build

# Run linting
npm run lint

# Preview production build
npm run preview
```

## Architecture

### Core Configuration System
- **`/public/config.json`**: Dynamic configuration for model loading
  - `modelPath`: Path to GLB file in `/public/models/`
  - `modelScale`: Scaling factor for the 3D model
  - `cameraPosition`: Initial camera position [x, y, z]
  - `backgroundColor`: UI background color (currently unused)

### Component Architecture
- **`App.tsx`**: Root component that loads config and manages global state
- **`Scene.tsx`**: 3D scene setup with lighting, controls, and environment
- **`ModelViewer.tsx`**: GLB loader with automatic material discovery
- **`MaterialList.tsx`**: UI component for material selection and color changes

### 3D Rendering Pipeline
1. **Model Loading**: Uses `@react-three/drei` `useGLTF` hook
2. **Material Discovery**: Traverses entire scene graph to collect all materials
3. **PBR Rendering**: Configured for realistic physically-based rendering
   - ACESFilmicToneMapping
   - SRGB color space
   - Environment mapping with "studio" preset
4. **Material Updates**: Real-time color changes using Three.js `needsUpdate` pattern

### Key Technical Patterns

**Material Collection**:
```typescript
scene.traverse((child) => {
  if (child instanceof THREE.Mesh) {
    // Collect both single materials and material arrays
    // Handle unnamed materials with fallback naming
  }
})
```

**Real-time Color Updates**:
```typescript
material.color = new THREE.Color(hexColor)
material.needsUpdate = true
```

**Canvas Configuration**:
- High-performance WebGL settings
- Proper tone mapping for realistic materials
- OrbitControls for interactive camera movement

### Styling System
- CSS Modules for component-scoped styling
- Dark theme with glass morphism effects
- Professional floating control panel design
- Hidden scrollbars with maintained scroll functionality

## File Structure
```
src/
├── components/
│   ├── Scene.tsx           # 3D scene setup
│   ├── ModelViewer.tsx     # GLB loading & material discovery
│   ├── MaterialList.tsx    # Material UI controls
│   └── *.module.css        # Component styles
├── App.tsx                 # Root component
└── App.module.css         # Main layout styles
public/
├── config.json            # Dynamic model configuration
├── models/                # GLB files storage
└── textures/              # Ground plane textures
```

## Adding New Models
1. Place GLB files in `/public/models/`
2. Update `/public/config.json` with new `modelPath`
3. Adjust `modelScale` and `cameraPosition` as needed
4. The application automatically discovers all materials in any GLB file

## Material System
The application automatically handles:
- MeshStandardMaterial and MeshPhysicalMaterial types
- Single materials and material arrays per mesh
- Unnamed materials (auto-generates names)
- Real-time color updates with proper Three.js refresh patterns