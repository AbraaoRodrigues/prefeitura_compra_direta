document.addEventListener("DOMContentLoaded", function () {
    function atualizarCabecalhoEmpresas() {
        // Obtém os valores digitados nos campos das empresas
        const empresa1 = document.getElementById("empresa1").value || "Empresa 1";
        const empresa2 = document.getElementById("empresa2").value || "Empresa 2";
        const empresa3 = document.getElementById("empresa3").value || "Empresa 3";

        // Atualiza os cabeçalhos da tabela com os nomes preenchidos
        document.getElementById("colEmpresa1").textContent = `${empresa1}`;
        document.getElementById("colEmpresa1Total").textContent = `${empresa1}`;
        document.getElementById("colEmpresa2").textContent = `${empresa2}`;
        document.getElementById("colEmpresa2Total").textContent = `${empresa2}`;
        document.getElementById("colEmpresa3").textContent = `${empresa3}`;
        document.getElementById("colEmpresa3Total").textContent = `${empresa3}`;
    }

    // Adiciona eventos de input para atualizar os cabeçalhos em tempo real
    ["empresa1", "empresa2", "empresa3"].forEach(id => {
        document.getElementById(id).addEventListener("input", atualizarCabecalhoEmpresas);
    });

    function adicionarLinha() {
        const tabela = document.getElementById("tabela-itens").getElementsByTagName("tbody")[0];
        const novaLinha = tabela.insertRow();
        const numLinhas = tabela.rows.length;

        const colunas = [
            numLinhas,
            "<input type='text' class='descricao' />",
            "<input type='number' class='quantidade' oninput='calcularMenorPreco(this)' />",
            "<input type='text' class='unidade' />",
            "<input type='text' class='valor-unitario empresa1' oninput='calcularMenorPreco(this)' />",
            "<input type='text' class='total empresa1-total' readonly />",
            "<input type='text' class='valor-unitario empresa2' oninput='calcularMenorPreco(this)' />",
            "<input type='text' class='total empresa2-total' readonly />",
            "<input type='text' class='valor-unitario empresa3' oninput='calcularMenorPreco(this)' />",
            "<input type='text' class='total empresa3-total' readonly />",
            "<input type='text' class='menor-preco' readonly />"
        ];

        colunas.forEach((coluna, index) => {
            const cell = novaLinha.insertCell(index);
            cell.innerHTML = coluna;
        });
    }

    function calcularMenorPreco(elemento) {
        const linha = elemento.closest("tr");
        const valores = [
            parseFloat(linha.querySelector(".empresa1").value) || Infinity,
            parseFloat(linha.querySelector(".empresa2").value) || Infinity,
            parseFloat(linha.querySelector(".empresa3").value) || Infinity
        ];
        const menorValor = Math.min(...valores);
        linha.querySelector(".menor-preco").value = menorValor !== Infinity ? `R$ ${menorValor.toFixed(2)}` : "";
    }

    document.getElementById("adicionar-linhas").addEventListener("click", adicionarLinha);
});
