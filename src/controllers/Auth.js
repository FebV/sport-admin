import Request from './Request';

export default class Auth {
    static isLogin() {
        return !!localStorage.getItem('token');
    }

    static login({username, password}) {
        Request.post({data: {username, password}})
            .then(res => res.json())
            .then(json => {
                if(json.code == 0)
                    alert('ok');
                else
                    alert('fail');
            })
            .catch(e => {
                alert(`登录失败！原因：${e}`);
            });
    }
}