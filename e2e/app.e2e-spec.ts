import { NgBreadcrumbPage } from './app.po';

describe('ng-breadcrumb App', function() {
  let page: NgBreadcrumbPage;

  beforeEach(() => {
    page = new NgBreadcrumbPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
