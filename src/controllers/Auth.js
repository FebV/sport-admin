import Request from './Request';
import ED from './EventDispatcher';
import API from './API';

export default class Auth {


    static isLogin() {
        return !!localStorage.getItem('token');
    }

    static getToken() {
        return localStorage.getItem('token');
    }

    static loginCallback(token) {
        
    }

    static login({schoolnum, password}) {
        Request.post({url: API.login, data: {schoolnum, password}})
            .then(res => {
                localStorage.setItem('token', res);
                ED.dispatch({type: 'login ok', msg: '登录成功'})
            })
    }

    static logout() {
        let token = Auth.getToken();
        localStorage.clear();
        location.href = "/";
        Request.delete({url: API.logout, data: {"api_token": token}})
            .then(json => {
                ED.dispatch({type: 'logout ok', msg: '登出成功'});
            })
    }
}