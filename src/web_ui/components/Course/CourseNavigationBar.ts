import { test } from '@playwright/test';
import { BaseComponent } from '@/web_ui/components/BaseComponent';
import { UiElementsHelper } from '@/web_ui/components/Helpers/UiElementsHelpers';
import { CourseNavigationBarItem } from '@/common/typedefs/course.typedefs';

export class CourseNavigationBar extends BaseComponent {
  private readonly elementsHelper = new UiElementsHelper(this.page);

  private readonly courseNavigationBar =
    this.elementsHelper.getElementById('course-nav');

  private readonly getCourseNavigationBarItemByName = (
    itemName: CourseNavigationBarItem,
  ) =>
    this.courseNavigationBar.getByRole('link', {
      name: itemName,
    });

  async clickOnCourseNavigationBarItem(
    itemName: CourseNavigationBarItem,
  ): Promise<void> {
    await test.step('Click on course navigation bar item', async () => {
      await this.getCourseNavigationBarItemByName(itemName).click();
    });
  }
}
