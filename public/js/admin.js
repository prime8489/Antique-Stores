// Initialize Firebase (paste your config)
const firebaseConfig = {
  apiKey: "AIzaSyAYShpNcMmwAIOsCbgm4GrHeuYAN6TqJUs",
  authDomain: "test-store-214d2.firebaseapp.com",
  projectId: "test-store-214d2"
};
firebase.initializeApp(firebaseConfig);

// Add Product to Firestore
function addProduct() {
  const name = document.getElementById('product-name').value;
  const price = document.getElementById('product-price').value;
  const imageUrl = document.getElementById('product-image').value;

  firebase.firestore().collection("products").add({
    name: name,
    price: parseFloat(price),
    image: imageUrl || "/images/default-product.jpg",
    status: "available",
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    alert("Product added successfully!");
    document.getElementById('add-product-form').reset();
    loadProducts(); // Refresh the list
  })
  .catch(error => {
    console.error("Error adding product: ", error);
    alert("Failed to add product");
  });
}

// Load existing products
function loadProducts() {
  firebase.firestore().collection("products")
    .orderBy("createdAt", "desc")
    .get()
    .then(querySnapshot => {
      const table = document.getElementById('products-table');
      table.innerHTML = `
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      `;
      
      querySnapshot.forEach(doc => {
        const product = doc.data();
        table.innerHTML += `
          <tr>
            <td>${product.name}</td>
            <td>₹${product.price}</td>
            <td>${product.status}</td>
            <td>
              <button onclick="deleteProduct('${doc.id}')">Delete</button>
            </td>
          </tr>
        `;
      });
    });
}

// Delete product
function deleteProduct(productId) {
  if (confirm("Delete this product permanently?")) {
    firebase.firestore().collection("products").doc(productId).delete()
      .then(() => loadProducts());
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', loadProducts);
