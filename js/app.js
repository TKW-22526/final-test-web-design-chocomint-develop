const products = [
  {
    model: "CTL-472",
    name: "One by Wacom S",
    desc: "Bảng vẽ giá rẻ tốt nhất cho đại đa số người dùng cơ bản",
    price: 885000,
    img: "assets/ctl-472.webp"
  },
  {
    model: "CTL 480",
    name: "Wacom Intuos Pen CTL-480",
    desc: "Bảng vẽ entry-level tốt nhất cho osu!",
    price: 950000,
    img: "assets/ctl-480.jpg"
  }
];

function formatVND(n){ return n.toLocaleString('vi-VN'); }

function renderProducts(){
  const list = document.getElementById('product-list');
  const tpl = document.getElementById('product-template');
  list.innerHTML = '';
  products.forEach((p, idx) => {
    const clone = tpl.content.cloneNode(true);
    clone.querySelector('.product-img').src = p.img;
    clone.querySelector('.product-img').alt = p.name;
    clone.querySelector('.badge-model').textContent = p.model;
    clone.querySelector('.product-title').textContent = p.name;
    clone.querySelector('.product-desc').textContent = p.desc;
    clone.querySelector('.product-price').textContent = formatVND(p.price);
    clone.querySelector('.btn-black').setAttribute('data-idx', idx);
    list.appendChild(clone);
  });
}
