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
            .then(res => res.json())
            .then(res => {
                if(res.code != 1)
                    return [];
                return res.data;
            })
    }

    static getSchedulesOfDay({campus, gym, day}) {
        return Request.get({
            url: API.getSchedules({campus, gym}),
            data: {start: day, end: day},
        })
            .then(res => res.json())
            .then(res => {
                if(res.code != 1)
                    return null;
                return res.data[0];
            })
    } 

    static postSchedules({campus, gym, file}) {
        const fd = new FormData();
        fd.append('api_token', Auth.getToken());
        fd.append('excel', file);
        return fetch(API.postSchedules({campus, gym}), {
            method: "POST",
            body: fd,
        })
            .then(res => res.json())
            .then(res => console.log(res));
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
            .then(res => res.json())
            .then(res => {
                if(res.code != 1)
                    ED.dispatch({type: "put schedules fail", msg: "排期修改失败"})
                ED.dispatch({type: "put schedules ok", msg: "排期修改成功"})    
            })
            .catch(err => {
                ED.dispatch({type: "alert", msg: "网络错误"})
            })
    }

}