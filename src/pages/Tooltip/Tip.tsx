import { useThree, useFrame } from '@react-three/fiber';
import { Stats, OrbitControls, Text } from '@react-three/drei';
import { FC, forwardRef, memo, useEffect, useRef, useState } from 'react';
import { Mesh } from 'three';
interface TooltipProps {}
const Tip: FC<TooltipProps> = forwardRef((props, ref) => {
  const { camera } = useThree();
  const offset = 0.1;
  const [widthPanel, setWidthPanel] = useState(2 + 2 * offset);
  const [heightPanel, setHeightPanel] = useState(1 + 2 * offset);
  const [enableTooltip, setEnableTooltip] = useState(false);
  const panelRef = useRef<Mesh>();
  const textRef = useRef<Mesh>();
  const json = {
    id: '1232-123213-3213-321',
    videoTime: 0.234,
    text: 'test',
    url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.happets.com%2Fblog%2Fal-agua-perros-guia-de-playas-dogfriendly-en-espana%2F&psig=AOvVaw2EL_GC31398regewQDSW_s&ust=1621521118150000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLDu8oP71fACFQAAAAAdAAAAABAD',
  };
  const text = Object.keys(json)
    .map((key) => `'${key}': ${json[key]}`)
    .join('\n');

  useFrame(() => {
    panelRef.current?.lookAt(camera.position);
    const offsetX = 1;
    const { x, y, z } = ref?.current?.position || {};
    panelRef?.current?.position.set(x + offsetX, y, z);
  });

  useEffect(() => {
    const checkTextRenderer = setInterval(() => {
      if (!textRef.current) {
        return;
      }
      const { max, min } = textRef.current.geometry.boundingBox;

      const heightText = max.y - min.y;
      if (isFinite(heightText)) {
        clearInterval(checkTextRenderer);
        if (heightText > heightPanel - 2 * offset) {
          setHeightPanel(heightText + offset * 2);
        }
      }
    }, 200);

    return () => {
      clearInterval(checkTextRenderer);
    };
  }, [textRef]);

  useEffect(() => {
    if (panelRef && panelRef.current) {
      panelRef.current.visible = enableTooltip;
    }
  }, [enableTooltip]);

  const onPointerOver = () => {
    setEnableTooltip(true);
  };

  const onPointerLeave = () => {
    setEnableTooltip(false);
  };

  return (
    <>
      <mesh {...props} ref={ref} onPointerOver={onPointerOver} onPointerLeave={onPointerLeave}>
        <torusGeometry args={[1, 0.5]} />
        <meshStandardMaterial roughness={0.75} emissive="#1e1bc9" />
      </mesh>
      <mesh ref={panelRef}>
        <planeGeometry args={[widthPanel, heightPanel]} />
        <meshStandardMaterial roughness={0.75} color="#202035" />
        <Text
          ref={textRef}
          color={'#EC2D2D'}
          fontSize={0.1}
          maxWidth={widthPanel - 2 * offset}
          lineHeight={1.5}
          letterSpacing={0.02}
          textAlign={'left'}
          position={[0, 0, 0.01]}
          overflowWrap="break-word"
          whiteSpace="overflowWrap"
        >
          {text}
        </Text>
      </mesh>
    </>
  );
});
export default Tip;
