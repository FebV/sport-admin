import Request from './Request';
import ED from './EventDispatcher';
import API from './API';
import Auth from './Auth';

export default class Regular {
    static getPublishedRegular(page, rows = 10) {
        return Request.get({
            url: API.getRegular,
            data:{
                page, rows,
            }
        })
            .then(res => res ? res : [])
    }

    static getAllRegular(page, rows = 20) {
        return Request.get({
            url: API.getAllRegular,
            data:{
                api_token: Auth.getToken(),
                page, rows: 20,
            }
        })
            .then(res => res ? res : [])

    }

    static getRegularDetail(id) {
        return Request.get({
            url: API.getRegularDetail(id),
        })
            .then(res => res ? res : []);
    }


    static postRegular({title, time, article, writer, picture=''}) {
        Request.post({
            url: API.postRegular,
            data: {api_token: Auth.getToken(), title, time, article, writer, picture}
        })
            .then(res => ED.dispatch({type: 'post regular ok'}));
    }

    static acceptRegular({regularId}) {
        Request.put({
            url: API.acceptRegular(regularId),
            data: {api_token: Auth.getToken(), state: 3}
        })
            .then(res => ED.dispatch({type: 'accept regular ok'}));
    }

    static declineRegular({regularId}) {
        Request.put({
            url: API.acceptRegular(regularId),
            data: {api_token: Auth.getToken(), state: 2}
        })
            .then(res => ED.dispatch({type: 'decline regular ok'}));
    }
    static putRegular({regularId, title, article, time, writer, picture=''}) {
        Request.put({
            url: API.putRegular(regularId),
            data: {
                api_token: Auth.getToken(),
                regularId: regularId,
                title,
                time,
                writer,
                article,
                picture,
            }
        })
            .then(res => ED.dispatch({type: 'put regular ok'}));
    }

    static deleteRegular({regularId}) {
        Request.delete({
            url: API.deleteRegular(regularId),
            data: {
                api_token: Auth.getToken(),
            }
        })
            .then(res => ED.dispatch({type: 'delete regular ok'}));
    }

    static postCover(file) {
        const fd = new FormData();
        fd.append('regularpicture', file);
        fd.append('api_token', Auth.getToken())
        return fetch(API.postCover, {
            method: "POST",
            body: fd
        })
            .catch(err => {
                ED.dispatch({type: 'alert', msg: '网络错误'});
                throw new Error(err);
            })
            .then(res => res.json())
            .catch(err => {
                ED.dispatch({type: 'alert', msg: '解析错误'})
                throw new Error(err);
            })
            .then(res => {
                if(res.code == 1)
                    ED.dispatch({type: 'alert', msg: '选择封面成功'})
                else
                    ED.dispatch({type: 'alert', msg: '选择封面失败'})
                return res;
            })
    }
}