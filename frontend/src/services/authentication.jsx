

class Autenticacao{ 

    static keys = {
        id: 'id',
        nome : 'nome',
        email : 'email',
        token : 'token'
    }

    static login(dados){
        localStorage.setItem(Autenticacao.keys.id, dados.id)
        localStorage.setItem(Autenticacao.keys.token, dados.token)
        localStorage.setItem(Autenticacao.keys.email, dados.email)
        localStorage.setItem(Autenticacao.keys.nome, dados.nome)
    }

    static logout(){
        localStorage.removeItem(Autenticacao.keys.id)
        localStorage.removeItem(Autenticacao.keys.token)
        localStorage.removeItem(Autenticacao.keys.email)
        localStorage.removeItem(Autenticacao.keys.nome)
    }

    static isAuthenticade(){
        return localStorage.getItem(Autenticacao.keys.token) !== null
    }

    static getInfo(){
        return {
            id: localStorage.getItem(Autenticacao.keys.token.id),
            nome: localStorage.getItem(Autenticacao.keys.token),
            email: localStorage.getItem(Autenticacao.keys.email),
            token: localStorage.getItem(Autenticacao.keys.nome)
        }
    }

    static getToken(){
        return localStorage.getItem(Autenticacao.keys.token)
    }

    static getEmail(){
        return localStorage.getItem(Autenticacao.keys.email)
    }

    static getNome(){
        return localStorage.getItem(Autenticacao.keys.nome)
    }

}

export default Autenticacao