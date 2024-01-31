import { World, world } from '@minecraft/server';

export function log(message: Parameters<World['sendMessage']>[0]): void {
  world.sendMessage(message);
}
