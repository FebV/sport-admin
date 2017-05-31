import Request from './Request';
import API from './API';
import Auth from './Auth';
import ED from './EventDispatcher';

export default class Schedule {

    static getCamGym() {
        return Request.get({
            url: API.camGym
        })
            .then(res => res ? res : null)
    }

    static getSchedules({campus, gym, start, end}) {
        return Request.get({
            url: API.getSchedules({campus, gym}),
            data: {start, end},
        })
            .then(res => res ? res : [])
    }

}