import {MinecraftItem} from "./MinecraftItem";

export class Kit {

  constructor(private name: string, private delay: number, private minecraftItems: Array<MinecraftItem>) {
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getDelay(): number {
    return this.delay;
  }

  setDelay(delay: number): void {
    this.delay = delay;
  }

  getItems(): Array<MinecraftItem> {
    return this.minecraftItems;
  }
}
