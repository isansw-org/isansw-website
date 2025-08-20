"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";

export default function Home() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene & Camera
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(4, 2, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;

    // Tone mapping and brightness
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    container.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 1.0, 0);

    // Soft Reflections
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    scene.background = new THREE.Color("#fffbeb");

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.25));

    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(6, 8, 6);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.bias = -0.0001;
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xffffff, 0.8);
    fill.position.set(-6, 4, 4);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0xffffff, 0.7);
    rim.position.set(0, 6, -6);
    scene.add(rim);

    //Load GLTF
    let model: THREE.Object3D | null = null;
    const loader = new GLTFLoader();

    loader.load(
      "/models/warungmie.glb",
      (gltf) => {
        model = gltf.scene;

        // enable shadows and tame rough surfaces
        model.traverse((o) => {
          if (o instanceof THREE.Mesh) {
            o.castShadow = true;
            o.receiveShadow = true;
            const m = o.material as THREE.MeshStandardMaterial;
            if (m && !Array.isArray(m) && m.roughness !== undefined) {
              m.roughness = Math.min(0.9, m.roughness * 0.85);
            }
          }
        });

        // center at origin
        const b0 = new THREE.Box3().setFromObject(model);
        const c0 = b0.getCenter(new THREE.Vector3());
        const s0 = b0.getSize(new THREE.Vector3());
        model.position.sub(c0);

        const maxDim = Math.max(s0.x, s0.y, s0.z) || 1;
        model.scale.setScalar(2.2 / maxDim);

        const b1 = new THREE.Box3().setFromObject(model);
        model.position.y -= b1.min.y;

        // Initial offsets
        const INITIAL = { x: 1.0, y: -2.5, z: 1.5, yaw: 0.0 };
        model.position.x += INITIAL.x;
        model.position.y += INITIAL.y;
        model.position.z += INITIAL.z;
        model.rotation.y += INITIAL.yaw;

        scene.add(model);

        const size1 = b1.getSize(new THREE.Vector3());
        const maxSize = Math.max(size1.x, size1.y, size1.z) || 1;
        const fitH =
          maxSize / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) * 0.5));
        const fitW = fitH / (camera.aspect || 1);
        const distance = 1.25 * Math.max(fitH, fitW);

        const target = b1.getCenter(new THREE.Vector3());
        const dirVec = new THREE.Vector3()
          .subVectors(camera.position, controls.target)
          .normalize()
          .multiplyScalar(distance);

        controls.target.copy(target);
        camera.position.copy(target).add(dirVec);
        camera.near = maxSize / 100;
        camera.far = maxSize * 100;
        camera.updateProjectionMatrix();
        controls.update();
      },
      undefined,
      (err) => console.error("GLTF load error:", err)
    );

    //Resize
    const onResize = () => {
      const { clientWidth, clientHeight } = container;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(container);

    //Animation
    const clock = new THREE.Clock();
    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const dt = clock.getDelta();
      controls.update();
      if (model) model.rotation.y += 0.001; // tiny idle spin (optional)
      renderer.render(scene, camera);
    };
    animate();

    //Cleanup
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement))
        container.removeChild(renderer.domElement);
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material))
            obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
    };
  }, []);

  return (
    <section className="bg-amber-50">
      <Navbar />
      {/* Red header */}
      <main className="bg-red-500 text-amber-50 py-10 px-4 mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Our Sponsors</h1>
        <p className="text-lg font-semibold text-center mb-8">
          Be A Part of Something Bigger -- Support ISANSW
        </p>

        {/* stats row */}
        <section className="max-w-3xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {[
              { big: "1000+", smallTop: "Indonesian", smallBottom: "Students" },
              { big: "30k+", smallTop: "Social", smallBottom: "Reach" },
              { big: "50+", smallTop: "Sponsors &", smallBottom: "Partners" },
              { big: "15+", smallTop: "Annual", smallBottom: "Events" },
            ].map((s, i) => (
              <div
                key={i}
                className="rounded-2xl bg-amber-50 ring-1 ring-red-200 shadow-sm px-4 py-4 text-center"
              >
                <div className="text-red-600 font-extrabold text-4xl">
                  {s.big}
                </div>
                <div className="mt-3 text-[16px] font-semibold leading-4 text-red-500">
                  {s.smallTop}
                  <br />
                  {s.smallBottom}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      {/* soft divider */}
      <div className="h-3 bg-red-300" />,{/* headings */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-center text-red-600 text-2xl sm:text-3xl font-extrabold">
          Meet Our Current Sponsors
        </h2>
        <h3 className="mt-6 text-center text-red-600 text-lg sm:text-xl font-bold">
          Food Sponsors
        </h3>

        {/* sponsors grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-gray-300/70 rounded-md aspect-square" />
          ))}
        </div>
      </section>
      {/* Become a Partner Section */}
      <section className="max-w-6xl mx-auto px-4 mt-12 pb-14">
        <div className="rounded-xl border border-red-300">
          <div className="grid md:grid-cols-2 gap-6 p-4 md:p-6">
            {/* WarungMie Model */}
            <div className="rounded-lg overflow-hidden bg-black/5">
              <div
                ref={mountRef}
                className="aspect-video w-full min-h-[320px]"
              />
            </div>

            <div className="flex flex-col justify-center">
              <h4 className="text-3xl font-extrabold text-black">
                Want to Work with ISA NSW?
                <br className="hidden sm:block" />
                <span className="block">Let’s Make it Official!</span>
              </h4>
              <p className="mt-3 text-lg text-black/80 leading-relaxed">
                Partner with us to support vibrant student-led events, cultural
                festivals, and community impact across NSW. Let’s create
                something unforgettable — together.
              </p>
              <div className="mt-8">
                <a
                  href="/sponsors/partners"
                  className="inline-block rounded-full bg-red-500 text-amber-50 px-5 py-2 font-semibold shadow hover:bg-red-600 transition text-xl"
                >
                  Become a Partner
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </section>
  );
}
