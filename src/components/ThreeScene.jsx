import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Sparkles, Compass, Eye } from 'lucide-react';
import { sound } from '../utils/audio';

export default function ThreeScene() {
  const mountRef = useRef(null);
  const [activeShape, setActiveShape] = useState('core'); // 'core' | 'knot' | 'gyro'
  const [colorTheme, setColorTheme] = useState('cyan'); // 'cyan' | 'purple' | 'emerald'
  const [isRotating, setIsRotating] = useState(true);

  // References for communication with Three.js render loop without re-triggering effects
  const sceneParamsRef = useRef({
    shape: 'core',
    colorTheme: 'cyan',
    isRotating: true,
    targetRotX: 0,
    targetRotY: 0,
    curRotX: 0,
    curRotY: 0,
    isDragging: false,
    prevMouseX: 0,
    prevMouseY: 0,
  });

  useEffect(() => {
    sceneParamsRef.current.shape = activeShape;
    sceneParamsRef.current.colorTheme = colorTheme;
    sceneParamsRef.current.isRotating = isRotating;
  }, [activeShape, colorTheme, isRotating]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 400;
    let height = container.clientHeight || 450;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    
    // Clear any previous canvas if exists
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Color theme definitions
    const themeColors = {
      cyan: {
        primary: 0x00f0ff,
        secondary: 0x3b82f6,
        inner: 0x0284c7,
        wire: 0x38bdf8,
        light1: 0x00f0ff,
        light2: 0x8a2be2,
      },
      purple: {
        primary: 0xa855f7,
        secondary: 0xec4899,
        inner: 0x7c3aed,
        wire: 0xd946ef,
        light1: 0xc084fc,
        light2: 0x06b6d4,
      },
      emerald: {
        primary: 0x10b981,
        secondary: 0x06b6d4,
        inner: 0x059669,
        wire: 0x34d399,
        light1: 0x10b981,
        light2: 0x3b82f6,
      }
    };

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00f0ff, 45, 50);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x8a2be2, 40, 50);
    pointLight2.position.set(-5, -5, -3);
    scene.add(pointLight2);

    // Ambient floating 3D dust particles
    const particleCount = 700;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colorA = new THREE.Color(0x00f0ff);
    const colorB = new THREE.Color(0x8a2be2);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 18;
      positions[i + 1] = (Math.random() - 0.5) * 18;
      positions[i + 2] = (Math.random() - 0.5) * 18;

      const mixedColor = colorA.clone().lerp(colorB, Math.random());
      particleColors[i] = mixedColor.r;
      particleColors[i + 1] = mixedColor.g;
      particleColors[i + 2] = mixedColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Main 3D Models Container
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Cyber Core Mesh (Icosahedron + Wireframe + Orbit Rings)
    const coreGroup = new THREE.Group();
    
    const innerCoreGeo = new THREE.IcosahedronGeometry(1.2, 1);
    const innerCoreMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      roughness: 0.2,
      metalness: 0.85,
      wireframe: false,
      emissive: 0x003366,
      emissiveIntensity: 0.5,
    });
    const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    coreGroup.add(innerCore);

    const outerWireGeo = new THREE.IcosahedronGeometry(1.65, 1);
    const outerWireMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      wireframe: true,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.7,
    });
    const outerWire = new THREE.Mesh(outerWireGeo, outerWireMat);
    coreGroup.add(outerWire);

    // Orbiting Rings
    const ringGeo = new THREE.TorusGeometry(2.1, 0.02, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x8a2be2,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const orbitRing1 = new THREE.Mesh(ringGeo, ringMat);
    orbitRing1.rotation.x = Math.PI / 3;
    coreGroup.add(orbitRing1);

    const orbitRing2 = new THREE.Mesh(ringGeo, ringMat.clone());
    orbitRing2.rotation.x = -Math.PI / 4;
    orbitRing2.rotation.y = Math.PI / 4;
    coreGroup.add(orbitRing2);

    mainGroup.add(coreGroup);

    // 2. Quantum Knot Mesh
    const knotGroup = new THREE.Group();
    const knotGeo = new THREE.TorusKnotGeometry(1.15, 0.35, 120, 16);
    const knotMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      roughness: 0.15,
      metalness: 0.85,
      wireframe: false,
    });
    const knotMesh = new THREE.Mesh(knotGeo, knotMat);
    knotGroup.add(knotMesh);

    const knotWireGeo = new THREE.TorusKnotGeometry(1.17, 0.36, 60, 8);
    const knotWireMat = new THREE.MeshBasicMaterial({
      color: 0x8a2be2,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const knotWireMesh = new THREE.Mesh(knotWireGeo, knotWireMat);
    knotGroup.add(knotWireMesh);

    // 3. Tech Gyroscope
    const gyroGroup = new THREE.Group();
    const gyroRingGeo1 = new THREE.TorusGeometry(1.8, 0.05, 16, 80);
    const gyroMat1 = new THREE.MeshStandardMaterial({ color: 0x00f0ff, metalness: 0.9, roughness: 0.1 });
    const gyroRing1 = new THREE.Mesh(gyroRingGeo1, gyroMat1);
    gyroGroup.add(gyroRing1);

    const gyroRingGeo2 = new THREE.TorusGeometry(1.4, 0.05, 16, 80);
    const gyroMat2 = new THREE.MeshStandardMaterial({ color: 0x8a2be2, metalness: 0.9, roughness: 0.1 });
    const gyroRing2 = new THREE.Mesh(gyroRingGeo2, gyroMat2);
    gyroRing2.rotation.x = Math.PI / 2;
    gyroGroup.add(gyroRing2);

    const centerDiamondGeo = new THREE.OctahedronGeometry(0.85, 0);
    const centerDiamondMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.1,
      metalness: 0.9,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.6,
    });
    const centerDiamond = new THREE.Mesh(centerDiamondGeo, centerDiamondMat);
    gyroGroup.add(centerDiamond);

    // Shape Switcher Handler
    let currentRenderGroup = coreGroup;
    const updateDisplayedShape = (shapeKey) => {
      mainGroup.clear();
      if (shapeKey === 'core') {
        mainGroup.add(coreGroup);
        currentRenderGroup = coreGroup;
      } else if (shapeKey === 'knot') {
        mainGroup.add(knotGroup);
        currentRenderGroup = knotGroup;
      } else if (shapeKey === 'gyro') {
        mainGroup.add(gyroGroup);
        currentRenderGroup = gyroGroup;
      }
    };

    // Color Theme Handler
    const updateColorTheme = (themeKey) => {
      const cfg = themeColors[themeKey] || themeColors.cyan;
      pointLight1.color.setHex(cfg.light1);
      pointLight2.color.setHex(cfg.light2);

      // Core
      innerCoreMat.color.setHex(cfg.inner);
      innerCoreMat.emissive.setHex(cfg.primary);
      outerWireMat.color.setHex(cfg.primary);
      outerWireMat.emissive.setHex(cfg.primary);
      orbitRing1.material.color.setHex(cfg.secondary);
      orbitRing2.material.color.setHex(cfg.primary);

      // Knot
      knotMat.color.setHex(cfg.primary);
      knotWireMat.color.setHex(cfg.secondary);

      // Gyro
      gyroMat1.color.setHex(cfg.primary);
      gyroMat2.color.setHex(cfg.secondary);
      centerDiamondMat.emissive.setHex(cfg.primary);
    };

    // Pointer event listeners (Mouse & Touch)
    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / height) * 2 - 1);

      if (sceneParamsRef.current.isDragging) {
        const deltaX = e.clientX - sceneParamsRef.current.prevMouseX;
        const deltaY = e.clientY - sceneParamsRef.current.prevMouseY;
        sceneParamsRef.current.curRotY += deltaX * 0.01;
        sceneParamsRef.current.curRotX += deltaY * 0.01;
        sceneParamsRef.current.prevMouseX = e.clientX;
        sceneParamsRef.current.prevMouseY = e.clientY;
      } else {
        sceneParamsRef.current.targetRotY = x * 0.75;
        sceneParamsRef.current.targetRotX = -y * 0.75;
      }
    };

    const handlePointerDown = (e) => {
      sceneParamsRef.current.isDragging = true;
      sceneParamsRef.current.prevMouseX = e.clientX;
      sceneParamsRef.current.prevMouseY = e.clientY;
    };

    const handlePointerUp = () => {
      sceneParamsRef.current.isDragging = false;
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);

    // Responsive Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 400;
      height = container.clientHeight || 450;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();
    let prevTheme = null;
    let prevShape = null;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Check for theme or shape dynamic switch
      if (prevShape !== sceneParamsRef.current.shape) {
        prevShape = sceneParamsRef.current.shape;
        updateDisplayedShape(prevShape);
      }
      if (prevTheme !== sceneParamsRef.current.colorTheme) {
        prevTheme = sceneParamsRef.current.colorTheme;
        updateColorTheme(prevTheme);
      }

      // Dust particles orbital motion
      particles.rotation.y = elapsedTime * 0.025;
      particles.rotation.x = Math.sin(elapsedTime * 0.04) * 0.08;

      // Auto rotation
      if (sceneParamsRef.current.isRotating && !sceneParamsRef.current.isDragging) {
        mainGroup.rotation.y += 0.007;
      }

      // Parallax smooth interpolation
      if (!sceneParamsRef.current.isDragging) {
        sceneParamsRef.current.curRotX += (sceneParamsRef.current.targetRotX - sceneParamsRef.current.curRotX) * 0.06;
        sceneParamsRef.current.curRotY += (sceneParamsRef.current.targetRotY - sceneParamsRef.current.curRotY) * 0.06;
      }

      mainGroup.rotation.x = sceneParamsRef.current.curRotX;
      mainGroup.rotation.z = Math.sin(elapsedTime * 0.35) * 0.05;

      // Internal mesh rotation kinematics
      if (currentRenderGroup === coreGroup) {
        innerCore.rotation.y = -elapsedTime * 0.45;
        outerWire.rotation.y = elapsedTime * 0.28;
        orbitRing1.rotation.z = elapsedTime * 0.38;
        orbitRing2.rotation.z = -elapsedTime * 0.32;
      } else if (currentRenderGroup === knotGroup) {
        knotMesh.rotation.x = elapsedTime * 0.22;
        knotMesh.rotation.y = elapsedTime * 0.28;
        knotWireMesh.rotation.x = elapsedTime * 0.22;
        knotWireMesh.rotation.y = elapsedTime * 0.28;
      } else if (currentRenderGroup === gyroGroup) {
        gyroRing1.rotation.y = elapsedTime * 0.75;
        gyroRing2.rotation.x = elapsedTime * 0.55;
        centerDiamond.rotation.y = -elapsedTime * 1.1;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup resources
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[530px] flex items-center justify-center">
      {/* 3D Canvas Mount */}
      <div 
        ref={mountRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing relative z-10 touch-none select-none"
        title="Click and drag to rotate the 3D model in real time!"
      />

      {/* Futuristic HUD Frame overlay */}
      <div className="absolute inset-0 pointer-events-none rounded-3xl border border-cyan-500/25 bg-gradient-to-b from-cyan-500/5 via-transparent to-purple-500/5 shadow-2xl" />
      
      {/* Corner Bracket Accents */}
      <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
      <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />

      {/* Interactive 3D HUD Controls Bar */}
      <div className="absolute bottom-4 left-3 right-3 sm:left-4 sm:right-4 z-20 flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-slate-700/60 shadow-glass text-xs">
        {/* Model Geometry Switcher */}
        <div className="flex items-center space-x-1">
          <span className="text-slate-400 font-mono text-[11px] mr-1 hidden sm:inline">Mesh:</span>
          <button
            onClick={() => { setActiveShape('core'); sound.playClick(); }}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              activeShape === 'core'
                ? 'bg-cyan-500 text-black font-semibold shadow-neon-cyan'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            Core
          </button>
          <button
            onClick={() => { setActiveShape('knot'); sound.playClick(); }}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              activeShape === 'knot'
                ? 'bg-cyan-500 text-black font-semibold shadow-neon-cyan'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            Quantum
          </button>
          <button
            onClick={() => { setActiveShape('gyro'); sound.playClick(); }}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              activeShape === 'gyro'
                ? 'bg-cyan-500 text-black font-semibold shadow-neon-cyan'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            Gyro
          </button>
        </div>

        {/* Color Theme & Auto-Spin Toggles */}
        <div className="flex items-center space-x-2">
          {/* Color theme dots */}
          <div className="flex items-center space-x-1.5 px-2 py-1 bg-slate-800/80 rounded-lg border border-slate-700/70">
            <button
              onClick={() => { setColorTheme('cyan'); sound.playClick(); }}
              className={`w-3.5 h-3.5 rounded-full bg-cyan-400 transition-all ${
                colorTheme === 'cyan' ? 'scale-125 ring-2 ring-cyan-300 shadow-neon-cyan' : 'opacity-50 hover:opacity-100'
              }`}
              title="Cyan Neon Preset"
              aria-label="Cyan theme"
            />
            <button
              onClick={() => { setColorTheme('purple'); sound.playClick(); }}
              className={`w-3.5 h-3.5 rounded-full bg-purple-500 transition-all ${
                colorTheme === 'purple' ? 'scale-125 ring-2 ring-purple-300 shadow-neon-purple' : 'opacity-50 hover:opacity-100'
              }`}
              title="Purple Neon Preset"
              aria-label="Purple theme"
            />
            <button
              onClick={() => { setColorTheme('emerald'); sound.playClick(); }}
              className={`w-3.5 h-3.5 rounded-full bg-emerald-400 transition-all ${
                colorTheme === 'emerald' ? 'scale-125 ring-2 ring-emerald-300 shadow-neon-emerald' : 'opacity-50 hover:opacity-100'
              }`}
              title="Emerald Matrix Preset"
              aria-label="Emerald theme"
            />
          </div>

          {/* Auto spin toggle */}
          <button
            onClick={() => { setIsRotating(!isRotating); sound.playClick(); }}
            className={`p-1.5 rounded-lg border transition-all ${
              isRotating
                ? 'border-cyan-500/50 text-cyan-400 bg-cyan-500/10'
                : 'border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
            title={isRotating ? 'Pause auto-rotation' : 'Resume auto-rotation'}
            aria-label="Toggle auto rotation"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin-slow' : ''}`} />
          </button>
        </div>
      </div>

      {/* Floating 3D Tech Hologram Badges */}
      <div className="absolute top-5 left-5 z-20 pointer-events-none flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 backdrop-blur-md text-xs font-mono text-cyan-300 shadow-lg">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span>3D WebGL Canvas</span>
      </div>

      <div className="absolute top-5 right-5 z-20 pointer-events-none hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-purple-500/30 backdrop-blur-md text-xs font-mono text-purple-300 shadow-lg">
        <Sparkles className="w-3.5 h-3.5 text-purple-400" />
        <span>Interactive Drag</span>
      </div>
    </div>
  );
}
