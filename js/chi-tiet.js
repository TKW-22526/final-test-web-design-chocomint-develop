document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const product = products[id];

    const container = document.getElementById('detail-content');

    if (product) {
        document.title = product.name + " - OpenTablet Shop";
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
                <p class="product-price price-tag mb-4">${CartDemo.formatVND(product.price)}</p>
                <button class="btn btn-black" id="add-to-cart-btn">Thêm vào giỏ hàng</button>
            </div>
        `;

        const addToCartButton = document.getElementById('add-to-cart-btn');

        if (addToCartButton) {
            addToCartButton.addEventListener('click', function () {
                CartDemo.addItem(product, 1);
                alert('Đã thêm sản phẩm vào giỏ hàng demo.');
            });
        }
    } else {
        container.innerHTML = `<div class="col-12"><p class="text-danger">Không tìm thấy sản phẩm.</p></div>`;
    }
});