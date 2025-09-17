'use strict';



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const menuToggleBtn = document.querySelector("[data-menu-toggle-btn]");

if (menuToggleBtn && navbar) {
  menuToggleBtn.addEventListener("click", function () {
    navbar.classList.toggle("active");
    this.classList.toggle("active");
  });
}

if (navbar && navbarLinks && navbarLinks.length) {
  for (let i = 0; i < navbarLinks.length; i++) {
    navbarLinks[i].addEventListener("click", function () {
      if (navbar && menuToggleBtn) {
        navbar.classList.toggle("active");
        menuToggleBtn.classList.toggle("active");
      }
    });
  }
}



/**
 * header sticky & back to top
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

if (header || backTopBtn) {
  window.addEventListener("scroll", function () {
    if (!header || !backTopBtn) return;
    if (window.scrollY >= 100) {
      header.classList.add("active");
      backTopBtn.classList.add("active");
    } else {
      header.classList.remove("active");
      backTopBtn.classList.remove("active");
    }
  });
}



/**
 * search box toggle
 */

const searchBtn = document.querySelector("[data-search-btn]");
const searchContainer = document.querySelector("[data-search-container]");
const searchSubmitBtn = document.querySelector("[data-search-submit-btn]");
const searchCloseBtn = document.querySelector("[data-search-close-btn]");

const searchBoxElems = [searchBtn, searchSubmitBtn, searchCloseBtn].filter(Boolean);

if (searchContainer && searchBoxElems.length) {
  for (let i = 0; i < searchBoxElems.length; i++) {
    searchBoxElems[i].addEventListener("click", function () {
      searchContainer.classList.toggle("active");
      document.body.classList.toggle("active");
    });
  }
}



/**
 * move cycle on scroll
 */

const deliveryBoy = document.querySelector("[data-delivery-boy]");

let deliveryBoyMove = -80;
let lastScrollPos = 0;

if (deliveryBoy) {
  window.addEventListener("scroll", function () {
    let deliveryBoyTopPos = deliveryBoy.getBoundingClientRect().top;
    if (deliveryBoyTopPos < 500 && deliveryBoyTopPos > -250) {
      let activeScrollPos = window.scrollY;
      if (lastScrollPos < activeScrollPos) {
        deliveryBoyMove += 1;
      } else {
        deliveryBoyMove -= 1;
      }
      lastScrollPos = activeScrollPos;
      deliveryBoy.style.transform = `translateX(${deliveryBoyMove}px)`;
    }
  });
}



/**
 * product data and navigation
 */

// Product data structure
const products = {
  'product-1': {
    id: 'product-1',
    name: 'Fried Chicken Unlimited',
    image: './assets/images/food-menu-1.png',
    price: 49.00,
    originalPrice: 69.00,
    category: 'Chicken',
    description: 'Crispy fried chicken with our special seasoning blend, served with your choice of sides.',
    rating: 5
  },
  'product-2': {
    id: 'product-2',
    name: 'Burger King Whopper',
    image: './assets/images/food-menu-2.png',
    price: 29.00,
    originalPrice: 39.00,
    category: 'Burger',
    description: 'Our signature burger with fresh lettuce, tomato, onion, and our special sauce.',
    rating: 4
  },
  'product-3': {
    id: 'product-3',
    name: 'White Castle Pizzas',
    image: './assets/images/food-menu-3.png',
    price: 49.00,
    originalPrice: 69.00,
    category: 'Pizza',
    description: 'Hand-tossed pizza with fresh ingredients and melted cheese.',
    rating: 5
  },
  'product-4': {
    id: 'product-4',
    name: 'Bell Burrito Supreme',
    image: './assets/images/food-menu-4.png',
    price: 59.00,
    originalPrice: 69.00,
    category: 'Mexican',
    description: 'Large burrito filled with seasoned meat, beans, rice, and fresh vegetables.',
    rating: 4
  },
  'product-5': {
    id: 'product-5',
    name: 'Kung Pao Chicken BBQ',
    image: './assets/images/food-menu-5.png',
    price: 45.00,
    originalPrice: 50.00,
    category: 'Chinese',
    description: 'Spicy chicken stir-fry with peanuts and vegetables in our signature sauce.',
    rating: 5
  },
  'product-6': {
    id: 'product-6',
    name: 'Wendy\'s Chicken',
    image: './assets/images/food-menu-6.png',
    price: 49.00,
    originalPrice: 69.00,
    category: 'Chicken',
    description: 'Delicious grilled chicken with our special marinade and herbs.',
    rating: 5
  }
};

// Market rate overrides for live categories (can be updated later or fetched)
const marketRates = {
  burger: {
    // name or keyword (lowercase) : current price
    whopper: 32.00,
    burger: 30.00
  },
  pizza: {
    pizza: 52.00
  }
};

// Function to navigate to product detail page
function goToProduct(productId) {
  // Store the selected product ID in localStorage
  localStorage.setItem('selectedProduct', productId);
  // Navigate to generic detail (fallback)
  window.location.href = 'pages/details/product-detail.html';
}

