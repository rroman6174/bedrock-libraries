import { Entity, World } from '@minecraft/server';
import { ReturnTypeOfClassMethod } from '@bedrock-libraries/common';

export interface DynamicPropertyGetter {
  getDynamicProperty: (
    identifier: string
  ) => ReturnTypeOfClassMethod<World, 'getDynamicProperty'>;
  setDynamicProperty: (
    identifier: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any
  ) => ReturnTypeOfClassMethod<World, 'setDynamicProperty'>;
}

export class DatabaseClient {
  constructor(private target: DynamicPropertyGetter) {}

  isValid() {
    if (this.target instanceof World) {
      return true;
    } else if (this.target instanceof Entity) {
      return this.target.isValid();
    } else {
      return false;
    }
  }
  getDynamicProperty<T>(identifier: string): T | undefined {
    let value;
    try {
      value = this.target.getDynamicProperty(identifier) as string;
      return JSON.parse(value) as T;
    } catch (error) {
      return undefined;
    }
  }
  setDynamicProperty<T>(
    identifier: string,
    value: T
  ): ReturnTypeOfClassMethod<World, 'setDynamicProperty'> {
    this.target.setDynamicProperty(identifier, JSON.stringify(value));
  }
}
