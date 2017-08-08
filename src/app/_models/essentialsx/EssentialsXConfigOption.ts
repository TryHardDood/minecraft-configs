export class EssentialsXConfigOption {
  constructor(private title: string, private defaultValue: any, private type: string,  private hints: Array<string>) {
  }

  getTitle(): string {
    return this.title;
  }

  getDefaultValue(): any {
    return this.defaultValue;
  }

  getType(): string {
    return this.type;
  }

  getHints(): Array<string> {
    return this.hints;
  }
}