// Enhanced function to handle product clicks with automatic data extraction
function goToProductFromElement(buttonElement) {
  // Find the product card containing this button
  const productCard = buttonElement.closest('.food-menu-card');
  const bannerCard = buttonElement.closest('.banner-card');
  
  if (productCard) {
    // Extract product data from food menu cards
    let productData = {
      id: 'dynamic-' + Date.now(), // Generate unique ID
      name: productCard.querySelector('.card-title')?.textContent?.trim() || 'Unknown Product',
      image: productCard.querySelector('img')?.src || './assets/images/food-menu-1.png',
      price: parseFloat(productCard.querySelector('.price')?.textContent?.replace('$', '') || '0'),
      originalPrice: parseFloat(productCard.querySelector('.del')?.textContent?.replace('$', '') || '0'),
      category: productCard.querySelector('.category')?.textContent?.trim() || 'Food',
      description: 'Delicious ' + (productCard.querySelector('.card-title')?.textContent?.trim() || 'food item') + ' prepared with fresh ingredients.',
      rating: productCard.querySelectorAll('.rating-wrapper ion-icon[name="star"]').length || 5
    };
    
    // Determine type based on content
    const name = productData.name.toLowerCase();
    const category = productData.category.toLowerCase();
    
    if (name.includes('burger') || category.includes('burger') || name.includes('whopper')) {
      productData.type = 'burger';
    } else if (name.includes('pizza') || category.includes('pizza')) {
      productData.type = 'pizza';
    } else if (name.includes('sandwich') || category.includes('sandwich')) {
      productData.type = 'sandwich';
    } else if (name.includes('drink') || name.includes('beverage') || category.includes('drink') || category.includes('beverage')) {
      productData.type = 'drink';
    } else {
      productData.type = 'burger';
    }

    // Apply market rates for recognized items
    if (productData.type === 'burger') {
      const key = name.includes('whopper') ? 'whopper' : (name.includes('burger') ? 'burger' : null);
      if (key && marketRates.burger[key]) {
        productData.price = marketRates.burger[key];
      }
    } else if (productData.type === 'pizza') {
      const key = 'pizza';
      if (marketRates.pizza[key]) {
        productData.price = marketRates.pizza[key];
      }
    }
    
    // Store the product data in localStorage
    localStorage.setItem('selectedProduct', JSON.stringify(productData));
    
    // Navigate to category-specific detail page
    if (productData.type === 'pizza') {
      window.location.href = 'pages/details/pizza-detail.html';
    } else if (productData.type === 'burger') {
      window.location.href = 'pages/details/burger-detail.html';
    } else if ((productData.category||'').toLowerCase().includes('drink')) {
      window.location.href = 'pages/details/drink-detail.html';
    } else if ((productData.category||'').toLowerCase().includes('sandwich')) {
      window.location.href = 'pages/details/sandwich-detail.html';
    } else {
      window.location.href = 'pages/details/product-detail.html';
    }
  } else if (bannerCard) {
    // Extract product data from banner cards
    const title = bannerCard.querySelector('.banner-title')?.textContent?.trim() || 'Special Offer';
    const text = bannerCard.querySelector('.banner-text')?.textContent?.trim() || '';
    
    // Determine type based on content
    let productType = 'burger'; // Default
    if (title.toLowerCase().includes('pizza') || text.toLowerCase().includes('pizza')) {
      productType = 'pizza';
    } else if (title.toLowerCase().includes('burger') || text.toLowerCase().includes('burger')) {
      productType = 'burger';
    } else if (title.toLowerCase().includes('sandwich') || text.toLowerCase().includes('sandwich')) {
      productType = 'sandwich';
    } else if (title.toLowerCase().includes('drink') || text.toLowerCase().includes('drink') || title.toLowerCase().includes('beverage')) {
      productType = 'drink';
    }
    
    const productData = {
      id: 'banner-' + Date.now(), // Generate unique ID
      name: title,
      image: bannerCard.querySelector('img')?.src || './assets/images/food-menu-1.png',
      price: 25.00, // Default promotional price
      originalPrice: 50.00, // Default original price for 50% off
      category: 'Special Offer',
      description: text || 'Special promotional item with great discount!',
      rating: 5,
      type: productType
    };
    
    // Store the product data in localStorage
    localStorage.setItem('selectedProduct', JSON.stringify(productData));
    
    // Navigate to page by type
    if (productType === 'pizza') {
      window.location.href = 'pages/details/pizza-detail.html';
    } else if (productType === 'burger') {
      window.location.href = 'pages/details/burger-detail.html';
    } else {
      window.location.href = 'pages/details/product-detail.html';
    }
  } else {
    // Check if it's a general section button (like CTA or delivery sections)
    const sectionButton = buttonElement.closest('section');
    if (sectionButton) {
      // Create a generic promotional product
      const productData = {
        id: 'promo-' + Date.now(),
        name: 'Special Promotional Offer',
        image: './assets/images/food-menu-1.png',
        price: 25.00,
        originalPrice: 50.00,
        category: 'Special Offer',
        description: 'Check out our amazing promotional offers and delicious food items!',
        rating: 5,
        type: 'burger' // Default to burger
      };
      
      localStorage.setItem('selectedProduct', JSON.stringify(productData));
      window.location.href = 'pages/details/burger-detail.html';
    } else {
      // Fallback to default product
      goToProduct('product-1');
    }
  }
}

/**
 * cart management
 */

// Cart data structure
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Cart functions
function addToCart(product) {
  const existingItem = cart.find(item => 
    item.id === product.id && 
    item.size === product.size && 
    JSON.stringify(item.toppings) === JSON.stringify(product.toppings)
  );

  if (existingItem) {
    existingItem.quantity += product.quantity;
  } else {
    cart.push(product);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
  showNotification('Item added to cart!');
}

function removeFromCart(index) {
  console.log('Removing item from cart at index:', index);
  
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Force immediate UI update
    updateCartUI();
    
    // Show notification
    showNotification('Item removed from cart');
    
    console.log('Item removed successfully, cart length:', cart.length);
  } else {
    console.log('Invalid index for removal:', index);
  }
}

function updateCartItemQuantity(index, quantity) {
  console.log('Updating cart item quantity:', index, quantity);
  
  if (quantity <= 0) {
    removeFromCart(index);
  } else {
    cart[index].quantity = Math.max(1, Math.min(10, quantity));
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update the specific input field immediately
    const quantityInput = document.querySelector(`[data-index="${index}"].quantity-input`);
    if (quantityInput) {
      quantityInput.value = cart[index].quantity;
    }
    
    // Update the specific price display immediately
    const priceElement = document.querySelector(`[data-index="${index}"]`).closest('.cart-item').querySelector('.cart-item-price');
    if (priceElement) {
      priceElement.textContent = `$${(cart[index].price * cart[index].quantity).toFixed(2)}`;
    }
    
    // Update the summary totals
    updateOrderSummary();
    
    console.log('Cart updated, new quantity:', cart[index].quantity);
  }
}

function addCartItemEventListeners() {
  // Use event delegation for better performance and reliability
  const cartItemsContainer = document.getElementById('cart-items');
  
  if (cartItemsContainer) {
    // Remove existing event listeners to prevent duplicates
    cartItemsContainer.removeEventListener('click', handleCartItemClick);
    cartItemsContainer.removeEventListener('change', handleCartItemChange);
    
    // Add new event listeners
    cartItemsContainer.addEventListener('click', handleCartItemClick);
    cartItemsContainer.addEventListener('change', handleCartItemChange);
    
    console.log('Cart item event listeners added');
  } else {
    console.log('Cart items container not found for event listeners');
  }
}

