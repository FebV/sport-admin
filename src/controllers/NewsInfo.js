import Request from './Request';
import ED from './EventDispatcher';
import API from './API';
import Auth from './Auth';

export default class News {
    static getPublishedNews(page, rows = 10) {
        return Request.get({
            url: API.getNews,
            data:{
                page, rows,
            }
        })
            .then(res => res ? res : [])
    }

    static getAllNews(page, rows = 20) {
        return Request.get({
            url: API.getAllNews,
            data:{
                api_token: Auth.getToken(),
                page, rows: 20,
            }
        })
            .then(res => res ? res : [])

    }

    static getNewsDetail(id) {
        return Request.get({
            url: API.getNewsDetail(id),
        })
            .then(res => res ? res : []);
    }


    static postNews({title, time, article, writer, picture=''}) {
        Request.post({
            url: API.postNews,
            data: {api_token: Auth.getToken(), title, time, article, writer, picture}
        })
            .then(res => ED.dispatch({type: 'post news ok'}));
    }

    static acceptNews({newsId}) {
        Request.put({
            url: API.acceptNews(newsId),
            data: {api_token: Auth.getToken(), state: 3}
        })
            .then(res => ED.dispatch({type: 'accept news ok'}));
    }

    static declineNews({newsId}) {
        Request.put({
            url: API.acceptNews(newsId),
            data: {api_token: Auth.getToken(), state: 2}
        })
            .then(res => ED.dispatch({type: 'decline news ok'}));
    }
    static putNews({newsId, title, article, time, writer, picture=''}) {
        Request.put({
            url: API.putNews(newsId),
            data: {
                api_token: Auth.getToken(),
                newsId: newsId,
                title,
                time,
                writer,
                article,
                picture,
            }
        })
            .then(res => ED.dispatch({type: 'put news ok'}));
    }

    static deleteNews({newsId}) {
        Request.delete({
            url: API.deleteNews(newsId),
            data: {
                api_token: Auth.getToken(),
            }
        })
            .then(res => ED.dispatch({type: 'delete news ok'}));
    }

    static postCover(file) {
        const fd = new FormData();
        fd.append('newspicture', file);
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