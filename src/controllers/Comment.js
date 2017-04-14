import Request from './Request';
import ED from './EventDispatcher';
import API from './API';
import Auth from './Auth';

export default class Comment {
    static getInnerComment(page) {
        return Request.get({
            url: API.getInnerComment,
            data:{
                page, rows: 10,
            }
        })
            .then(res => res.json())
    }

    static postInnerComment({}) {

    }
}