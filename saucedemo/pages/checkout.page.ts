import { Page } from "@playwright/test";

export class CheckoutPage {
  constructor(private page: Page) {}

  async fillInformation(first: string, last: string, zip: string) {
    await this.page.getByPlaceholder('First Name').fill(first);
    await this.page.getByPlaceholder('Last Name').fill(last);
    await this.page.getByPlaceholder('Zip/Postal Code').fill(zip);
  }

  async continue() {
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }

  async finish() {
    await this.page.getByRole('button', { name: 'Finish' }).click();
  }
}