# 3D 자동차 컨피규레이터 개발 계획서

## 📋 프로젝트 개요
- **목표**: GLTF/GLB 3D 모델의 개별 메시/레이어 색상을 실시간으로 변경할 수 있는 웹 애플리케이션
- **모델**: Urus GLB 파일 (`/public/models/urus.glb`)
- **핵심 기능**: 3D 모델 파트별 색상 커스터마이징

## 🎯 MVP (Minimum Viable Product) 기능
1. GLB 파일 로드 및 3D 렌더링
2. 모델 회전/줌 인터랙션
3. 클릭으로 파트 선택
4. 선택된 파트 색상 변경
5. 색상 피커 UI

## 📁 프로젝트 구조
```
250825-carconfig/
├── public/
│   └── models/
│       └── urus.glb                  # 3D 모델 파일
├── src/
│   ├── components/
│   │   ├── ModelViewer.tsx           # 3D 모델 뷰어 컴포넌트
│   │   ├── ModelViewer.module.css    # 모델 뷰어 스타일
│   │   ├── ColorPicker.tsx           # 색상 선택 UI
│   │   ├── ColorPicker.module.css    # 색상 피커 스타일
│   │   ├── Scene.tsx                 # Three.js Scene 설정
│   │   └── Scene.module.css          # Scene 스타일
│   ├── App.tsx                       # 메인 앱
│   ├── App.module.css                # 앱 레이아웃 스타일
│   └── main.tsx                      # 엔트리 포인트
```

## 🛠️ 기술 스택
- **이미 설치된 패키지**:
  - React + TypeScript
  - React Three Fiber (@react-three/fiber)
  - Drei (@react-three/drei)
  - Three.js

## 📝 구현 단계

### Phase 1: 기본 3D Scene 설정
**목표**: 3D 환경 구축 및 모델 로드

1. **App.tsx 수정**
   - Canvas 컴포넌트 추가
   - 기본 레이아웃 구성

2. **Scene.tsx 생성**
   - 조명 설정 (AmbientLight, DirectionalLight)
   - OrbitControls 추가
   - 배경 색상 설정

3. **ModelViewer.tsx 생성**
   - useGLTF 훅으로 모델 로드
   - 모델 중앙 정렬
   - 초기 스케일 조정

### Phase 2: 인터랙션 구현
**목표**: 모델 파트 선택 및 식별

1. **파트 탐색 기능**
   - 모델 traverse로 모든 Mesh 탐색
   - 파트 이름/ID 추출
   - console.log로 구조 확인

2. **클릭 이벤트 처리**
   - raycaster를 이용한 클릭 감지
   - 선택된 파트 하이라이트
   - 파트 정보 표시

### Phase 3: 색상 변경 기능
**목표**: 선택된 파트의 머티리얼 색상 변경

1. **ColorPicker.tsx 생성**
   - HTML color input 사용
   - 프리셋 색상 버튼
   - 실시간 미리보기

2. **색상 적용 로직**
   - Material.color 속성 수정
   - 메탈릭/러프니스 옵션 (선택사항)
   - 변경사항 즉시 반영

### Phase 4: UI/UX 개선
**목표**: 사용자 인터페이스 완성

1. **레이아웃 디자인**
   - 3D 뷰어 영역 (왼쪽 또는 중앙)
   - 컨트롤 패널 (오른쪽)
   - 반응형 디자인

2. **파트 리스트 UI**
   - 선택 가능한 파트 목록
   - 현재 색상 표시
   - 리셋 버튼

### Phase 5: 최적화 (선택사항)
**향후 개선사항**:
- 로딩 인디케이터
- 에러 처리
- 성능 최적화
- 색상 히스토리/실행취소

## 🚀 구현 순서

### Step 1: 기본 Scene 구성
```typescript
// App.tsx
- Canvas 컴포넌트 추가
- Scene 컴포넌트 임포트

// Scene.tsx (새 파일)
- 조명 설정
- OrbitControls 설정
- 기본 환경 구성
```

### Step 2: 모델 로더
```typescript
// ModelViewer.tsx (새 파일)
- useGLTF 훅 사용
- 모델 렌더링
- 스케일/위치 조정
```

### Step 3: 인터랙션
```typescript
// ModelViewer.tsx 수정
- onClick 이벤트 추가
- 파트 선택 상태 관리
- 선택된 파트 하이라이트
```

### Step 4: 색상 변경
```typescript
// ColorPicker.tsx (새 파일)
- 색상 선택 UI
- 색상 변경 콜백

// ModelViewer.tsx 수정
- 색상 변경 로직 추가
- Material 업데이트
```

### Step 5: 통합 및 스타일링
```typescript
// App.tsx 수정
- 전체 레이아웃 구성
- 컴포넌트 연결

// App.css 수정
- 레이아웃 스타일
- 반응형 디자인
```

## ✅ 체크리스트

### 필수 기능
- [ ] GLB 모델 로드
- [ ] 3D 뷰어 (회전/줌)
- [ ] 파트 클릭 선택
- [ ] 색상 변경
- [ ] 기본 UI

### 추가 기능 (Phase 2)
- [ ] 파트 리스트 패널
- [ ] 프리셋 색상
- [ ] 리셋 기능
- [ ] 메탈릭/러프니스 조절
- [ ] 색상 히스토리

## 📌 주의사항
1. **성능**: 고폴리곤 모델의 경우 최적화 필요
2. **호환성**: GLB 파일 구조에 따라 파트 이름이 다를 수 있음
3. **상태관리**: 초기엔 useState로 시작, 필요시 Zustand 도입

## 🎨 예상 결과물
- 중앙에 3D 자동차 모델
- 마우스로 회전/줌 가능
- 클릭으로 파트 선택
- 색상 피커로 실시간 색상 변경
- 깔끔한 UI/UX

---

**작성일**: 2025-08-26  
**프로젝트명**: 250825-carconfig  
**목표 완료일**: MVP 기준 1-2일