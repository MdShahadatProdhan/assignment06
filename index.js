const API = {
    allPlants: 'https://openapi.programming-hero.com/api/plants',
    categories: 'https://openapi.programming-hero.com/api/categories',
    byCategory: id => `https://openapi.programming-hero.com/api/category/${id}`,
    detail: id => `https://openapi.programming-hero.com/api/plant/${id}`
  };

  const els = {
    year: document.getElementById('year'),
    categoryList: document.getElementById('categoryList'),
    productGrid: document.getElementById('productGrid'),
    cartList: document.getElementById('cartList'),
    cartTotal: document.getElementById('cartTotal'),
    spinner: document.getElementById('spinner'),
    modal: document.getElementById('modal'),
    modalClose: document.getElementById('modalClose'),
    modalImg: document.getElementById('modalImg'),
    modalTitle: document.getElementById('modalTitle'),
    modalDesc: document.getElementById('modalDesc'),
    modalCategory: document.getElementById('modalCategory'),
    modalPrice: document.getElementById('modalPrice'),
    modalAdd: document.getElementById('modalAdd'),
  };

  let activeCategoryId = 'all';
  let cart = [];
  let modalPendingItem = null;

  const currency = n => `৳${Number(n||0).toLocaleString('en-IN')}`;
  const showSpinner = (on=true) => {
    els.spinner.classList.toggle('show', !!on);
    els.spinner.setAttribute('aria-hidden', on? 'false':'true');
  };

  /* CATEGORY LOADING */
  async function loadCategories(){
    showSpinner(true);
    try{
      const res = await fetch(API.categories);
      const data = await res.json();
      const cats = [{id:'all',category:'All Trees'},{id:'1',category:'Fruit Trees'}, {id:'2',category:'Flowering Trees'}, {id:'3',category:'Shade Trees'}, {id:'4',category:'Medicinal Trees'},{id:'5',category:'Timber Trees'},{id:'6',category:'Evergreen Trees'},{id:'7',category:'Ornamental Plants'},{id:'8',category:'Bamboo'},{id:'9',category:'Climbers'},{id:'10',category:'Aquatic Plants'}];
      renderCategories(cats);
    }catch(e){ console.error(e); }
    finally{ showSpinner(false); }
  }

  function renderCategories(cats){
    els.categoryList.innerHTML = '';
    cats.forEach(c => {
      const btn = document.createElement('button');
      btn.textContent = c.category || 'Unknown';
      btn.dataset.id = c.id || 'all';
      if((c.id||'all')===activeCategoryId) btn.classList.add('active');
      btn.addEventListener('click', () => selectCategory(btn.dataset.id, btn));
      els.categoryList.appendChild(btn);
    });
  }

  async function selectCategory(id, btn){
    activeCategoryId = id;
    [...els.categoryList.children].forEach(b=>b.classList.toggle('active', b.dataset.id===id));
    await loadProducts(id);
  }

  /* PRODUCT LOADING */
  async function loadProducts(categoryId='all'){
    showSpinner(true);
    try{
      const url = categoryId==='all' ? API.allPlants : API.byCategory(categoryId);
      const res = await fetch(url);
      const data = await res.json();
      const items = data?.plants || data?.data || [];
      renderProducts(items);
    }catch(e){ console.error(e); }
    finally{ showSpinner(false); }
  }

  function productCard(p){
    const el = document.createElement('article');
    el.className = 'product card';
    el.innerHTML = `
      <div class="image">${p.image?`<img src="${p.image}" alt="${p.name}">`:''}</div>
      <h4 class="name"><button data-id="${p.id}" class="nameBtn" style="all:unset;cursor:pointer;color:#14532d">${p.name||'Tree'}</button></h4>
      <p class="desc">${(p.description||'').slice(0,120)}</p>
      <div class="meta">
        <span class="pill">${p.category || 'Tree'}</span>
        <span class="price">${currency(p.price)}</span>
      </div>
      <button class="btn add">Add to Cart</button>
    `;
    el.querySelector('.add').addEventListener('click', ()=> addToCart(p));
    el.querySelector('.nameBtn').addEventListener('click', ()=> openModal(p.id));
    return el;
  }

  function renderProducts(list){
    els.productGrid.innerHTML = '';
    list.forEach(p => els.productGrid.appendChild(productCard(p)));
  }

  /* MODAL */
  async function openModal(id){
    showSpinner(true);
    try{
      const res = await fetch(API.detail(id));
      const {plant} = await res.json();
      modalPendingItem = plant;
      els.modalImg.src = plant?.image || '';
      els.modalTitle.textContent = plant?.name || '';
      els.modalDesc.textContent = plant?.description || '';
      els.modalCategory.textContent = plant?.category || '';
      els.modalPrice.textContent = currency(plant?.price);
      els.modal.classList.add('open');
      els.modal.setAttribute('aria-hidden','false');
    }catch(e){ console.error(e); }
    finally{ showSpinner(false); }
  }
  function closeModal(){
    els.modal.classList.remove('open');
    els.modal.setAttribute('aria-hidden','true');
  }
  els.modalClose.addEventListener('click', closeModal);
  els.modal.addEventListener('click', (e)=>{ if(e.target===els.modal) closeModal(); });
  els.modalAdd.addEventListener('click', ()=>{ if(modalPendingItem) addToCart(modalPendingItem); closeModal(); });

  /* CART */
  function addToCart(item){
    cart.push({id:item.id, name:item.name, price:Number(item.price)||0});
    renderCart();
  }
  function removeFromCart(id,index){
    cart.splice(index,1);
    renderCart();
  }
  function renderCart(){
    els.cartList.innerHTML = '';
    let total = 0;
    cart.forEach((c,idx)=>{
      total += c.price;
      const row = document.createElement('div');
      row.className = 'cart-item';
      row.innerHTML = `<span>${c.name}</span><div style="display:flex;gap:8px;align-items:center"><span>${currency(c.price)}</span><button class="remove" aria-label="Remove">❌</button></div>`;
      row.querySelector('.remove').addEventListener('click', ()=> removeFromCart(c.id, idx));
      els.cartList.appendChild(row);
    });
    els.cartTotal.textContent = currency(total);
  }

  /* Init */
  (function init(){
    els.year.textContent = new Date().getFullYear();
    loadCategories();
    loadProducts('all');
  })();