let index = 0;
const isLocalhost = ['localhost', '127.0.0.1'].includes(
    window.location.hostname
);

console.log(isLocalhost);

const api_url = isLocalhost
    ? 'http://localhost:3333/products'
    : 'https://projetointegradortestes.onrender.com/products';
console.log(api_url);

async function carregarProdutos() {
    try {
        const res = await fetch(api_url);
        const data = await res.json();
        const produtos = Array.isArray(data) ? data : [];
        console.log(produtos);
        return produtos;
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        return [];
    }
}

function mudarConteudo(produtos) {
    const produto = produtos[index];

    // Pega todas as folhas de estilo da página
    const styleSheet = [...document.styleSheets].find((sheet) => {
        try {
            return [...sheet.cssRules].some(
                (rule) => rule.selectorText === 'body::after'
            );
        } catch (e) {
            return false; // Evita erros de CORS
        }
    });

    if (styleSheet) {
        const regra = [...styleSheet.cssRules].find(
            (rule) => rule.selectorText === 'body::after'
        );

        if (regra) {
            regra.style.background = `linear-gradient(90deg, ${produto.color1}, ${produto.color2})`;

            // Alterando outras propriedades, se necessário
            regra.style.content = "''"; // Necessário para garantir que o conteúdo seja gerado
            regra.style.position = 'fixed';
            regra.style.top = '0';
            regra.style.left = '0';
            regra.style.width = '100vw';
            regra.style.height = '100vh';
            regra.style.backgroundSize = '200% 100%';
            regra.style.animation =
                'animateRadial 10s ease-in-out infinite alternate';
            regra.style.zIndex = '-1';
            regra.style.pointerEvents = 'none';
            regra.style.opacity = '0.7';
        }
    }

    // Atualiza o conteúdo do título e texto
    document.getElementById('title').textContent = produto.title;
    document.getElementById('subtitle').textContent = produto.subtitle;
    document.getElementById('text').textContent = produto.text;
    document.getElementById('image-src').src = produto.image_url;

    // Avança para o próximo item (ou volta ao primeiro)
    index = (index + 1) % produtos.length;
}

function iniciarTransicao(produtos) {
    const transicao = document.getElementById('transicao');
    setTimeout(() => {
        mudarConteudo(produtos);
    }, 700);

    // Mover a barra da esquerda até sair pela direita
    transicao.style.transition = 'none'; // Desabilita a transição momentaneamente
    transicao.style.left = '-100%'; // Move a barra para a esquerda (fora da tela)

    // Força reflow antes de animar
    void transicao.offsetWidth;

    // Ativa a transição de volta
    transicao.style.transition = 'left 2.5s ease';
    transicao.style.left = '100%'; // Move a barra para a direita (fora da tela)

    // Chama novamente a função de transição após 15 segundos
    setTimeout(() => {
        iniciarTransicao(produtos); // Chama a transição novamente com os produtos
    }, 7500); // Delay de 10000ms (15 segundos)
}

// Inicia a transição automaticamente após 15 segundos do carregamento da página
window.onload = async () => {
    console.log('teste');
    const produtos = await carregarProdutos();

    if (produtos.length > 0) {
        setTimeout(() => {
            iniciarTransicao(produtos); // Inicia a transição passando os produtos corretamente
        }, 7500); // 10000ms (10 segundos)
    } else {
        console.warn('Nenhum produto carregado.');
    }
};
