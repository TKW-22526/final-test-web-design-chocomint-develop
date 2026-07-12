// vnd
function formatVND(n) { 
    return n.toLocaleString('vi-VN') + ' đ'; 
}

document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const product = products[id];

    const container = document.getElementById('detail-content');

    if (product) {
        document.title = product.name + " - IoTShop";
        document.getElementById('breadcrumb-name').textContent = product.name;

        container.innerHTML = `
            <div class="col-12 col-md-5">
                <div class="product-img-box">
                    <img src="../${product.img}" alt="${product.name}" class="img-fluid">
                </div>
            </div>
            <div class="col-12 col-md-7">
                <span class="badge badge-model text-white mb-2 d-inline-block">${product.model}</span>
                <h2 class="fw-bold" style="color:#0d1b3e">${product.name}</h2>
                <p class="text-muted">${product.desc}</p>
                <p class="product-price price-tag mb-4">${formatVND(product.price)}</p>
                <button class="btn btn-black">Thêm vào giỏ hàng</button>
            </div>
        `;
    } else {
        container.innerHTML = `<div class="col-12"><p class="text-danger">Không tìm thấy sản phẩm.</p></div>`;
    }
});