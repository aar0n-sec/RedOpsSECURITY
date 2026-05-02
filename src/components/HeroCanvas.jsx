import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const HeroCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x1a1a1a, 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 4.5);

    // Ambient light
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    // Point light (red)
    const redLight = new THREE.PointLight(0xC44536, 6, 12);
    redLight.position.set(3, 2, 3);
    scene.add(redLight);

    // Point light (blue)
    const blueLight = new THREE.PointLight(0x1F4ED8, 4, 10);
    blueLight.position.set(-3, -2, 2);
    scene.add(blueLight);

    // Globe wireframe
    const globeGeo = new THREE.SphereGeometry(1.6, 24, 18);
    const globeMat = new THREE.MeshBasicMaterial({
      color: 0xC44536,
      wireframe: true,
      transparent: true,
      opacity: 0.07
    });
    const globe = new THREE.Mesh(globeGeo, globeMat);
    scene.add(globe);

    // Texture Loader
    const textureLoader = new THREE.TextureLoader();
    const earthMap = textureLoader.load('/earth_texture.jpg');
    const earthSpecular = textureLoader.load('/earth_specular.jpg');
    const earthNormal = textureLoader.load('/earth_normal.jpg');
    
    earthMap.colorSpace = THREE.SRGBColorSpace;

    // Solid globe (actual earth)
    const solidGeo = new THREE.SphereGeometry(1.58, 64, 64);
    const solidMat = new THREE.MeshPhongMaterial({
      map: earthMap,
      specularMap: earthSpecular,
      normalMap: earthNormal,
      specular: new THREE.Color(0x333333),
      shininess: 15
    });
    const solidGlobe = new THREE.Mesh(solidGeo, solidMat);
    
    // Add some lighting specific for the earth to make it visible
    const earthLight = new THREE.DirectionalLight(0xffffff, 2.5);
    earthLight.position.set(5, 3, 5);
    scene.add(earthLight);
    
    scene.add(solidGlobe);

    // Equator ring
    const ringGeo = new THREE.TorusGeometry(1.62, 0.006, 8, 120);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xC44536, transparent: true, opacity: 0.35 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    scene.add(ring);

    // Second ring (tilted)
    const ring2 = ring.clone();
    ring2.rotation.x = Math.PI / 2.8;
    ring2.material = ringMat.clone();
    ring2.material.opacity = 0.18;
    scene.add(ring2);

    // Nodes on globe surface
    const nodeGroup = new THREE.Group();
    const nodePositions = [];
    const nodeCount = 28;

    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const x = 1.62 * Math.sin(phi) * Math.cos(theta);
      const y = 1.62 * Math.sin(phi) * Math.sin(theta);
      const z = 1.62 * Math.cos(phi);
      nodePositions.push(new THREE.Vector3(x, y, z));

      const nodeMat = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.7 ? 0xC44536 : 0xffffff,
        transparent: true,
        opacity: Math.random() * 0.5 + 0.3
      });
      const nodeGeo = new THREE.SphereGeometry(0.018 + Math.random() * 0.018, 8, 8);
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.set(x, y, z);
      nodeGroup.add(node);
    }

    // Connections between nearby nodes
    const lineMat = new THREE.LineBasicMaterial({ color: 0xC44536, transparent: true, opacity: 0.12 });
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < 1.2) {
          const points = [nodePositions[i], nodePositions[j]];
          const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
          nodeGroup.add(new THREE.Line(lineGeo, lineMat));
        }
      }
    }
    scene.add(nodeGroup);

    // Particles
    const particleCount = 200;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 2.5 + Math.random() * 2.5;
      const theta2 = Math.random() * Math.PI * 2;
      const phi2 = Math.random() * Math.PI;
      particlePositions[i * 3] = r * Math.sin(phi2) * Math.cos(theta2);
      particlePositions[i * 3 + 1] = r * Math.sin(phi2) * Math.sin(theta2);
      particlePositions[i * 3 + 2] = r * Math.cos(phi2);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.025, transparent: true, opacity: 0.3 });
    scene.add(new THREE.Points(particleGeo, particleMat));

    // Mouse parallax
    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    document.addEventListener('mousemove', onMouseMove);

    let targetRotX = 0, targetRotY = 0;
    let animationFrameId;
    let t = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      t += 16.666; // Approx 60fps delta in ms
      const timeSec = t * 0.001;

      // Slow globe rotation
      globe.rotation.y = timeSec * 0.12;
      solidGlobe.rotation.y = timeSec * 0.12;
      nodeGroup.rotation.y = timeSec * 0.12;
      ring.rotation.z = timeSec * 0.06;

      // Mouse parallax on camera
      targetRotX += (mouseY * 0.3 - targetRotX) * 0.04;
      targetRotY += (mouseX * 0.4 - targetRotY) * 0.04;
      camera.position.x = Math.sin(targetRotY) * 0.8;
      camera.position.y = -targetRotX * 0.5;
      camera.lookAt(0, 0, 0);

      // Pulsing red light
      redLight.intensity = 5 + Math.sin(timeSec * 1.2) * 1.5;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      
      // Cleanup geometries and materials
      globeGeo.dispose();
      globeMat.dispose();
      solidGeo.dispose();
      solidMat.dispose();
      if (earthMap) earthMap.dispose();
      if (earthSpecular) earthSpecular.dispose();
      if (earthNormal) earthNormal.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      lineMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas id="hero-canvas" ref={canvasRef}></canvas>;
};

export default HeroCanvas;
