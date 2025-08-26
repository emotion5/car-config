import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useState } from 'react'
import * as THREE from 'three'
import Scene from './components/Scene'
import MaterialList from './components/MaterialList'
import styles from './App.module.css'

interface Config {
  models: { name: string, path: string }[]
  selectedModel: number
  modelScale: number
  cameraPosition: [number, number, number]
  backgroundColor: string
}

function App() {
  const [config, setConfig] = useState<Config | null>(null)
  const [selectedModelIndex, setSelectedModelIndex] = useState<number>(0)
  const [materials, setMaterials] = useState<Record<string, THREE.Material>>({})

  useEffect(() => {
    // config.json 로드
    fetch('/config.json')
      .then(res => res.json())
      .then(data => {
        console.log('Config loaded:', data)
        setConfig(data)
        setSelectedModelIndex(data.selectedModel || 0)
      })
      .catch(err => console.error('Failed to load config:', err))
  }, [])

  const handleMaterialsFound = (foundMaterials: Record<string, THREE.Material>) => {
    console.log('Materials found in App:', Object.keys(foundMaterials))
    setMaterials(foundMaterials)
  }

  const handleModelChange = (index: number) => {
    setSelectedModelIndex(index)
    setMaterials({}) // 새 모델로 변경할 때 머티리얼 리스트 초기화
  }

  if (!config) {
    return <div className={styles.loading}>설정 파일 로딩 중...</div>
  }

  const currentModel = config.models[selectedModelIndex]

  return (
    <div className={styles.container}>
      <div className={styles.canvasWrapper}>
        <Canvas 
          camera={{ position: config.cameraPosition, fov: 50 }}
          gl={{ 
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            outputColorSpace: THREE.SRGBColorSpace,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.0
          }}
        >
          <Suspense fallback={null}>
            <Scene 
              modelPath={currentModel.path}
              modelScale={config.modelScale}
              onMaterialsFound={handleMaterialsFound}
            />
          </Suspense>
        </Canvas>
      </div>
      <div className={styles.logo}>
        <h1 className={styles.logoText}>Uable Configurator</h1>
      </div>
      <div className={styles.controls}>
        {config.models.length > 1 && (
          <div className={styles.modelSelector}>
            <label className={styles.selectorLabel}>모델 선택:</label>
            <select 
              value={selectedModelIndex}
              onChange={(e) => handleModelChange(Number(e.target.value))}
              className={styles.modelSelect}
            >
              {config.models.map((model, index) => (
                <option key={index} value={index}>
                  {model.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <MaterialList materials={materials} />
        <button className={styles.contactButton}>문의하기</button>
      </div>
    </div>
  )
}

export default App
