import { Canvas } from '@react-three/fiber'
import Scene from './components/Scene'
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.container}>
      <div className={styles.canvasWrapper}>
        <Canvas camera={{ position: [5, 3, 5], fov: 50 }}>
          <Scene />
        </Canvas>
      </div>
      <div className={styles.controls}>
        <h2>자동차 컨피규레이터</h2>
        <p>3D 모델을 마우스로 회전시켜보세요</p>
      </div>
    </div>
  )
}

export default App
