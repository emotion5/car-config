import { useGLTF } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface ModelViewerProps {
  modelPath: string
  modelScale: number
  onMaterialsFound: (materials: Record<string, THREE.Material>) => void
}

function ModelViewer({ modelPath, modelScale, onMaterialsFound }: ModelViewerProps) {
  const { scene } = useGLTF(modelPath)
  const modelRef = useRef<THREE.Group>(null)

  useEffect(() => {
    const materialsMap: Record<string, THREE.Material> = {}
    
    // 모델 내부의 모든 메시 탐색하여 머티리얼 수집
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mesh = child as THREE.Mesh
        
        // 그림자 설정
        mesh.castShadow = true
        mesh.receiveShadow = true
        
        // 머티리얼 수집 (중복 제거)
        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat, index) => {
              const matName = mat.name || `Material_${mesh.name}_${index}`
              materialsMap[matName] = mat
            })
          } else {
            const matName = mesh.material.name || `Material_${mesh.name}`
            materialsMap[matName] = mesh.material
          }
        }
      }
    })
    
    console.log('Found materials:', Object.keys(materialsMap))
    onMaterialsFound(materialsMap)
  }, [scene, onMaterialsFound])

  return (
    <group ref={modelRef}>
      <primitive 
        object={scene} 
        scale={[modelScale, modelScale, modelScale]}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
      />
    </group>
  )
}

export default ModelViewer