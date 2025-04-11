// Add Product
function addProduct() {
  const productData = {
    name: document.getElementById('product-name').value,
    price: Number(document.getElementById('product-price').value),
    image: document.getElementById('product-image').value,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  };

  firebase.firestore().collection("products").add(productData)
    .then(() => {
      alert('Product added!');
      loadProducts();
    });
}

// Delete Product
function deleteProduct(id) {
  if (confirm('Delete this item?')) {
    firebase.firestore().collection("products").doc(id).delete()
      .then(() => loadProducts());
  }
}

// Load Products for Admin
function loadProducts() {
  firebase.firestore().collection("products")
    .orderBy('timestamp', 'desc')
    .get()
    .then(querySnapshot => {
      const table = document.getElementById('admin-table');
      table.innerHTML = '<tr><th>Name</th><th>Price</th><th>Action</th></tr>';
      
      querySnapshot.forEach(doc => {
        const data = doc.data();
        table.innerHTML += `
          <tr>
            <td>${data.name}</td>
            <td>₹${data.price}</td>
            <td>
              <button onclick="deleteProduct('${doc.id}')">Delete</button>
            </td>
          </tr>
        `;
      });
    });
}

// Initialize Admin
document.addEventListener('DOMContentLoaded', loadProducts);
