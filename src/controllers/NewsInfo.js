import Request from './Request';
import ED from './EventDispatcher';
import API from './API';
import Auth from './Auth';

export default class News {
    static getNews(page) {
        return Request.get({
            url: API.getNews,
            data:{
                page, rows: 10,
            }
        })
            .then(res => res.json())
    }

    static postInnerComment({title, content, name, tel, email}) {
        return Request.post({
            url: API.postInnerComment,
            data:{
                type: 1,
                title, content, name, tel, email
            }
        })
            .then(res => res.json())
            .then(res => {
                ED.dispatch({type: "post comment ok", msg: "评论发布成功"})
            });
    }

    static deleteInnerComment({id}) {
        return Request.delete({
            url: API.deleteInnerComment(id),
            data: {api_token: Auth.getToken()}
        })
            .then(res => res.json())
            .then(res => ED.dispatch({type: 'delete comment ok', msg: "删除成功"}))
    }
}