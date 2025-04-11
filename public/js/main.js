// Load Products
function loadProducts() {
  firebase.firestore().collection("products").get()
    .then(querySnapshot => {
      const container = document.getElementById('products-container');
      container.innerHTML = '';
      
      querySnapshot.forEach(doc => {
        const product = doc.data();
        container.innerHTML += `
          <div class="product-card">
            <img src="${product.image || 'default.jpg'}">
            <h3>${product.name}</h3>
            <p>₹${product.price}</p>
            <button onclick="addToCart('${doc.id}')">Buy</button>
          </div>
        `;
      });
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', loadProducts);
