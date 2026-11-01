# bag.Ze on Shopify: setup guide

This repo has a real Shopify theme in `shopify-theme/` and your 53 products in `shopify-import/products.csv`.
The ready ZIP is `bagzee-shopify-theme.zip`.

## 1. Store and currency
1. Open your Shopify store (or start a trial at shopify.com).
2. Settings, Store details, set Store currency to Pakistani rupee (PKR). Prices in the CSV are already your final prices (source price + 300).

## 2. Upload the theme
1. Online Store, Themes, Add theme, Upload zip file. Choose `bagzee-shopify-theme.zip`.
2. Click Customize to look at it, then Publish when you are happy.

## 3. Import the products
1. Products, Import, choose `shopify-import/products.csv`, tick "Publish new products to all sales channels", Upload and continue.
2. Shopify copies the photos from the links in the file. Use only photos you have the right to use.
3. The "Compare-at price" column is empty on purpose. Fill it for a product only if you really charged or will charge that higher price. The crossed-out price and the discount badge then show by themselves.

## 4. Make the five collections
Products, Collections, Create collection. Choose Automated, condition "Product type is equal to ...":

| Title | Type must equal | URL handle |
|---|---|---|
| Handbags | Handbags | handbags |
| Crossbody | Crossbody | crossbody |
| Backpacks | Backpacks | backpacks |
| Duffles | Duffles | duffles |
| Pouches | Pouches | pouches |

The home page category cards and the product grid use these handles.

## 5. Menus and pages
1. Online Store, Navigation: in the menu `main-menu` add Handbags, Crossbody, Backpacks, Duffles, Pouches (link each to its collection). Make a menu called `footer` with the pages you want (for example Payment screenshot).
2. Online Store, Pages, Add page: title "Payment screenshot", then under Theme template choose `page.payment-proof`. Its handle must be `payment-proof`.

## 6. Payment methods
Settings, Payments, Manual payment methods:
- Add "Cash on delivery (COD)".
- Add custom payment methods named Easypaisa, JazzCash, NayaPay and Bank transfer. In each one's payment instructions write your account title and number. Customers see them after they order.
- Shopify Payments is not offered in every country. Check what Settings, Payments shows for your store.

### The 25% advance for cash on delivery
Shopify cannot take part of a cash on delivery order online. The theme shows the customer the advance and balance in the cart. In practice:
1. The customer places a COD order.
2. They pay the advance to one of your wallets and send the screenshot.
3. You open the order and confirm it once the advance arrives.
To collect it automatically you need a Shopify app made for partial COD payments.

Also show your account details on the home page: Customize, Payment methods section, open a method and fill in "Account details".

## 7. Payment screenshots
Without setup, the "Payment screenshot" page sends customers to WhatsApp to share the picture.
To receive the picture without WhatsApp, follow `setup/README.md` (Google script, about 5 minutes), then paste the web app URL in Customize, Theme settings, Payment, "Payment screenshot receiver".

## 8. Your own domain
Settings, Domains, Connect existing domain (bagzee.pk).

## What stays where
- The simple website in `docs/` (GitHub Pages) keeps working on its own and does not need Shopify.
- The theme reads the WhatsApp number, phone, email and the advance percentage from Customize, Theme settings.
