import { CourseNavigationBarItem } from '@/common/typedefs/course.typedefs';
import { test } from '@pw_tests/testScopeFixtures';

test.describe('Course page', () => {
  test('should provide course details and ability to start learning', async ({
    searchResultsPage,
    coursePage,
    topicPage,
    testData: { course, user },
  }) => {
    await searchResultsPage.visit();
    await searchResultsPage.courseCard.clickOnCourseCard(course.name);

    await coursePage.assertOpened();
    await coursePage.courseDetailsCard.assertVisible();
    await coursePage.courseDetailsCard.assertCourseDetailsCardScreenshot({
      fileName: 'courseDetailsCard',
    });
    await coursePage.assertCourseDescription(course.description);
    await coursePage.courseNavigationBar.clickOnCourseNavigationBarItem(
      CourseNavigationBarItem.CourseDetails,
    );
    await coursePage.assertCourseDetailsIsInViewport();
    await coursePage.courseNavigationBar.clickOnCourseNavigationBarItem(
      CourseNavigationBarItem.AlisonCertificates,
    );
    await coursePage.assertCertificatesIsInViewport();
    await coursePage.clickStartLearningButton();
    await coursePage.signInForm.assertVisible();
    await coursePage.signInForm.fillLoginFormAndPressEnter({
      email: user.email,
      password: user.password,
    });
    await topicPage.assertOpened();
  });
});
