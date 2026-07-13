import { useEffect, useRef } from 'react'

function createSubmersible(THREE) {
  const vehicle = new THREE.Group()
  const hullMaterial = new THREE.MeshStandardMaterial({ color: 0xa7b9bc, roughness: 0.48, metalness: 0.42 })
  const darkMaterial = new THREE.MeshStandardMaterial({ color: 0x172f39, roughness: 0.62, metalness: 0.28 })
  const amberMaterial = new THREE.MeshStandardMaterial({ color: 0xf0a33f, emissive: 0xa64f09, emissiveIntensity: 2 })

  const hull = new THREE.Mesh(new THREE.CapsuleGeometry(0.72, 2.7, 8, 18), hullMaterial)
  hull.rotation.z = Math.PI / 2
  hull.scale.y = 0.72
  vehicle.add(hull)

  const centralBand = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.09, 8, 24), darkMaterial)
  centralBand.rotation.y = Math.PI / 2
  vehicle.add(centralBand)

  const railGeometry = new THREE.CylinderGeometry(0.045, 0.045, 3.1, 8)
  for (const y of [-0.72, 0.72]) {
    const rail = new THREE.Mesh(railGeometry, darkMaterial)
    rail.rotation.z = Math.PI / 2
    rail.position.y = y
    vehicle.add(rail)
  }

  const thrusterGeometry = new THREE.CylinderGeometry(0.32, 0.32, 0.48, 16)
  for (const y of [-0.82, 0.82]) {
    const thruster = new THREE.Mesh(thrusterGeometry, darkMaterial)
    thruster.rotation.z = Math.PI / 2
    thruster.position.set(-0.65, y, 0)
    vehicle.add(thruster)
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.33, 0.035, 8, 18), amberMaterial)
    ring.rotation.y = Math.PI / 2
    ring.position.set(-0.91, y, 0)
    vehicle.add(ring)
  }

  const eye = new THREE.Mesh(new THREE.SphereGeometry(0.2, 18, 12), amberMaterial)
  eye.position.set(1.73, 0, 0)
  vehicle.add(eye)

  const lens = new THREE.PointLight(0xffb04d, 5, 9, 1.6)
  lens.position.set(1.8, 0, 0)
  vehicle.add(lens)

  const finGeometry = new THREE.BoxGeometry(0.7, 0.08, 0.95)
  const fin = new THREE.Mesh(finGeometry, darkMaterial)
  fin.position.set(-1.15, 0, 0)
  vehicle.add(fin)

  vehicle.rotation.y = -0.18
  return vehicle
}

function createReef(THREE, compact) {
  const reef = new THREE.Group()
  const rockMaterial = new THREE.MeshStandardMaterial({ color: 0x214d50, roughness: 1, flatShading: true })
  const coralMaterials = [
    new THREE.MeshStandardMaterial({ color: 0x9f6d53, roughness: .9, flatShading: true }),
    new THREE.MeshStandardMaterial({ color: 0x5f7660, roughness: .9, flatShading: true }),
    new THREE.MeshStandardMaterial({ color: 0xb18862, roughness: .9, flatShading: true }),
  ]
  const count = compact ? 18 : 35
  for (let i = 0; i < count; i += 1) {
    const x = (i % 9) * 2.2 - 9 + Math.sin(i * 2.1)
    const z = -4 - Math.floor(i / 9) * 3 + Math.cos(i) * 1.2
    const scale = .6 + (i % 5) * .21
    const rock = new THREE.Mesh(new THREE.IcosahedronGeometry(scale, 0), rockMaterial)
    rock.position.set(x, -3.7 + Math.sin(i * 1.4) * .2, z)
    rock.scale.y = .55 + (i % 3) * .12
    rock.rotation.set(i * .21, i * .56, i * .13)
    reef.add(rock)

    if (i % 2 === 0) {
      const coral = new THREE.Mesh(
        new THREE.ConeGeometry(.18 + (i % 4) * .07, .9 + (i % 5) * .23, 5),
        coralMaterials[i % coralMaterials.length],
      )
      coral.position.set(x + Math.sin(i) * .45, -3.15, z + Math.cos(i) * .35)
      coral.rotation.z = Math.sin(i * 3) * .14
      reef.add(coral)
    }
  }
  return reef
}

