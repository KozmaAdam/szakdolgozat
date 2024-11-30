import test, { expect } from "@playwright/test";

test.describe.serial("Seasons", async () => {
  test("Open seasons page", async ({ page }) => {
    await page.goto('./');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByLabel('Username or email address').click();
    await page.getByLabel('Username or email address').fill('kozma.adam');
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('1q2w3E*');
    await page.locator('button[name="Action"]').click();
    await expect(page.getByRole('link', { name: 'Seasons' })).not.toBeVisible();
    await page.goto('./seasons');
    await expect(page.getByRole('heading', { name: '[403] You are not authorized!' })).toBeVisible();
    await page.locator('#abp-http-error-container').getByRole('link', { name: 'Home' }).click();
    await page.getByRole('button', { name: 'kozma.adam' }).click();
    await page.getByText('Log out').click();
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByLabel('Username or email address').click();
    await page.getByLabel('Username or email address').fill('admin');
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('1q2w3E*');
    await page.locator('button[name="Action"]').click();
    await page.locator('lpx-navbar a').filter({ hasText: 'Betting' }).click();
    await expect(page.getByRole('link', { name: 'Seasons' })).toBeVisible();
    await page.getByRole('link', { name: 'Seasons' }).click();
  });

  test("Add new seasons", async ({ page }) => {
    await page.goto('./');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByLabel('Username or email address').click();
    await page.getByLabel('Username or email address').fill('admin');
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('1q2w3E*');
    await page.locator('button[name="Action"]').click();
    await page.locator('lpx-navbar a').filter({ hasText: 'Betting' }).click();
    await page.getByRole('link', { name: 'Seasons' }).click();
    await page.getByRole('button', { name: 'NewSeason' }).click();
    await expect(page.getByLabel('Name')).toBeVisible();
    await expect(page.getByLabel('Description')).toBeVisible();
    await expect(page.locator('input[name="dateStart"]')).toBeVisible();
    await expect(page.locator('input[name="dateFinished"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Save' })).toBeDisabled();
    await page.getByLabel('Name').click();
    await page.getByLabel('Name').fill('Season1');
    await page.getByLabel('Description').click();
    await page.getByLabel('Description').fill('First test season');
    await page.locator('input[name="dateStart"]').click();
    await page.getByRole('gridcell').getByText('25', { exact: true }).click();
    await page.locator('input[name="dateFinished"]').click();
    await page.getByRole('gridcell').getByText('26', { exact: true }).click();
    await expect(page.getByRole('button', { name: 'Save' })).toBeEnabled();
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByRole('cell', { name: 'Season1', exact: true })).toBeVisible();
  });

  test("Edit seasons", async ({ page }) => {
    await page.goto('./');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByLabel('Username or email address').click();
    await page.getByLabel('Username or email address').fill('admin');
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('1q2w3E*');
    await page.locator('button[name="Action"]').click();
    await page.locator('lpx-navbar a').filter({ hasText: 'Betting' }).click();
    await page.getByRole('link', { name: 'Seasons' }).click();
    await expect(page.getByRole('cell').getByRole('button', { name: 'Actions' }).first()).toBeVisible();
    await page.getByRole('cell').getByRole('button', { name: 'Actions' }).first().click();
    await expect(page.getByRole('button', { name: 'Edit' })).toBeVisible();
    await page.getByRole('button', { name: 'Edit' }).click();
    await expect(page.getByLabel('Name')).toContainText(/.*/);
    await expect(page.getByLabel('Description')).toContainText(/.*/);
    await expect(page.locator('input[name="dateStart"]')).toContainText(/.*/);
    await expect(page.locator('input[name="dateFinished"]')).toContainText(/.*/);
    await expect(page.getByRole('button', { name: 'Save' })).toBeEnabled();
    await page.getByLabel('Name').click();
    await page.getByLabel('Name').fill('Season1_Copy');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByRole('cell', { name: 'Season1_Copy', exact: true })).toBeVisible();
  });

  test("Delete season", async ({ page }) => {
    await page.goto('./');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByLabel('Username or email address').click();
    await page.getByLabel('Username or email address').fill('admin');
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('1q2w3E*');
    await page.locator('button[name="Action"]').click();
    await page.locator('lpx-navbar a').filter({ hasText: 'Betting' }).click();
    await page.getByRole('link', { name: 'Seasons' }).click();
    await expect(page.getByRole('cell', { name: 'Season1_Copy', exact: true })).toBeVisible();
    await expect(page.getByRole('cell').getByRole('button', { name: 'Actions' }).first()).toBeVisible();
    await page.getByRole('cell').getByRole('button', { name: 'Actions' }).first().click();
    await expect(page.getByRole('button', { name: 'Delete' })).toBeVisible();
    await page.getByRole('button', { name: 'Delete' }).click();
    await expect(page.locator('div.confirmation-dialog')).toBeVisible();
    await page.getByRole('button', { name: 'Yes' }).click();
    await expect(page.getByRole('cell', { name: 'Season1_Copy', exact: true })).not.toBeVisible();
  });

  test.afterEach(async ({ page }) => {
    await page.getByRole('button', { name: 'admin' }).click();
    await page.getByText('Log out').click();
  });
});