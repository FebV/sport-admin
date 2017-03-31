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

    static login({schoolnum, password}) {
        Request.post({url: API.login, data: {schoolnum, password}})
            .then(res => res.json())
            .then(json => {
                if(json.code == 1) {
                    localStorage.setItem('token', json.data);
                    ED.dispatch({type: 'login', msg: json.status});
                }
                else {
                    ED.dispatch({type: 'login fail', msg: json.status});
                }
            })
            .catch(e => {
                ED.dispatch({type: 'login fail', msg: '网络错误'});
            });
    }
    static logout() {
        Request.delete({url: API.logout, data: {"api_token": Auth.getToken()}})
            .then(res => res.json())
            .then(json => {
                if(json.code != 1) {
                    ED.dispatch({type: 'alert', msg: '登出失败'});
                    return;
                }
                ED.dispatch({type: 'alert', msg: '登出成功'});
            })
            .catch(err => ED.dispatch({type: 'alert', msg: '网络错误'})
)
        localStorage.clear();
        ED.dispatch({type: 'logout'});
    }
}