import Request from './Request';
import API from './API';
import Auth from './Auth';
import ED from './EventDispatcher';

export default class Schedule {

    static getSchedules({campus, gym, type, start, end}) {
        return Request.get({
            url: API.getSchedules({campus, gym}),
            data: {start, end, type},
        })
            .then(res => res ? res : [])
    }

    static getSchedulesOfDay({campus, gym, day, type}) {
        return Request.get({
            url: API.getSchedules({campus, gym}),
            data: {start: day, end: day, type},
        })
            .then(res => res ? res[0] : null)
    } 

    static postSchedules({campus, gym, type, start, end}) {
        return Request.post({
            url: API.postSchedules({campus, gym}),
            data: {
                api_token: Auth.getToken(),
                campus, gym, type, start, end
            }
        })
            .then(res => ED.dispatch({type: 'post schedules ok', msg: "生成成功"}));
    }

    static putSchedules({campus, gym, records}) {
        return Request.put({
            url: API.putSchedules({campus, gym}),
            data: {
                api_token: Auth.getToken(),
                records
            }
        })
            .then(res => ED.dispatch({type: "put schedules ok", msg: "排期修改成功"}))

    }

}