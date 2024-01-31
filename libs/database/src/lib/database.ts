import { Player, World } from '@minecraft/server';

export class DatabaseClient {
  constructor(private target: World | Player) {}

  isValid() {
    if (this.target instanceof World) {
      return true;
    } else {
      return false;
    }
  }
}
