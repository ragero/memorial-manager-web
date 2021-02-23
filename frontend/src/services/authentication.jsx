

class Autenticacao{ 

    static keys = {
        id: 'id',
        name : 'name',
        email : 'email',
        token : 'token'
    }

    static login(data){
        localStorage.setItem(Autenticacao.keys.id, data.id)
        localStorage.setItem(Autenticacao.keys.token, data.token)
        localStorage.setItem(Autenticacao.keys.email, data.email)
        localStorage.setItem(Autenticacao.keys.name, data.name)
    }

    static logout(){
        localStorage.removeItem(Autenticacao.keys.id)
        localStorage.removeItem(Autenticacao.keys.token)
        localStorage.removeItem(Autenticacao.keys.email)
        localStorage.removeItem(Autenticacao.keys.name)
    }

    static isAuthenticade(){
        return localStorage.getItem(Autenticacao.keys.token) !== null
    }

    static getInfo(){
        return {
            id: localStorage.getItem(Autenticacao.keys.id),
            name: localStorage.getItem(Autenticacao.keys.name),
            email: localStorage.getItem(Autenticacao.keys.email),
            token: localStorage.getItem(Autenticacao.keys.token)
        }
    }

    static getToken(){
        return localStorage.getItem(Autenticacao.keys.token)
    }

    static getEmail(){
        return localStorage.getItem(Autenticacao.keys.email)
    }

    static getName(){
        return localStorage.getItem(Autenticacao.keys.name)
    }

}

export default Autenticacao