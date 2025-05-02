const productsDiv = document.getElementById('products');

const isLocalhost = ['localhost', '127.0.0.1'].includes(
    window.location.hostname
);
const api_url = isLocalhost
    ? 'http://localhost:3333/products'
    : 'https://projetointegradortestes.onrender.com/products';

console.log(api_url);
const api = fetch(api_url)
    .then((res) => res.json())
    .then((products) =>
        products.forEach((product) => {
            productsDiv.innerHTML += `
            <div class="product-card" id="${product._id}">
                <button
                    class="delete-btn"
                    onclick="deleteProduct('${product._id}')"
                >
                    ×
                </button>
                    <button class="editing" onclick="editProductLoadInfo('${product._id}')">
                    
                        <img src="assets/img/icon_pen_editing.jpg" />
                    </button>
                <img
                    class="product-img"
                    src="${product.image_url}"
                    alt="Imagem do produto"
                />
                <div class="product-content">
                    <h3>${product.title}</h3>
                    <h4>${product.subtitle}</h4>
                    <p>${product.text}</p>
                </div>
            </div>
                    
    `;
        })
    );
document.querySelector('#products').addEventListener('click', (event) => {
    if (event.target.classList.contains('submit-button')) {
        // Verifica se o elemento clicado é um botão com a classe "botao"
        const index = Array.from(document.querySelectorAll('.botao')).indexOf(
            event.target
        );
        console.log(`Botão ${index + 1} clicado`);
        const title = document.getElementById('input-title').value.trim();
        const subtitle = document.getElementById('input-subtitle').value.trim();
        const image_url = document.getElementById('input-img-url').value.trim();
        const text = document.getElementById('textarea-text').value.trim();
        const color1 = document.getElementById('color-1').value.trim();
        const color2 = document.getElementById('color-2').value.trim();
        // const price = document.getElementById('price').value.trim();
        const shop_title = document
            .getElementById('input-shop-title')
            .value.trim();

        if (!title || !image_url || !text || !shop_title) {
            alert('Preencha todos os campos.');
            return;
        }

        const newProduct = {
            title,
            subtitle,
            shop_title,
            image_url,
            text,
            color1,
            color2,
        };

        fetch(api_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        })
            .then((res) => res.json())
            .then((product) => {
                // Adiciona o produto ao DOM sem recarregar
                productsDiv.innerHTML += `
            <div class="product-card" id="${product._id}">
                <button
                    class="delete-btn"
                    onclick="deleteProduct('${product._id}')"
                >
                    ×
                </button>
                <button class="editing">
                        <img src="assets/img/icon_pen_editing.jpg" />
                    </button>
                <img
                    class="product-img"
                    src="${product.image_url}"
                    alt="Imagem do produto"
                />
                <div class="product-content">
                    <h3>${product.title}</h3>
                    <h4>${product.subtitle}</h4>
                    <p>${product.text}</p>
                </div>
            </div>

    `;

                // Limpa os campos
                document.getElementById('input-title').value = '';
                document.getElementById('input-img-url').value = '';
                document.getElementById('textarea-text').value = '';
                document.getElementById('input-subtitle').value = '';
                // document.getElementById('price').value = '';
                document.getElementById('input-shop-title').value = '';
                document.getElementById('color-1').value = '';
                document.getElementById('color-2').value = '';
            })
            .catch((err) => {
                console.error('Erro ao adicionar produto:', err);
                alert('Erro ao adicionar produto.');
            });
    }
});

function deleteProduct(productId) {
    fetch(`${api_url}/${productId}`, {
        method: 'DELETE',
    })
        .then((res) => {
            if (res.ok) {
                // Remove o card do DOM
                const card = document.getElementById(productId);
                if (card) {
                    card.remove();
                }
            } else {
                console.error('Erro ao deletar o produto');
            }
        })
        .catch((err) => {
            console.error('Erro na requisição DELETE:', err);
        });
}
function editProductLoadInfo(productId) {
    fetch(`${api_url}/${productId}`)
        .then((res) => res.json())
        .then((product) => {
            document.getElementById('input-title').value = product.title;
            document.getElementById('input-subtitle').value = product.subtitle;
            document.getElementById('input-img-url').value = product.image_url;
            document.getElementById('textarea-text').value = product.text;
            document.getElementById('color-1').value = product.color1;
            document.getElementById('color-2').value = product.color2;
            document.getElementById('input-shop-title').value =
                product.shop_title;

            button = document.querySelector('.submit-button');
            button.textContent = 'Salvar Produto';
            button.setAttribute('data-id', productId);
            button.classList.replace('submit-button', 'editing-button');
        });
}

document.querySelector('#products').addEventListener('click', (event) => {
    if (event.target.classList.contains('editing-button')) {
        const title = document.getElementById('input-title').value.trim();
        const subtitle = document.getElementById('input-subtitle').value.trim();
        const image_url = document.getElementById('input-img-url').value.trim();
        const text = document.getElementById('textarea-text').value.trim();
        const color1 = document.getElementById('color-1').value.trim();
        const color2 = document.getElementById('color-2').value.trim();
        const productId = button.getAttribute('data-id');
        // const price = document.getElementById('price').value.trim();
        const shop_title = document
            .getElementById('input-shop-title')
            .value.trim();

        if (!title || !image_url || !text || !shop_title) {
            alert('Preencha todos os campos.');
            return;
        }

        const updatedProduct = {
            title,
            subtitle,
            shop_title,
            image_url,
            text,
            color1,
            color2,
        };

        fetch(`${api_url}/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
        })
            .then((response) => response.json())
            .then((updatedProduct) => {
                // Atualiza o produto no DOM
                const card = document.getElementById(productId);
                if (card) {
                    card.querySelector('.product-content h3').textContent =
                        title;
                    card.querySelector('.product-content h4').textContent =
                        subtitle;
                    card.querySelector('.product-content p').textContent = text;
                    card.querySelector('.product-img').src = image_url;
                }
            })
            .catch((err) => {
                console.error('Erro na requisição PUT:', err);
            })
            .then(() => {
                document.getElementById('input-title').value = '';
                document.getElementById('input-subtitle').value = '';
                document.getElementById('input-img-url').value = '';
                document.getElementById('textarea-text').value = '';
                document.getElementById('color-1').value = '';
                document.getElementById('color-2').value = '';
                document.getElementById('input-shop-title').value = '';
            });

        button = document.querySelector('.editing-button');
        button.textContent = 'Adicionar Produto';
        button.setAttribute('data-id', '');
        button.classList.replace('editing-button', 'submit-button');
    }
});
