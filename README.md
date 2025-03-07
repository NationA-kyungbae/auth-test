# Firebase 인증 테스트 앱

이 프로젝트는 Firebase를 이용한 구글 로그인 기능을 테스트하기 위한 간단한 React 애플리케이션입니다.

## 기능

- Firebase를 이용한 구글 로그인/로그아웃
- Zustand를 이용한 상태 관리
- 보호된 라우트 (로그인한 사용자만 접근 가능)
- 사용자 프로필 정보 표시
- 반응형 디자인

## 시작하기

### 사전 요구사항

- Node.js (v14 이상)
- Yarn 패키지 매니저
- Firebase 프로젝트

### Firebase 설정

1. [Firebase 콘솔](https://console.firebase.google.com/)에서 새 프로젝트를 생성합니다.
2. 웹 앱을 추가하고 Firebase 설정 정보를 복사합니다.
3. `src/services/firebase.ts` 파일에 Firebase 설정 정보를 붙여넣습니다.
4. Firebase 콘솔에서 Authentication 서비스를 활성화하고 Google 로그인 제공업체를 설정합니다.

### 설치 및 실행

```bash
# 의존성 설치
yarn install

# 개발 서버 실행
yarn dev
```

## 프로젝트 구조

```
src/
  ├── components/       # 재사용 가능한 컴포넌트
  │   ├── Navbar.tsx    # 네비게이션 바
  │   └── ProtectedRoute.tsx  # 보호된 라우트 컴포넌트
  ├── store/            # Zustand 스토어
  │   └── authStore.ts  # 인증 상태 관리 스토어
  ├── pages/            # 페이지 컴포넌트
  │   ├── Home.tsx      # 홈 페이지
  │   ├── Login.tsx     # 로그인 페이지
  │   ├── Profile.tsx   # 프로필 페이지
  │   └── NotFound.tsx  # 404 페이지
  ├── services/         # 서비스 로직
  │   └── firebase.ts   # Firebase 설정
  ├── App.tsx           # 메인 앱 컴포넌트
  └── main.tsx          # 앱 진입점
```

## 기술 스택

- React
- TypeScript
- Firebase Authentication
- Zustand (상태 관리)
- React Router
- Vite

## 라이센스

MIT

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
