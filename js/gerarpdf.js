// Função para gerar o PDF
function gerarPDF() {
    function dataPorExtenso() {
        const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
        const hoje = new Date();
        return `Agudos, ${hoje.getDate()} de ${meses[hoje.getMonth()]} de ${hoje.getFullYear()}`;
    }

    const docDefinition = {
        content: [
            {
                columns: [
                    { image: "data:image/png;base64...", width: 70 },
                    {
                        stack: [
                            { text: "PREFEITURA MUNICIPAL DE AGUDOS", style: "header" },
                            { text: "DOCUMENTO DE COMPRA DIRETA", style: "title" }
                        ],
                        alignment: "center"
                    }
                ]
            },
            
            { text: "Dados da Solicitação", style: "sectionHeader", margin: [0, 10, 0, 5] },
            { text: [{ text: "Setor Solicitante: ", bold: true }, document.getElementById("setor").value], style: "text" },
            { text: [{ text: "Tipo de Solicitação: ", bold: true }, document.getElementById("tipo_solicitacao").value], style: "text" },
            { text: [{ text: "Nº da Ficha: ", bold: true }, document.getElementById("numero_ficha").value], style: "text" },
            { text: [{ text: "Nº da Aplicação: ", bold: true }, document.getElementById("numero_aplicacao").value], style: "text" },
            { text: [{ text: "Valor Estimado: ", bold: true }, document.getElementById("valor_estimado").value], style: "text" },
            { text: [{ text: "Forma de Pagamento: ", bold: true }, document.getElementById("forma_pagamento").value], style: "text" },
            { text: [{ text: "Prazo de Execução: ", bold: true }, document.getElementById("prazo_execucao").value], style: "text" },
            { text: "Justificativa", style: "sectionHeader", margin: [0, 10, 0, 5] },
            { text: document.getElementById("justificativa").value, style: "text", margin: [0, 0, 0, 10] },

            { text: "Itens Orçados", style: "sectionHeader", margin: [0, 10, 0, 5] },
            {
                table: {
                    headerRows: 1,
                    widths: ["auto", "*", "auto", "auto", "auto", "auto", "auto", "auto", "auto", "auto", "auto"],
                    body: [
                        ["Nº", "Descrição", "Qtd", "Unid.", "Empresa A Unit.", "Empresa A Total", "Empresa B Unit.", "Empresa B Total", "Empresa C Unit.", "Empresa C Total", "Menor Preço", "Fornecedor"],
                        // Os valores serão inseridos dinamicamente via JS
                    ]
                }
            },
            
            { text: "Despacho do Prefeito", style: "sectionHeader", margin: [0, 10, 0, 5] },
            { text: gerarDespacho(), style: "text", margin: [0, 0, 0, 10], alignment: "justify" },

            { text: dataPorExtenso(), style: "date", margin: [0, 20, 0, 20] },

            {
                columns: [
                    {
                        stack: [
                            { text: "Rafael Lima Fernandes", bold: true, alignment: "center" },
                            { text: "Prefeito Municipal", alignment: "center" },
                            { text: "_________________________", alignment: "center", margin: [0, 5, 0, 10] }
                        ]
                    }
                ]
            }
        ],

        footer: function (currentPage, pageCount) {
            return {
                text: "Praça Tiradentes - nº 650, Centro - CEP 17120-009 - Fone: (14) 3262-8500 - email: gabinete@agudos.sp.gov.br",
                style: "footer",
                alignment: "center",
                margin: [0, 10, 0, 0]
            };
        },

        styles: {
            header: { fontSize: 18, bold: true, alignment: "center" },
            title: { fontSize: 14, bold: true, alignment: "center", margin: [0, 10, 0, 10] },
            sectionHeader: { fontSize: 12, bold: true },
            text: { fontSize: 12, margin: [0, 2, 0, 5] },
            date: { fontSize: 12, bold: true, alignment: "center" },
            footer: { fontSize: 10, bold: true }
        }
    };

    pdfMake.createPdf(docDefinition).download("documento_compra_direta.pdf");
}

// Função para gerar o despacho com base nos itens e empresas selecionadas
function gerarDespacho() {
    const modalidade = document.getElementById("modalidade").value;
    let despacho = "Autoriza a contratação dos itens abaixo conforme:";
    // Lógica para agrupar os itens pelo menor preço e fornecedores
    return despacho;
}
