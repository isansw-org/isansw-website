// app/sponsors/page.tsx
"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";

type Sponsor = {
  src: string | StaticImageData;
  name: string;
  href?: string;
};

const isExternal = (href?: string) => !!href && /^https?:\/\//i.test(href);

const SPONSORS: Sponsor[] = [
  { src: "/image/little_IndoTown.png", name: "Little IndoTown" },
  { src: "/image/dapurSate.png", name: "Dapur Sate" },
  { src: "/image/kenanganCoffee.png", name: "Kenangan Coffee" },
  { src: "/image/bintangBro.png", name: "Bintang Bro" },
  { src: "/image/sweetRepublic.png", name: "Sweet Republic" },
  { src: "/image/dedyCafe.png", name: "Dedy Cafe" },
  { src: "/image/viciousCycle.jpg", name: "Vicious Cycle" },
  { src: "/image/ayamGoreng99.png", name: "Ayam Goreng 99" },
  { src: "/image/squidPocha.png", name: "Squid Pocha" },
  { src: "/image/wooTea.png", name: "Woo Tea" },
  { src: "/image/escapeHunt.jpg", name: "Escape Hunt" },
  { src: "/image/quizRoom.jpg", name: "Quiz Room" },
  { src: "/image/virtualRoom.png", name: "Virtual Room" },
  { src: "/image/geprekInAustralia.jpg", name: "Geprek In Australia" },
  { src: "/image/innitCafe.png", name: "Innit Cafe" },
];

function SponsorCard({
  src,
  name,
  href,
  size = 128,
}: Sponsor & { size?: number }) {
  const Tile = (
    <div
      className="relative group/card flex items-center justify-center rounded-xl bg-white shadow ring-1 ring-black/5 focus-within:ring-2 focus-within:ring-red-500"
      style={{ width: size, height: size }}
      aria-label={name}
    >
      <Image
        src={src}
        alt={name}
        width={Math.round(size * 0.75)}
        height={Math.round(size * 0.75)}
        className="h-3/4 w-auto object-contain"
      />

      {/* Tooltip */}
      <span
        className="pointer-events-none absolute bottom-full left-1/2 z-10 -translate-x-1/2 translate-y-1 rounded-md bg-black px-2 py-1 text-xs text-white opacity-0 shadow-sm ring-1 ring-black/20 transition duration-150 ease-out whitespace-nowrap group-hover/card:opacity-100 group-hover/card:translate-y-0"
        role="tooltip"
      >
        {name}
      </span>
    </div>
  );

  if (!href) return Tile;

  return isExternal(href) ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${name}`}
    >
      {Tile}
    </a>
  ) : (
    <Link href={href} aria-label={`Open ${name}`}>
      {Tile}
    </Link>
  );
}

function SponsorsGrid({
  sponsors,
  size = 128,
}: {
  sponsors: Sponsor[];
  size?: number;
}) {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {sponsors.map((s, i) => (
        <SponsorCard key={`${s.name}-${i}`} {...s} size={size} />
      ))}
    </div>
  );
}

function LogoMarquee({ sponsors }: { sponsors: Sponsor[] }) {
  const strip = [...sponsors, ...sponsors]; // duplicate for seamless loop
  return (
    <div className="relative overflow-hidden">
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-amber-50 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-amber-50 to-transparent" />

      <div className="marquee-track flex min-w-max gap-8 will-change-transform py-6">
        {strip.map((s, i) => (
          <div key={i} className="shrink-0">
            <SponsorCard {...s} size={112} />
          </div>
        ))}
      </div>

      <style jsx>{`
        .marquee-track {
          animation: sponsors-scroll 48s linear infinite;
          animation-play-state: running;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes sponsors-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

function ModelViewer({
  src = "/models/warungmie.glb",
  background = "#fffbeb",
}: {
  src?: string;
  background?: string;
}) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(background);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(4, 2, 5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Pause crashes on context lost
    const preventLost = (e: Event) => e.preventDefault();
    renderer.domElement.addEventListener(
      "webglcontextlost",
      preventLost,
      false
    );

    // Controls (disabled by default; toggle if you want interaction)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enabled = false;
    controls.enableDamping = true;
    controls.target.set(0, 1.0, 0);

    // Environment
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envRT.texture;

    // Lights
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

    // Load GLTF
    let model: THREE.Object3D | null = null;
    const loader = new GLTFLoader();
    loader.load(
      src,
      (gltf) => {
        model = gltf.scene;

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

        // Center + scale nicely
        const b0 = new THREE.Box3().setFromObject(model);
        const c0 = b0.getCenter(new THREE.Vector3());
        const s0 = b0.getSize(new THREE.Vector3());
        model.position.sub(c0);
        const maxDim = Math.max(s0.x, s0.y, s0.z) || 1;
        model.scale.setScalar(2.2 / maxDim);

        // Sit on "ground"
        const b1 = new THREE.Box3().setFromObject(model);
        model.position.y -= b1.min.y;

        // Artistic offset
        const INITIAL = { x: 1.0, y: -2.5, z: 1.5, yaw: 0.0 };
        model.position.x += INITIAL.x;
        model.position.y += INITIAL.y;
        model.position.z += INITIAL.z;
        model.rotation.y += INITIAL.yaw;

        scene.add(model);

        // Frame camera
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

    // Resize
    const onResize = () => {
      const { clientWidth, clientHeight } = container;
      camera.aspect = (clientWidth || 1) / (clientHeight || 1);
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(container);

    // Animate
    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      controls.update();
      if (model) model.rotation.y += 0.001; // tiny idle spin
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.domElement.removeEventListener("webglcontextlost", preventLost);
      controls.dispose();
      renderer.dispose();
      envRT.dispose();
      pmrem.dispose();
      if (container.contains(renderer.domElement))
        container.removeChild(renderer.domElement);
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material))
            obj.material.forEach((m) => m.dispose());
          else obj.material?.dispose();
        }
      });
    };
  }, [src, background]);

  return <div ref={mountRef} className="aspect-video w-full min-h-[320px]" />;
}

