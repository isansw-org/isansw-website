"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useState, useRef, useEffect } from "react";
import { Html, useGLTF, OrbitControls } from "@react-three/drei";
import { FaInstagram } from "react-icons/fa";
import { FiMaximize2, FiX } from "react-icons/fi";
import * as THREE from "three";
import Experience from "./Experience";

interface SydneyModelProps {
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

interface BaseModelProps {
  scale?: number;
  position?: [number, number, number];
}

/**
 * Animated Newcastle Model
 * This function clones the scene to avoid shared state across canvases.
 */
function NewcastleModel({ scale = 1, position = [0, -7, 0] }: BaseModelProps) {
  const gltf = useGLTF("/models/newcastle.glb") as {
    scene: THREE.Group;
    animations: THREE.AnimationClip[];
  };

  // Clone the scene for this instance
  const scene = gltf.scene.clone(true);

  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  useEffect(() => {
    if (gltf.animations?.length && scene) {
      const mixer = new THREE.AnimationMixer(scene);
      gltf.animations.forEach((clip) => mixer.clipAction(clip).play());
      mixerRef.current = mixer;
    }
  }, [gltf.animations, scene]);

  useFrame((_, delta) => {
    mixerRef.current?.update(delta);
  });

  return (
    <primitive
      object={scene}
      scale={scale}
      position={position}
      rotation={[0, Math.PI + 1.3, 0]}
    />
  );
}

function MacquarieModel({
  scale = 1.6,
  position = [0, -5, 0],
}: BaseModelProps) {
  const gltf = useGLTF("/models/mq.glb") as {
    scene: THREE.Group;
    animations: THREE.AnimationClip[];
  };

  const scene = gltf.scene.clone(true);

  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  useEffect(() => {
    if (gltf.animations?.length && scene) {
      const mixer = new THREE.AnimationMixer(scene);
      gltf.animations.forEach((clip) => mixer.clipAction(clip).play());
      mixerRef.current = mixer;
    }
  }, [gltf.animations, scene]);

  useFrame((_, delta) => {
    mixerRef.current?.update(delta);
  });

  return (
    <primitive
      object={scene}
      scale={scale}
      position={position}
      rotation={[0, Math.PI + 1.3, 0]}
    />
  );
}

function WollongongModel({
  scale = 0.6,
  position = [-7, -1, 0],
}: BaseModelProps) {
  const gltf = useGLTF("/models/UOW.glb") as {
    scene: THREE.Group;
    animations: THREE.AnimationClip[];
  };

  const scene = gltf.scene.clone(true);

  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  useEffect(() => {
    if (gltf.animations?.length && scene) {
      const mixer = new THREE.AnimationMixer(scene);
      gltf.animations.forEach((clip) => mixer.clipAction(clip).play());
      mixerRef.current = mixer;
    }
  }, [gltf.animations, scene]);

  useFrame((_, delta) => {
    mixerRef.current?.update(delta);
  });

  return (
    <primitive
      object={scene}
      scale={scale}
      position={position}
      rotation={[0, Math.PI + 1.3, 0]}
    />
  );
}

function WesternUniModel({
  scale = 2.9,
  position = [2, -7, 0],
}: BaseModelProps) {
  const gltf = useGLTF("/models/westernuni.glb") as {
    scene: THREE.Group;
    animations: THREE.AnimationClip[];
  };

  const scene = gltf.scene.clone(true);

  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  useEffect(() => {
    if (gltf.animations?.length && scene) {
      const mixer = new THREE.AnimationMixer(scene);
      gltf.animations.forEach((clip) => mixer.clipAction(clip).play());
      mixerRef.current = mixer;
    }
  }, [gltf.animations, scene]);

  useFrame((_, delta) => {
    mixerRef.current?.update(delta);
  });

  return (
    <primitive
      object={scene}
      scale={scale}
      position={position}
      rotation={[0, Math.PI + 1.3, 0]}
    />
  );
}

function UTSModel({
  scale = 2.3,
  position = [2, -17, 0],
  rotation = [0, -4.75, 0],
}: SydneyModelProps) {
  const gltf = useGLTF("/models/uts.glb") as {
    scene: THREE.Group;
    animations: THREE.AnimationClip[];
  };

  const scene = gltf.scene.clone(true);

  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  useEffect(() => {
    if (gltf.animations?.length && scene) {
      const mixer = new THREE.AnimationMixer(scene);
      gltf.animations.forEach((clip) => mixer.clipAction(clip).play());
      mixerRef.current = mixer;
    }
  }, [gltf.animations, scene]);

  useFrame((_, delta) => {
    mixerRef.current?.update(delta);
  });

  return (
    <primitive
      object={scene}
      scale={scale}
      position={position}
      rotation={rotation}
      // rotation={[0, Math.PI + 1.3, 0]}
    />
  );
}

function USYDModel({ scale = 0.75, position = [2, -8, 0] }: SydneyModelProps) {
  const gltf = useGLTF("/models/usyd.glb") as {
    scene: THREE.Group;
    animations: THREE.AnimationClip[];
  };

  const scene = gltf.scene.clone(true);

  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  useEffect(() => {
    if (gltf.animations?.length && scene) {
      const mixer = new THREE.AnimationMixer(scene);
      gltf.animations.forEach((clip) => mixer.clipAction(clip).play());
      mixerRef.current = mixer;
    }
  }, [gltf.animations, scene]);

  useFrame((_, delta) => {
    mixerRef.current?.update(delta);
  });

  return (
    <primitive
      object={scene}
      scale={scale}
      position={position}
      rotation={[0, Math.PI + 1.3, 0]}
    />
  );
}

function UNSWModel({
  scale = 2.3,
  position = [-1.5, -2, 0],
}: SydneyModelProps) {
  const gltf = useGLTF("/models/unsw.glb") as {
    scene: THREE.Group;
    animations: THREE.AnimationClip[];
  };

  const scene = gltf.scene.clone(true);

  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  useEffect(() => {
    if (gltf.animations?.length && scene) {
      const mixer = new THREE.AnimationMixer(scene);
      gltf.animations.forEach((clip) => mixer.clipAction(clip).play());
      mixerRef.current = mixer;
    }
  }, [gltf.animations, scene]);

  useFrame((_, delta) => {
    mixerRef.current?.update(delta);
  });

  return (
    <primitive
      object={scene}
      scale={scale}
      position={position}
      rotation={[0, Math.PI + 1.3, 0]}
    />
  );
}

/**
 * Loader fallback
 */
function Loader() {
  return (
    <Html center>
      <div className="text-xl font-semibold">Loading 3D Map...</div>
      <div className="flex justify-center">
        <div
          className="my-10 inline-block h-12 w-12 animate-spin rounded-full border-[6px] border-current border-e-transparent text-red-600"
          role="status"
        />
      </div>
    </Html>
  );
}

export default function MapScenePage() {
  const [active, setActive] = useState(false);
  const [expandedPin, setExpandedPin] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUni, setSelectedUni] = useState<"uts" | "usyd" | "unsw">(
    "unsw"
  );

