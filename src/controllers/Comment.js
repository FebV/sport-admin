import Request from './Request';
import ED from './EventDispatcher';
import API from './API';
import Auth from './Auth';

export default class Comment {
    static getPublishedComment(page) {
        return Request.get({
            url: API.getInnerComment,
            data:{
                page, rows: 10,
            }
        })
            .then(res => res ? res : null)
    }

    static getAllComment(page) {
        return Request.get({
            url: API.getAllInnerComment,
            data:{
                api_token: Auth.getToken(),
                page, rows: 10,
            }
        })
            .then(res => res ? res : null)
    }

    static postComment({title, content, name, tel, email}) {
        return Request.post({
            url: API.postInnerComment,
            data:{
                type: 1,
                title, content, name, tel, email
            }
        })
            .then(res => res ? res : ED.dispatch({type: "post comment ok", msg: "评论发布成功"}))
    }

    static deleteComment({commentId}) {
        return Request.delete({
            url: API.deleteInnerComment(commentId),
            data: {api_token: Auth.getToken()}
        })
            .then(res => ED.dispatch({type: 'delete comment ok', msg: "删除成功"}))
    }

    static acceptComment({commentId}) {
        Request.put({
            url: API.acceptInnerComment(commentId),
            data: {api_token: Auth.getToken(), state: 1}
        })
            .then(res => ED.dispatch({type: 'accept comment ok'}));
    }

    static declineComment({commentId}) {
        Request.put({
            url: API.acceptInnerComment(commentId),
            data: {api_token: Auth.getToken(), state: -1}
        })
            .then(res => ED.dispatch({type: 'decline comment ok'}));
    }
}