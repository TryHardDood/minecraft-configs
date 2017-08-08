export class MinecraftEnchantment {
  constructor(private type: number, private level: number, private name: string, private text_type: string) {
  }

  getType(): number {
    return this.type;
  }

  getLevel(): number {
    return this.level;
  }

  setLevel(level: number): void {
    this.level = level;
  }

  getName(): string {
    return this.name;
  }

  getTextType(): string {
    return this.text_type;
  }

  public toString = () : string => {
    return this.text_type + ":" + this.level;
  }
}
