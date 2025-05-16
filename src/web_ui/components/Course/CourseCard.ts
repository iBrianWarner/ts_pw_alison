import { test, expect } from '@playwright/test';
import { BaseComponent } from '@/web_ui/components/BaseComponent';
import { UiElementsHelper } from '@/web_ui/components/Helpers/UiElementsHelpers';
import { CourseType } from '@/common/typedefs/course.typedefs';

export class CourseCard extends BaseComponent {
  private readonly elementsHelper = new UiElementsHelper(this.page);

  private readonly getCourseCardByName = (courseName: string) =>
    this.elementsHelper.getElementByClass('card').locator('h3').filter({
      hasText: courseName,
    });

  private readonly certificateCourseType = this.elementsHelper
    .getElementByClass('course-type-1')
    .getByText(CourseType.Certificate);

  private readonly diplomaCourseType = this.elementsHelper
    .getElementByClass('course-type-2')
    .getByText(CourseType.Diploma);

  async assertCertificatesAreMostRelevant(): Promise<void> {
    await test.step('Assert Certificates are most relevant', async () => {
      await expect(this.certificateCourseType.first()).toBeVisible();
    });
  }

  async assertDiplomasAreMostRelevant(): Promise<void> {
    await test.step('Assert Diplomas are most relevant', async () => {
      await expect(this.diplomaCourseType.first()).toBeVisible();
    });
  }

  async clickOnCourseCard(courseName: string): Promise<void> {
    await test.step('Click on course card', async () => {
      await this.getCourseCardByName(courseName).click();
    });
  }
}
