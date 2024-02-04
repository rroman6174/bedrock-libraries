import { Dimension, Vector3 } from '@minecraft/server';
import { Vector3Builder } from '@minecraft/math';
import { generateRandomString } from './random';

type structureSaveType = 'memory' | 'disk';

export class StructureManager {
  constructor(
    private dimension: Dimension,
    private saveType: structureSaveType
  ) {}
  async saveStructure(
    sturctureName: string,
    startLocation: Vector3,
    endLocation: Vector3,
    dimensionOverride?: Dimension
  ) {
    const { successCount } = await (
      dimensionOverride || this.dimension
    ).runCommandAsync(
      `structure save ${sturctureName} ${new Vector3Builder(
        startLocation
      ).toString({ delimiter: ' ' })} ${new Vector3Builder(
        endLocation
      ).toString({
        delimiter: ' ',
      })} ${this.saveType}`
    );
    if (successCount > 0) {
      return true;
    } else {
      return false;
    }
  }
  async loadStructure(
    sturctureName: string,
    location: Vector3,
    dimensionOverride?: Dimension
  ) {
    const { successCount } = await (
      dimensionOverride || this.dimension
    ).runCommandAsync(
      `structure load ${sturctureName} ${new Vector3Builder(location).toString({
        delimiter: ' ',
      })}`
    );
    if (successCount > 0) {
      return true;
    } else {
      return false;
    }
  }
  async deleteStructure(sturctureName: string) {
    return await this.dimension.runCommandAsync(
      `structure delete ${sturctureName}`
    );
  }
  async saveStructureWithUniqueId(
    startLocation: Vector3,
    endLocation: Vector3,
    dimensionOverride?: Dimension
  ) {
    const id = generateRandomString();
    return (await this.saveStructure(
      id,
      startLocation,
      endLocation,
      dimensionOverride
    ))
      ? id
      : undefined;
  }
}
