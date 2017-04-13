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

    static postOuterApply({campus, gym, time, classtime, department, content, charger, tel}) {
        Request.post({
            url: API.postOuterApply,
            data: {
                campus, gym, time, classtime, department, content, charger, tel,
            }
        })
            .then(res => res.json())
            .then(res => console.log(res))
    }

    static getInnerApply({campus, gym, start, end}) {
        return Request.get({
            url: API.getInnerApply({campus, gym}),
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

    static getOuterApply({campus, gym, start, end}) {
        return Request.get({
            url: API.getOuterApply({campus, gym}),
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

    static putApply({applyId, state}) {
        return Request.put({
            url: API.putApply(applyId),
            data: {api_token: Auth.getToken(), state}
        })
            .then(res => res.json())
            .then(res => {
                ED.dispatch({type: "put apply ok"});
            });
    }

    static deleteApply({applyId}) {
        return Request.delete({
            url: API.deleteApply(applyId),
            data: {
                api_token: Auth.getToken()
            }
        })
            .then(res => res.json())
            .then(res => {
                ED.dispatch({type: "delete apply ok"});
            });
    }
}