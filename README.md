# 🛒 EMS — E-Millennial Store

A modern, responsive e-commerce web application tailored for tech-savvy Millennials and Gen-Z consumers. Built with vanilla HTML5, CSS3, and JavaScript, featuring dynamic shopping cart management and seamless online payment processing via the **Paystack API**.

---

## 📸 Overview & Preview

**EMS (E-Millennial Store)** offers a curated catalog of essential everyday gadgets—from smartphones and gaming consoles to laptops and wearables. The interface provides a smooth shopping experience with a clean design aesthetic, real-time cart interactions, and instant checkout.

*UI mockups and design assets are available in the [`Project Files/UI/`](file:///c:/Users/ADEDAMOLA/Desktop/The%20store/Project%20Files/UI/) directory.*

---

## ✨ Features

- **🎯 Bold Hero Section**: Engaging hero banner featuring high-resolution visuals and quick call-to-action navigation.
- **📱 Responsive Product Showcase**: Grid layout displaying available gadgets with pricing in Nigerian Naira (₦).
- **🛍️ Interactive Shopping Cart Modal**:
  - Live cart item counter badge in the header.
  - Dynamic addition and removal of products.
  - State-aware button toggles (`ADD TO CART` ↔ `REMOVE`).
  - Item quantity increment / decrement controls with removal prompts.
  - Real-time subtotal and total calculations.
- **📋 Client-Side Form Validation**:
  - Full name requirement check.
  - Email format validation.
  - 11-digit phone number validation with inline error messaging.
- **💳 Paystack Payment Integration**:
  - Seamless inline modal checkout using the Paystack Inline JS SDK.
  - Auto-generated unique transaction reference (`EMS_<random>`).
  - Automatic currency conversion to kobo for transaction processing.
- **🎉 Order Summary & Confirmation**:
  - Post-transaction receipt modal displaying customer information, reference ID, purchased item breakdown, and total paid.
  - Automatic cart clearing upon successful payment.

---

## 🗂️ Project Structure

```text
The store/
├── index.html                   # Core semantic markup & structure
├── style.css                    # Styling, color palette, and responsive rules
├── script.js                    # Shopping cart logic, validation & Paystack handler
├── README.md                    # Project documentation
└── Project Files/
    ├── Color Codes.png          # Palette and color specifications
    ├── Images/                  # Product photography and hero banner
    │   ├── heroImage.png
    │   ├── images.jpeg
    │   ├── product1.png         # Samsung TV
    │   ├── product2.png         # Pixel 4a
    │   ├── product3.png         # PS 5
    │   ├── product4.png         # MacBook Air
    │   ├── product5.png         # Apple Watch
    │   └── product6.png         # Air Pods
    └── UI/
        └── EMS Landing page UI.png # UI / UX reference design
```

---

## 🛠️ Built With

- **HTML5**: Semantic elements, accessible forms, and modular modal structure.
- **CSS3**: Custom variables, Flexbox, CSS Grid layouts, transitions, and media queries.
- **JavaScript (ES6+)**: DOM manipulation, event-driven state updates, and checkout flow.
- **[Paystack Inline JS](https://paystack.com/docs/payments/accept-payments/)**: Secure multi-channel payment gateway popup.

---

## 🚀 Getting Started

### Prerequisites

No special package managers or frameworks are required. You only need a modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari, etc.).

### Installation & Launch

1. **Clone or Download the Repository**:
   ```bash
   git clone https://github.com/Al-ameenolanrewaju/The-store.git
   cd "The-store"
   ```

2. **Run Locally**:
   - **Direct Browser**: Double-click [`index.html`](file:///c:/Users/ADEDAMOLA/Desktop/The%20store/index.html) to open it directly in your browser.
   - **VS Code Live Server**: Right-click [`index.html`](file:///c:/Users/ADEDAMOLA/Desktop/The%20store/index.html) and select **"Open with Live Server"**.
   - **Using Python HTTP Server**:
     ```bash
     python -m http.server 3000
     ```
     Then navigate to `http://localhost:3000` in your web browser.

---

## ⚙️ Configuration (Paystack Public Key)

The project is currently configured with a Paystack test public key in [`script.js`](file:///c:/Users/ADEDAMOLA/Desktop/The%20store/script.js#L153).

To link your own Paystack account:
1. Log in to your [Paystack Dashboard](https://dashboard.paystack.com/).
2. Navigate to **Settings > API Keys & Webhooks**.
3. Copy your **Public Key** (`pk_test_...` or `pk_live_...`).
4. Replace the key in [`script.js`](file:///c:/Users/ADEDAMOLA/Desktop/The%20store/script.js#L153):
   ```javascript
   let handler = PaystackPop.setup({
     key: "YOUR_PAYSTACK_PUBLIC_KEY",
     email: email,
     amount: totalAmount * 100,
     currency: "NGN",
     // ...
   });
   ```

---

## 🔮 Roadmap & Future Enhancements

- [ ] Persist cart data in `localStorage` across page refreshes.
- [ ] Add category filtering and real-time search for products.
- [ ] Implement backend webhook verification for payment confirmation.
- [ ] Add toast notification alerts for cart interactions.
- [ ] Add dark mode theme toggle.

---

## 📄 License

This project is open-source and available under the [MIT License](https://opensource.org/licenses/MIT).