function OceanScene() {
  const mountRef = useRef(null)
  const fallbackRef = useRef(null)

  useEffect(() => {
    let disposed = false
    let cleanup = () => {}

    async function init() {
      try {
        const THREE = await import('three')
        if (disposed || !mountRef.current) return

        const compact = window.innerWidth < 760
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const renderer = new THREE.WebGLRenderer({ antialias: !compact, alpha: true, powerPreference: 'high-performance' })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, compact ? 1.35 : 1.8))
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.outputColorSpace = THREE.SRGBColorSpace
        renderer.toneMapping = THREE.ACESFilmicToneMapping
        renderer.toneMappingExposure = 1.05
        renderer.domElement.setAttribute('aria-hidden', 'true')
        mountRef.current.appendChild(renderer.domElement)

        const scene = new THREE.Scene()
        scene.background = new THREE.Color(0x071b31)
        scene.fog = new THREE.FogExp2(0x0a2740, 0.048)

        const camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.1, 70)
        camera.position.set(0, 0.3, 10)

        scene.add(new THREE.HemisphereLight(0x7cc2ce, 0x071522, 2.5))
        const waterLight = new THREE.DirectionalLight(0xb8eef0, 3.2)
        waterLight.position.set(-5, 8, 4)
        scene.add(waterLight)

        const vehicle = createSubmersible(THREE)
        if (compact) vehicle.scale.setScalar(.72)
        vehicle.position.set(compact ? 1.85 : 2.4, compact ? 1.05 : .2, 0)
        scene.add(vehicle)

        const reef = createReef(THREE, compact)
        scene.add(reef)

        const particleCount = compact ? 320 : 850
        const positions = new Float32Array(particleCount * 3)
        for (let i = 0; i < particleCount; i += 1) {
          positions[i * 3] = (Math.random() - .5) * 24
          positions[i * 3 + 1] = (Math.random() - .5) * 14
          positions[i * 3 + 2] = (Math.random() - .5) * 24
        }
        const particlesGeometry = new THREE.BufferGeometry()
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        const particles = new THREE.Points(
          particlesGeometry,
          new THREE.PointsMaterial({ color: 0xa7d4ce, size: compact ? .025 : .035, transparent: true, opacity: .52 }),
        )
        scene.add(particles)

        const lightCone = new THREE.Mesh(
          new THREE.ConeGeometry(3.4, 11, 32, 1, true),
          new THREE.MeshBasicMaterial({ color: 0x4b91a2, transparent: true, opacity: .035, side: THREE.DoubleSide, depthWrite: false }),
        )
        lightCone.position.set(-3, 4.5, -4)
        lightCone.rotation.z = .32
        scene.add(lightCone)

        const pointer = { x: 0, y: 0 }
        let scrollProgress = 0
        let animationFrame = 0
        let start = performance.now()

        const onPointer = (event) => {
          pointer.x = (event.clientX / window.innerWidth - .5) * 2
          pointer.y = (event.clientY / window.innerHeight - .5) * 2
        }
        const onScroll = () => {
          const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
          scrollProgress = window.scrollY / max
        }
        const onResize = () => {
          camera.aspect = window.innerWidth / window.innerHeight
          camera.updateProjectionMatrix()
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 760 ? 1.35 : 1.8))
          renderer.setSize(window.innerWidth, window.innerHeight)
        }

        if (!reduced) window.addEventListener('pointermove', onPointer, { passive: true })
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onResize, { passive: true })
        onScroll()

        const render = (now) => {
          const time = (now - start) * .001
          const px = reduced ? 0 : pointer.x
          const py = reduced ? 0 : pointer.y
          const wave = reduced ? 0 : Math.sin(time * .55)

          vehicle.position.x += ((compact ? 1.85 : 2.3) + px * .7 - vehicle.position.x) * .035
          vehicle.position.y += (((compact ? 1.05 : .3) - scrollProgress * 1.1) - py * .32 + wave * .15 - vehicle.position.y) * .035
          vehicle.rotation.y += ((-.16 + px * .18 + scrollProgress * .32) - vehicle.rotation.y) * .035
          vehicle.rotation.z += ((py * .08 + wave * .025) - vehicle.rotation.z) * .03

          camera.position.x += (px * .42 - camera.position.x) * .025
          camera.position.y += ((.35 - scrollProgress * .5) - py * .18 - camera.position.y) * .025
          camera.position.z += ((10 - scrollProgress * 2.5) - camera.position.z) * .018
          camera.lookAt(0, -.25 - scrollProgress * .4, -1.8)

          if (!reduced) {
            particles.rotation.y = time * .008
            particles.position.y = Math.sin(time * .16) * .18
            reef.rotation.y = Math.sin(time * .07) * .018
          }
          renderer.render(scene, camera)
          if (!reduced) animationFrame = requestAnimationFrame(render)
        }
        render(performance.now())

        cleanup = () => {
          cancelAnimationFrame(animationFrame)
          window.removeEventListener('pointermove', onPointer)
          window.removeEventListener('scroll', onScroll)
          window.removeEventListener('resize', onResize)
          scene.traverse((object) => {
            if (object.geometry) object.geometry.dispose()
            if (object.material) {
              const materials = Array.isArray(object.material) ? object.material : [object.material]
              materials.forEach((material) => material.dispose())
            }
          })
          renderer.dispose()
          renderer.domElement.remove()
        }
      } catch {
        fallbackRef.current?.classList.add('is-visible')
      }
    }

    init()
    return () => {
      disposed = true
      cleanup()
    }
  }, [])

  return (
    <div className="ocean-stage" aria-hidden="true">
      <div className="ocean-fallback" ref={fallbackRef}><div className="fallback-sub"><i /><i /><i /></div></div>
      <div className="ocean-canvas" ref={mountRef} />
      <div className="water-surface" />
      <div className="ocean-vignette" />
    </div>
  )
}

export default OceanScene
