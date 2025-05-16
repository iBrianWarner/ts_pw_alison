import { Page } from '@playwright/test';
import { ROUTES } from '@/web_ui/routes.constants';
import { BasePage } from '@/web_ui/pages/BasePage';

export class TopicPage extends BasePage {
  public readonly url: string;

  constructor(options: { page: Page; topicId: number; topicSlug: string }) {
    const { page, topicId, topicSlug } = options;

    super(page);
    this.url = ROUTES.topic(topicId, topicSlug);
  }
}
