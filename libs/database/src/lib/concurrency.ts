import { DatabaseClient, DynamicPropertyGetter } from './database';
import { constructId } from '@bedrock-libraries/common';
import { world } from '@minecraft/server';

export class Counter {
  private dbHandle: DatabaseClient;
  private namespacedId: string;

  constructor(counterId: string, target?: DynamicPropertyGetter) {
    this.dbHandle = new DatabaseClient(target || world);
    this.namespacedId = constructId('counter', counterId);
  }
  public get currentCount(): number {
    return (this.dbHandle.getDynamicProperty(this.namespacedId) as number) || 0;
  }
  nextCounterValue(): number {
    const nextCounterValue = this.currentCount + 1;
    this.dbHandle.setDynamicProperty(this.namespacedId, nextCounterValue);
    return nextCounterValue;
  }
}
