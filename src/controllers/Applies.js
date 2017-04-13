import Request from './Request';
import API from './API';
import Auth from './Auth';
import ED from './EventDispatcher';

export default class Applies {
    static postApply({campus, gym, time, classtime, major, content, pnumber, charger, tel, cost, remark}) {
        Request.post({
            url: API.postApply,
            data: {
                campus, gym, time, classtime, major, content, pnumber, charger, tel, cost, remark
            }
        })
            .then(res => res.json())
            .then(res => console.log(res))
    }

    static getApply({campus, gym, start, end}) {
        return Request.get({
            url: API.getApply({campus, gym}),
            data: {
                api_token: Auth.getToken(),
                start,
                end,
            }
        })
            .then(res => res.json())
            .then(res => {
                if(res.code != 1)
                    return [];
                return res.data;
            })
    }
}