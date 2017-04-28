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
            .then(res => res.json())
            .then(res => res.data)
    }

    static getAllNews(page) {
        return Request.get({
            url: API.getAllNews,
            data:{
                api_token: Auth.getToken(),
                page, rows: 10,
            }
        })
            .then(res => res.json())
            .then(res => {
                if(res.code != 1)
                    return [];
                return res.data;
            })

    }

    static getNewsDetail(id) {
        return Request.get({
            url: API.getNewsDetail(id),
        })
            .then(res => res.json())
            .then(res => res.data);
    }


    static postNews({title, time, article, writer}) {
        Request.post({
            url: API.postNews,
            data: {api_token: Auth.getToken(), title, time, article, writer}
        })
            .then(res => res.json())
            .then(res => console.log(res));
    }
}