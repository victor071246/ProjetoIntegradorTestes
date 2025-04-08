const productsDiv = document.getElementById('cards'); // Corrigido

const api = fetch('http://localhost:3333/products')
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
                        <div class="product-content">
                            <h3>${product.title}</h3>
                            <img
                                class="product-img"
                                src="${product.image_url}"
                                alt="Imagem do produto"
                            />
                            <p>${product.text}</p>
                        </div>
                    </div>
    `;
        })
    );

document.querySelector('.submit-button').addEventListener('click', () => {
    const title = document.getElementById('input-title').value.trim();
    const image_url = document.getElementById('input-img-url').value.trim();
    const text = document.getElementById('textarea-text').value.trim();

    if (!title || !image_url || !text) {
        alert('Preencha todos os campos.');
        return;
    }

    const newProduct = { title, image_url, text };

    fetch('http://localhost:3333/products', {
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
                        <button class="delete-btn" onclick="deleteProduct('${product._id}')">×</button>
                        <div class="product-content">
                            <h3>${product.title}</h3>
                            <img class="product-img" src="${product.image_url}" alt="Imagem do produto" />
                            <p>${product.text}</p>
                        </div>
                    </div>
                `;

            // Limpa os campos
            document.getElementById('input-title').value = '';
            document.getElementById('input-img-url').value = '';
            document.getElementById('textarea-text').value = '';
        })
        .catch((err) => {
            console.error('Erro ao adicionar produto:', err);
            alert('Erro ao adicionar produto.');
        });
});

function deleteProduct(productId) {
    fetch(`http://localhost:3333/products/${productId}`, {
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
