import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { app } from './auth.js';

const db = getFirestore(app);

// Load Products
window.loadProducts = async () => {
  const productsGrid = document.getElementById('products-grid');
  productsGrid.innerHTML = '<div class="loading">Loading...</div>';

  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    productsGrid.innerHTML = '';

    querySnapshot.forEach((doc) => {
      const product = doc.data();
      productsGrid.innerHTML += `
        <div class="card">
          <img src="${product.imageUrl || '/images/default-product.jpg'}" 
               alt="${product.name}" 
               onerror="this.src='/images/default-product.jpg'">
          <h3>${product.name}</h3>
          <p>₹${product.price.toLocaleString()}</p>
          <button onclick="addToCart('${doc.id}')" class="btn">Add to Cart</button>
        </div>
      `;
    });
  } catch (error) {
    console.error("Error loading products:", error);
    productsGrid.innerHTML = '<div class="error">Failed to load products</div>';
  }
};

// Initialize when page loads
window.onload = () => {
  loadProducts();
  
  // Search functionality
  document.getElementById('search-bar').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    document.querySelectorAll('.card').forEach(card => {
      const name = card.querySelector('h3').textContent.toLowerCase();
      card.style.display = name.includes(term) ? 'block' : 'none';
    });
  });
};
