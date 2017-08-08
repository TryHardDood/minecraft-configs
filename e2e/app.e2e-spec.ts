import { MinecraftConfigsPage } from './app.po';

describe('minecraft-configs App', () => {
  let page: MinecraftConfigsPage;

  beforeEach(() => {
    page = new MinecraftConfigsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
