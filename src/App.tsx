import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useState } from 'react'
import * as THREE from 'three'
import Scene from './components/Scene'
import MaterialList from './components/MaterialList'
import styles from './App.module.css'

interface Config {
  modelPath: string
  modelScale: number
  cameraPosition: [number, number, number]
  backgroundColor: string
}

function App() {
  const [config, setConfig] = useState<Config | null>(null)
  const [materials, setMaterials] = useState<Record<string, THREE.Material>>({})

  useEffect(() => {
    // config.json 로드
    fetch('/config.json')
      .then(res => res.json())
      .then(data => {
        console.log('Config loaded:', data)
        setConfig(data)
      })
      .catch(err => console.error('Failed to load config:', err))
  }, [])

  const handleMaterialsFound = (foundMaterials: Record<string, THREE.Material>) => {
    console.log('Materials found in App:', Object.keys(foundMaterials))
    setMaterials(foundMaterials)
  }

  if (!config) {
    return <div className={styles.loading}>설정 파일 로딩 중...</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.canvasWrapper}>
        <Canvas camera={{ position: config.cameraPosition, fov: 50 }}>
          <Suspense fallback={null}>
            <Scene 
              modelPath={config.modelPath}
              modelScale={config.modelScale}
              onMaterialsFound={handleMaterialsFound}
            />
          </Suspense>
        </Canvas>
      </div>
      <div className={styles.controls}>
        <h2>GLB 모델 컨피규레이터</h2>
        <p className={styles.modelPath}>모델: {config.modelPath}</p>
        <MaterialList materials={materials} />
      </div>
    </div>
  )
}

export default App
