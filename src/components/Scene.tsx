import { OrbitControls, Environment } from '@react-three/drei'
import ModelViewer from './ModelViewer'
import * as THREE from 'three'

interface SceneProps {
  modelPath: string
  modelScale: number
  modelPosition: [number, number, number]
  onMaterialsFound: (materials: Record<string, THREE.Material>) => void
  isLightMode: boolean
}

// function GroundPlane({ isLightMode }: { isLightMode: boolean }) {
//   return (
//     <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
//       <circleGeometry args={[30, 64]} />
//       <meshStandardMaterial
//         transparent
//         opacity={isLightMode ? 0.3 : 0.2}
//         roughness={0.1}
//         metalness={0.8}
//         color={isLightMode ? "#808080" : "#404040"}
//       />
//     </mesh>
//   )
// }

function Scene({ modelPath, modelScale, modelPosition, onMaterialsFound, isLightMode }: SceneProps) {
  return (
    <>
      {/* PBR을 위한 환경맵 - metalness/roughness 효과 극대화 */}
      <Environment 
        preset="city" 
        background={false}
        environmentIntensity={0.6}
      />
      
      {/* 라이트 모드일 때 배경색 설정 */}
      {isLightMode && <color attach="background" args={['#dddddd']} />}
      
      {/* 조명 설정 - PBR 최적화 */}
      <ambientLight intensity={0.2} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={0.8} 
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
      
      {/* 바닥 텍스처 - 제거됨 */}
      {/* <GroundPlane isLightMode={isLightMode} /> */}
      
      {/* 3D 모델 */}
      <ModelViewer 
        modelPath={modelPath}
        modelScale={modelScale}
        modelPosition={modelPosition}
        onMaterialsFound={onMaterialsFound}
      />
      
      {/* 배경은 CSS 그라데이션 + 바닥 텍스처 조합 */}
    </>
  )
}

export default Scene