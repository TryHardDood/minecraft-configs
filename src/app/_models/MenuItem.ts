export class MenuItem {
  constructor(private title: string, private url: string, private icon: string) {
  }

  getTitle(): string {
    return this.title;
  }

  getURL(): string {
    return this.url;
  }

  getIcon(): string {
    return this.icon;
  }

}
