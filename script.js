const produtos = [
    { id: 1, nome: "Camisa do Milan", preco: 199.99, imagem: "camisas/milan.jpg" },
    { id: 2, nome: "Camisa do Manchester City", preco: 179.99, imagem: "camisas/manchestercity.jpg" },
    { id: 3, nome: "Camisa do Flamengo feminino", preco: 299.99, imagem: "camisas/flamengofeminino.jpeg" },
    { id: 5, nome: "Camisa do Bayern de Monique", preco: 179.99, imagem: "camisas/bayern.jpg" },
    { id: 6, nome: "Camisa do Palmeiras", preco: 99.99, imagem: "camisas/palmeiras.jpg" },
    { id: 7, nome: "Camisa do Santos", preco: 79.99, imagem: "camisas/santos.jpg" },
    { id: 8, nome: "Camisa do Barcelona", preco: 199.99, imagem: "camisas/barcelona.jpeg" },
    { id: 9, nome: "Camisa do Real Madrid", preco: 249.99, imagem: "https://acdn.mitiendanube.com/stores/003/408/481/products/913931f91-23bdb5ffccf8180f5416887489835729-1024-1024.jpeg" },
    { id: 10, nome: "Camisa do Chelsea", preco: 229.99, imagem: "https://acdn.mitiendanube.com/stores/002/205/667/products/8cc0b68b1-a040abdbc07ecfd1db16584331073738-640-0.jpeg" },
    { id: 11, nome: "Camisa do Juventus", preco: 259.99, imagem: "https://acdn.mitiendanube.com/stores/001/865/527/products/design-sem-nome-471-61c34234740bc817a116765665838398-640-0.png" },
    { id: 12, nome: "Camisa do Paris Saint-Germain", preco: 299.99, imagem: "https://acdn.mitiendanube.com/stores/002/044/094/products/6f14088a-9fe0e3a3f51d6b50f017216711530403-1024-1024.jpeg" },
    { id: 13, nome: "Camisa do Liverpool", preco: 279.99, imagem: "https://acdn.mitiendanube.com/stores/002/801/602/products/90bebad5-4739-4723-938e-d2798dc536c11-d73428f15885ed10dc16750076938976-480-0.jpeg" },
    { id: 14, nome: "Camisa do Arsenal", preco: 199.99, imagem: "https://acdn.mitiendanube.com/stores/002/798/009/products/d8ed955c1-1f2a29ad3522df55e316892011192716-1024-1024.jpg" },
    { id: 15, nome: "Camisa do Tottenham", preco: 179.99, imagem: "https://acdn.mitiendanube.com/stores/002/067/707/products/camisa-tottenham-away-azul-torcedor-masculino-nike-23-24-11-3bd1cac188cc5df04a16916751314562-1024-1024-0fcac6ebb50a68790f16917742987705-1024-1024.jpeg" },
    { id: 16, nome: "Camisa do Inter de Milão", preco: 209.99, imagem: "https://acdn.mitiendanube.com/stores/001/055/309/products/camisa-retro-do-inter-de-milao-umbro-1995-1996-home-1-casa-titular-azul-preto-torcedor-masculina-autentica-antiga-original-oficial-confiavel-loja-qualidade-frete-grati-2-d8fa3a1b1fcd15f15117000540489450-640-0.jpg" },
    { id: 17, nome: "Camisa do Atlético de Madrid", preco: 179.99, imagem: "https://acdn.mitiendanube.com/stores/001/435/082/products/camisa-atltico-de-madrid-away-2223-torcedor-nike-masculina-preta-e-azul3-4d4ef14478fd96f72016823413207169-1024-1024-e5f30c3f33bd6202e816863379397213-1024-1024.jpg" }
];

let carrinho = [];

// Função para renderizar os produtos
function renderizarProdutos(filtrados = produtos) {
    const container = document.getElementById('produtos-container');
    container.innerHTML = '';
    filtrados.forEach(produto => {
        container.innerHTML += `
            <div class="produto-card">
                <img src="${produto.imagem}" alt="${produto.nome}">
                <h3>${produto.nome}</h3>
                <div class="produto-precoAdd">
                    <div class="preco">
                    <img src="imagens/etiqueta-de-preco.png" alt="${produto.nome}"/>
                        <p>R$ ${produto.preco.toFixed(2)}</p>
                    </div>
                    <button onclick="adicionarAoCarrinho(${produto.id})"><img src="imagens/carrinho-de-compras.png" alt="${produto.nome}"/></button>
                </div>
            </div>
        `;
    });
}

// Função para buscar produtos
function buscarProdutos(termo) {
    const termoMinusculo = termo.toLowerCase();
    const produtosFiltrados = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(termoMinusculo)
    );
    renderizarProdutos(produtosFiltrados);
}

// Adiciona evento ao input de busca
document.querySelector('.pesquisar-input input').addEventListener('input', function (event) {
    buscarProdutos(event.target.value);
});

// Funções de carrinho (mantidas as mesmas)
function adicionarAoCarrinho(produtoId) {
    const produto = produtos.find(p => p.id === produtoId);
    const itemExistente = carrinho.find(item => item.id === produtoId);

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({ ...produto, quantidade: 1 });
    }
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const carrinhoItens = document.getElementById('carrinho-itens');
    carrinhoItens.innerHTML = '';
    let total = 0;

    carrinho.forEach((item, index) => {
        total += item.preco * item.quantidade;
        carrinhoItens.innerHTML += `
            <div class="carrinho-item">
                <img src="${item.imagem}" alt="${item.nome}">
                <div class="carrinho-detalhes">
                    <p>${item.nome}</p>
                    <p>R$ ${item.preco.toFixed(2)}</p>
                    <div class="quantidade-controle">
                        <button onclick="alterarQuantidade(${item.id}, -1)">-</button>
                        <input type="text" value="${item.quantidade}" readonly>
                        <button onclick="alterarQuantidade(${item.id}, 1)">+</button>
                    </div>
                </div>
            </div>
        `;
    });

    document.getElementById('total-preco').textContent = `Total: R$ ${total.toFixed(2)}`;
    document.getElementById('contador-carrinho').textContent = carrinho.length;
    document.getElementById('finalizar-compra').href = `https://wa.me/5584996002433?text=Ol%C3%A1!%20Gostaria%20de%20comprar%20os%20seguintes%20produtos:%20${encodeURIComponent(JSON.stringify(carrinho))}`;
}

function alterarQuantidade(produtoId, quantidade) {
    const item = carrinho.find(p => p.id === produtoId);
    if (item) {
        item.quantidade += quantidade;
        if (item.quantidade <= 0) {
            carrinho = carrinho.filter(p => p.id !== produtoId);
        }
        atualizarCarrinho();
    }
}

// Modal de carrinho
document.querySelector('.carrinho img').addEventListener('click', function () {
    document.getElementById('modal-carrinho').style.display = 'flex';
});

document.getElementById('close-modal').addEventListener('click', function () {
    document.getElementById('modal-carrinho').style.display = 'none';
});

// Renderiza os produtos inicialmente
renderizarProdutos();
