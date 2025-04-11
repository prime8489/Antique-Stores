import { getFirestore, collection, addDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { app } from './auth.js';

const db = getFirestore(app);

// Add Product
window.addProduct = async () => {
  const name = document.getElementById('product-name').value;
  const price = parseFloat(document.getElementById('product-price').value);
  const imageUrl = document.getElementById('product-image').value;

  try {
    await addDoc(collection(db, "products"), {
      name,
      price,
      imageUrl,
      createdAt: new Date()
    });
    alert('Product added successfully!');
    loadAdminProducts();
  } catch (error) {
    console.error("Error adding product:", error);
    alert('Failed to add product');
  }
};

// Delete Product
window.deleteProduct = async (id) => {
  if (confirm('Are you sure you want to delete this product?')) {
    try {
      await deleteDoc(doc(db, "products", id));
      loadAdminProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }
};

// Load Products for Admin
window.loadAdminProducts = async () => {
  const table = document.getElementById('admin-products-table');
  table.innerHTML = '<tr><td colspan="4">Loading...</td></tr>';

  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    table.innerHTML = `
      <tr>
        <th>Name</th>
        <th>Price</th>
        <th>Image</th>
        <th>Action</th>
      </tr>
    `;

    querySnapshot.forEach((doc) => {
      const product = doc.data();
      table.innerHTML += `
        <tr>
          <td>${product.name}</td>
          <td>₹${product.price}</td>
          <td><img src="${product.imageUrl || ''}" style="height:50px" onerror="this.style.display='none'"></td>
          <td>
            <button onclick="deleteProduct('${doc.id}')" class="btn btn-danger">Delete</button>
          </td>
        </tr>
      `;
    });
  } catch (error) {
    console.error("Error loading products:", error);
    table.innerHTML = '<tr><td colspan="4">Error loading products</td></tr>';
  }
};

// Initialize Admin Dashboard
window.onload = loadAdminProducts;
