import { OrbitControls } from '@react-three/drei'
import ModelViewer from './ModelViewer'

function Scene() {
  return (
    <>
      {/* 조명 설정 */}
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1} 
        castShadow 
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
      <ModelViewer />
      
      {/* 바닥 그리드 (선택사항) */}
      <gridHelper args={[10, 10]} />
    </>
  )
}

export default Scene