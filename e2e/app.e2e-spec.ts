import { CourseRegisClientPage } from './app.po';

describe('course-regis-client App', function() {
  let page: CourseRegisClientPage;

  beforeEach(() => {
    page = new CourseRegisClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
