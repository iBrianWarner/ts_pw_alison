import { Page, test, expect } from '@playwright/test';
import { ROUTES } from '@/web_ui/routes.constants';
import { BasePage } from '@/web_ui/pages/BasePage';
import { CourseDetailsCard } from '@/web_ui/components/Course/CourseDetailsCard';
import { UiElementsHelper } from '@/web_ui/components/Helpers/UiElementsHelpers';
import { CourseNavigationBar } from '@/web_ui/components/Course/CourseNavigationBar';
import { SignInForm } from '@/web_ui/components/Forms/SignInForm';

export class CoursePage extends BasePage {
  public readonly url: string;

  public readonly elementsHelper = new UiElementsHelper(this.page);

  public readonly courseDetailsCard = new CourseDetailsCard(this.page);

  public readonly courseNavigationBar = new CourseNavigationBar(this.page);

  public readonly signInForm = new SignInForm(this.page);

  private readonly courseDescription =
    this.elementsHelper.getElementByClass('course-description');

  private readonly courseDetail =
    this.elementsHelper.getElementById('course-details');

  private readonly certificates =
    this.elementsHelper.getElementById('certificates');

  private readonly startLearningButton = this.elementsHelper
    .getElementByClass('l-card__info-wrapper')
    .getByText('Start Learning');

  constructor(page: Page, courseSlug: string) {
    super(page);
    this.url = ROUTES.course(courseSlug);
  }

  async assertCourseDescription(description: string): Promise<void> {
    await test.step('Assert course description', async () => {
      await expect(this.courseDescription).toContainText(description);
    });
  }

  async assertCourseDetailsIsInViewport(): Promise<void> {
    await test.step('Assert course details is in viewport', async () => {
      await expect(this.courseDetail).toBeInViewport();
    });
  }

  async assertCertificatesIsInViewport(): Promise<void> {
    await test.step('Assert certificates is in viewport', async () => {
      await expect(this.certificates).toBeInViewport();
    });
  }

  async clickStartLearningButton(): Promise<void> {
    await test.step('Click "Start learning" button', async () => {
      await this.startLearningButton.click();
    });
  }
}
