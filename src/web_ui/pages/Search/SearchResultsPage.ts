import { ROUTES } from '@/web_ui/routes.constants';
import { test, expect, Page } from '@playwright/test';
import { BasePage } from '@/web_ui/pages/BasePage';
import { UiElementsHelper } from '@/web_ui/components/Helpers/UiElementsHelpers';
import { FiltersForm } from '@/web_ui/components/Forms/FiltersForm';
import { CourseCard } from '@/web_ui/components/Course/CourseCard';

export class SearchResultsPage extends BasePage {
  public readonly url: string;

  public readonly elementsHelper = new UiElementsHelper(this.page);

  public readonly filtersForm = new FiltersForm(this.page);

  public readonly courseCard = new CourseCard(this.page);

  private readonly numberOfResults =
    this.elementsHelper.getElementById('num-results');

  constructor(page: Page, query: string) {
    super(page);

    this.url = ROUTES.searchResults(query);
  }

  async assertNumberOfResultsIsVisible(number: number): Promise<void> {
    await test.step('Assert number of results is visible', async () => {
      await expect(this.numberOfResults).toContainText(String(number));
    });
  }
}
