const API_BASE = "https://openapi.programming-hero.com/api";
const categoryList = document.getElementById("category-list");
const treeList = document.getElementById("tree-list");
const cart = document.getElementById("cart");
const totalPriceEl = document.getElementById("total-price");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const spinner = document.getElementById("spinner");

let total = 0;
let cartItems = [];

function showSpinner(show) {
  spinner.classList.toggle("hidden", !show);
}

function loadCategories() {
  fetch(`${API_BASE}/categories`)
    .then(res => res.json())
    .then(data => {
      data.data.forEach(cat => {
        const btn = document.createElement("button");
        btn.textContent = cat.category;
        btn.className = "block px-4 py-2 bg-green-100 rounded hover:bg-green-300 w-full text-left";
        btn.onclick = () => loadTreesByCategory(cat.category_id);
        categoryList.appendChild(btn);
      });
    });
}

function loadTreesByCategory(id = "1") {
  showSpinner(true);
  fetch(`${API_BASE}/category/${id}`)
    .then(res => res.json())
    .then(data => {
      showSpinner(false);
      displayTrees(data.data);
    });
}

function displayTrees(trees) {
  treeList.innerHTML = "";
  trees.forEach(tree => {
    const card = document.createElement("div");
    card.className = "bg-white p-4 rounded shadow";

    card.innerHTML = `
      <div class="bg-gray-200 h-32 mb-3 rounded"></div>
      <h4 class="text-lg font-semibold cursor-pointer text-green-600 hover:underline" onclick="showDetails('${tree.plant_id}')">${tree.plant_name}</h4>
      <p class="text-sm mb-2">${tree.short_description.slice(0, 50)}...</p>
      <span class="text-xs px-2 py-1 bg-green-100 rounded">${tree.category}</span>
      <p class="font-bold mt-2">₹${tree.price}</p>
      <button class="mt-2 bg-green-600 text-white px-3 py-1 rounded w-full" onclick="addToCart('${tree.plant_name}', ${tree.price})">Add to Cart</button>
    `;
    treeList.appendChild(card);
  });
}

function addToCart(name, price) {
  const item = document.createElement("div");
  item.className = "flex justify-between items-center";
  item.innerHTML = `
    <span>${name}</span>
    <button onclick="removeFromCart(this, ${price})" class="text-red-500 text-sm">❌</button>
  `;
  cart.appendChild(item);
  total += price;
  totalPriceEl.textContent = total;
}

function removeFromCart(btn, price) {
  btn.parentElement.remove();
  total -= price;
  totalPriceEl.textContent = total;
}

function showDetails(id) {
  showSpinner(true);
  fetch(`${API_BASE}/plant/${id}`)
    .then(res => res.json())
    .then(data => {
      showSpinner(false);
      const plant = data.data;
      modalContent.innerHTML = `
        <h2 class="text-xl font-bold mb-2">${plant.plant_name}</h2>
        <p class="mb-2">${plant.description}</p>
        <p class="text-sm text-gray-600">Category: ${plant.category}</p>
        <p class="text-sm font-bold">Price: ₹${plant.price}</p>
      `;
      modal.classList.remove("hidden");
    });
}

document.getElementById("close-modal").onclick = () => modal.classList.add("hidden");

// Init
loadCategories();
loadTreesByCategory();
