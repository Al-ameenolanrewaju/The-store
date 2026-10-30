document.addEventListener("DOMContentLoaded", () => {

  const cartBtn = document.getElementById("cart-btn");
  const cartOverlay = document.getElementById("cart-overlay");
  const continueBtn = document.getElementById("continue-shopping");
  const cartBody = document.getElementById("cart-body");
  const totalEl = document.getElementById("total");
  const addButtons = document.querySelectorAll(".add-btn");
  const checkoutBtn = document.getElementById("checkout-btn");

  let cart = [];

  // OPEN / CLOSE CART
  cartBtn.addEventListener("click", () => {
    cartOverlay.classList.remove("hidden");
  });

  continueBtn.addEventListener("click", () => {
    cartOverlay.classList.add("hidden");
  });

  // UPDATE BUTTON TEXT
  function syncButtons() {
    addButtons.forEach(btn => {
      const name = btn.dataset.name;
      const exists = cart.some(item => item.name === name);
      btn.textContent = exists ? "REMOVE" : "ADD TO CART";
    });
  }

  // RENDER CART
  function renderCart() {
    cartBody.innerHTML = "";

    if (cart.length === 0) {
      cartBody.innerHTML = `<tr><td colspan="4">No item added</td></tr>`;
      totalEl.textContent = "₦0";
      return;
    }

    let total = 0;

    cart.forEach((item, index) => {
      total += item.price * item.qty;

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>₦${item.price}</td>
        <td>
          <button onclick="changeQty(${index}, -1)">−</button>
          ${item.qty}
          <button onclick="changeQty(${index}, 1)">+</button>
        </td>
      `;
      cartBody.appendChild(row);
    });

    totalEl.textContent = "₦" + total;
  }

  function updateCartCount() {
    cartBtn.textContent = `Cart (${cart.length})`;
  }

  // ADD / REMOVE PRODUCTS
  addButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const name = btn.dataset.name;
      const price = Number(btn.dataset.price);

      const index = cart.findIndex(item => item.name === name);

      if (index > -1) {
        cart.splice(index, 1);
      } else {
        cart.push({ name, price, qty: 1 });
      }

      renderCart();
      updateCartCount();
      syncButtons();
    });
  });

  // CHANGE QUANTITY
  window.changeQty = function (index, value) {
    if (cart[index].qty === 1 && value === -1) {
      if (confirm("Remove this item?")) {
        cart.splice(index, 1);
        renderCart();
        updateCartCount();
        syncButtons();
      }
      return;
    }
    cart[index].qty += value;
    renderCart();
  };

  // CHECKOUT VALIDATION
  checkoutBtn.addEventListener("click", () => {

    let valid = true;

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");

    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const phoneError = document.getElementById("phone-error");

    nameError.textContent = "";
    emailError.textContent = "";
    phoneError.textContent = "";

    if (nameInput.value.trim() === "") {
      nameError.textContent = "Name is required";
      valid = false;
    }

    if (!emailInput.value.includes("@")) {
      emailError.textContent = "Enter a valid email address";
      valid = false;
    }

    if (phoneInput.value.length !== 11 || isNaN(phoneInput.value)) {
      phoneError.textContent = "Phone number must be 11 digits";
      valid = false;
    }

    if (!valid) return;

    startPaystackPayment(emailInput.value);
  });

  // PAYSTACK FUNCTION ✅
  function startPaystackPayment(email) {

    let totalAmount = 0;
    cart.forEach(item => {
      totalAmount += item.price * item.qty;
    });

    if (totalAmount === 0) {
      alert("Your cart is empty");
      return;
    }

    let handler = PaystackPop.setup({
      key: "pk_test_eaeb9bfe33fa5bbf459356f7c6e4c1424a315199",
      email: email,
      amount: totalAmount * 100,
      currency: "NGN",
      ref: "EMS_" + Math.floor(Math.random() * 1000000000),

      callback: function (response) {

  // CUSTOMER DETAILS
  document.getElementById("summary-name").textContent =
    document.getElementById("name").value;

  document.getElementById("summary-email").textContent =
    document.getElementById("email").value;

  document.getElementById("summary-phone").textContent =
    document.getElementById("phone").value;

  document.getElementById("summary-ref").textContent =
    response.reference;

  // ITEMS SUMMARY
  const summaryItems = document.getElementById("summary-items");
  summaryItems.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    const li = document.createElement("li");
    li.textContent = `${item.name} × ${item.qty} — ₦${item.price * item.qty}`;
    summaryItems.appendChild(li);
  });

  document.getElementById("summary-total").textContent = total;

  // SHOW SUCCESS
  document.getElementById("success-overlay").classList.remove("hidden");

  // CLEAR CART
  cart = [];
  renderCart();
  updateCartCount();
  syncButtons();
},

      onClose: function () {
        alert("Payment window closed");
      }
    });

    handler.openIframe();
  }

});
document.getElementById("close-summary").addEventListener("click", () => {
  window.location.href = "index.html";
});