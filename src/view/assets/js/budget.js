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
const btnWhatsapp = document.getElementById('whastapp_button_id');
let mensagem = 'Olá! Gostaria de fazer um orçamento:\n\n';

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
        })
        .then(() => {
            btnWhatsapp.addEventListener('click', () => {
                document.querySelectorAll('.product').forEach((product) => {
                    const input = product.querySelector('.quantity_input');
                    product;
                    const quantity = input.value;
                    const product_p =
                        product.querySelector('.image_and_title p');
                    const product_title = product_p.textContent;

                    mensagem += `${product_title} - Quantidade: ${quantity}\n`;
                });
                const url = `https://wa.me/16997684142?text=${encodeURIComponent(
                    mensagem
                )}`;
                console.log(mensagem);
                window.open(url, '_blank');
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
        )
        .then(() => {
            document.querySelectorAll('.mobile_product').forEach((product) => {
                const minusBtn = product.querySelector('.less');
                const plusBtn = product.querySelector('.more');
                const input = product.querySelector('.quantity_input');
                let quantity = parseInt(input.value);

                minusBtn.addEventListener('click', () => {
                    input.value - 1 < 0
                        ? (input.value = 0)
                        : (input.value -= 1);
                });

                plusBtn.addEventListener('click', () => {
                    quantity += 1;
                    input.value = quantity;
                });
            });
        })
        .then(() => {
            btnWhatsapp.addEventListener('click', () => {
                document
                    .querySelectorAll('.mobile_product')
                    .forEach((product) => {
                        const input = product.querySelector('.quantity_input');
                        product;
                        const quantity = input.value;
                        const product_p = product.querySelector('.content h2');
                        const product_title = product_p.textContent;

                        mensagem += `${product_title} - Quantidade: ${quantity}\n`;
                    });
                const url = `https://wa.me/16997684142?text=${encodeURIComponent(
                    mensagem
                )}`;
                console.log(mensagem);
                window.open(url, '_blank');
            });
        });
}
