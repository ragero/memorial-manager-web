const passport = require('passport')

module.exports = {
    local:
        (req, resp, next) => {
            passport.authenticate('local', { session: false }, (erro, user, info) => {
                if (erro) {
                    resp.json({ erro: 'Usuário ou senha inválido' })
                }

                if (!user) {
                    resp.json({ erro: 'Houve um problema na autenticação' })
                }
                req.user = user
                return next()
            })(req, resp, next)
        },
    bearear: (req, resp, next) => {
        passport.authenticate('bearer', { session: false }, (erro, user, info) => {
            console.log('========================= BEAREAR2 =================')
            if (erro) {
                resp.json({ erro: 'JWT mal formatado' })
            }
            if (!user) {
                resp.json({ erro: 'Requisição não autorizada' })
            }
            req.token = info.token
            req.user = user
            return next()
        })(req, resp, next)
    },
}