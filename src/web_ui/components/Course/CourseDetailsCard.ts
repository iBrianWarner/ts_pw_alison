import { test, expect } from '@playwright/test';
import { BaseComponent } from '@/web_ui/components/BaseComponent';
import { UiElementsHelper } from '@/web_ui/components/Helpers/UiElementsHelpers';

export class CourseDetailsCard extends BaseComponent {
  private readonly elementsHelper = new UiElementsHelper(this.page);

  private readonly courseDetailsCard = this.elementsHelper
    .getElementByClass('l-card')
    .locator('.l-card__inner');

  async assertVisible(): Promise<void> {
    await test.step('Assert course details card is visible', async () => {
      await expect(this.courseDetailsCard).toBeVisible();
    });
  }

  async assertCourseDetailsCardScreenshot(options: {
    courseName: string;
    fileName: string;
  }): Promise<void> {
    await test.step('Assert course details card screenshot', async () => {
      const { courseName, fileName } = options;
      const courseCard = this.courseDetailsCard.getByText(courseName);

      await this.assertLocatorHasScreenshot(courseCard, fileName);
    });
  }
}
