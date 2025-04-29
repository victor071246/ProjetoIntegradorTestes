const isLocalhost = ['localhost', '127.0.0.1'].includes(
    window.location.hostname
);
console(isLocalhost);

console.log(isLocalhost);
const api_url = isLocalhost
    ? 'http://localhost:3333/products'
    : 'https://projetointegradortestes.onrender.com/products';
console.log(api_url);

const productsDiv = document.getElementById('products');

const api = fetch(api_url)
    .then((res) => res.json())
    .then((products) =>
        products.forEach((product) => {
            productsDiv.innerHTML += `
            <div class="product-card" id="${product._id}">
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
