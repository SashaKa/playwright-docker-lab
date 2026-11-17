import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// TODO (week 1, task 3): move inventory / cart / checkout steps into page objects in pages/.
test('standard user buys a backpack', async ({ page }) => {
  const login = new LoginPage(page);
  await login.open();
  await login.login('standard_user', 'secret_sauce');

  await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
  await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');

  await page.getByTestId('shopping-cart-link').click();
  await expect(page.getByTestId('title')).toHaveText('Your Cart');
  await expect(page).toHaveURL(/cart\.html/);

  const cartItems = page.getByTestId('cart-list').getByTestId('inventory-item');
  await expect(cartItems).toHaveCount(1);
  await expect(cartItems.getByTestId('inventory-item-name')).toHaveText('Sauce Labs Backpack');


  await page.getByTestId('checkout').click();
  await page.getByTestId('firstName').fill('Test');
  await page.getByTestId('lastName').fill('User');
  await page.getByTestId('postalCode').fill('11000');
  await page.getByTestId('continue').click();

  await expect(page.getByTestId('total-label')).toContainText('$');
  await page.getByTestId('finish').click();

  await expect(page.getByTestId('complete-header')).toHaveText('Thank you for your order!');
});

