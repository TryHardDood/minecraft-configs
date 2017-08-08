import {EssentialsXConfigOption} from "./EssentialsXConfigOption";
export class EssentialsXGroup {
  constructor(private title: string, private items: Array<EssentialsXConfigOption>) {
  }

  getTitle(): string {
    return this.title;
  }

  getItems(): Array<EssentialsXConfigOption> {
    return this.items;
  }
}
