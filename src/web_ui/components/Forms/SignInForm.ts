import { test, expect } from '@playwright/test';
import { BaseComponent } from '@/web_ui/components/BaseComponent';
import { UiElementsHelper } from '@/web_ui/components/Helpers/UiElementsHelpers';

export class SignInForm extends BaseComponent {
  private readonly elementsHelper = new UiElementsHelper(this.page);

  private readonly loginForm = this.elementsHelper
    .getElementByClass('login-modal')
    .locator('.login');

  private readonly emailField = this.elementsHelper
    .getElementByClass('input-field ')
    .getByPlaceholder('Email')
    .first();

  private readonly passwordField = this.elementsHelper
    .getElementByClass('input-field ')
    .getByPlaceholder('Password')
    .first();

  async assertVisible(): Promise<void> {
    await test.step('Assert filters form is visible', async () => {
      await expect(this.loginForm).toBeVisible();
    });
  }

  async fillEmailField(email: string): Promise<void> {
    await test.step('Fill email field', async () => {
      await this.emailField.fill(email);
    });
  }

  async fillPasswordField(password: string): Promise<void> {
    await test.step('Fill password field', async () => {
      await this.passwordField.fill(password);
    });
  }

  async fillLoginFormAndPressEnter(options: {
    email: string;
    password: string;
  }): Promise<void> {
    await test.step('Fill login form and press enter', async () => {
      const { email, password } = options;

      await this.fillEmailField(email);
      await this.fillPasswordField(password);
      await this.pressKeyboardEnter();
    });
  }
}