export default function SponsorsPage() {
  return (
    <section className="bg-amber-50 text-black">
      <Navbar />

      {/* Hero */}
      <header className="bg-gradient-to-b from-red-600 to-orange-400 text-amber-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h1 className="text-center text-4xl font-extrabold sm:text-5xl">
            Sponsors & Partners
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg opacity-95">
            We’re grateful to our sponsors who help us bring cultural events and
            opportunities to Indonesian students across NSW.
          </p>

          {/* value stats */}
          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { big: "1000+", small: ["Indonesian", "Students"] },
              { big: "5k+", small: ["Monthly", "Reach"] },
              { big: "15", small: ["Sponsors &", "Partners"] },
              { big: "15+", small: ["Annual", "Events"] },
            ].map((s, i) => (
              <div
                key={i}
                className="rounded-2xl bg-amber-50/95 px-4 py-4 text-center shadow ring-1 ring-red-200"
              >
                <div className="text-3xl font-extrabold text-red-600">
                  {s.big}
                </div>
                <div className="mt-2 text-sm font-semibold leading-4 text-red-500">
                  {s.small[0]}
                  <br />
                  {s.small[1]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* marquee */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-center text-2xl font-extrabold text-red-600">
          Featured Sponsors
        </h2>
        <div className="mt-4">
          <LogoMarquee sponsors={SPONSORS} />
        </div>
      </section>

      {/* main grid */}
      <section className="mx-auto max-w-6xl px-4 pb-10">
        <h3 className="text-center text-xl font-extrabold text-red-600">
          All Sponsors
        </h3>
        <p className="mt-2 text-center text-stone-700">
          Explore the brands and partners supporting ISA NSW.
        </p>

        <div className="mt-6">
          <SponsorsGrid sponsors={SPONSORS} />
        </div>
      </section>

      {/* Become a Partner + 3D Model */}
      <section className="max-w-6xl mx-auto px-4 pb-14">
        <div className="rounded-xl border border-red-300">
          <div className="grid md:grid-cols-2 gap-6 p-4 md:p-6">
            {/* 3D model viewer */}
            <div className="rounded-lg overflow-hidden bg-black/5">
              <ModelViewer src="/models/warungmie.glb" background="#fffbeb" />
            </div>

            {/* CTA */}
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
