import { test, expect } from '@playwright/test';
import { BaseComponent } from '@/web_ui/components/BaseComponent';
import { UiElementsHelper } from '@/web_ui/components/Helpers/UiElementsHelpers';
import { CourseType } from '@/web_ui/components/Course/CourseCard';

export class FiltersForm extends BaseComponent {
  private readonly elementsHelper = new UiElementsHelper(this.page);

  private readonly courseTypeFilter =
    this.elementsHelper.getElementByClass('course-type-filter');

  private readonly getCertificateTypeCheckboxByName = (type: CourseType) =>
    this.elementsHelper.getElementByClass('form-checkbox').filter({
      hasText: type,
    });

  async assertVisible(): Promise<void> {
    await test.step('Assert filters form is visible', async () => {
      await expect(this.courseTypeFilter).toBeVisible();
    });
  }

  async clickCourseTypeFilter(): Promise<void> {
    await test.step('Click on "Certificate Type" filter', async () => {
      await this.courseTypeFilter.click();
    });
  }

  async assertCertificateTypeCheckboxVisible(type: CourseType): Promise<void> {
    await test.step(`Assert "${type}" checkbox is visible`, async () => {
      const checkbox = this.getCertificateTypeCheckboxByName(type);

      await expect(checkbox).toBeVisible();
    });
  }

  async clickOnCertificateTypeCheckbox(type: CourseType): Promise<void> {
    await test.step(`Click on "${type}" checkbox`, async () => {
      const checkbox = this.getCertificateTypeCheckboxByName(type);

      await checkbox.click();
    });
  }
}
