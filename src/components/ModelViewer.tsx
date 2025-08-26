import { useGLTF } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function ModelViewer() {
  const { scene, nodes, materials } = useGLTF('/models/urus.glb')
  const modelRef = useRef<THREE.Group>(null)

  useEffect(() => {
    // 모델 로드 시 구조 확인 (디버깅용)
    console.log('Model structure:', { nodes, materials })
    
    // 모델 내부의 모든 메시 탐색
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        console.log('Mesh found:', child.name, child.material)
        
        // 그림자 설정
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [scene, nodes, materials])

  return (
    <group ref={modelRef}>
      <primitive 
        object={scene} 
        scale={[100, 100, 100]}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
      />
    </group>
  )
}

// GLB 파일 프리로드
useGLTF.preload('/models/urus.glb')

export default ModelViewer