function handleCartItemClick(e) {
  e.preventDefault();
  e.stopPropagation();
  
  const target = e.target.closest('button');
  if (!target) return;
  
  const index = parseInt(target.dataset.index);
  if (isNaN(index) || !cart[index]) return;
  
  if (target.classList.contains('decrease-btn')) {
    const newQuantity = cart[index].quantity - 1;
    updateCartItemQuantity(index, newQuantity);
  } else if (target.classList.contains('increase-btn')) {
    const newQuantity = cart[index].quantity + 1;
    updateCartItemQuantity(index, newQuantity);
  } else if (target.classList.contains('remove-item-btn')) {
    removeFromCart(index);
  }
}

function handleCartItemChange(e) {
  e.preventDefault();
  e.stopPropagation();
  
  if (e.target.classList.contains('quantity-input')) {
    const index = parseInt(e.target.dataset.index);
    if (!isNaN(index) && cart[index]) {
      const newQuantity = parseInt(e.target.value) || 1;
      updateCartItemQuantity(index, newQuantity);
    }
  }
}

function clearCart() {
  console.log('Clearing cart');
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Force immediate UI update
  const cartItemsContainer = document.getElementById('cart-items');
  const emptyCart = document.getElementById('empty-cart');
  
  if (cartItemsContainer) {
    cartItemsContainer.innerHTML = '';
    if (emptyCart) {
      emptyCart.style.display = 'block';
      cartItemsContainer.appendChild(emptyCart);
    }
  }
  
  // Update summary
  updateOrderSummary();
  
  // Show notification
  showNotification('Cart cleared');
  
  console.log('Cart cleared successfully');
}

function updateCartUI() {
  // Load cart from localStorage to ensure we have the latest data
  cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Update cart count in header (if exists)
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    
    // Also update the cart button visibility
    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) {
      cartBtn.style.display = 'flex';
    }
  }

  // Update order page
  if (document.getElementById('cart-items')) {
    renderCartItems();
    updateOrderSummary();
  }

  // Update checkout page
  if (document.getElementById('order-items')) {
    renderOrderItems();
    updateCheckoutSummary();
  }
}

function renderCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  const emptyCart = document.getElementById('empty-cart');

  if (cart.length === 0) {
    emptyCart.style.display = 'block';
    cartItemsContainer.innerHTML = '';
    cartItemsContainer.appendChild(emptyCart);
    return;
  }

  emptyCart.style.display = 'none';
  cartItemsContainer.innerHTML = '';

  cart.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    const isBurgerOptions = item?.options && item?.options?.patty;
    const optionsSummary = isBurgerOptions ? (
      `${item.category ? `Category: ${item.category} | ` : ''}` +
      `Size: ${item.options.size.replace('-', ' ')} | ` +
      `Patty: ${item.options.patty} | ` +
      `Cheese: ${item.options.cheese} | ` +
      `Add-Ons: ${(item.options.addOns||[]).join(', ') || 'None'} | ` +
      `Veggies: ${(item.options.veggies||[]).join(', ') || 'None'}`
    ) : (
      `${item.category ? `Category: ${item.category} | ` : ''}Size: ${item.size} | Toppings: ${item.toppings.join(', ') || 'None'}`
    );
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-details">
        <h3 class="cart-item-name">${item.name}</h3>
        <p class="cart-item-options">${optionsSummary}</p>
        <p class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
      </div>
      <div class="cart-item-quantity">
        <div class="quantity-control">
          <button class="quantity-btn decrease-btn" data-index="${index}">-</button>
          <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="10" 
                 data-index="${index}">
          <button class="quantity-btn increase-btn" data-index="${index}">+</button>
        </div>
        <button class="remove-item-btn" data-index="${index}" title="Remove item">
          <ion-icon name="trash-outline"></ion-icon>
        </button>
      </div>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  // Add event listeners to the newly created buttons
  addCartItemEventListeners();
}

