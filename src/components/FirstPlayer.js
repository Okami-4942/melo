import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';

const WALK_SPEED = 4.2;
const EYE_HEIGHT = 1.6;

function FirstPlayer() {
  const { camera } = useThree();
  const pressedKeys = useRef({});

  // 毎フレーム新しいVector3を作ると無駄が増えるため、使い回します。
  const vectors = useMemo(
    () => ({
      forward: new Vector3(),
      right: new Vector3(),
      move: new Vector3(),
      worldUp: new Vector3(0, 1, 0),
    }),
    []
  );

  useEffect(() => {
    function handleKeyDown(event) {
      pressedKeys.current[event.code] = true;
    }

    function handleKeyUp(event) {
      pressedKeys.current[event.code] = false;
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame((_, delta) => {
    const keys = pressedKeys.current;

    vectors.forward.set(0, 0, 0);
    camera.getWorldDirection(vectors.forward);
    vectors.forward.y = 0;
    vectors.forward.normalize();

    vectors.right.crossVectors(vectors.forward, vectors.worldUp).normalize();
    vectors.move.set(0, 0, 0);

    if (keys.KeyW || keys.ArrowUp) {
      vectors.move.add(vectors.forward);
    }

    if (keys.KeyS || keys.ArrowDown) {
      vectors.move.sub(vectors.forward);
    }

    if (keys.KeyA || keys.ArrowLeft) {
      vectors.move.sub(vectors.right);
    }

    if (keys.KeyD || keys.ArrowRight) {
      vectors.move.add(vectors.right);
    }

    if (vectors.move.lengthSq() > 0) {
      vectors.move.normalize().multiplyScalar(WALK_SPEED * delta);
      camera.position.add(vectors.move);
    }

    // まずは平らな床を歩く土台なので、上下位置は固定します。
    camera.position.y = EYE_HEIGHT;
  });

  return null;
}

export default FirstPlayer;