  return (
    <main className="relative w-full h-screen">
      {/* Main Map Canvas */}
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [-4, 3, 6],
        }}
      >
        <Suspense fallback={<Loader />}>
          <Experience
            active={active}
            setActive={setActive}
            expandedPin={expandedPin}
            setExpandedPin={setExpandedPin}
            isModalOpen={isModalOpen}
          />
        </Suspense>
      </Canvas>

      {/* Newcastle Info Panel */}
      {expandedPin === "newcastle" && (
        <div className="fixed top-1/2 right-0 transform -translate-y-1/2 mr-[105px] z-50 w-full md:max-w-4xl">
          <div className="flex flex-col gap-4">
            <h2 className="text-red-500 text-5xl font-semibold text-center">
              Newcastle Branch
            </h2>
            <div className="flex flex-col md:flex-row gap-4">
              {/* Model Box */}
              <div className="flex flex-col items-center w-full md:w-1/2 rounded p-4">
                <div className="relative w-full aspect-square rounded-full border-8 border-neutral-600 overflow-hidden flex items-center justify-center">
                  <Canvas camera={{ position: [0, 15, 40] }}>
                    <ambientLight intensity={1} />
                    <directionalLight position={[2, 2, 2]} />
                    <Suspense fallback={null}>
                      <NewcastleModel />
                    </Suspense>
                    <OrbitControls
                      enableZoom
                      minDistance={15}
                      maxDistance={40}
                    />
                  </Canvas>
                </div>
                <button
                  className="mt-4 bg-neutral-100 text-black text-2xl px-4 py-2 rounded flex items-center gap-2 hover:bg-neutral-200"
                  onClick={() => setIsModalOpen(true)}
                >
                  Expand <FiMaximize2 />
                </button>
              </div>

              {/* Info Box */}
              <div className="flex flex-col justify-center flex-1 min-w-[300px] md:min-w-[450px] rounded p-6 text-center md:text-left space-y-2">
                <h3 className="text-white text-4xl font-semibold">
                  PPIA University of Newcastle
                </h3>
                <hr className="border border-neutral-500 w-32 mx-auto md:mx-0" />
                <p className="text-neutral-300 text-2xl leading-relaxed">
                  <strong>President:</strong> Vacant
                </p>
                <p className="text-neutral-300 text-2xl leading-relaxed break-all">
                  <strong>Email:</strong> ppia.newcastle@gmail.com
                </p>
                <p className="text-neutral-300 text-2xl leading-relaxed">
                  <strong>Social Platforms:</strong>
                </p>
                <div className="flex items-center gap-3 mt-2 flex-wrap justify-center md:justify-start">
                  <a
                    href="https://www.instagram.com/ppia_newcastle/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded cursor-pointer transition-colors duration-200 hover:bg-red-500 group"
                  >
                    <FaInstagram
                      className="text-white transition-colors duration-200 group-hover:text-white"
                      size={60}
                    />
                    <span className="text-2xl text-neutral-300 transition-colors duration-200 group-hover:text-white">
                      Instagram
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Newcastle Modal Overlay */}
      {isModalOpen && expandedPin === "newcastle" && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl bg-neutral-900 rounded-xl overflow-hidden flex flex-col md:flex-row">
            {/* Left Text */}
            <div className="w-full md:w-1/3 p-6 text-white flex flex-col gap-4">
              <h3 className="text-3xl font-semibold">
                University of Newcastle, Sydney
              </h3>
              <p className="text-2xl">
                <strong>Building:</strong> NUSpace Building
              </p>
              <p className="text-2xl text-neutral-300">
                NUSpace is the University’s landmark city campus with
                cutting-edge learning facilities, modern architecture, and
                vibrant student spaces.
              </p>
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-4 text-2xl bg-red-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-red-600 self-start"
              >
                <FiX size={40} /> Close
              </button>
            </div>
            {/* Right Model */}
            <div className="relative flex-1 h-[70vh]">
              <Canvas camera={{ position: [0, 15, 40] }}>
                <ambientLight intensity={1.1} />
                <directionalLight position={[2, 2, 2]} />
                <Suspense fallback={<Loader />}>
                  <NewcastleModel scale={2} position={[0, -26, -25]} />
                </Suspense>
                <OrbitControls enableZoom minDistance={15} maxDistance={70} />
              </Canvas>
            </div>
          </div>
        </div>
      )}

      {/* Macquarie Info Panel */}
      {expandedPin === "macquarie" && (
        <div className="fixed top-1/2 right-0 transform -translate-y-1/2 mr-[105px] z-50 w-full md:max-w-4xl">
          <div className="flex flex-col gap-4">
            <h2 className="text-red-500 text-5xl font-semibold text-center">
              Macquarie Area
            </h2>
            <div className="flex flex-col md:flex-row gap-4">
              {/* Model Box */}
              <div className="flex flex-col items-center w-full md:w-1/2 rounded p-4">
                <div className="relative w-full aspect-square rounded-full border-8 border-neutral-600 overflow-hidden flex items-center justify-center">
                  <Canvas camera={{ position: [0, 15, 40] }}>
                    <ambientLight intensity={1} />
                    <directionalLight position={[2, 2, 2]} />
                    <Suspense fallback={null}>
                      <MacquarieModel />
                    </Suspense>
                    <OrbitControls
                      enableZoom
                      minDistance={15}
                      maxDistance={40}
                    />
                  </Canvas>
                </div>
                <button
                  className="mt-4 bg-neutral-100 text-black text-2xl px-4 py-2 rounded flex items-center gap-2 hover:bg-neutral-200"
                  onClick={() => setIsModalOpen(true)}
                >
                  Expand <FiMaximize2 />
                </button>
              </div>

              {/* Info Box */}
              <div className="flex flex-col justify-center flex-1 min-w-[300px] md:min-w-[450px] rounded p-6 text-center md:text-left space-y-2">
                <h3 className="text-white text-4xl font-semibold">
                  PPIA Macquarie University
                </h3>
                <hr className="border border-neutral-500 w-32 mx-auto md:mx-0" />
                <p className="text-neutral-300 text-2xl leading-relaxed">
                  <strong>President:</strong> Reinald Firdaus Gunawan
                </p>
                <p className="text-neutral-300 text-2xl leading-relaxed break-all">
                  <strong>Email:</strong> ppia.macq@gmail.com
                </p>
                <p className="text-neutral-300 text-2xl leading-relaxed">
                  <strong>Social Platforms:</strong>
                </p>
                <div className="flex items-center gap-3 mt-2 flex-wrap justify-center md:justify-start">
                  <a
                    href="https://www.instagram.com/ppiamq/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded cursor-pointer transition-colors duration-200 hover:bg-red-500 group"
                  >
                    <FaInstagram
                      className="text-white transition-colors duration-200 group-hover:text-white"
                      size={60}
                    />
                    <span className="text-2xl text-neutral-300 transition-colors duration-200 group-hover:text-white">
                      Instagram
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Macquarie Modal Overlay */}
      {isModalOpen && expandedPin === "macquarie" && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl bg-neutral-900 rounded-xl overflow-hidden flex flex-col md:flex-row">
            {/* Left Text */}
            <div className="w-full md:w-1/3 p-6 text-white flex flex-col gap-4">
              <h3 className="text-3xl font-semibold">
                Macquarie University, Sydney
              </h3>
              <p className="text-2xl">
                <strong>Building:</strong> Macquarie Warranara Library
              </p>
              <p className="text-2xl text-neutral-300">
                Macquarie University’s Warrane/Ngarra Library blends striking
                contemporary design with the natural bushland of the campus. It
                offers dynamic learning zones, extensive digital resources, and
                serene study spaces bathed in natural light—reflecting
                Macquarie’s commitment to innovation and connection with
                Country.
              </p>
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-4 text-2xl bg-red-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-red-600 self-start"
              >
                <FiX size={40} /> Close
              </button>
            </div>
            {/* Right Model */}
            <div className="relative flex-1 h-[70vh]">
              <Canvas camera={{ position: [0, 15, 40] }}>
                <ambientLight intensity={1.1} />
                <directionalLight position={[2, 2, 2]} />
                <Suspense fallback={<Loader />}>
                  <MacquarieModel scale={3} position={[0, -20, -25]} />
                </Suspense>
                <OrbitControls enableZoom minDistance={15} maxDistance={70} />
              </Canvas>
            </div>
          </div>
        </div>
      )}

      {/* Wollongong Info Panel */}
      {expandedPin === "wollongong" && (
        <div className="fixed top-1/2 right-0 transform -translate-y-1/2 mr-[105px] z-50 w-full md:max-w-4xl">
          <div className="flex flex-col gap-4">
            <h2 className="text-red-500 text-5xl font-semibold text-center">
              Wollongong Area
            </h2>
            <div className="flex flex-col md:flex-row gap-4">
              {/* Model Box */}
              <div className="flex flex-col items-center w-full md:w-1/2 rounded p-4">
                <div className="relative w-full aspect-square rounded-full border-8 border-neutral-600 overflow-hidden flex items-center justify-center">
                  <Canvas camera={{ position: [0, 15, 40] }}>
                    <ambientLight intensity={1} />
                    <directionalLight position={[2, 2, 2]} />
                    <Suspense fallback={null}>
                      <WollongongModel />
                    </Suspense>
                    <OrbitControls
                      enableZoom
                      minDistance={15}
                      maxDistance={40}
                    />
                  </Canvas>
                </div>
                <button
                  className="mt-4 bg-neutral-100 text-black text-2xl px-4 py-2 rounded flex items-center gap-2 hover:bg-neutral-200"
                  onClick={() => setIsModalOpen(true)}
                >
                  Expand <FiMaximize2 />
                </button>
              </div>

              {/* Info Box */}
              <div className="flex flex-col justify-center flex-1 min-w-[300px] md:min-w-[450px] rounded p-6 text-center md:text-left space-y-2">
                <h3 className="text-white text-4xl font-semibold">
                  PPIA University of Wollongong
                </h3>
                <hr className="border border-neutral-500 w-32 mx-auto md:mx-0" />
                <p className="text-neutral-300 text-2xl leading-relaxed">
                  <strong>President:</strong> Rafli Otman
                </p>
                <p className="text-neutral-300 text-2xl leading-relaxed break-all">
                  <strong>Email:</strong> gong.ppia@gmail.com
                </p>
                <p className="text-neutral-300 text-2xl leading-relaxed">
                  <strong>Social Platforms:</strong>
                </p>
                <div className="flex items-center gap-3 mt-2 flex-wrap justify-center md:justify-start">
                  <a
                    href="https://www.instagram.com/ppiauow/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded cursor-pointer transition-colors duration-200 hover:bg-red-500 group"
                  >
                    <FaInstagram
                      className="text-white transition-colors duration-200 group-hover:text-white"
                      size={60}
                    />
                    <span className="text-2xl text-neutral-300 transition-colors duration-200 group-hover:text-white">
                      Instagram
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Wollongong Modal Overlay */}
      {isModalOpen && expandedPin === "wollongong" && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl bg-neutral-900 rounded-xl overflow-hidden flex flex-col md:flex-row">
            {/* Left Text */}
            <div className="w-full md:w-1/3 p-6 text-white flex flex-col gap-4">
              <h3 className="text-3xl font-semibold">
                University of Wollongong, NSW
              </h3>
              <p className="text-2xl">
                <strong>Building:</strong> SMART Infrastructure Facility
              </p>
              <p className="text-2xl text-neutral-300">
                The SMART Infrastructure Facility at UOW is Australia’s
                pioneering hub for infrastructure research, blending
                cutting-edge simulation labs, IoT living labs, and collaborative
                spaces to drive smarter, more resilient cities from Wollongong
                to the world.
              </p>
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-4 text-2xl bg-red-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-red-600 self-start"
              >
                <FiX size={40} /> Close
              </button>
            </div>
            {/* Right Model */}
            <div className="relative flex-1 h-[70vh]">
              <Canvas camera={{ position: [0, 15, 40] }}>
                <ambientLight intensity={1.1} />
                <directionalLight position={[2, 2, 2]} />
                <Suspense fallback={<Loader />}>
                  <WollongongModel scale={1.2} position={[-13, -10, -25]} />
                </Suspense>
                <OrbitControls enableZoom minDistance={15} maxDistance={70} />
              </Canvas>
            </div>
          </div>
        </div>
      )}

      {/* WesternUni Info Panel */}
      {expandedPin === "western" && (
        <div className="fixed top-1/2 right-0 transform -translate-y-1/2 mr-[105px] z-50 w-full md:max-w-4xl">
          <div className="flex flex-col gap-4">
            <h2 className="text-red-500 text-5xl font-semibold text-center">
              Western Sydney Area
            </h2>
            <div className="flex flex-col md:flex-row gap-4">
              {/* Model Box */}
              <div className="flex flex-col items-center w-full md:w-1/2 rounded p-4">
                <div className="relative w-full aspect-square rounded-full border-8 border-neutral-600 overflow-hidden flex items-center justify-center">
                  <Canvas camera={{ position: [0, 15, 40] }}>
                    <ambientLight intensity={1} />
                    <directionalLight position={[2, 2, 2]} />
                    <Suspense fallback={null}>
                      <WesternUniModel />
                    </Suspense>
                    <OrbitControls
                      enableZoom
                      minDistance={15}
                      maxDistance={40}
                    />
                  </Canvas>
                </div>
                <button
                  className="mt-4 bg-neutral-100 text-black text-2xl px-4 py-2 rounded flex items-center gap-2 hover:bg-neutral-200"
                  onClick={() => setIsModalOpen(true)}
                >
                  Expand <FiMaximize2 />
                </button>
              </div>

              {/* Info Box */}
              <div className="flex flex-col justify-center flex-1 min-w-[300px] md:min-w-[450px] rounded p-6 text-center md:text-left space-y-2">
                <h3 className="text-white text-4xl font-semibold">
                  Indonesian Student Society at Western Sydney University
                </h3>
                <hr className="border border-neutral-500 w-32 mx-auto md:mx-0" />
                <p className="text-neutral-300 text-2xl leading-relaxed">
                  <strong>President:</strong> Rafa Adhitama
                </p>
                <p className="text-neutral-300 text-2xl leading-relaxed break-all">
                  <strong>Email:</strong> ppiawesternsydney@gmail.com
                </p>
                <p className="text-neutral-300 text-2xl leading-relaxed">
                  <strong>Social Platforms:</strong>
                </p>
                <div className="flex items-center gap-3 mt-2 flex-wrap justify-center md:justify-start">
                  <a
                    href="https://www.instagram.com/ppiawsu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded cursor-pointer transition-colors duration-200 hover:bg-red-500 group"
                  >
                    <FaInstagram
                      className="text-white transition-colors duration-200 group-hover:text-white"
                      size={60}
                    />
                    <span className="text-2xl text-neutral-300 transition-colors duration-200 group-hover:text-white">
                      Instagram
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* WesternUni Modal Overlay */}
      {isModalOpen && expandedPin === "western" && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl bg-neutral-900 rounded-xl overflow-hidden flex flex-col md:flex-row">
            {/* Left Text */}
            <div className="w-full md:w-1/3 p-6 text-white flex flex-col gap-4">
              <h3 className="text-3xl font-semibold">
                Western Sydney University, Parramatta NSW
              </h3>
              <p className="text-2xl">
                <strong>Building:</strong> Western Sydney University Parramatta
                Campus
              </p>
              <p className="text-2xl text-neutral-300">
                The Parramatta Campus of Western Sydney University stands as a
                vibrant, urban academic landmark—featuring cutting-edge learning
                spaces, modern architecture, and interactive student hubs that
                reflect Parramatta’s diverse, dynamic spirit and WSU’s
                commitment to city‑centric education.
              </p>
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-4 text-2xl bg-red-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-red-600 self-start"
              >
                <FiX size={40} /> Close
              </button>
            </div>
            {/* Right Model */}
            <div className="relative flex-1 h-[70vh]">
              <Canvas camera={{ position: [0, 15, 40] }}>
                <ambientLight intensity={1.1} />
                <directionalLight position={[2, 2, 2]} />
                <Suspense fallback={<Loader />}>
                  <WesternUniModel scale={5.25} position={[1, -25, -25]} />
                </Suspense>
                <OrbitControls enableZoom minDistance={15} maxDistance={70} />
              </Canvas>
            </div>
          </div>
        </div>
      )}

      {/* Sydney Info Panel */}
      {expandedPin === "sydney" && (
        <>
          {/* Info Panel */}
          <div className="fixed top-1/2 right-0 transform -translate-y-1/2 mr-[105px] z-50 w-full md:max-w-4xl">
            <div className="flex flex-col gap-4">
              <h2 className="text-red-500 text-5xl font-semibold text-center">
                Sydney CBD Branch
              </h2>

              {/* Tabs */}
              <div className="flex justify-center gap-2">
                {["uts", "usyd", "unsw"].map((uni) => (
                  <button
                    key={uni}
                    onClick={() =>
                      setSelectedUni(uni as "uts" | "usyd" | "unsw")
                    }
                    className={`px-4 py-2 rounded ${
                      selectedUni === uni
                        ? "bg-red-500 text-white"
                        : "bg-neutral-700 text-neutral-300"
                    }`}
                  >
                    {uni.toUpperCase()}
                  </button>
                ))}
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                {/* Model Box */}
                <div className="flex flex-col items-center w-full md:w-1/2 rounded p-4">
                  <div className="relative w-full aspect-square rounded-full border-8 border-neutral-600 overflow-hidden flex items-center justify-center">
                    <Canvas camera={{ position: [0, 15, 40] }}>
                      <ambientLight intensity={1} />
                      <directionalLight position={[2, 2, 2]} />
                      <Suspense fallback={null}>
                        {selectedUni === "uts" && <UTSModel />}
                        {selectedUni === "usyd" && <USYDModel />}
                        {selectedUni === "unsw" && <UNSWModel />}
                      </Suspense>
                      <OrbitControls
                        enableZoom
                        minDistance={15}
                        maxDistance={40}
                      />
                    </Canvas>
                  </div>
                  <button
                    className="mt-4 bg-neutral-100 text-black text-2xl px-4 py-2 rounded flex items-center gap-2 hover:bg-neutral-200"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Expand <FiMaximize2 />
                  </button>
                </div>

                {/* Info Box */}
                <div className="flex flex-col justify-center flex-1 min-w-[300px] md:min-w-[450px] rounded p-6 text-center md:text-left space-y-2">
                  {selectedUni === "uts" && (
                    <>
                      <h3 className="text-white text-4xl font-semibold">
                        PPIA University of Technology Sydney
                      </h3>
                      <hr className="border border-neutral-500 w-32 mx-auto md:mx-0" />
                      <p className="text-neutral-300 text-2xl leading-relaxed">
                        <strong>President:</strong> Nicholas Bevan
                      </p>
                      <p className="text-neutral-300 text-2xl leading-relaxed break-all">
                        <strong>Email:</strong>{" "}
                        president@ppia.activateuts.com.au
                      </p>
                      <p className="text-neutral-300 text-2xl leading-relaxed">
                        <strong>Social Platforms:</strong>
                      </p>
                      <div className="flex items-center gap-3 mt-2 flex-wrap justify-center md:justify-start">
                        <a
                          href="https://www.instagram.com/ppia.uts/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 rounded cursor-pointer transition-colors duration-200 hover:bg-red-500 group"
                        >
                          <FaInstagram
                            className="text-white transition-colors duration-200 group-hover:text-white"
                            size={60}
                          />
                          <span className="text-2xl text-neutral-300 transition-colors duration-200 group-hover:text-white">
                            Instagram
                          </span>
                        </a>
                      </div>
                    </>
                  )}
                  {selectedUni === "usyd" && (
                    <>
                      <h3 className="text-white text-4xl font-semibold">
                        PPIA University of Sydney
                      </h3>
                      <hr className="border border-neutral-500 w-32 mx-auto md:mx-0" />
                      <p className="text-neutral-300 text-2xl leading-relaxed">
                        <strong>President:</strong> Clifford Suryana
                      </p>
                      <p className="text-neutral-300 text-2xl leading-relaxed break-all">
                        <strong>Email:</strong> ppia.sydneyuni@gmail.com
                      </p>
                      <p className="text-neutral-300 text-2xl leading-relaxed">
                        <strong>Social Platforms:</strong>
                      </p>
                      <div className="flex items-center gap-3 mt-2 flex-wrap justify-center md:justify-start">
                        <a
                          href="https://www.instagram.com/ppiausyd/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 rounded cursor-pointer transition-colors duration-200 hover:bg-red-500 group"
                        >
                          <FaInstagram
                            className="text-white transition-colors duration-200 group-hover:text-white"
                            size={60}
                          />
                          <span className="text-2xl text-neutral-300 transition-colors duration-200 group-hover:text-white">
                            Instagram
                          </span>
                        </a>
                      </div>
                    </>
                  )}
                  {selectedUni === "unsw" && (
                    <>
                      <h3 className="text-white text-4xl font-semibold">
                        PPIA University of New South Wales
                      </h3>
                      <hr className="border border-neutral-500 w-32 mx-auto md:mx-0" />
                      <p className="text-neutral-300 text-2xl leading-relaxed">
                        <strong>President:</strong> Winston Ignatius Tjahjadi
                      </p>
                      <p className="text-neutral-300 text-2xl leading-relaxed break-all">
                        <strong>Email:</strong> unsw.ppia@gmail.com
                      </p>
                      <p className="text-neutral-300 text-2xl leading-relaxed">
                        <strong>Social Platforms:</strong>
                      </p>
                      <div className="flex items-center gap-3 mt-2 flex-wrap justify-center md:justify-start">
                        <a
                          href="https://www.instagram.com/ppiaunsw/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 rounded cursor-pointer transition-colors duration-200 hover:bg-red-500 group"
                        >
                          <FaInstagram
                            className="text-white transition-colors duration-200 group-hover:text-white"
                            size={60}
                          />
                          <span className="text-2xl text-neutral-300 transition-colors duration-200 group-hover:text-white">
                            Instagram
                          </span>
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Modal Overlay */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
              <div className="relative w-full max-w-6xl bg-neutral-900 rounded-xl overflow-hidden flex flex-col md:flex-row">
                {/* Left Text */}
                <div className="w-full md:w-1/3 p-6 text-white flex flex-col gap-4">
                  <h3 className="text-3xl font-semibold">
                    {selectedUni === "uts" && "University of Technology Sydney"}
                    {selectedUni === "usyd" && "University of Sydney"}
                    {selectedUni === "unsw" && "University of New South Wales"}
                  </h3>
                  <p className="text-2xl">
                    <strong>Building:</strong>{" "}
                    {selectedUni === "uts" && "UTS Library Building 2"}
                    {selectedUni === "usyd" && "Quadrangle Building"}
                    {selectedUni === "unsw" && "Main Library"}
                  </p>
                  <p className="text-2xl text-neutral-300">
                    {selectedUni === "uts" &&
                      "UTS Library’s Building 2 is a striking contemporary hub of knowledge and collaboration. Wrapped in a bold geometric façade, it reimagines the library as an open, light-filled space where flexible learning zones, quiet nooks, and cutting-edge digital resources converge. This dynamic building embodies UTS’s spirit of innovation, blending vibrant communal areas with contemplative spaces to inspire discovery."}
                    {selectedUni === "usyd" &&
                      "The University of Sydney Quadrangle is an iconic sandstone landmark blending Gothic Revival architecture with modern academic life. Its grand cloisters, intricate carvings, and leafy courtyards create an inspiring backdrop for learning, tradition, and discovery."}
                    {selectedUni === "unsw" &&
                      "The UNSW Main Library is a modern academic hub combining extensive digital resources with spacious study areas. Its sleek design, panoramic views, and collaborative zones reflect UNSW’s focus on innovation and student success."}
                  </p>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="mt-4 text-2xl bg-red-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-red-600 self-start"
                  >
                    <FiX size={40} /> Close
                  </button>
                </div>
                {/* Right Model */}
                <div className="relative flex-1 h-[70vh]">
                  <Canvas camera={{ position: [0, 15, 40] }}>
                    <ambientLight intensity={1.1} />
                    <directionalLight position={[2, 2, 2]} />
                    <Suspense fallback={<Loader />}>
                      {selectedUni === "uts" && (
                        <UTSModel scale={3.25} position={[0, -28, -25]} />
                      )}
                      {selectedUni === "usyd" && (
                        <USYDModel scale={0.9} position={[0, -15, -25]} />
                      )}
                      {selectedUni === "unsw" && (
                        <UNSWModel scale={4} position={[0, -15, -25]} />
                      )}
                    </Suspense>
                    <OrbitControls
                      enableZoom
                      minDistance={15}
                      maxDistance={70}
                    />
                  </Canvas>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
}
