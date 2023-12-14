let produtos = [];

renderTable();

$('#criar').on('click', () => {
    $('#preco').val('');
    $('#nome').val('');
    $('#produto_id').val('');

    $('#modalProduto').modal('show');
});

$('#salvar').on('click', () =>{
    let id = $('#produto_id').val();
    let preco = $('#preco').val();
    let nome = $('#nome').val();

    if(id)
        return update(id, {id, nome, preco});

    id = getId();

    return criar({id, nome, preco});
});

function getId() {
    if(produtos.length > 0)
        return Number(produtos[produtos.length - 1].id) + 1;

    return 1;
}

function update(id, corpo) {
    produtos = produtos.map(produto => {
        if(id == produto.id)
            return corpo

        return produto;
    });
    $('#modalProduto').modal('hide');
    renderTable();
}

function criar(corpo) {
    produtos.push(corpo);
    renderTable();
    $('#modalProduto').modal('hide');

}

function deletar(id) {
    produtos = produtos.filter(produto => produto.id !== id);
    $('#modalProduto').modal('hide');
    renderTable();
}

function editar(id) {
    $('#modalProduto').modal('show');

    let [ produto ] = produtos.filter(produto => produto.id == id);

    $('#preco').val(produto.preco);
    $('#nome').val(produto.nome);
    $('#produto_id').val(id);
}

function renderTable() {
    $('tbody').html('');

    for(let produto of produtos) {
        $('tbody').append(`<tr>
            <td>${produto.id}</td>
            <td>${produto.nome}</td>
            <td>${produto.preco}</td>
            <td style="width: 20%;">
                <button class="btn btn-primary" onclick="editar(${produto.id})">editar</button>
                <button class="btn btn-danger" onclick="deletar(${produto.id})">deletar</button>
            </td>
        </tr>`)
    }
}
