# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소의 코드를 작업할 때 참고할 가이드입니다.

## 프로젝트 개요
React + TypeScript + Vite 기반의 애플리케이션으로, Three.js와 React Three Fiber를 사용한 3D 기능을 포함합니다. 프로젝트명으로 보아 자동차 구성 도구로 보입니다.

## 개발 명령어
```bash
npm run dev        # HMR이 적용된 개발 서버 시작
npm run build      # 타입 체크 및 프로덕션 빌드
npm run lint       # ESLint 실행
npm run preview    # 프로덕션 빌드 로컬 프리뷰
```

## 주요 의존성
- **React Three Fiber** (`@react-three/fiber`): Three.js용 React 렌더러
- **Drei** (`@react-three/drei`): React Three Fiber 헬퍼 라이브러리
- **Three.js**: 3D 그래픽 라이브러리
- **Vite**: 빌드 도구 및 개발 서버
- **TypeScript**: 타입 체킹

## 프로젝트 구조
- `/src` - 소스 코드 디렉토리
  - `main.tsx` - 애플리케이션 진입점
  - `App.tsx` - 메인 React 컴포넌트
- `/public` - 정적 자산
- `vite.config.ts` - Vite 설정
- `tsconfig.json` - TypeScript 설정 (프로젝트 참조 사용)
- `eslint.config.js` - ESLint 설정

## TypeScript 설정
프로젝트 참조를 사용한 TypeScript 설정:
- `tsconfig.app.json` - 애플리케이션 코드 설정
- `tsconfig.node.json` - Node/빌드 도구 설정

## 빌드 시스템
- Vite를 사용한 번들링 및 개발
- Vite 빌드 전에 TypeScript 컴파일 수행 (`tsc -b && vite build`)
- ESM 모듈 사용 (package.json에 `"type": "module"`)