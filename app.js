let products = [];
let cart = [];
fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
        products = data;
        displayProducts(products);
    })
    .catch(error => console.log('Error:', error));
function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const productCard = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>₹${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productList.innerHTML += productCard;
    });
}
function addToCart(id) {
    const product = products.find(item => item.id === id);
    const cartItem = cart.find(item => item.id === id);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }
    updateCart();
}
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const cartItem = `
            <div class="cart-item">
                <span>${item.title} - ₹${item.price}</span>
                <span>
                    <button onclick="decreaseQuantity(${item.id})">-</button>
                    ${item.quantity}
                    <button onclick="increaseQuantity(${item.id})">+</button>
                    <button onclick="removeFromCart(${item.id})">Remove</button>
                </span>
            </div>
        `;
        cartItems.innerHTML += cartItem;
    });
    updatePriceDetails();
}
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}
function increaseQuantity(id) {
    const cartItem = cart.find(item => item.id === id);
    cartItem.quantity++;
    updateCart();
}
function decreaseQuantity(id) {
    const cartItem = cart.find(item => item.id === id);
    if (cartItem.quantity > 1) {
        cartItem.quantity--;
    } else {
        removeFromCart(id);
    }
    updateCart();
}
function updatePriceDetails() {
    const priceDetails = document.getElementById('price-details');
    let totalAmount = 0;
    cart.forEach(item => {
        totalAmount += item.price * item.quantity;
    });
    priceDetails.innerHTML = `
        <p>Total Amount: ₹${totalAmount.toFixed(2)}</p>
    `;
}
function placeOrder() {
    alert("Order placed successfully!");
    cart = [];
    updateCart();
}
function searchProducts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
}
