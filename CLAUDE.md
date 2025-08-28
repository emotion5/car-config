# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소의 코드로 작업할 때 지침을 제공합니다.

## 프로젝트 개요

이 프로젝트는 React, TypeScript, Three.js/React Three Fiber로 구축된 범용 GLB 3D 모델 컨피규레이터입니다. 사용자가 여러 GLB 파일을 로드하고 개별 머티리얼 색상을 실시간으로 수정할 수 있는 애플리케이션입니다. 자동차 컨피규레이터에서 영감을 받은 전문적인 다크 테마 UI와 로고 브랜딩, 이미지 내보내기 기능을 갖추고 있습니다.

## 개발 명령어

```bash
# 개발 서버 시작
npm run dev

# 프로덕션 빌드  
npm run build

# 린팅 실행
npm run lint

# 프로덕션 빌드 미리보기
npm run preview
```

## 아키텍처

### 핵심 구성 시스템
- **`/public/config.json`**: 모델 로딩을 위한 동적 구성
  - `models`: `name`과 `path` 속성을 가진 모델 객체 배열
  - `selectedModel`: 로드 시 표시할 기본 모델 인덱스
  - `modelScale`: 3D 모델의 스케일링 팩터
  - `cameraPosition`: 초기 카메라 위치 [x, y, z]
  - `backgroundColor`: UI 배경색 (현재 미사용)

### 컴포넌트 아키텍처
- **`App.tsx`**: 설정을 로드하고 전역 상태를 관리하는 루트 컴포넌트
  - 다중 모델 선택 시스템 처리
  - 모델 변경 시 머티리얼 상태 관리
  - 커스텀 이벤트 시스템을 통한 다운로드 기능 통합
  - "Uable Configurator" 브랜딩 표시
  - 다운로드 아이콘은 `/src/assets/icons/download.svg` 사용
- **`Scene.tsx`**: 조명, 컨트롤, 환경이 설정된 3D 씬
- **`ModelViewer.tsx`**: 자동 머티리얼 탐색 기능이 있는 GLB 로더
- **`MaterialList.tsx`**: 머티리얼 선택 및 색상 변경을 위한 UI 컴포넌트
- **`DownloadController.tsx`**: 이미지 캡처를 위한 캔버스 통합 컴포넌트
  - 투명 배경으로 3D 씬을 PNG로 캡처
  - 커스텀 윈도우 이벤트 'capture-3d-scene'로 트리거
  - 자동 타임스탬프 파일명 생성
- **`DownloadButton.tsx`**: 직접 씬 캡처를 위한 독립형 버튼 컴포넌트 (대체 구현)

### 3D 렌더링 파이프라인
1. **모델 로딩**: `@react-three/drei` `useGLTF` 훅 사용
2. **머티리얼 탐색**: 전체 씬 그래프를 순회하여 모든 머티리얼 수집
3. **PBR 렌더링**: 사실적인 물리 기반 렌더링 구성
   - ACESFilmicToneMapping
   - SRGB 색상 공간
   - "studio" 프리셋으로 환경 매핑
   - 이미지 캡처를 위한 preserveDrawingBuffer 활성화
4. **머티리얼 업데이트**: Three.js `needsUpdate` 패턴을 사용한 실시간 색상 변경

### 주요 기술 패턴

**다중 모델 시스템**:
```typescript
const handleModelChange = (index: number) => {
  setSelectedModelIndex(index)
  setMaterials({}) // 새 모델을 위한 머티리얼 초기화
}
```

**머티리얼 수집**:
```typescript
scene.traverse((child) => {
  if (child instanceof THREE.Mesh) {
    // 단일 머티리얼과 머티리얼 배열 모두 수집
    // 이름 없는 머티리얼은 폴백 네이밍으로 처리
  }
})
```

**실시간 색상 업데이트**:
```typescript
material.color = new THREE.Color(hexColor)
material.needsUpdate = true
```

**이미지 내보내기 시스템**:
```typescript
// UI에서 커스텀 이벤트 디스패치
window.dispatchEvent(new CustomEvent('capture-3d-scene'))

// 투명 배경으로 캔버스 캡처
scene.background = null
gl.render(scene, camera)
gl.domElement.toBlob(callback, 'image/png', 1.0)
```

**캔버스 구성**:
- 고성능 WebGL 설정
- 사실적인 머티리얼을 위한 적절한 톤 매핑
- 인터랙티브 카메라 움직임을 위한 OrbitControls
- 이미지 캡처 기능을 위한 preserveDrawingBuffer

### 스타일링 시스템
- 컴포넌트 스코프 스타일링을 위한 CSS 모듈
- 글래스 모피즘 효과가 있는 다크 테마
- 전문적인 플로팅 컨트롤 패널 디자인
- 스크롤 기능을 유지하면서 숨겨진 스크롤바
- 모던한 타이포그래피를 위한 Inter 폰트 패밀리

### UI 기능
- **로고 표시**: 좌측 상단의 "Uable Configurator" 브랜딩
- **모델 선택기**: 여러 모델 간 전환을 위한 드롭다운
- **다운로드 버튼**: 이미지 내보내기를 위한 다운로드 아이콘이 있는 플로팅 버튼
- **문의 버튼**: 사용자 문의를 위한 하단 버튼

## 파일 구조
```
src/
├── assets/
│   └── icons/
│       └── download.svg    # 다운로드 버튼 아이콘
├── components/
│   ├── Scene.tsx           # 3D 씬 설정
│   ├── ModelViewer.tsx     # GLB 로딩 및 머티리얼 탐색
│   ├── MaterialList.tsx    # 머티리얼 UI 컨트롤
│   ├── DownloadController.tsx # 씬 캡처 컨트롤러
│   ├── DownloadButton.tsx  # 대체 다운로드 컴포넌트
│   └── *.module.css        # 컴포넌트 스타일
├── App.tsx                 # 다중 모델 지원 루트 컴포넌트
└── App.module.css         # 메인 레이아웃 스타일
public/
├── config.json            # 동적 모델 구성
├── models/                # GLB 파일 저장소 (bmw.glb, maybach.glb, sl63.glb)
└── textures/              # 바닥면 텍스처
```

## 새 모델 추가하기
1. GLB 파일을 `/public/models/`에 배치
2. `/public/config.json`에 모델 항목 추가:
   ```json
   {"name": "모델 이름", "path": "/models/filename.glb"}
   ```
3. 필요시 모든 모델에 대해 `modelScale`과 `cameraPosition` 조정
4. 애플리케이션이 GLB 파일의 모든 머티리얼을 자동으로 탐색

## 머티리얼 시스템
애플리케이션이 자동으로 처리하는 항목:
- MeshStandardMaterial 및 MeshPhysicalMaterial 타입
- 메시당 단일 머티리얼 및 머티리얼 배열
- 이름 없는 머티리얼 (자동 이름 생성)
- 적절한 Three.js 리프레시 패턴을 사용한 실시간 색상 업데이트
- 깨끗한 상태를 위한 모델 변경 시 머티리얼 초기화

## 이미지 내보내기 기능
- 현재 3D 씬 뷰를 PNG로 캡처
- 합성을 위한 투명 배경
- 자동 타임스탬프 파일명 (형식: `3d-model-YYYY-MM-DD-HH-mm-ss.png`)
- 현재 카메라 각도 및 머티리얼 설정 보존
- 1.0 품질 설정으로 고품질 내보내기