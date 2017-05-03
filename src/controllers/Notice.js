import Request from './Request';
import ED from './EventDispatcher';
import API from './API';
import Auth from './Auth';

export default class Notice {
    static getPublishedNotice(page, rows = 10) {
        return Request.get({
            url: API.getNotice,
            data:{
                page, rows,
            }
        })
            .then(res => res ? res : [])
    }

    static getAllNotice(page, rows = 20) {
        return Request.get({
            url: API.getAllNotice,
            data:{
                api_token: Auth.getToken(),
                page, rows: 20,
            }
        })
            .then(res => res ? res : [])

    }

    static getNoticeDetail(id) {
        return Request.get({
            url: API.getNoticeDetail(id),
        })
            .then(res => res ? res : []);
    }


    static postNotice({title, time, article, writer, picture=''}) {
        Request.post({
            url: API.postNotice,
            data: {api_token: Auth.getToken(), title, time, article, writer, picture}
        })
            .then(res => ED.dispatch({type: 'post notice ok'}));
    }

    static acceptNotice({noticeId}) {
        Request.put({
            url: API.acceptNotice(noticeId),
            data: {api_token: Auth.getToken(), state: 3}
        })
            .then(res => ED.dispatch({type: 'accept notice ok'}));
    }

    static declineNotice({noticeId}) {
        Request.put({
            url: API.acceptNotice(noticeId),
            data: {api_token: Auth.getToken(), state: 2}
        })
            .then(res => ED.dispatch({type: 'decline notice ok'}));
    }
    static putNotice({noticeId, title, article, time, writer, picture=''}) {
        Request.put({
            url: API.putNotice(noticeId),
            data: {
                api_token: Auth.getToken(),
                noticeId: noticeId,
                title,
                time,
                writer,
                article,
                picture,
            }
        })
            .then(res => ED.dispatch({type: 'put notice ok'}));
    }

    static deleteNotice({noticeId}) {
        Request.delete({
            url: API.deleteNotice(noticeId),
            data: {
                api_token: Auth.getToken(),
            }
        })
            .then(res => ED.dispatch({type: 'delete notice ok'}));
    }
}