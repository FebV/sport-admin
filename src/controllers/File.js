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
                return res.json()
            })
            .then(res => {
                if(res.code != 1)
                    return ED.dispatch({type: 'alert', msg: res.status});
                ED.dispatch({type: 'post file ok', msg: "上传文件成功"})
            })
    }

    static getFile({page, rows = 10}) {
        return Request.get({
            url: API.getFile,
            data: {
                page, rows
            }
        })
    }

    static deleteFile(id) {
        return Request.delete({
            url: API.deleteFile(id),
            data: {
                api_token: Auth.getToken()
            }
        })
            .then(res => ED.dispatch({type: "delete file ok", msg: "删除文件成功"}))
    }

}