import http from 'http';
import express from "express";

const porta = 3001;
const host = "localhost";
const app = express();

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
                            <div class="col-12">
                                <label for="inputDescricao" class="form-label"><i class="bi bi-card-text"></i> Descrição do Jogo</label>
                                <textarea class="form-control" id="inputDescricao" name="descricao" rows="4" required placeholder="Descreva a história, personagens e mundo do seu RPG..."></textarea>
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
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="gridCheck" required>
                                    <label class="form-check-label" for="gridCheck">
                                        Confirmo que as informações estão corretas
                                    </label>
                                </div>
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

});

let jogos = [];

app.post("/jogocadastrado", (req, res) => {
    
});

app.get("/listadejogos", (req, res) => {
    
});
const servidor = http.createServer(app);
servidor.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
});

export default app;
