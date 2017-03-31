import Request from './Request';
import API from './API';
import Auth from './Auth';
import ED from './EventDispatcher';

export default class User {
    
    constructor() {
        User.info = null;
    }

    static getInfo() {
        if(!User.info)
            User.info = Request.get({url: API.getInfo, data: {api_token: Auth.getToken()}})
                .then(res => res.json())
                .then(json => {
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
            username: info.username
        }})
            .then(res => res.json())
            .then(json => {
                if(json.code != 1)
                    return ED.dispatch({type: 'info put fail', msg: json.status});
                User.getInfo();
                return ED.dispatch({type: 'alert', msg: "修改成功"});
            })
            .catch(err => ED.dispatch({type: 'alert', msg: '网络错误'}))
    }
}