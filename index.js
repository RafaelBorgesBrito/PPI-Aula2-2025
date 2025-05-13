import http from 'http';
import express from "express";

const porta = 3001;
const host = "localhost";
const app = express();

const jogos = [];

app.use(express.urlencoded({ extended: true }));

app.get("/cadastro", (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Cadastro de RPG Nerd</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">
    <style>
        body {
            background-color: #121212;
            color: #e0e0e0;
            font-family: 'Courier New', Courier, monospace;
        }

        .card {
            background-color: #1E1E2F;
            border: 1px solid #9D4EDD;
        }

        .bg-nerd {
            background-color: #9D4EDD !important;
            color: white;
        }

        .btn-nerd {
            background-color: #9D4EDD;
            border-color: #9D4EDD;
            color: white;
            box-shadow: 0 0 10px #9D4EDD;
        }

        .btn-nerd:hover {
            background-color: #7A2CC8;
            border-color: #7A2CC8;
        }

        .form-control, .form-select, textarea {
            background-color: #2A2A40;
            color: #ffffff;
            border: 1px solid #9D4EDD;
        }

        .form-select:focus {
            border-color: #c77dff;
            box-shadow: 0 0 0 0.25rem rgba(157, 78, 221, 0.4);
        }

        .form-check-label {
            color: #ccc;
        }

        label {
            color: #ccc;
        }

        ::placeholder {
            color: #cccccc !important;
            opacity: 1;
        }

        .min-vh-100 {
            min-height: 100vh;
        }
    </style>
</head>
<body class="min-vh-100 d-flex align-items-center">
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-lg-9 col-md-10">
                <div class="card shadow-lg">
                    <div class="card-header bg-nerd text-center">
                        <h2 class="mb-0"><i class="bi bi-controller"></i> Cadastro de RPG Nerd</h2>
                    </div>
                    <div class="card-body p-4">
                        <form method="POST" action="/jogocadastrado" class="row g-3">
                            <div class="col-12">
                                <label for="inputNome" class="form-label"><i class="bi bi-controller"></i> Nome do Jogo</label>
                                <input type="text" class="form-control" id="inputNome" name="nome" required placeholder="Ex: The Elders Scroll">
                            </div>
                            <div class="col-12">
                                <label for="inputGenero" class="form-label"><i class="bi bi-journal-bookmark-fill"></i> Gênero de RPG</label>
                                <select id="inputGenero" name="genero" class="form-select" required>
                                    <option value="" selected disabled>Escolha um gênero...</option>
                                    <option>RPG de Ação</option>
                                    <option>RPG Tático</option>
                                    <option>RPG de Mesa</option>
                                    <option>MMORPG</option>
                                    <option>JRPG</option>
                                    <option>Outros</option>
                                </select>
                            </div>
                            <div class="col-12">
                                <label for="inputEquipe" class="form-label"><i class="bi bi-people-fill"></i> Equipe de Desenvolvimento</label>
                                <input type="text" class="form-control" id="inputEquipe" name="equipe" required placeholder="Ex: NerdForce Studios">
                            </div>
                            <div class="col-md-6">
                                <label for="inputLancamento" class="form-label"><i class="bi bi-calendar-event"></i> Data de Lançamento</label>
                                <input type="date" class="form-control" id="inputLancamento" name="lancamento" required>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label d-block"><i class="bi bi-display"></i> Plataformas</label>
                                <div class="form-check"><input class="form-check-input" type="checkbox" name="plataformas" value="PC" id="pc"><label class="form-check-label" for="pc">PC</label></div>
                                <div class="form-check"><input class="form-check-input" type="checkbox" name="plataformas" value="PlayStation" id="ps"><label class="form-check-label" for="ps">PlayStation</label></div>
                                <div class="form-check"><input class="form-check-input" type="checkbox" name="plataformas" value="Xbox" id="xbox"><label class="form-check-label" for="xbox">Xbox</label></div>
                                <div class="form-check"><input class="form-check-input" type="checkbox" name="plataformas" value="Switch" id="switch"><label class="form-check-label" for="switch">Nintendo Switch</label></div>
                                <div class="form-check"><input class="form-check-input" type="checkbox" name="plataformas" value="Mobile" id="mobile"><label class="form-check-label" for="mobile">Mobile</label></div>
                            </div>
                            <div class="col-md-6">
                                <label for="inputFaixa" class="form-label"><i class="bi bi-shield-exclamation"></i> Faixa Etária</label>
                                <select id="inputFaixa" name="faixaEtaria" class="form-select" required>
                                    <option value="" selected disabled>Selecione...</option>
                                    <option>Livre</option>
                                    <option>10+</option>
                                    <option>12+</option>
                                    <option>14+</option>
                                    <option>16+</option>
                                    <option>18+</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label for="inputModo" class="form-label"><i class="bi bi-people"></i> Modo de Jogo</label>
                                <select id="inputModo" name="modo" class="form-select" required>
                                    <option value="" selected disabled>Selecione...</option>
                                    <option>Single-player</option>
                                    <option>Multiplayer</option>
                                    <option>Cooperativo</option>
                                    <option>Online</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label for="inputEngine" class="form-label"><i class="bi bi-hammer"></i> Engine Usada</label>
                                <input type="text" class="form-control" id="inputEngine" name="engine" placeholder="Ex: Unity, Unreal">
                            </div>
                            <div class="col-md-6">
                                <label for="inputSite" class="form-label"><i class="bi bi-globe"></i> Site Oficial</label>
                                <input type="url" class="form-control" id="inputSite" name="site" placeholder="https://">
                            </div>
                            <div class="col-12">
                                <button type="submit" class="btn btn-nerd btn-lg w-100 mt-3"><i class="bi bi-rocket-takeoff-fill"></i> Cadastrar Jogo</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
`);
    res.end();
});

app.post("/jogocadastrado", (req, res) => {
    const nome = req.body.nome;
    const genero = req.body.genero;
    const desenvolvedora = req.body.equipe;
    const lancamento = req.body.lancamento;
    const plataformas = req.body.plataformas;
    const faixaEtaria = req.body.faixaEtaria;
    const modo = req.body.modo; 
    const engine = req.body.engine;
    const site = req.body.site;
    
    
    const erros = [];
    
    
    if (!nome || nome.length < 2) {
        erros.push("O nome do jogo deve ter pelo menos 2 caracteres");
    } else if (nome[0] !== nome[0].toUpperCase()) {
        erros.push("O nome do jogo deve começar com letra maiúscula");
    }
    
    
    if (!desenvolvedora || desenvolvedora.length < 2) {
        erros.push("O nome da desenvolvedora deve ter pelo menos 2 caracteres");
    } else if (desenvolvedora[0] !== desenvolvedora[0].toUpperCase()) {
        erros.push("O nome da desenvolvedora deve começar com letra maiúscula");
    }
    
    
    if (lancamento) {
        const anoLancamento = new Date(lancamento).getFullYear();
        if (anoLancamento < 1975) {
            erros.push("O ano de lançamento deve ser maior que 1975");
        }
    } else {
        erros.push("A data de lançamento é obrigatória");
    }
    
    
    if (!genero || genero === "Escolha um gênero...") {
        erros.push("Selecione um gênero de RPG");
    }
    
    
    if (!plataformas) {
        erros.push("Selecione pelo menos uma plataforma");
    }
    
    
    if (!faixaEtaria || faixaEtaria === "Selecione...") {
        erros.push("Selecione uma faixa etária");
    }
    
    
    if (!modo || modo === "Selecione...") {
        erros.push("Selecione um modo de jogo");
    }
    
 
    if (engine && engine.length > 0) {
        if (engine[0] !== engine[0].toUpperCase()) {
            erros.push("O nome da engine deve começar com letra maiúscula");
        }
    }
    
    
    if (site && site.length > 0) {
        if (!site.includes("https://")) {
            erros.push("O site deve incluir https://");
        }
        if (!site.includes(".com")) {
            erros.push("O site deve conter .com");
        }
    }
    
    
    if (erros.length > 0) {
        res.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Erro no Cadastro</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">
            <style>
                body {
                    background-color: #121212;
                    color: #e0e0e0;
                    font-family: 'Courier New', Courier, monospace;
                }

                .card {
                    background-color: #1E1E2F;
                    border: 1px solid #9D4EDD;
                }

                .bg-nerd {
                    background-color: #9D4EDD !important;
                    color: white;
                }

                .btn-nerd {
                    background-color: #9D4EDD;
                    border-color: #9D4EDD;
                    color: white;
                    box-shadow: 0 0 10px #9D4EDD;
                }

                .btn-nerd:hover {
                    background-color: #7A2CC8;
                    border-color: #7A2CC8;
                }
                
                .alert-danger {
                    background-color: #3a0404;
                    color: #ff7373;
                    border-color: #ff5252;
                }

                .min-vh-100 {
                    min-height: 100vh;
                }
            </style>
        </head>
        <body class="min-vh-100 d-flex align-items-center">
            <div class="container py-5">
                <div class="row justify-content-center">
                    <div class="col-lg-9 col-md-10">
                        <div class="card shadow-lg">
                            <div class="card-header bg-nerd text-center">
                                <h2 class="mb-0"><i class="bi bi-exclamation-triangle"></i> Erros no Cadastro</h2>
                            </div>
                            <div class="card-body p-4">
                                <div class="alert alert-danger">
                                    <ul class="mb-0">
                                        ${erros.map(erro => `<li>${erro}</li>`).join('')}
                                    </ul>
                                </div>
                                <a href="/cadastro" class="btn btn-nerd btn-lg w-100 mt-3">
                                    <i class="bi bi-arrow-left"></i> Voltar para o Cadastro
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js"></script>
        </body>
        </html>
        `);
    } else {
        
        
        jogos.push({
            nome: nome,
            genero: genero,
            equipe: desenvolvedora,
            lancamento: lancamento,
            plataformas: plataformas,
            faixaEtaria: faixaEtaria,
            modo: modo,
            engine: engine,
            site: site
        });

        
        res.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Jogo Cadastrado com Sucesso</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">
            <style>
                body {
                    background-color: #121212;
                    color: #e0e0e0;
                    font-family: 'Courier New', Courier, monospace;
                }

                .card {
                    background-color: #1E1E2F;
                    border: 1px solid #9D4EDD;
                }

                .bg-nerd {
                    background-color: #9D4EDD !important;
                    color: white;
                }

                .btn-nerd {
                    background-color: #9D4EDD;
                    border-color: #9D4EDD;
                    color: white;
                    box-shadow: 0 0 10px #9D4EDD;
                }

                .btn-nerd:hover {
                    background-color: #7A2CC8;
                    border-color: #7A2CC8;
                }
                
                .alert-success {
                    background-color: #0a2e0a;
                    color: #7fff7f;
                    border-color: #28a745;
                }

                .min-vh-100 {
                    min-height: 100vh;
                }
            </style>
        </head>
        <body class="min-vh-100 d-flex align-items-center">
            <div class="container py-5">
                <div class="row justify-content-center">
                    <div class="col-lg-9 col-md-10">
                        <div class="card shadow-lg">
                            <div class="card-header bg-nerd text-center">
                                <h2 class="mb-0"><i class="bi bi-check-circle"></i> Jogo Cadastrado com Sucesso!</h2>
                            </div>
                            <div class="card-body p-4">
                                <div class="alert alert-success mb-4">
                                    <p class="mb-0">O jogo <strong>${nome}</strong> foi cadastrado com sucesso!</p>
                                </div>
                                
                                <div class="d-flex gap-3">
                                    <a href="/cadastro" class="btn btn-nerd btn-lg flex-grow-1">
                                        <i class="bi bi-plus-circle"></i> Cadastrar Novo Jogo
                                    </a>
                                    <a href="/listadejogos" class="btn btn-nerd btn-lg flex-grow-1">
                                        <i class="bi bi-list-ul"></i> Ver Lista de Jogos
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js"></script>
        </body>
        </html>
        `);
    }
    res.end();
});

app.get("/listadejogos", (req, res) => {
    
    let pagina = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Lista de Jogos RPG Nerd</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">
        <style>
            body {
                background-color: #121212;
                color: #e0e0e0;
                font-family: 'Courier New', Courier, monospace;
            }

            .card {
                background-color: #1E1E2F;
                border: 1px solid #9D4EDD;
            }

            .bg-nerd {
                background-color: #9D4EDD !important;
                color: white;
            }

            .btn-nerd {
                background-color: #9D4EDD;
                border-color: #9D4EDD;
                color: white;
                box-shadow: 0 0 10px #9D4EDD;
            }

            .btn-nerd:hover {
                background-color: #7A2CC8;
                border-color: #7A2CC8;
            }
            
            /* Ajustes para tabela escura */
            .table-dark {
                --bs-table-bg: #2c1a4a; /* Fundo roxo escuro */
                border-color: #9D4EDD;
            }
            
            .table-dark th {
                background-color: #9D4EDD;
                text-align: center;
            }
            
            .table-dark td {
                text-align: center;
                vertical-align: middle;
            }
        </style>
    </head>
    <body class="min-vh-100 d-flex align-items-center">
        <div class="container py-5">
            <div class="row justify-content-center">
                <div class="col-12">
                    <div class="card shadow-lg">
                        <div class="card-header bg-nerd text-center">
                            <h2 class="mb-0"><i class="bi bi-list-ul"></i> Lista de Jogos RPG </h2>
                        </div>
                        <div class="card-body p-4">`;
    
    
    if (jogos.length == 0) {
        pagina += `
            <div class="alert alert-warning">
                Nenhum jogo cadastrado ainda!
            </div>
            <a href="/cadastro" class="btn btn-nerd">Cadastrar Jogo</a>`;
    } else {
        
        pagina += `
            <div class="table-responsive">
                <table class="table table-dark table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Gênero</th>
                            <th>Equipe</th>
                            <th>Lançamento</th>
                            <th>Plataformas</th>
                            <th>Faixa Etária</th>
                            <th>Modo</th>
                            <th>Engine</th>
                            <th>Site</th>
                        </tr>
                    </thead>
                    <tbody>`;
        
        
        for (let i = 0; i < jogos.length; i++) {
            pagina += `
                        <tr>
                            <td>${jogos[i].nome}</td>
                            <td>${jogos[i].genero}</td>
                            <td>${jogos[i].equipe}</td>
                            <td>${jogos[i].lancamento}</td>
                            <td>${jogos[i].plataformas}</td>
                            <td>${jogos[i].faixaEtaria}</td>
                            <td>${jogos[i].modo}</td>
                            <td>${jogos[i].engine || "Não informado"}</td>
                            <td>${jogos[i].site || "Não informado"}</td>
                        </tr>`;
        }
        
        pagina += `
                    </tbody>
                </table>
            </div>
            <div class="text-center mt-3">
                <a href="/cadastro" class="btn btn-nerd">Cadastrar Novo Jogo</a>
            </div>`;
    }
    
    
    pagina += `
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js"></script>
    </body>
    </html>`;
    
    
    res.send(pagina);
    res.end();
});

const servidor = http.createServer(app);
servidor.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
});

export default app;
