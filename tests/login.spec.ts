import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// Demo site with public test credentials: https://www.saucedemo.com
const PASSWORD = 'secret_sauce';

test.describe('Login', () => {
  test('standard user lands on the inventory page', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login('standard_user', PASSWORD);

    await expect(page).toHaveURL(/inventory/);
    await expect(page.getByTestId('title')).toHaveText('Products');
  });

  test('locked out user sees an error', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login('locked_out_user', PASSWORD);

    await login.expectError(/locked out/i);
    await expect(page).not.toHaveURL(/inventory/);
  });

  // Equivalence classes for credentials: empty username, empty password, wrong password.
  for (const [name, user, pass, message] of [
    ['empty username', '', PASSWORD, /Username is required/],
    ['empty password', 'standard_user', '', /Password is required/],
    ['wrong password', 'standard_user', 'wrong', /do not match/],
  ] as const) {
    test(`validation: ${name}`, async ({ page }) => {
      const login = new LoginPage(page);
      await login.open();
      await login.login(user, pass);
      await login.expectError(message);
    });
  }
});
