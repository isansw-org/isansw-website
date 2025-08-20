"use client";

import { useGLTF, OrbitControls, Html } from "@react-three/drei";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { useSpring, animated } from "@react-spring/three";

function cloneGltfWithUniqueMaterials(gltf) {
  const cloned = gltf.scene.clone(true);
  cloned.traverse((node) => {
    if (node.isMesh && node.material) {
      node.material = node.material.clone();
    }
  });
  return cloned;
}

export default function Experience(props) {
  const { expandedPin, setExpandedPin, isModalOpen } = props;

  const nswmap = useGLTF("/models/nswmap.glb");
  const pindrop = useGLTF("/models/pindrop.glb");

  const nswMapRef = useRef();
  const originalColors = useRef(new Map());
  const pinRefs = useRef({});

  const [active, setActive] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hoveredPin, setHoveredPin] = useState(null);
  const [clickedPin, setClickedPin] = useState(null);
  const [pinOffsets, setPinOffsets] = useState({});

  const clonedPinObjects = useMemo(() => {
    const cloned = {};
    ["macquarie", "sydney", "wollongong", "newcastle", "western"].forEach(
      (id) => {
        cloned[id] = cloneGltfWithUniqueMaterials(pindrop);
      }
    );
    return cloned;
  }, [pindrop]);

  const transformPresets = {
    default: {
      position: [-4.4, 1.1, 4.5],
      rotation: [0, -2.15, 0.45],
      scale: [1.6, 1.6, 1.6],
    },
  };

  const [position, setPosition] = useState(transformPresets.default.position);
  const [rotation, setRotation] = useState(transformPresets.default.rotation);
  const [scale, setScale] = useState(transformPresets.default.scale);

  const springPosition = useSpring({
    position,
    config: { mass: 1, tension: 170, friction: 26 },
  });
  const springRotation = useSpring({
    rotation,
    config: { mass: 1, tension: 170, friction: 26 },
  });
  const springScale = useSpring({
    scale,
    config: { mass: 1, tension: 170, friction: 26 },
  });

  const pins = [
    { id: "macquarie", label: "Macquarie", endPosition: [-3.629, 2.765, 5.5] },
    { id: "sydney", label: "Sydney", endPosition: [-3.675, 2.7295, 5.5] },
    { id: "wollongong", label: "Wollongong", endPosition: [-3.7, 2.65, 5.5] },
    { id: "newcastle", label: "Newcastle", endPosition: [-3.69, 2.83, 5.5] },
    { id: "western", label: "Western Sydney", endPosition: [-3.765, 2.79, 5.5] },
  ];

  const labelOffsetsMap = {
    macquarie: [-0.255, 0.04, 0],
    sydney: [-0.235, 0.04, 0],
    wollongong: [-0.23, 0.075, 0],
    newcastle: [-0.205, -0.03, -0.05],
    western: [-0.19, 0.02, 0],
  };

  const pinSprings = pins.map((pin, index) =>
    useSpring({
      to: {
        scale:
          active && (!expandedPin || expandedPin === pin.id)
            ? [0.007, 0.007, 0.007]
            : [0, 0, 0],
      },
      config: { tension: 180, friction: 15 },
      delay: 100 + index * 100,
    })
  );

  const pinPositionSprings = pins.map((pin) =>
    useSpring({
      position: [
        pin.endPosition[0] + (pinOffsets[pin.id]?.[0] || 0),
        pin.endPosition[1] + (pinOffsets[pin.id]?.[1] || 0),
        pin.endPosition[2] + (pinOffsets[pin.id]?.[2] || 0),
      ],
      config: { tension: 180, friction: 20 },
    })
  );

  const pinRotationSprings = pins.map((pin) =>
    useSpring({
      to: async (next) => {
        if (!active) {
          await next({ rotation: [0, 0, 0] });
        } else if (clickedPin === pin.id) {
          await next({ rotation: [0.5, 0.5, 0] });
        } else {
          await next({ rotation: [0.1, 0.1, 0] });
        }
      },
      config: { tension: 120, friction: 12 },
    })
  );

  useEffect(() => {
    pins.forEach((pin) => {
      const group = pinRefs.current[pin.id];
      if (group) {
        group.traverse((child) => {
          if (child.isMesh) {
            const key = `${pin.id}-${child.uuid}`;
            if (!originalColors.current.has(key)) {
              originalColors.current.set(key, child.material.color.clone());
            }
            if (hoveredPin === pin.id || clickedPin === pin.id) {
              child.material.color.set("#FFD700");
            } else {
              const orig = originalColors.current.get(key);
              if (orig) child.material.color.copy(orig);
            }
          }
        });
      }
    });
  }, [hoveredPin, clickedPin]);

  useEffect(() => {
    nswmap.scene.traverse((child) => {
      if (child.isMesh && child.material) {
        const materials = Array.isArray(child.material)
          ? child.material
          : [child.material];
        materials.forEach((mat, i) => {
          if (mat?.color) {
            const key = `${child.uuid}-${i}`;
            if (!originalColors.current.has(key)) {
              originalColors.current.set(key, mat.color.clone());
            }
            if (active) {
              mat.color.set("#ff0000");
            } else if (hovered) {
              mat.color.set("#ff6a00");
            } else {
              const origColor = originalColors.current.get(key);
              if (origColor) mat.color.copy(origColor);
            }
          }
        });
      }
    });
  }, [hovered, active, nswmap]);

  const handleClick = () => {
    if (active) return;
    setActive(true);
    setPosition([position[0] - 0.7, position[1] + 0.4, position[2] + 0.5]);
  };

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} />
      <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />

      <animated.primitive
        ref={nswMapRef}
        object={nswmap.scene}
        position={springPosition.position}
        rotation={springRotation.rotation}
        scale={springScale.scale}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (expandedPin) {
            setExpandedPin(null);
            setClickedPin(null);
            setPosition(transformPresets.default.position);
            setRotation(transformPresets.default.rotation);
            setScale(transformPresets.default.scale);
            setPinOffsets({});
            setActive(false);
          } else {
            handleClick();
          }
        }}
      />

      {/* Floating NSW Label */}
      {!active && (
        <Html position={[position[0] + 1.35, position[1] + 1.7, position[2]]} distanceFactor={3} center>
          <div style={{
            whiteSpace: "nowrap",
            background: "fffbeb",
            padding: "8px 12px",
            borderRadius: "6px",
            fontSize: "14px",
            color: "black",
            fontWeight: "600",
            display: "inline-block"
          }}>
            Click on the NSW map to start exploring universities <br />and see where each campus is located.
          </div>
        </Html>
      )}

      {active && !expandedPin && (
        <Html position={[position[0] + 2.2, position[1] + 0.4, position[2]]} distanceFactor={3.3} center>
          <div style={{
            whiteSpace: "nowrap",
            background: "fffbeb",
            padding: "8px 12px",
            borderRadius: "6px",
            fontSize: "14px",
            color: "black",
            fontWeight: "600",
            display: "inline-block"
          }}>
            Click to explore every area and <br />discover PPIA stories from <br /> Indonesian students across <br />NSW!
          </div>
        </Html>
      )}

      {/* RESET BUTTON */}
      {active && (
        <Html position={[position[0] + 4, position[1] + 1.4, position[2]]} distanceFactor={3.5} center>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActive(false);
              setExpandedPin(null);
              setClickedPin(null);
              setPosition(transformPresets.default.position);
              setRotation(transformPresets.default.rotation);
              setScale(transformPresets.default.scale);
              setPinOffsets({});
            }}
            style={{
              background: "red",
              color: "white",
              padding: "8px 12px",
              borderRadius: "6px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            Reset
          </button>
        </Html>
      )}

      {pins.map((pin, i) => {
        const labelOffsets =
          clickedPin === pin.id ? labelOffsetsMap[pin.id] || [0, 0, 0] : [0, 0, 0];

        return (
          <React.Fragment key={pin.id}>
            <animated.group
              ref={(ref) => (pinRefs.current[pin.id] = ref)}
              position={pinPositionSprings[i].position}
              rotation={pinRotationSprings[i].rotation}
              scale={pinSprings[i].scale}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoveredPin(pin.id);
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                setHoveredPin(null);
              }}
              onClick={(e) => {
                e.stopPropagation();
                setClickedPin(pin.id);
                setExpandedPin(pin.id);
                setPosition([-5.25, 1.5, 4.75]);
                setScale([1.5, 1.5, 1.5]);

                const offsets = {
                  macquarie: [-0.26, 0.04, 0],
                  sydney: [-0.24, 0.04, 0],
                  wollongong: [-0.24, 0.08, 0],
                  newcastle: [-0.22, -0.01, 0],
                  western: [-0.2, 0.02, 0],
                };
                setPinOffsets((prev) => ({
                  ...prev,
                  [pin.id]: offsets[pin.id] || [0, 0, 0],
                }));
              }}
            >
              <primitive object={clonedPinObjects[pin.id]} />
            </animated.group>

            {active && !isModalOpen && (!expandedPin || expandedPin === pin.id) && (
              <Html
                position={[
                  pin.endPosition[0] + labelOffsets[0],
                  pin.endPosition[1] + 0.05 + labelOffsets[1],
                  pin.endPosition[2] + labelOffsets[2],
                ]}
                center
                distanceFactor={3}
              >
                <div className="bg-gray-700 bg-opacity-60 border border-white/15 text-white px-0.5 py-0.5 rounded text-[4px] whitespace-nowrap">
                  {pin.label}
                </div>
              </Html>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
}
