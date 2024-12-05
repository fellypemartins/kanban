const express    = require('express')
const database   = require('./database')
const bodyParser = require('body-parser')
const cors       = require('cors')
const app        = express()

app.use(cors())
app.use(bodyParser.json())

// Endpoint GET /usuario
app.get('/usuario', (req, res) => {
    try {
        database.query('SELECT * FROM usuario', (err, result) => {
            if (err) {
                return res.status(500).json(err)
            }
            if (result.length > 0) {
                return res.status(200).json(result)
            }
            return res.status(200).json({ message: 'Nenhum usuário encontrado' })
        })
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
})

// Endpoint POST /usuario
app.post('/usuario', (req, res) => {
    let nome = req.body.nome
    let email = req.body.email
    
    if (!nome || !email) {
        return res.status(400).json({ message: 'Nome e email são obrigatórios' })
    }

    try {
        database.query('INSERT INTO usuario(nome, email) VALUES (?, ?)', [nome, email], (err, result) => {
            if (err) {
                return res.status(500).json(err)
            }
            return res.status(201).json({ message: 'Usuário cadastrado com sucesso!' })
        })
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
})

// Endpoint GET /usuario/:id
app.get('/usuario/:id', (req, res) => {
    let id = req.params.id

    try {
        database.query('SELECT * FROM usuario WHERE id=?', [id], (err, result) => {
            if (err) {
                return res.status(500).json(err)
            }
            if (result.length > 0) {
                return res.status(200).json(result)
            }
            return res.status(200).json({ message: 'Nenhum usuário encontrado' })
        })
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
})

// Endpoint GET /tarefa
app.get('/tarefa', (req, res) => {
    try {
        database.query('SELECT * FROM tarefa', (err, result) => {
            if (err) {
                return res.status(500).json(err)
            }
            if (result.length > 0) {
                return res.status(200).json(result)
            }
            return res.status(200).json({ message: 'Nenhuma tarefa encontrada' })
        })
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
})

// Endpoint POST /tarefa
app.post('/tarefa', (req, res) => {
    let descricao = req.body.descricao
    let setor = req.body.setor
    let prioridade = req.body.prioridade
    let status = req.body.status
    let usuario_id = req.body.usuario_id

    if (!descricao || !setor || !prioridade || !status || !usuario_id) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' })
    }

    try {
        database.query('INSERT INTO tarefa(descricao, setor, prioridade, status, usuario_id) VALUES (?, ?, ?, ?, ?)', [descricao, setor, prioridade, status, usuario_id], (err, result) => {
            if (err) {
                return res.status(500).json(err)
            }
            return res.status(201).json({ message: 'Tarefa cadastrada com sucesso!' })
        })
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
})

// Endpoint GET /tarefa/:id
app.get('/tarefa/:id', (req, res) => {
    let id = req.params.id

    try {
        database.query('SELECT * FROM tarefa WHERE id=?', [id], (err, result) => {
            if (err) {
                return res.status(500).json(err)
            }
            if (result.length > 0) {
                return res.status(200).json(result)
            }
            return res.status(200).json({ message: 'Tarefa não encontrada' })
        })
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
})

// Endpoint PUT /tarefa/:id
app.put('/tarefa/:id', (req, res) => {
    let id = req.params.id
    let descricao = req.body.descricao
    let setor = req.body.setor
    let prioridade = req.body.prioridade
    let status = req.body.status

    if (!descricao || !setor || !prioridade || !status) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' })
    }

    try {
        database.query('UPDATE tarefa SET descricao=?, setor=?, prioridade=?, status=? WHERE id=?', [descricao, setor, prioridade, status, id], (err, result) => {
            if (err) {
                return res.status(500).json(err)
            }
            if (result.affectedRows > 0) {
                return res.status(200).json({ message: 'Tarefa atualizada com sucesso!' })
            }
            return res.status(404).json({ message: 'Tarefa não encontrada' })
        })
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
})

// Endpoint DELETE /tarefa/:id
app.delete('/tarefa/:id', (req, res) => {
    let id = req.params.id

    try {
        database.query('DELETE FROM tarefa WHERE id=?', [id], (err, result) => {
            if (err) {
                return res.status(500).json(err)
            }
            if (result.affectedRows > 0) {
                return res.status(200).json({ message: 'Tarefa deletada com sucesso!' })
            }
            return res.status(404).json({ message: 'Tarefa não encontrada' })
        })
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})
