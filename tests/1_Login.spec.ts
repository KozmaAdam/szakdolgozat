import { test, expect } from "@playwright/test";

test.describe.serial("Login", async () => {
  test("Good username + good password", async ({ page }) => {
    await page.goto('./');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByLabel('Username or email address').click();
    await page.getByLabel('Username or email address').fill('kozma.adam');
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('1q2w3E*');
    await expect(page.locator('button[name="Action"]')).toBeEnabled();
    await page.locator('button[name="Action"]').click();
    await page.getByRole('button', { name: 'kozma.adam' }).click();
    await page.getByText('Log out').click();
  });

  test("Good username + wrong password", async ({ page }) => {
    await page.goto('./');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByLabel('Username or email address').click();
    await page.getByLabel('Username or email address').fill('kozma.adam');
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('asdf');
    await expect(page.locator('button[name="Action"]')).toBeEnabled();
    await page.locator('button[name="Action"]').click();
    await expect(page.getByText('Invalid username or password!')).toBeVisible();
  });

  test("Wrong username + good password", async ({ page }) => {
    await page.goto('./');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByLabel('Username or email address').click();
    await page.getByLabel('Username or email address').fill('asdf');
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('1q2w3E*');
    await expect(page.locator('button[name="Action"]')).toBeEnabled();
    await page.locator('button[name="Action"]').click();
    await expect(page.getByText('Invalid username or password!')).toBeVisible();
  });

  test("Wrong username + wrong password", async ({ page }) => {
    await page.goto('./');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByLabel('Username or email address').click();
    await page.getByLabel('Username or email address').fill('asdf');
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('asdf');
    await expect(page.locator('button[name="Action"]')).toBeEnabled();
    await page.locator('button[name="Action"]').click();
    await expect(page.getByText('Invalid username or password!')).toBeVisible();
  });
});