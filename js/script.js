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

    function adicionarLinhas() {
        const quantidadeInput = document.getElementById("quantidade-linhas");
        const quantidade = parseInt(quantidadeInput.value) || 1;
        quantidadeInput.value = ""; // Limpa o campo após adicionar
    
        const tabela = document.getElementById("tabela-itens").getElementsByTagName("tbody")[0];
    
        for (let i = 0; i < quantidade; i++) {
            const novaLinha = tabela.insertRow();
            const numLinhas = tabela.rows.length;
    
            const colunas = [
                `<span class='numero'>${numLinhas}</span>`,
                `<input type='text' class='descricao' />`,
                `<input type='number' class='quantidade' />`,
                `<input type='text' class='unidade' />`,
                `<input type='text' class='valor-unitario empresa1' />`,
                `<input type='text' class='total empresa1-total' readonly />`,
                `<input type='text' class='valor-unitario empresa2' />`,
                `<input type='text' class='total empresa2-total' readonly />`,
                `<input type='text' class='valor-unitario empresa3' />`,
                `<input type='text' class='total empresa3-total' readonly />`,
                `<input type='checkbox' class='linha-checkbox' />`
            ];
    
            colunas.forEach((coluna, index) => {
                const cell = novaLinha.insertCell(index);
                cell.innerHTML = coluna;
            });
    
            // Adiciona eventos manualmente após inserir os inputs na linha
            novaLinha.querySelector(".quantidade").addEventListener("input", function () {
                calcularTotal(this);
            });
    
            novaLinha.querySelectorAll(".valor-unitario").forEach(input => {
                input.addEventListener("input", function () {
                    aplicarMascaraDinheiro(this);
                    calcularTotal(this);
                });
            });
        }
    }
    

    function excluirLinhas() {
        document.querySelectorAll("#tabela-itens tbody tr .linha-checkbox:checked").forEach(input => {
            input.closest("tr").remove();
        });
        atualizarNumeracao();
    }

    function atualizarNumeracao() {
        document.querySelectorAll("#tabela-itens tbody tr").forEach((linha, index) => {
            linha.querySelector(".numero").textContent = index + 1;
        });
    }

    function calcularTotal(elemento) {
        const linha = elemento.closest("tr");
        const quantidade = parseFloat(linha.querySelector(".quantidade").value) || 0;
        linha.querySelectorAll(".valor-unitario").forEach((input, index) => {
            let valorUnitario = parseFloat(input.value.replace("R$ ", "").replace(",", ".")) || 0;
            let total = quantidade * valorUnitario;
            linha.querySelectorAll(".total")[index].value = "R$ " + total.toFixed(2).replace(".", ",");
        });
        calcularMenorPreco(linha);
        calcularValorEstimado(); // <-- Adiciona a chamada aqui
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
  
    document.getElementById("adicionar-linhas").addEventListener("click", adicionarLinhas);
    document.getElementById("excluir-linhas").addEventListener("click", excluirLinhas);
});

document.addEventListener("DOMContentLoaded", function () {
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

    atualizarSecretario(); // Garante que o nome do secretário seja preenchido ao carregar

    document.getElementById("setor").addEventListener("change", atualizarSecretario);
});

function calcularValorEstimado() {
    let totalEstimado = 0;

    document.querySelectorAll("#tabela-itens tbody tr").forEach(linha => {
        const valores = [
            parseFloat(linha.querySelector(".empresa1").value.replace("R$ ", "").replace(",", ".")) || Infinity,
            parseFloat(linha.querySelector(".empresa2").value.replace("R$ ", "").replace(",", ".")) || Infinity,
            parseFloat(linha.querySelector(".empresa3").value.replace("R$ ", "").replace(",", ".")) || Infinity
        ];

        const menorValor = Math.min(...valores);
        const quantidade = parseFloat(linha.querySelector(".quantidade").value) || 0;
        totalEstimado += menorValor * quantidade;
    });

    // Atualiza o campo de valor estimado na interface
    document.getElementById("valor-estimado").value = "R$ " + totalEstimado.toFixed(2).replace(".", ",");
}

document.addEventListener("DOMContentLoaded", function () {
    function gerarDespacho() {
        const empresa1 = document.getElementById("empresa1").value.trim() || "Empresa 1";
        const empresa2 = document.getElementById("empresa2").value.trim() || "Empresa 2";
        const empresa3 = document.getElementById("empresa3").value.trim() || "Empresa 3";
        const tipoSolicitacao = document.getElementById("tipo_solicitacao").value.toLowerCase();
        const tipoFinal = (tipoSolicitacao === "material") ? "aquisição" : "contratação";

        let fornecedores = {};
        let totalItens = 0;

        document.querySelectorAll("#tabela-itens tbody tr").forEach((linha, index) => {
            const numItem = index + 1;
            const valores = [
                { fornecedor: empresa1, valor: parseFloat(linha.querySelector(".empresa1").value.replace("R$ ", "").replace(",", ".")) || Infinity },
                { fornecedor: empresa2, valor: parseFloat(linha.querySelector(".empresa2").value.replace("R$ ", "").replace(",", ".")) || Infinity },
                { fornecedor: empresa3, valor: parseFloat(linha.querySelector(".empresa3").value.replace("R$ ", "").replace(",", ".")) || Infinity }
            ];

            const menorFornecedor = valores.reduce((prev, curr) => (curr.valor < prev.valor ? curr : prev)).fornecedor;

            if (!fornecedores[menorFornecedor]) {
                fornecedores[menorFornecedor] = [];
            }
            fornecedores[menorFornecedor].push(numItem);
            totalItens++;
        });

        let despacho = "";

        if (totalItens === 1) {
            // Se houver apenas 1 item, usa a versão singular do texto
            let fornecedorUnico = Object.keys(fornecedores)[0];
            despacho = `Autorizo a ${tipoFinal} do ${tipoSolicitacao} para o fornecedor ${fornecedorUnico} com dispensa de licitação de acordo com Art. 75, inciso II da Lei 14.133/2021.`;
        } else {
            // Para múltiplos itens, separa corretamente singular e plural
            despacho = `Autorizo a ${tipoFinal} do ${tipoSolicitacao} conforme: `;

            let itensFormatados = [];
            for (let fornecedor in fornecedores) {
                let itens = fornecedores[fornecedor];

                let textoItens = (itens.length === 1)
                    ? `Item nº ${itens[0]}`
                    : `Itens nº ${itens.join(", ")}`;

                itensFormatados.push(`${textoItens} para o fornecedor ${fornecedor}`);
            }

            despacho += itensFormatados.join("; ") + " com dispensa de licitação de acordo com Art. 75, inciso II da Lei 14.133/2021.";
        }

        document.getElementById("despacho").textContent = despacho;
    }

    // Atualiza o despacho sempre que houver mudança na tabela ou nos campos das empresas
    document.getElementById("tabela-itens").addEventListener("input", gerarDespacho);
    document.getElementById("empresa1").addEventListener("input", gerarDespacho);
    document.getElementById("empresa2").addEventListener("input", gerarDespacho);
    document.getElementById("empresa3").addEventListener("input", gerarDespacho);
});
