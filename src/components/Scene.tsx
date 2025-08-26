import { OrbitControls, Environment } from '@react-three/drei'
import ModelViewer from './ModelViewer'
import * as THREE from 'three'

interface SceneProps {
  modelPath: string
  modelScale: number
  onMaterialsFound: (materials: Record<string, THREE.Material>) => void
}

function Scene({ modelPath, modelScale, onMaterialsFound }: SceneProps) {
  return (
    <>
      {/* PBR을 위한 환경맵 - metalness/roughness 효과 극대화 */}
      <Environment 
        preset="studio" 
        background={false}
        environmentIntensity={0.4}
      />
      
      {/* 조명 설정 - PBR 최적화 */}
      <ambientLight intensity={0.2} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1.2} 
      />
      <directionalLight 
        position={[-5, 5, -5]} 
        intensity={0.6} 
      />
      
      {/* 카메라 컨트롤 - 마우스로 회전/줌 가능 */}
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={20}
      />
      
      {/* 3D 모델 */}
      <ModelViewer 
        modelPath={modelPath}
        modelScale={modelScale}
        onMaterialsFound={onMaterialsFound}
      />
      
      {/* 바닥 그리드 (선택사항) */}
      <gridHelper args={[10, 10]} />
    </>
  )
}

export default Scene