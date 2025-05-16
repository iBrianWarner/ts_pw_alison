import { test as base } from '@pw_tests/workerScopeFixtures';
import { HomePage } from '@/web_ui/pages/Home/HomePage';
import { SearchResultsPage } from '@/web_ui/pages/Search/SearchResultsPage';
import { CoursePage } from '@/web_ui/pages/Courses/CoursePage';
import { JS_APPLICATION_PROGRAMMING_COURSE } from '@/common/constants/course.constants';
import { TopicPage } from '@/web_ui/pages/Courses/TopicPage';

export const test = base.extend<{
  homePage: HomePage;
  searchResultsPage: SearchResultsPage;
  coursePage: CoursePage;
  topicPage: TopicPage;
  testData: {
    query: string;
    course: {
      name: string;
      slug: string;
      description: string;
      firstTopic: {
        id: number;
        slug: string;
      };
    };
    user: {
      email: string;
      password: string;
    };
  };
}>({
  homePage: [
    async ({ page }, use) => {
      const homePage = new HomePage(page);

      await use(homePage);
    },
    { scope: 'test' },
  ],
  searchResultsPage: [
    async ({ page, testData }, use) => {
      const searchResultsPage = new SearchResultsPage(page, testData.query);

      await use(searchResultsPage);
    },
    { scope: 'test' },
  ],
  coursePage: [
    async ({ page, testData }, use) => {
      const coursePage = new CoursePage(page, testData.course.slug);

      await use(coursePage);
    },
    { scope: 'test' },
  ],
  topicPage: [
    async ({ page, testData }, use) => {
      const topicPage = new TopicPage({
        page,
        topicId: testData.course.firstTopic.id,
        topicSlug: testData.course.firstTopic.slug,
      });

      await use(topicPage);
    },
    { scope: 'test' },
  ],
  testData: [
    async ({}, use) => {
      const testData = {
        query: 'JavaScript',
        course: JS_APPLICATION_PROGRAMMING_COURSE,
        user: {
          email: process.env.QA_PROD_USER_EMAIL,
          password: process.env.QA_PROD_USER_PASSWORD,
        },
      };

      await use(testData);
    },
    { scope: 'test' },
  ],
});

export { expect } from '@playwright/test';
