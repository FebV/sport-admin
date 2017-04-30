import Request from './Request';
import API from './API';
import Auth from './Auth';
import ED from './EventDispatcher';

export default class Schedule {

    static getSchedules({campus, gym, start, end}) {
        return Request.get({
            url: API.getSchedules({campus, gym}),
            data: {start, end},
        })
            .then(res => res ? res : [])
    }

    static getSchedulesOfDay({campus, gym, day}) {
        return Request.get({
            url: API.getSchedules({campus, gym}),
            data: {start: day, end: day},
        })
            .then(res => res ? res[0] : null)
    } 

    static postSchedules({campus, gym, file}) {
        const fd = new FormData();
        fd.append('api_token', Auth.getToken());
        fd.append('excel', file);
        return fetch(API.postSchedules({campus, gym}), {
            method: "POST",
            body: fd,
        })
            .then(res => ED.dispatch({type: 'post schedules ok'}));
    }

    static putSchedules({campus, gym, date, nthClass, targetStatus}) {
        return Request.put({
            url: API.putSchedules({campus, gym}),
            data: {
                api_token: Auth.getToken(),
                date: date,
                [nthClass]: targetStatus
            }
        })
            .then(res => ED.dispatch({type: "put schedules ok", msg: "排期修改成功"}))

    }

}