document.addEventListener("DOMContentLoaded", () => {
    const productFilter = document.getElementById('product-filter');
    const bannerImg = document.getElementById('banner-img'); 
    const filterImages = {
        'all': 'assets/test-bg2.jpg',                 // Deffault img
        'osu': 'assets/test-bg4.webp',                   
        'education': 'assets/test-bg1.webp',       
        'professional': 'assets/test-bg3.jpg' 
    };

    // Kiểm tra xem cả select-box và thẻ ảnh có tồn tại trên trang không
    if (productFilter && bannerImg) {
        productFilter.addEventListener('change', function() {
            const selectedValue = this.value; // Lấy value hiện tại khi người dùng click chọn
            // Nếu value đó có định nghĩa ảnh trong object filterImages
            if (filterImages[selectedValue]) {
                // Thay đổi thuộc tính src của ảnh banner
                bannerImg.src = filterImages[selectedValue];
            }
        });
    }
});
