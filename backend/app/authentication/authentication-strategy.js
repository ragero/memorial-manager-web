const passport = require('passport')
const BearerStrategy = require('passport-http-bearer').Strategy
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const UsuarioDao = require('./dao-usuario')
const usuarioDao = new UsuarioDao()

async function comparaSenha(senha, senhaHash) {
    const resposta = await bcrypt.compare(senha, senhaHash)
    if (resposta) {
        return resposta
    } else {
        throw new Error("Senha Inválidos")
    }
}

passport.use(
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'senha',
        session: false
    }, async (email, senha, done) => {
        try {
            console.log("Imprimindo os campos da autenticação dentro do local strategy")
            console.log('Email: ' + email)
            console.log('Senha: ' + senha)
            const usuario = await usuarioDao.getUserByEmail(email)
            console.log('Usuario: ' + usuario)
            console.log('Aqui!!!! ============')
            if (await comparaSenha(senha, usuario.senha)) {
                done(null, usuario)
            } else {
                done('Senha Inválida')
            }

        } catch (erro) {
            done(erro)
        }


    })
)

passport.use(
    new BearerStrategy(
        async (token, done) => {
            try {
                const payload = jwt.verify(token, process.env.CHAVE_JWT)
                const usuario = await usuarioDao.getUserByEmail(payload.email)
                done(null, usuario, {token})
            } catch (error) {
                done(error)
            }

        }
    )
)