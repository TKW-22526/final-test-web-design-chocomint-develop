const products = [
  {
    model: "CTL-472",
    name: "One by Wacom S",
    desc: "Bảng vẽ giá rẻ tốt nhất cho đại đa số người dùng cơ bản",
    price: 885000,
    img: "assets/ctl-472.webp",
    type: "no-screen",
    category: ["education", "osu"]
  },
  {
    model: "CTL 480",
    name: "Wacom Intuos Pen CTL-480",
    desc: "Bảng vẽ entry-level tốt nhất cho osu",
    price: 950000,
    img: "assets/ctl-480.jpg",
    type: "no-screen",
    category: ["education", "osu"]
  },
  {
    model: "PTH-660",
    name: "Wacom Intuos Pro Medium",
    desc: "là bảng vẽ điện tử cao cấp dành cho dân thiết kế, và người chơi osu chuyên nghiệp",
    price: 9390000,
    img: "assets/pth-660-k0.webp",
    type: "no-screen",
    category: ["professional", "osu"]
  },
  {
    model: "CTL-4100WL/K",
    name: "Wacom Intuos S (Bluetooth)",
    desc: "là bảng vẽ điện tử cao cấp dành cho dân thiết kế, và người chơi osu chuyên nghiệp",
    price: 2490000,
    img: "assets/ctl-4100wl-k.jpg",
    type: "no-screen",
    category: ["professional", "osu", "education"]

  },
  // có màn hình
  {
    model: "DTC-141",
    name: "Wacom One 14",
    desc: "Sản phẩm lý tưởng cho cả họa sĩ nghiệp dư lẫn những ai yêu thích tư duy hình ảnh. Với Wacom One, bạn có thể vẽ, phác thảo, chỉnh sửa ảnh, ghi chú, chú thích và khám phá đam mê sáng tạo theo cách dễ dàng hơn.",
    price: 9690000,
    img: "assets/dtc141.png",
    type: "screen",
    category: ["professional", "education"]
  },
  {
    model: "MD160FH",
    name: "XPPen Artist 15.6 Pro V2",
    desc: "là dòng bảng vẽ màn hình đồ họa được ưa chuộng, nổi bật với màn hình lớn 15.6 inch",
    price: 7990000,
    img: "assets/md160fh.jpg",
    type: "screen",
    category: ["professional", "education"]
  },
  {
    model: "iPad Pro 11",
    name: "iPad Pro M5 11 inch",
    desc: "iPad Pro M5 11-inch là công cụ tối thượng cho nhà sáng tạo. Nổi bật với thiết kế siêu mỏng 5.3 mm, chip M5 đột phá, màn hình Ultra Retina XDR siêu thực",
    price: 34900000,
    img: "assets/ipad-pro-m5.webp",
    type: "screen",
    category: ["professional"]
  },
  {
    model: "GT2702",
    name: "Huion Kamvas Pro 27 inch 144hz",
    desc: "Huion Kamvas Pro 27 (144Hz) là bảng vẽ màn hình 4K siêu lớn, đầu tiên trong ngành kết hợp không gian làm việc bao la, tần số quét 144Hz mượt mà và bút PenTech 4.0.",
    price: 57900000,
    img: "assets/kamvas-pro27144hz-comparison-pic.png",
    type: "screen",
    category: ["professional"]
  },
  {
    model: "DTK-246",
    name: "Wacom Cintiq 24",
    desc: " là bảng vẽ màn hình chuyên nghiệp cung cấp không gian làm việc rộng lớn. Đây là công cụ thiết yếu dành cho nhà sáng tạo nội dung, họa sĩ kỹ thuật số và các chuyên gia thiết kế.",
    price: 38900000,
    img: "assets/cintiq-24.jpg",
    type: "screen",
    category: ["professional"]
  }
];

function formatVND(n){
  return n.toLocaleString('vi-VN');
}

function mapProducts(items = products){
  return items.map((product, idx) => ({ product, idx }));
}

function renderProducts(listId, items = mapProducts()){
  const list = document.getElementById(listId);
  const tpl = document.getElementById('product-template');

  if (!list || !tpl) {
    return;
  }

  list.innerHTML = '';
  items.forEach(({ product, idx }) => {
    const clone = tpl.content.cloneNode(true);
    clone.querySelector('.product-img').src = product.img;
    clone.querySelector('.product-img').alt = product.name;
    clone.querySelector('.badge-model').textContent = product.model;
    clone.querySelector('.product-title').textContent = product.name;
    clone.querySelector('.product-desc').textContent = product.desc;
    clone.querySelector('.product-price').textContent = formatVND(product.price);
    clone.querySelector('.btn-black').setAttribute('data-idx', idx);
    list.appendChild(clone);
  });
}

function getFilteredProducts(keyword = '', type, category = 'all'){
  const normalizedKeyword = keyword.trim().toLowerCase();

  return mapProducts().filter(({ product }) => {
    const matchesType = type ? product.type === type : true;

    const matchesCategory = category === 'all' || (product.category && product.category.includes(category));

    if (!matchesType || !matchesCategory) {
      return false;
    }

    if (!normalizedKeyword) {
      return true;
    }

    return [product.model, product.name, product.desc]
      .join(' ')
      .toLowerCase()
      .includes(normalizedKeyword);
  });
}

function goDetail(link){
  const idx = link.getAttribute('data-idx');

  localStorage.setItem('products', JSON.stringify(products));

  window.location.href = 'html/chi-tiet.html?id=' + idx;
}

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const filterSelect = document.getElementById('product-filter');

  function applyFilters() {
    const currentKeyword = searchInput ? searchInput.value : '';
    const currentCategory = filterSelect ? filterSelect.value : 'all';

    const filteredNoScreen = getFilteredProducts(currentKeyword, 'no-screen', currentCategory);
    renderProducts('no-screen-list', filteredNoScreen);

    const filteredScreen = getFilteredProducts(currentKeyword, 'screen', currentCategory);
    renderProducts('screen-list', filteredScreen);
  }

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  if (filterSelect) {
    filterSelect.addEventListener('change', applyFilters);
  }

  applyFilters();
});