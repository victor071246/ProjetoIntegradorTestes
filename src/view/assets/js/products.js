const productsDiv = document.getElementById('products_session'); // Corrigido

const api = fetch('http://localhost:3333/products')
    .then((res) => res.json())
    .then((products) =>
        products.forEach((product, index) => {
            if (index % 2 == 0) {
                productsDiv.innerHTML += `
                <div class="section">
                    <div class="section-text-left">
                        <p>
                            ${product.text}
                        </p>
                    </div>
                    <img
                        src="${product.image_url}"
                    />
                </div>
            `;
            } else {
                productsDiv.innerHTML += `
                 <div class="section">
                    <img
                        src="${product.image_url}"
                    />
                    <div class="section-text-right">
                        <p>
                            ${product.text}
                        </p>
                    </div>
                </div>
            `;
            }
        })
    )
    .catch((error) => console.error('Erro ao carregar os produtos:', error)); // Adicionado tratamento de erro
