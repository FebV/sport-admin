import Request from './Request';
import API from './API';
import Auth from './Auth';
import ED from './EventDispatcher';

export default class User {
    
    constructor() {
        User.info = null;
        User.level = null;
    }

    static getInfo(force = false) {
        if(!User.info || force) {
            User.info = Request.get({url: API.getInfo, data: {api_token: Auth.getToken()}})
                .then(res => res ? User.info = Promise.resolve(res) : ED.dispatch({type: 'alert', msg: '获取用户信息失败'}))
        }
        return User.info;
    }

    static putInfo(info) {
        Request.put({url: API.putInfo, data: {
            api_token: Auth.getToken(),
            realname: info.realname,
            tel: info.tel,
        }})
            .then(res => ED.dispatch({type: 'info put ok', msg: "修改成功"}))
    }

    static getPeople() {
        if(!Auth.isLogin()) {
            return;
        }
        return Request.get({url: API.getPeople, data: {api_token: Auth.getToken()}})
                .then(res => res ? res : ED.dispatch({type: 'alert', msg: '管理员列表请求失败'}))
    }

    static getLevel() {
        if(User.level)
            return User.level;
        return User.level = Request.get({url: API.getLevel, data: {api_token: Auth.getToken()}})
                        .then(res => res ? res.grade : ED.dispatch({type: 'alert', msg: '请求用户级别失败'}))
    }

    static postPeople({schoolnum, password, grade, campus, realname}) {
        return Request.post({url: API.postPeople,
            data:{
                api_token: Auth.getToken(),
                schoolnum,
                password,
                grade,
                campus,
                realname,
            }
        })
            .then(res => ED.dispatch({type: 'user post ok', msg: '新增管理员成功'}))
    }

    static deletePeople(id) {
        Request.delete({url: `${API.deletePeople(id)}`, data: {
            api_token: Auth.getToken()
        }})
            .then(json => ED.dispatch({type: 'user delete ok', msg: '删除成功'}))
    }

    static authPeople(id, permission) {
        permission.api_token = Auth.getToken();
        Request.put({url: API.authPeople(id), data: permission})
            .then(res => ED.dispatch({type: 'user auth ok', msg: '权限修改成功'}))
    }
}