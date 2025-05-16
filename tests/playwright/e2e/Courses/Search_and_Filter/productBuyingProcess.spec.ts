import { CourseType } from '@/common/typedefs/course.typedefs';
import { test } from '@pw_tests/testScopeFixtures';

test.describe('Alison platform', () => {
  test('should provide ability to search for course and filter results', async ({
    homePage,
    searchResultsPage,
    testData: { query },
  }) => {
    await homePage.visit();
    await homePage.search.searchForCourseAndPressEnter(query);
    await searchResultsPage.assertOpened();

    await searchResultsPage.assertNumberOfResultsIsVisible(58);
    await searchResultsPage.courseCard.assertCertificatesAreMostRelevant();
    await searchResultsPage.filtersForm.clickCourseTypeFilter();
    await searchResultsPage.filtersForm.assertCertificateTypeCheckboxVisible(
      CourseType.Diploma,
    );
    await searchResultsPage.filtersForm.clickOnCertificateTypeCheckbox(
      CourseType.Diploma,
    );
    await searchResultsPage.assertNumberOfResultsIsVisible(5);
    await searchResultsPage.courseCard.assertDiplomasAreMostRelevant();
  });
});
