import { StudentFrontendAngularV1Page } from './app.po';

describe('student-frontend-angular-v1 App', () => {
  let page: StudentFrontendAngularV1Page;

  beforeEach(() => {
    page = new StudentFrontendAngularV1Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
