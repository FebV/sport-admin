import Request from './Request';
import ED from './EventDispatcher';
import API from './API';
import Auth from './Auth';

export default class News {
    static getPublishedNews(page) {
        return Request.get({
            url: API.getNews,
            data:{
                page, rows: 10,
            }
        })
            .then(res => res ? res : [])
    }

    static getAllNews(page) {
        return Request.get({
            url: API.getAllNews,
            data:{
                api_token: Auth.getToken(),
                page, rows: 10,
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


    static postNews({title, time, article, writer}) {
        Request.post({
            url: API.postNews,
            data: {api_token: Auth.getToken(), title, time, article, writer}
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
}