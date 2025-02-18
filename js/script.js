document.addEventListener("DOMContentLoaded", function () {
    function atualizarCabecalhoEmpresas() {
        const empresa1 = document.getElementById("empresa1").value || "Empresa 1";
        const empresa2 = document.getElementById("empresa2").value || "Empresa 2";
        const empresa3 = document.getElementById("empresa3").value || "Empresa 3";

        document.getElementById("colEmpresa1").textContent = empresa1;
        document.getElementById("colEmpresa2").textContent = empresa2;
        document.getElementById("colEmpresa3").textContent = empresa3;
    }

    ["empresa1", "empresa2", "empresa3"].forEach(id => {
        document.getElementById(id).addEventListener("input", atualizarCabecalhoEmpresas);
    });

    function aplicarMascaraDinheiro(input) {
        let value = input.value.replace(/\D/g, "");
        value = (parseFloat(value) / 100).toFixed(2);
        input.value = "R$ " + value.replace(".", ",");
    }

    function adicionarLinha() {
        const tabela = document.getElementById("tabela-itens").getElementsByTagName("tbody")[0];
        const novaLinha = tabela.insertRow();
        const numLinhas = tabela.rows.length;

        const colunas = [
            numLinhas,
            "<input type='text' class='descricao' />",
            "<input type='number' class='quantidade' />",
            "<input type='text' class='unidade' />",
            "<input type='text' class='valor-unitario empresa1' />",
            "<input type='text' class='total empresa1-total' readonly />",
            "<input type='text' class='valor-unitario empresa2' />",
            "<input type='text' class='total empresa2-total' readonly />",
            "<input type='text' class='valor-unitario empresa3' />",
            "<input type='text' class='total empresa3-total' readonly />"
        ];

        colunas.forEach((coluna, index) => {
            const cell = novaLinha.insertCell(index);
            cell.innerHTML = coluna;
        });

        novaLinha.querySelectorAll(".valor-unitario").forEach(input => {
            input.addEventListener("input", function () {
                aplicarMascaraDinheiro(this);
                calcularMenorPreco(novaLinha);
            });
        });
    }

    function excluirLinhas() {
        document.querySelectorAll("#tabela-itens tbody tr input:checked").forEach(input => {
            input.closest("tr").remove();
        });
    }

    function calcularMenorPreco(linha) {
        const valores = [
            parseFloat(linha.querySelector(".empresa1").value.replace("R$ ", "").replace(",", ".")) || Infinity,
            parseFloat(linha.querySelector(".empresa2").value.replace("R$ ", "").replace(",", ".")) || Infinity,
            parseFloat(linha.querySelector(".empresa3").value.replace("R$ ", "").replace(",", ".")) || Infinity
        ];

        const menorValor = Math.min(...valores);
        linha.querySelectorAll(".valor-unitario").forEach(input => {
            input.parentNode.style.backgroundColor = (parseFloat(input.value.replace("R$ ", "").replace(",", ".")) === menorValor) ? "#d4edda" : "";
        });
    }

    function atualizarSecretario() {
        const secretarios = {
            "Secretaria de Administração e Finanças": "Thiago Portapila Gomes",
            "Secretaria de Assistência Social e Cidadania": "Paula Rachel Ghirotti Garcia",
            "Secretaria de Agricultura": "Cristiano José Nakaya",
            "Secretaria de Educação e Cultura": "Gina Sanchez",
            "Secretaria de Esporte e Lazer": "Juliana Soares Sobral",
            "Secretaria de Planejamento Urbano e Meio Ambiente": "José Luiz da Silva Maia",
            "Secretaria de Obras e Infraestrutura": "",
            "Secretaria de Saúde": "Altair Francisco Silva",
            "Secretaria de Serviços Urbanos e Mobilidade": "Luciano Coutinho"
        };

        document.getElementById("secretario").value = secretarios[document.getElementById("setor").value] || "";
    }

    document.getElementById("setor").addEventListener("change", atualizarSecretario);
    document.getElementById("adicionar-linhas").addEventListener("click", adicionarLinha);
    document.getElementById("excluir-linhas").addEventListener("click", excluirLinhas);
});
