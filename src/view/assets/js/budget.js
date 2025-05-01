console.log('js funcionando');

const isLocalhost = ['localhost', '127.0.0.1'].includes(
    window.location.hostname
);

console.log(isLocalhost);

const api_url = isLocalhost
    ? 'http://localhost:3333/products'
    : 'https://projetointegradortestes.onrender.com/products';
console.log(api_url);

const productsDiv = document.getElementById('products_insertion_div');
if (window.innerWidth > 600) {
    fetch(api_url)
        .then((res) => res.json())
        .then((products) =>
            products.forEach((product) => {
                productsDiv.insertAdjacentHTML(
                    'beforeend',
                    `
                <div class="product">
                    <div class="image_and_title">
                        <img src="${product.image_url}" />
                        <p>${product.shop_title}</p>
                    </div>
                    <div class="quantity">
                        <button class="less">
                            <img src="assets/img/less_icon.png" />
                        </button>
                        <input class="quantity_input" value="1" />
                        <button class="more">
                            <img src="assets/img/more_icon.png" />
                        </button>
                    </div>
                    <div class="total">
                        <input class="total_input" value="1" />
                    </div>
                </div>
            `
                );
            })
        )
        .then(() => {
            document.querySelectorAll('.product').forEach((product) => {
                const minusBtn = product.querySelector('.less');
                const plusBtn = product.querySelector('.more');
                const input = product.querySelector('.quantity_input');
                const total = product.querySelector('.total_input');

                minusBtn.addEventListener('click', () => {
                    console.log('Subtração clicada');
                    const quantity = parseInt(input.value);
                    const totalValue = parseInt(total.value);
                    if (totalValue - quantity >= 0)
                        total.value = totalValue - quantity;
                });

                plusBtn.addEventListener('click', () => {
                    console.log('Adição clicada');
                    const quantity = parseInt(input.value);
                    const totalValue = parseInt(total.value);
                    total.value = totalValue + quantity;
                });
            });
        });
} else {
    const productsDiv = document.getElementById('products');

    fetch(api_url)
        .then((res) => res.json())
        .then((products) =>
            products.forEach((product) => {
                productsDiv.insertAdjacentHTML(
                    'beforeend',
                    `
            <div class="mobile_product">
                <img src="${product.image_url}" />
                <div class="content">
                    <h2>${product.shop_title}</h2>

                    <div class="mobile_input">
                        <button class="less">
                            <img src="assets/img/less_icon.png" />
                        </button>
                        <input class="quantity_input" readonly value="1" />
                        <button class="more">
                            <img src="assets/img/more_icon.png" />
                        </button>
                    </div>
                </div>
            </div>
            `
                );
            })
        );
}
