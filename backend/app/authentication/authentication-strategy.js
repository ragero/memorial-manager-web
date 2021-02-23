const passport = require('passport')
const BearerStrategy = require('passport-http-bearer').Strategy
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const daoUser = require('../daos/user/daoUser')

async function comparePassword(password, passwordHash) {
    const response = await bcrypt.compare(password, passwordHash)
    if (response) {
        return response
    } else {
        throw new Error("Senha Inválida")
    }
}

passport.use(
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false
    }, async (email, password, done) => {
        try {
            console.log("Imprimindo os campos da autenticação dentro do local strategy")
            console.log('Email: ' + email)
            console.log('Senha: ' + password)
            const user = await daoUser.getUserByEmail(email)
            console.log('Nome do usuário: ', user.name )
            console.log('Senha do usuário: ', user.password)
            console.log('Aqui!!!! ============')
            if (await comparePassword(password, user.password)) {
                console.log('Bateu a senha')
                done(null, user)
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
                const user = await daoUser.getUserByEmail(payload.email)
                done(null, user, {token})
            } catch (error) {
                done(error)
            }
            
        }
    )
)