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
                localStorage.setItem('token', json.data);
                ED.dispatch({type: 'login ok', msg: '登录成功'})
            })
    }

    static logout() {
        Request.delete({url: API.logout, data: {"api_token": Auth.getToken()}})
            .then(json => {
                ED.dispatch({type: 'logout ok', msg: '登出成功'});
                localStorage.clear();
            })
    }
}