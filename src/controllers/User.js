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
        if(!User.info || force)
            User.info = Request.get({url: API.getInfo, data: {api_token: Auth.getToken()}})
                .then(res => res.json())
                .then(json => {
                    if(json.code != 1) {
                        localStorage.clear();
                        ED.dispatch({type: 'logout'});
                        return ED.dispatch({type: 'alert', msg: '登录失败'});
                    }
                    return User.info = Promise.resolve(json.data);
                })
                .catch(err => ED.dispatch({type: 'alert', msg: '网络错误'}));
        return User.info;
    }

    static putInfo(info) {
        Request.put({url: API.putInfo, data: {
            api_token: Auth.getToken(),
            realname: info.realname,
            tel: info.tel,
        }})
            .then(res => res.json())
            .then(json => {
                if(json.code != 1)
                    return ED.dispatch({type: 'info put fail', msg: json.status});
                User.getInfo(true);
                return ED.dispatch({type: 'info put ok', msg: "修改成功"});
            })
            .catch(err => ED.dispatch({type: 'alert', msg: '网络错误'}))
    }

    static getPeople() {
        if(!Auth.isLogin()) {
            ED.dispatch({type: 'alert', msg: '未登录'})
            return Promise.resolve([]);
        }
        return Request.get({url: API.getPeople, data: {api_token: Auth.getToken()}})
                .then(res => res.json())
                .then(json => {
                    if(json.code != 1)
                        return ED.dispatch({type: 'alert', msg: '管理员列表请求失败'})
                    return json.data
                })
                .catch(err => {
                    ED.dispatch({type: 'alert', msg: '网络错误'})
                })
    }

    static getLevel() {
        if(User.level)
            return User.level;
        return User.level = Request.get({url: API.getLevel, data: {api_token: Auth.getToken()}})
                        .then(res => res.json())
                        .then(json => {
                            if(json.code != 1)
                                return ED.dispatch({type: 'alert', msg: '请求用户级别失败'})
                            User.level = Promise.resolve(json.data.grade);
                            return User.level;
                        })
                        .catch(err => {
                            return ED.dispatch({type: 'alert', msg: '网络错误'});
                        })
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
            .then(res => res.json())
            .then(json => {
                if(json.code != 1)
                    return ED.dispatch({type: 'user post fail', msg: json.status});
                return ED.dispatch({type: 'user post ok', msg: '新增管理员成功'});
            })
            .catch(err => ED.dispatch({type: 'alert', msg: '网络错误'}))
    }

    static deletePeople(id) {
        Request.delete({url: `${API.deletePeople(id)}`, data: {
            api_token: Auth.getToken()
        }})
            .then(res => res.json())
            .then(json => {
                if(json.code != 1) {
                    return ED.dispatch({type: 'alert', msg: json.status});
                }
                return ED.dispatch({type: 'user delete ok', msg: '删除成功'});
            })
            .catch(err => {
                return ED.dispatch({type: 'alert', msg: '网络错误'})
            })
    }

    static authPeople(id, permission) {
        Request.put({url: API.authPeople(id), data: {
            api_token: Auth.getToken(),
            permission,
        }})
            .then(res => res.json())
            .then(json => {
                if(json.code != 1) {
                    return ED.dispatch({type: 'alert', msg: json.status});
                }
                return ED.dispatch({type: 'user auth ok', msg: '权限修改成功'});
            })
            .catch(err => {
                return ED.dispatch({type: 'alert', msg: '网络错误'})
            })
    }
}