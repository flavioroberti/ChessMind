// Validação de Usuários
function validarUsuario() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var textoPainel = document.getElementById("painel_usuario");

    if (email != null && nome != null) {
        textoPainel.innerHTML = `Painel de ${nome}<br>
            ${email}`;
    }
}

function exibirMMRAtual() {
    const idUsuario = sessionStorage.ID_USUARIO;

    fetch(`http://localhost:3333/dashboard/mmrAtual/${idUsuario}`)
        .then(res => res.json())
        .then(data => {
            console.log("MMR Atual:", data);
            document.getElementById("user_mmr_atual").textContent = data.mmr || "0";
        })
        .catch(err => console.error("Erro ao buscar MMR Atual:", err));
}


function exibirMaiorMMR() {
    const idUsuario = sessionStorage.ID_USUARIO;

    fetch(`http://localhost:3333/dashboard/maiorMMR/${idUsuario}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("user_maior_mmr").textContent = data.maior;
        })
        .catch(err => console.error(err));
}

function exibirMediaAcertos() {
    const idUsuario = sessionStorage.ID_USUARIO;

    fetch(`http://localhost:3333/dashboard/mediaAcertos/${idUsuario}`)
        .then(res => res.json())
        .then(data => {
            const media = Number(data.media_acertos);

            if (isNaN(media)) {
                console.error("Média inválida:", data.media_acertos);
                document.getElementById("user_media_acertos").textContent = "N/A";
                return;
            }



            const mediaFormatada = (media % 1 === 0) ? media.toString() : media.toFixed(2);

            if (media === 0) {
                document.getElementById("user_media_acertos").textContent = "Ainda não há acertos";
                return;
            }

            document.getElementById("user_media_acertos").textContent = mediaFormatada;
        })
        .catch(err => {
            console.error(err);
            document.getElementById("user_media_acertos").textContent = "Erro";
        });
}


function exibirMaiorPontuacao() {
    const idUsuario = sessionStorage.ID_USUARIO;

    fetch(`http://localhost:3333/dashboard/maiorPontuacao/${idUsuario}`)
        .then(res => res.json())
        .then(data => {
            if (data.maior_pontuacao === null || data.maior_pontuacao === undefined) {
                console.error("Maior pontuação inválida:", data.maior_pontuacao);
                document.getElementById("user_maior_pontuacao").textContent = "Ainda não há pontuação";
                return;
            }
            document.getElementById("user_maior_pontuacao").textContent = data.maior_pontuacao;
        })
        .catch(err => console.error(err));
}

function exibirRanking() {
    fetch(`http://localhost:3333/dashboard/ranking`)
        .then(res => res.json())
        .then(data => {
            const rankingTableBody = document.querySelector("#ranking_table tbody");
            rankingTableBody.innerHTML = "";

            if (!Array.isArray(data) || data.length === 0) {
                rankingTableBody.innerHTML = `<tr><td colspan="3">Ranking não disponível.</td></tr>`;
                return;
            }

            data.forEach((usuario, index) => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${usuario.nome}</td>
                    <td>${usuario.acertos}</td>
                `;

                rankingTableBody.appendChild(row);
            });
        })
        .catch(err => {
            console.error(err);
            const rankingTableBody = document.querySelector("#ranking_table tbody");
            rankingTableBody.innerHTML = `<tr><td colspan="3">Erro ao carregar ranking.</td></tr>`;
        });
}

function exibirEvolucaoDesempenho() {
    const idUsuario = sessionStorage.ID_USUARIO;

    fetch(`http://localhost:3333/dashboard/evolucaoDesempenho/${idUsuario}`)
        .then(res => res.json())
        .then(data => {
            const chartData = data.map(item => ({
                x: new Date(item.dataTentativa),
                y: item.acertos
            }));

            const ctx = document.getElementById("graficoEvolucaoDesempenho").getContext("2d");
            new Chart(ctx, {
                type: "line",
                data: {
                    datasets: [{
                        label: "Evolução de Desempenho",
                        data: chartData,
                        borderColor: "rgba(75, 192, 192, 1)",
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        fill: true
                    }]
                },
                options: {
                    scales: {
                        x: {
                            type: "time",
                            time: {
                                unit: "day"
                            },
                            title: {
                                display: true,
                                text: "Tentativas"
                            }
                        },
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: "Acertos"
                            }
                        }
                    }
                }
            });
        })
        .catch(err => console.error(err));
}


function sairSessao() {
    sessionStorage.clear();
    window.location.href = "../index.html";
}