import { Vector3Builder } from '@minecraft/math';

export function cross(
  vector1: { x: number; y: number; z: number },
  vector2: { x: number; y: number; z: number }
) {
  const v1 = new Vector3Builder(vector1);
  const v2 = new Vector3Builder(vector2);
  return v1.cross(v2);
}
