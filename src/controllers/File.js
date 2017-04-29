import Request from './Request';
import API from './API';
import Auth from './Auth';
import ED from './EventDispatcher';

export default class Schedule {

    static uploadFile({file, document_name}) {
        const fd = new FormData();
        fd.append('api_token', Auth.getToken());
        fd.append('document', file);
        fd.append('document_name', document_name);
        return fetch(API.uploadFile, {
            method: "POST",
            body: fd,
        })
            .catch(err => {
                ED.dispatch({type: "alert", msg:"网络错误"})
                throw new Error(err);
            })
            .then(res => {
                if(res.status != 200) {
                    ED.dispatch({type: "alert", msg: "网络错误"})
                    throw new Error(`not ok`);
                }
                ED.dispatch({type: 'post file ok', msg: "上传文件成功"})
            });
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