function renderOrderItems() {
  const orderItemsContainer = document.getElementById('order-items');
  orderItemsContainer.innerHTML = '';

  cart.forEach(item => {
    const orderItem = document.createElement('div');
    orderItem.className = 'order-item';
    const isBurgerOptions = item?.options && item?.options?.patty;
    const optionsSummary = isBurgerOptions ? (
      `${item.category ? `Category: ${item.category} | ` : ''}` +
      `Size: ${item.options.size.replace('-', ' ')} | ` +
      `Patty: ${item.options.patty} | ` +
      `Cheese: ${item.options.cheese} | ` +
      `Add-Ons: ${(item.options.addOns||[]).join(', ') || 'None'} | ` +
      `Veggies: ${(item.options.veggies||[]).join(', ') || 'None'}`
    ) : (
      `${item.category ? `Category: ${item.category} | ` : ''}Size: ${item.size} | Toppings: ${item.toppings.join(', ') || 'None'}`
    );
    orderItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="order-item-image">
      <div class="order-item-details">
        <h3 class="order-item-name">${item.name}</h3>
        <p class="order-item-options">${optionsSummary}</p>
        <p class="order-item-quantity">Qty: ${item.quantity}</p>
      </div>
      <div class="order-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
    `;
    orderItemsContainer.appendChild(orderItem);
  });
}

function updateOrderSummary() {
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.085; // 8.5% tax
  const total = subtotal + tax;

  const subtotalElement = document.getElementById('subtotal');
  const taxElement = document.getElementById('tax');
  const totalElement = document.getElementById('total');
  
  if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  if (taxElement) taxElement.textContent = `$${tax.toFixed(2)}`;
  if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;

  // Enable/disable proceed to checkout button
  const proceedBtn = document.getElementById('proceed-checkout-btn');
  if (proceedBtn) {
    const hasItems = cart.length > 0;
    proceedBtn.disabled = !hasItems;
    
    if (hasItems) {
      proceedBtn.style.opacity = '1';
      proceedBtn.style.cursor = 'pointer';
      proceedBtn.classList.remove('disabled');
    } else {
      proceedBtn.style.opacity = '0.6';
      proceedBtn.style.cursor = 'not-allowed';
      proceedBtn.classList.add('disabled');
    }
  }
}

function updateCheckoutSummary() {
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.085; // 8.5% tax
  const deliveryFee = 3.99;
  const total = subtotal + tax + deliveryFee;

  document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
  document.getElementById('delivery-fee').textContent = `$${deliveryFee.toFixed(2)}`;
  document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

function showNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: var(--deep-saffron);
    color: var(--white);
    padding: 15px 20px;
    border-radius: 10px;
    box-shadow: var(--shadow-1);
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}



/**
 * product detail page functionality
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize cart count on all pages
  updateCartUI();

  // Product detail page functionality
  if (document.getElementById('product-detail')) {
    initProductDetail();
  }

  // Order page functionality
  if (document.getElementById('order-page')) {
    // Add a small delay to ensure DOM is fully rendered
    setTimeout(() => {
      initOrderPage();
    }, 100);
  }

  // Checkout page functionality
  if (document.getElementById('checkout-page')) {
    // Add a small delay to ensure DOM is fully rendered
    setTimeout(() => {
      initCheckoutPage();
    }, 100);
  }

  // Menu filtering on home page
  initMenuFiltering();

  // Add global click handler as fallback
  document.addEventListener('click', function(e) {
    // Load cart from localStorage to ensure we have the latest data
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Cart button click handler
    if (e.target.closest('#cart-btn') || e.target.closest('.cart-btn')) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Cart button clicked');
      // Determine correct path based on current page location
      const currentPath = window.location.pathname;
      if (currentPath.includes('/pages/details/')) {
        window.location.href = '../order/order.html';
      } else if (currentPath.includes('/pages/')) {
        window.location.href = 'order/order.html';
      } else {
        window.location.href = 'pages/order/order.html';
      }
    }
    
    // Proceed to checkout button
    if (e.target.closest('#proceed-checkout-btn') && !e.target.closest('#proceed-checkout-btn').disabled) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Global proceed button handler triggered');
      if (cart.length > 0) {
        window.location.href = 'checkout-form.html';
      } else {
        showNotification('Your cart is empty!');
      }
    }
    
    // Clear cart button
    if (e.target.closest('#clear-cart-btn')) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Global clear cart button handler triggered');
      if (confirm('Are you sure you want to clear your cart?')) {
        clearCart();
      }
    }
    
    // Quantity decrease buttons
    if (e.target.closest('.decrease-btn')) {
      e.preventDefault();
      e.stopPropagation();
      const button = e.target.closest('.decrease-btn');
      const index = parseInt(button.dataset.index);
      console.log('Global decrease button handler triggered, index:', index, 'cart length:', cart.length);
      if (!isNaN(index) && cart[index]) {
        const newQuantity = cart[index].quantity - 1;
        updateCartItemQuantity(index, newQuantity);
      }
    }
    
    // Quantity increase buttons
    if (e.target.closest('.increase-btn')) {
      e.preventDefault();
      e.stopPropagation();
      const button = e.target.closest('.increase-btn');
      const index = parseInt(button.dataset.index);
      console.log('Global increase button handler triggered, index:', index, 'cart length:', cart.length);
      if (!isNaN(index) && cart[index]) {
        const newQuantity = cart[index].quantity + 1;
        updateCartItemQuantity(index, newQuantity);
      }
    }
    
    // Remove item buttons - handle both button and icon clicks
    if (e.target.closest('.remove-item-btn') || e.target.matches('ion-icon[name="trash-outline"]')) {
      e.preventDefault();
      e.stopPropagation();
      const button = e.target.closest('.remove-item-btn') || e.target.closest('button');
      const index = parseInt(button.dataset.index);
      console.log('Global remove button handler triggered, index:', index, 'cart length:', cart.length);
      if (!isNaN(index) && cart[index]) {
        removeFromCart(index);
      }
    }
    
    // Alternative remove button handler for better compatibility
    if (e.target.matches('ion-icon[name="trash-outline"]')) {
      e.preventDefault();
      e.stopPropagation();
      const parentButton = e.target.closest('button');
      if (parentButton && parentButton.dataset.index) {
        const index = parseInt(parentButton.dataset.index);
        console.log('Alternative remove handler triggered, index:', index);
        if (!isNaN(index) && cart[index]) {
          removeFromCart(index);
        }
      }
    }
  });

  // Add global change handler for quantity inputs
  document.addEventListener('change', function(e) {
    if (e.target.classList.contains('quantity-input')) {
      e.preventDefault();
      e.stopPropagation();
      // Load cart from localStorage to ensure we have the latest data
      cart = JSON.parse(localStorage.getItem('cart')) || [];
      const index = parseInt(e.target.dataset.index);
      console.log('Global quantity input change handler triggered, index:', index, 'cart length:', cart.length);
      if (!isNaN(index) && cart[index]) {
        const newQuantity = parseInt(e.target.value) || 1;
        updateCartItemQuantity(index, newQuantity);
      }
    }
  });
});

function initProductDetail() {
  const quantityInput = document.getElementById('quantity-input');
  const quantityDecrease = document.getElementById('quantity-decrease');
  const quantityIncrease = document.getElementById('quantity-increase');
  const totalPriceElement = document.getElementById('total-price');
  const addToCartBtn = document.getElementById('add-to-cart-btn');

  const selectedProductData = localStorage.getItem('selectedProduct');
  let product;
  if (!selectedProductData) {
    window.location.href = 'index.html';
    return;
  }
  try {
    product = JSON.parse(selectedProductData);
  } catch (e) {
    product = products[selectedProductData] || null;
  }
  if (!product) {
    window.location.href = 'index.html';
    return;
  }

  // Populate basic product info
  const titleEl = document.getElementById('product-title');
  const descEl = document.getElementById('product-description');
  const imgEl = document.getElementById('product-image');
  const currentPriceEl = document.getElementById('current-price');
  const originalPriceEl = document.getElementById('original-price');

  if (titleEl) titleEl.textContent = product.name || '';
  if (descEl) descEl.textContent = product.description || '';
  if (imgEl) {
    imgEl.src = product.image || '';
    imgEl.alt = product.name || '';
  }
  if (currentPriceEl) currentPriceEl.textContent = `$${(product.price || 0).toFixed(2)}`;
  if (originalPriceEl) {
    if (product.originalPrice && product.originalPrice > (product.price || 0)) {
      originalPriceEl.textContent = `$${product.originalPrice.toFixed(2)}`;
      originalPriceEl.style.display = 'inline';
    } else {
      originalPriceEl.style.display = 'none';
    }
  }

  let quantity = 1;
  let basePrice = product.price || 0;
  let selectedSize = null;
  let selectedMultiplier = 1;
  // Add-on selections (pizza)
  let selectedCrusts = [];
  let selectedBaseSauces = [];
  let selectedCheeses = [];
  let selectedToppings = [];

  // Pizza size dropdown support (on pizza detail page)
  const pizzaSizeList = document.getElementById('pizza-size-list');
  const pizzaCrustList = document.getElementById('pizza-crust-list');
  const pizzaBaseList = document.getElementById('pizza-base-list');
  const pizzaCheeseList = document.getElementById('pizza-cheese-list');
  const pizzaToppingsList = document.getElementById('pizza-toppings-list');

  // Burger dropdown support (on burger detail page)
  const burgerSizeList = document.getElementById('burger-size-list');
  const burgerPattyTypeList = document.getElementById('burger-pattytype-list');
  const burgerCheeseList = document.getElementById('burger-cheese-list');
  const burgerAddonsList = document.getElementById('burger-addons-list');
  const burgerVeggiesList = document.getElementById('burger-veggies-list');
  const burgerSaucesList = document.getElementById('burger-sauces-list');
  if (pizzaSizeList) {
    const sizeInputs = pizzaSizeList.querySelectorAll('input[name="pizza-size-option"]');
    const priceDisplays = pizzaSizeList.querySelectorAll('[data-price-display]');

    // Compute and render price per size
    sizeInputs.forEach((input, idx) => {
      const multiplier = parseFloat(input.dataset.multiplier || '1');
      const sizePrice = basePrice * multiplier;
      const display = priceDisplays[idx];
      if (display) display.textContent = `$${sizePrice.toFixed(2)}`;
      if (input.checked) {
        selectedMultiplier = multiplier;
        selectedSize = input.value;
      }
    });

    // Enforce single selection and update prices
    sizeInputs.forEach(input => {
      input.addEventListener('change', function() {
        if (this.checked) {
          sizeInputs.forEach(other => { if (other !== this) other.checked = false; });
          selectedMultiplier = parseFloat(this.dataset.multiplier || '1');
          selectedSize = this.value;
          // update unit price display and total
          if (currentPriceEl) currentPriceEl.textContent = `$${(basePrice * selectedMultiplier).toFixed(2)}`;
          updateTotalPrice();
        } else {
          // prevent having none selected
          const anyChecked = Array.from(sizeInputs).some(i => i.checked);
          if (!anyChecked) { this.checked = true; }
        }
      });
    });

    // Initialize unit price to selected size
    // current price will be updated by updateTotalPrice() call below
  }

  // Burger: compute size multipliers and addons
  let burgerPattyMultiplier = 1;
  let burgerSizeMultiplier = 1;
  let burgerAddonsTotal = 0;
  let burgerSelections = {
    pattyCount: 'single',
    size: 'regular',
    pattyTypes: [],
    cheeses: [],
    addons: [],
    veggies: [],
    sauces: []
  };

  function getBurgerAddonsTotal() {
    burgerSelections.pattyTypes = [];
    burgerSelections.cheeses = [];
    burgerSelections.addons = [];
    burgerSelections.veggies = [];
    burgerSelections.sauces = [];
    let total = 0;

    if (burgerPattyTypeList) {
      burgerPattyTypeList.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        if (cb.checked) {
          total += parseFloat(cb.dataset.price || '0');
          burgerSelections.pattyTypes.push(cb.value);
        }
      });
    }
    if (burgerCheeseList) {
      burgerCheeseList.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        if (cb.checked) {
          total += parseFloat(cb.dataset.price || '0');
          burgerSelections.cheeses.push(cb.value);
        }
      });
    }
    if (burgerAddonsList) {
      burgerAddonsList.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        if (cb.checked) {
          total += parseFloat(cb.dataset.price || '0');
          burgerSelections.addons.push(cb.value);
        }
      });
    }
    if (burgerVeggiesList) {
      burgerVeggiesList.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        if (cb.checked) {
          total += parseFloat(cb.dataset.price || '0');
          burgerSelections.veggies.push(cb.value);
        }
      });
    }
    if (burgerSaucesList) {
      burgerSaucesList.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        if (cb.checked) {
          total += parseFloat(cb.dataset.price || '0');
          burgerSelections.sauces.push(cb.value);
        }
      });
    }
    return total;
  }

  if (burgerSizeList) {
    const pattyInputs = burgerSizeList.querySelectorAll('input[name="burger-patty-count"]');
    const sizeInputs = burgerSizeList.querySelectorAll('input[name="burger-size"]');
    // Enforce single selection
    pattyInputs.forEach(input => {
      if (input.checked) {
        burgerPattyMultiplier = parseFloat(input.dataset.multiplier || '1');
        burgerSelections.pattyCount = input.value;
      }
      input.addEventListener('change', function() {
        if (this.checked) {
          pattyInputs.forEach(o => { if (o !== this) o.checked = false; });
          burgerPattyMultiplier = parseFloat(this.dataset.multiplier || '1');
          burgerSelections.pattyCount = this.value;
          updateTotalPrice();
        }
      });
    });
    sizeInputs.forEach(input => {
      if (input.checked) {
        burgerSizeMultiplier = parseFloat(input.dataset.multiplier || '1');
        burgerSelections.size = input.value;
      }
      input.addEventListener('change', function() {
        if (this.checked) {
          sizeInputs.forEach(o => { if (o !== this) o.checked = false; });
          burgerSizeMultiplier = parseFloat(this.dataset.multiplier || '1');
          burgerSelections.size = this.value;
          updateTotalPrice();
        }
      });
    });
  }
  
  function getAddonsTotal() {
    let total = 0;
    selectedCrusts = [];
    selectedBaseSauces = [];
    selectedCheeses = [];
    selectedToppings = [];

    if (pizzaCrustList) {
      pizzaCrustList.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        if (cb.checked) {
          total += parseFloat(cb.dataset.price || '0');
          selectedCrusts.push(cb.value);
        }
      });
    }
    if (pizzaBaseList) {
      pizzaBaseList.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        if (cb.checked) {
          total += parseFloat(cb.dataset.price || '0');
          selectedBaseSauces.push(cb.value);
        }
      });
    }
    if (pizzaCheeseList) {
      pizzaCheeseList.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        if (cb.checked) {
          total += parseFloat(cb.dataset.price || '0');
          selectedCheeses.push(cb.value);
        }
      });
    }
    if (pizzaToppingsList) {
      pizzaToppingsList.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        if (cb.checked) {
          total += parseFloat(cb.dataset.price || '0');
          selectedToppings.push(cb.value);
        }
      });
    }
    return total;
  }
  function updateTotalPrice() {
    const pizzaAddons = getAddonsTotal();
    const burgerAddonTotal = getBurgerAddonsTotal();
    const burgerMultiplier = burgerPattyMultiplier * burgerSizeMultiplier;
    // Determine page type by presence of lists
    const isPizza = !!pizzaSizeList;
    const isBurger = !!burgerSizeList;

    const baseUnit = basePrice * (isPizza ? selectedMultiplier : (isBurger ? burgerMultiplier : 1));
    const unit = baseUnit + (isPizza ? pizzaAddons : 0) + (isBurger ? burgerAddonTotal : 0);
    const totalPrice = unit * quantity;
    if (currentPriceEl) currentPriceEl.textContent = `$${unit.toFixed(2)}`;
    if (totalPriceElement) totalPriceElement.textContent = totalPrice.toFixed(2);
    
    // Update floating button price
    const floatingTotalPrice = document.getElementById('floating-total-price');
    if (floatingTotalPrice) floatingTotalPrice.textContent = totalPrice.toFixed(2);
  }

  // Attach change handlers for addon lists to recompute price
  [pizzaCrustList, pizzaBaseList, pizzaCheeseList, pizzaToppingsList, burgerPattyTypeList, burgerCheeseList, burgerAddonsList, burgerVeggiesList, burgerSaucesList].forEach(list => {
    if (list) {
      list.addEventListener('change', function() {
        updateTotalPrice();
      });
    }
  });

  if (quantityDecrease) {
    quantityDecrease.addEventListener('click', function() {
      if (quantity > 1) {
        quantity--;
        if (quantityInput) quantityInput.value = quantity;
        updateTotalPrice();
      }
    });
  }
  if (quantityIncrease) {
    quantityIncrease.addEventListener('click', function() {
      if (quantity < 10) {
        quantity++;
        if (quantityInput) quantityInput.value = quantity;
        updateTotalPrice();
      }
    });
  }
  if (quantityInput) {
    quantityInput.addEventListener('change', function() {
      quantity = Math.max(1, Math.min(10, parseInt(this.value) || 1));
      this.value = quantity;
      updateTotalPrice();
    });
  }

  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function() {
      const pizzaAddons = getAddonsTotal();
      const burgerAddonTotal = getBurgerAddonsTotal();
      const burgerMultiplier = burgerPattyMultiplier * burgerSizeMultiplier;
      const isPizza = !!pizzaSizeList;
      const isBurger = !!burgerSizeList;
      const unit = (basePrice * (isPizza ? selectedMultiplier : (isBurger ? burgerMultiplier : 1))) + (isPizza ? pizzaAddons : 0) + (isBurger ? burgerAddonTotal : 0);
      const cartItem = {
        id: product.id,
        name: product.name,
        image: product.image,
        price: unit,
        size: isPizza ? selectedSize : `${burgerSelections.pattyCount}-${burgerSelections.size}`,
        category: product.category || null,
        toppings: isPizza ? selectedToppings.slice() : burgerSelections.veggies.slice(),
        options: isPizza ? {
          crusts: selectedCrusts.slice(),
          baseSauces: selectedBaseSauces.slice(),
          cheeses: selectedCheeses.slice(),
        } : {
          pattyTypes: burgerSelections.pattyTypes.slice(),
          cheeses: burgerSelections.cheeses.slice(),
          addons: burgerSelections.addons.slice(),
          sauces: burgerSelections.sauces.slice(),
        },
        quantity: quantity
      };
      addToCart(cartItem);
      showNotification('Item added to cart!');
    });
  }

  // Floating add to cart button
  const floatingAddToCartBtn = document.getElementById('floating-add-to-cart-btn');
  if (floatingAddToCartBtn) {
    floatingAddToCartBtn.addEventListener('click', function() {
      const pizzaAddons = getAddonsTotal();
      const burgerAddonTotal = getBurgerAddonsTotal();
      const burgerMultiplier = burgerPattyMultiplier * burgerSizeMultiplier;
      const isPizza = !!pizzaSizeList;
      const isBurger = !!burgerSizeList;
      const unit = (basePrice * (isPizza ? selectedMultiplier : (isBurger ? burgerMultiplier : 1))) + (isPizza ? pizzaAddons : 0) + (isBurger ? burgerAddonTotal : 0);
      const cartItem = {
        id: product.id,
        name: product.name,
        image: product.image,
        price: unit,
        size: isPizza ? selectedSize : `${burgerSelections.pattyCount}-${burgerSelections.size}`,
        category: product.category || null,
        toppings: isPizza ? selectedToppings.slice() : burgerSelections.veggies.slice(),
        options: isPizza ? {
          crusts: selectedCrusts.slice(),
          baseSauces: selectedBaseSauces.slice(),
          cheeses: selectedCheeses.slice(),
        } : {
          pattyTypes: burgerSelections.pattyTypes.slice(),
          cheeses: burgerSelections.cheeses.slice(),
          addons: burgerSelections.addons.slice(),
          sauces: burgerSelections.sauces.slice(),
        },
        quantity: quantity
      };
      addToCart(cartItem);
      showNotification('Item added to cart!');
    });
  }

  updateTotalPrice();
}

// Initialize filter buttons and show/hide menu cards
function initMenuFiltering() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.food-menu-card');
  if (filterButtons.length === 0 || cards.length === 0) return;

  function applyFilter(filter) {
    cards.forEach(card => {
      const categoryText = card.querySelector('.category')?.textContent?.trim().toLowerCase() || '';
      const titleText = card.querySelector('.card-title')?.textContent?.trim().toLowerCase() || '';

      let isMatch = false;
      if (filter === 'all') {
        isMatch = true;
      } else if (filter === 'burger') {
        isMatch = categoryText.includes('burger') || titleText.includes('burger') || titleText.includes('whopper');
      } else if (filter === 'pizza') {
        isMatch = categoryText.includes('pizza') || titleText.includes('pizza');
      } else {
        isMatch = categoryText.includes(filter) || titleText.includes(filter);
      }

      card.closest('li').style.display = isMatch ? '' : 'none';

      // If burger filter, update shown prices to market rates without touching others
      if (isMatch && filter === 'burger') {
        const name = titleText;
        const priceEl = card.querySelector('.price');
        if (priceEl) {
          const key = name.includes('whopper') ? 'whopper' : (name.includes('burger') ? 'burger' : null);
          if (key && marketRates.burger[key]) {
            priceEl.textContent = `$${marketRates.burger[key].toFixed(2)}`;
          }
        }
      }
    });
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter || 'all';
      applyFilter(filter);
    });
  });
}

// Function to update burger category options
function updateBurgerCategoryOptions() {
  const categoryOptionsContainer = document.querySelector('.burger-category-options');
  const categorySelection = document.getElementById('burger-category-selection');
  
  if (!categoryOptionsContainer) return;

  // Show the burger category selection
  if (categorySelection) {
    categorySelection.style.display = 'block';
  }

  categoryOptionsContainer.innerHTML = `
    <label class="category-option">
      <input type="radio" name="burger-category" value="classic" data-price="0.00" checked>
      <span class="category-label">Classic Burger</span>
      <span class="category-price">+$0.00</span>
    </label>
    <label class="category-option">
      <input type="radio" name="burger-category" value="cheeseburger" data-price="2.00">
      <span class="category-label">Cheeseburger</span>
      <span class="category-price">+$2.00</span>
    </label>
    <label class="category-option">
      <input type="radio" name="burger-category" value="bacon-burger" data-price="3.50">
      <span class="category-label">Bacon Burger</span>
      <span class="category-price">+$3.50</span>
    </label>
    <label class="category-option">
      <input type="radio" name="burger-category" value="deluxe-burger" data-price="4.00">
      <span class="category-label">Deluxe Burger</span>
      <span class="category-price">+$4.00</span>
    </label>
    <label class="category-option">
      <input type="radio" name="burger-category" value="veggie-burger" data-price="1.50">
      <span class="category-label">Veggie Burger</span>
      <span class="category-price">+$1.50</span>
    </label>
    <label class="category-option">
      <input type="radio" name="burger-category" value="spicy-burger" data-price="2.50">
      <span class="category-label">Spicy Burger</span>
      <span class="category-price">+$2.50</span>
    </label>
  `;
}

// Function to update size options based on product type
function updateSizeOptions(productType, productPrice) {
  const sizeOptionsContainer = document.querySelector('.size-options');
  if (!sizeOptionsContainer) return;

  if (productType === 'burger') {
    sizeOptionsContainer.innerHTML = `
      <label class="size-option">
        <input type="radio" name="size" value="small" data-price="${(productPrice * 0.8).toFixed(2)}">
        <span class="size-label">Small</span>
        <span class="size-price">$${(productPrice * 0.8).toFixed(2)}</span>
      </label>
      <label class="size-option">
        <input type="radio" name="size" value="medium" data-price="${productPrice.toFixed(2)}" checked>
        <span class="size-label">Medium</span>
        <span class="size-price">$${productPrice.toFixed(2)}</span>
      </label>
      <label class="size-option">
        <input type="radio" name="size" value="large" data-price="${(productPrice * 1.2).toFixed(2)}">
        <span class="size-label">Large</span>
        <span class="size-price">$${(productPrice * 1.2).toFixed(2)}</span>
      </label>
    `;
  } else if (productType === 'pizza') {
    sizeOptionsContainer.innerHTML = `
      <label class="size-option">
        <input type="radio" name="size" value="small" data-price="${(productPrice * 0.8).toFixed(2)}">
        <span class="size-label">Small (10")</span>
        <span class="size-price">$${(productPrice * 0.8).toFixed(2)}</span>
      </label>
      <label class="size-option">
        <input type="radio" name="size" value="medium" data-price="${(productPrice * 1.1).toFixed(2)}" checked>
        <span class="size-label">Medium (12")</span>
        <span class="size-price">$${(productPrice * 1.1).toFixed(2)}</span>
      </label>
      <label class="size-option">
        <input type="radio" name="size" value="large" data-price="${(productPrice * 1.4).toFixed(2)}">
        <span class="size-label">Large (14")</span>
        <span class="size-price">$${(productPrice * 1.4).toFixed(2)}</span>
      </label>
      <label class="size-option">
        <input type="radio" name="size" value="xlarge" data-price="${(productPrice * 1.7).toFixed(2)}">
        <span class="size-label">X-Large (16")</span>
        <span class="size-price">$${(productPrice * 1.7).toFixed(2)}</span>
      </label>
    `;
  }
}

// Function to update topping options based on product type
function updateToppingOptions(productType) {
  const toppingOptionsContainer = document.querySelector('.topping-options');
  if (!toppingOptionsContainer) return;

  if (productType === 'burger') {
    toppingOptionsContainer.innerHTML = `
      <label class="topping-option">
        <input type="checkbox" name="topping" value="extra-cheese" data-price="2.00">
        <span class="topping-label">Extra Cheese</span>
        <span class="topping-price">+$2.00</span>
      </label>
      <label class="topping-option">
        <input type="checkbox" name="topping" value="bacon" data-price="3.00">
        <span class="topping-label">Bacon</span>
        <span class="topping-price">+$3.00</span>
      </label>
      <label class="topping-option">
        <input type="checkbox" name="topping" value="lettuce" data-price="1.00">
        <span class="topping-label">Lettuce</span>
        <span class="topping-price">+$1.00</span>
      </label>
      <label class="topping-option">
        <input type="checkbox" name="topping" value="tomato" data-price="1.00">
        <span class="topping-label">Tomato</span>
        <span class="topping-price">+$1.00</span>
      </label>
      <label class="topping-option">
        <input type="checkbox" name="topping" value="onions" data-price="1.00">
        <span class="topping-label">Onions</span>
        <span class="topping-price">+$1.00</span>
      </label>
      <label class="topping-option">
        <input type="checkbox" name="topping" value="pickles" data-price="1.00">
        <span class="topping-label">Pickles</span>
        <span class="topping-price">+$1.00</span>
      </label>
    `;
  } else if (productType === 'pizza') {
    toppingOptionsContainer.innerHTML = `
      <label class="topping-option">
        <input type="checkbox" name="topping" value="extra-cheese" data-price="3.50">
        <span class="topping-label">Extra Cheese</span>
        <span class="topping-price">+$3.50</span>
      </label>
      <label class="topping-option">
        <input type="checkbox" name="topping" value="pepperoni" data-price="4.00">
        <span class="topping-label">Pepperoni</span>
        <span class="topping-price">+$4.00</span>
      </label>
      <label class="topping-option">
        <input type="checkbox" name="topping" value="mushrooms" data-price="3.00">
        <span class="topping-label">Mushrooms</span>
        <span class="topping-price">+$3.00</span>
      </label>
      <label class="topping-option">
        <input type="checkbox" name="topping" value="onions" data-price="2.50">
        <span class="topping-label">Onions</span>
        <span class="topping-price">+$2.50</span>
      </label>
      <label class="topping-option">
        <input type="checkbox" name="topping" value="bell-peppers" data-price="3.00">
        <span class="topping-label">Bell Peppers</span>
        <span class="topping-price">+$3.00</span>
      </label>
      <label class="topping-option">
        <input type="checkbox" name="topping" value="olives" data-price="3.00">
        <span class="topping-label">Olives</span>
        <span class="topping-price">+$3.00</span>
      </label>
      <label class="topping-option">
        <input type="checkbox" name="topping" value="jalapenos" data-price="3.00">
        <span class="topping-label">Jalapeños</span>
        <span class="topping-price">+$3.00</span>
      </label>
      <label class="topping-option">
        <input type="checkbox" name="topping" value="sausage" data-price="4.50">
        <span class="topping-label">Sausage</span>
        <span class="topping-price">+$4.50</span>
      </label>
    `;
  }
}

function initOrderPage() {
  // Load cart from localStorage first
  cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  updateCartUI();

  // Add event listeners after a short delay to ensure DOM is ready
  setTimeout(() => {
    // Clear cart button
    const clearCartBtn = document.getElementById('clear-cart-btn');
    if (clearCartBtn) {
      clearCartBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (confirm('Are you sure you want to clear your cart?')) {
          clearCart();
        }
      });
    }

    // Proceed to checkout button
    const proceedBtn = document.getElementById('proceed-checkout-btn');
    if (proceedBtn) {
      console.log('Proceed button found, adding event listener');
      proceedBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Proceed button clicked, cart length:', cart.length);
        if (cart.length > 0) {
          console.log('Navigating to checkout form');
          window.location.href = 'checkout-form.html';
        } else {
          console.log('Cart is empty, showing notification');
          showNotification('Your cart is empty!');
        }
      });
    } else {
      console.log('Proceed button not found!');
    }
  }, 200);
}

function initCheckoutPage() {
  // Load cart from localStorage first
  cart = JSON.parse(localStorage.getItem('cart')) || [];
  updateCartUI();

  // Payment method toggle
  const paymentMethods = document.querySelectorAll('input[name="payment"]');
  const creditCardForm = document.getElementById('credit-card-form');
  
  paymentMethods.forEach(method => {
    method.addEventListener('change', function() {
      if (this.value === 'card') {
        creditCardForm.style.display = 'block';
        creditCardForm.classList.add('show');
      } else {
        creditCardForm.style.display = 'none';
        creditCardForm.classList.remove('show');
      }
    });
  });

  // Credit card input formatting
  const cardNumberInput = document.getElementById('card-number');
  const expiryInput = document.getElementById('expiry-date');
  const cvvInput = document.getElementById('cvv');

  if (cardNumberInput) {
    cardNumberInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
      let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
      e.target.value = formattedValue;
    });
  }

  if (expiryInput) {
    expiryInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
      }
      e.target.value = value;
    });
  }

  if (cvvInput) {
    cvvInput.addEventListener('input', function(e) {
      e.target.value = e.target.value.replace(/\D/g, '');
    });
  }

  // Form validation and submission
  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
      }

      // Validate credit card fields if card payment is selected
      const selectedPayment = document.querySelector('input[name="payment"]:checked').value;
      if (selectedPayment === 'card') {
        const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
        const expiryDate = document.getElementById('expiry-date').value;
        const cvv = document.getElementById('cvv').value;
        const cardholderName = document.getElementById('cardholder-name').value;

        if (!cardNumber || cardNumber.length < 16) {
          showNotification('Please enter a valid card number');
          return;
        }
        if (!expiryDate || !/^\d{2}\/\d{2}$/.test(expiryDate)) {
          showNotification('Please enter a valid expiry date (MM/YY)');
          return;
        }
        if (!cvv || cvv.length < 3) {
          showNotification('Please enter a valid CVV');
          return;
        }
        if (!cardholderName.trim()) {
          showNotification('Please enter the cardholder name');
          return;
        }
      }

      // Get form data
      const formData = new FormData(this);
      const orderData = {
        customer: {
          firstName: formData.get('firstName'),
          lastName: formData.get('lastName'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          address: formData.get('address'),
          city: formData.get('city'),
          state: formData.get('state'),
          zipCode: formData.get('zipCode'),
          country: formData.get('country'),
          instructions: formData.get('instructions')
        },
        payment: {
          method: formData.get('payment'),
          cardNumber: selectedPayment === 'card' ? formData.get('cardNumber') : null,
          expiryDate: selectedPayment === 'card' ? formData.get('expiryDate') : null,
          cvv: selectedPayment === 'card' ? formData.get('cvv') : null,
          cardholderName: selectedPayment === 'card' ? formData.get('cardholderName') : null
        },
        items: cart,
        subtotal: cart.reduce((total, item) => total + (item.price * item.quantity), 0),
        tax: cart.reduce((total, item) => total + (item.price * item.quantity), 0) * 0.085,
        deliveryFee: 3.99,
        total: cart.reduce((total, item) => total + (item.price * item.quantity), 0) * 1.085 + 3.99,
        orderDate: new Date().toISOString()
      };

      // Simulate order processing
      showNotification('Processing your order...');
      
      setTimeout(() => {
        // Clear cart
        clearCart();
        
        // Show success message
        alert('Order placed successfully! Your order number is #' + Math.random().toString(36).substr(2, 9).toUpperCase());
        
        // Redirect to home page
        window.location.href = 'index.html';
      }, 2000);
    });
  }
}