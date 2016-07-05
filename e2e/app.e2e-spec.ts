import { MarinetWebPage } from './app.po';

describe('marinet-web App', function() {
  let page: MarinetWebPage;

  beforeEach(() => {
    page = new MarinetWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
