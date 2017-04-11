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
            .then(res => res.data)
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

}