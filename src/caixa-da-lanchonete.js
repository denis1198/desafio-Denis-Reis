class CaixaDaLanchonete {
  constructor() {
    // Descrição do cardápio e valores
    this.cardapio = {
      cafe: { descricao: "Café", valor: 3.0 },
      chantily: { descricao: "Chantily (extra do Café)", valor: 1.5 },
      suco: { descricao: "Suco Natural", valor: 6.2 },
      sanduiche: { descricao: "Sanduíche", valor: 6.5 },
      queijo: { descricao: "Queijo (extra do Sanduíche)", valor: 2.0 },
      salgado: { descricao: "Salgado", valor: 7.25 },
      combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.5 },
      combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.5 },
    };
  }

  calcularValorDaCompra(formaDePagamento, itens) {
    // 1a parte - verificar forma de pagamento
    if (!["dinheiro", "debito", "credito"].includes(formaDePagamento)) {
      return "Forma de pagamento inválida!";
    }

    // 2a parte - carrinho vazio?
    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    let valorTotal = 0;
    // definindo se itens principais se existem ou não
    const itensPrincipais = {};

    // 3a parte - Soma de valor total e divisão do array recebido
    for (const itemInfo of itens) {
      const [itemCodigo, quantidade] = itemInfo.split(",");
      const item = this.cardapio[itemCodigo];

      // 4a parte - o item é válido?
      if (!item) {
        return "Item inválido!";
      }

      // 4a parte - possui pelo menos 1 item?
      if (quantidade <= 0) {
        return "Quantidade inválida!";
      }

      // 5a parte - calculo do valor total
      valorTotal += item.valor * parseInt(quantidade);

      // 6a parte conferindo se possui itens principais e passando para a variável criada
      if (itemCodigo !== "chantily" && itemCodigo !== "queijo") {
        itensPrincipais[itemCodigo] =
          (itensPrincipais[itemCodigo] || 0) + parseInt(quantidade);
      }
    }

    // 7a parte - testando se algum item extra vai ser pedido sem principal
    for (const itemInfo of itens) {
      const [itemCodigo] = itemInfo.split(",");

      if (itemCodigo === "chantily" || itemCodigo === "queijo") {
        const principal = itemCodigo === "chantily" ? "cafe" : "sanduiche";

        if (!itensPrincipais[principal]) {
          return "Item extra não pode ser pedido sem o principal";
        }
      }
    }

    // 8a parte - calculando valores.
    if (formaDePagamento === "dinheiro") {
      valorTotal *= 0.95;
    } else if (formaDePagamento === "credito") {
      valorTotal *= 1.03;
    }

    // Final - retorno do valor e substituição do . pelos cálculos pela ,
    return `R$ ${valorTotal.toFixed(2).replace(".", ",")}`;
  }
}

export { CaixaDaLanchonete };
