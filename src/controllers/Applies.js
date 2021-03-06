import Request from './Request';
import API from './API';
import Auth from './Auth';
import ED from './EventDispatcher';

export default class Applies {
    static postInnerApply({campus, gym, time, classtime, major, content, pnumber, charger, tel, remark, teacher, teacher_tel, gym_number, type}) {
        Request.post({
            url: API.postApply,
            data: {
                campus, gym, time, classtime, major, content, pnumber, charger, tel, remark, teacher, teacher_tel, gym_number, type
            }
        })
            .then(res => ED.dispatch({type: 'alert', msg: '提交申请成功'}))
    }

    static postOuterApply({campus, gym, time, classtime, department, content, charger, tel, type}) {
        Request.post({
            url: API.postOuterApply,
            data: {
                campus, gym, time, classtime, department, content, charger, tel, type
            }
        })
            .then(res => ED.dispatch({type: 'alert', msg: "提交申请成功"}))
    }

    static getInnerApply({campus, gym, start, end, type}) {
        return Request.get({
            url: API.getInnerApply({campus, gym}),
            data: {
                api_token: Auth.getToken(),
                type,
                start,
                end,
            }
        })
            .then(res => res ? res : [])
    }

    static getOuterApply({campus, gym, start, end, type}) {
        return Request.get({
            url: API.getOuterApply({campus, gym}),
            data: {
                api_token: Auth.getToken(),
                start,
                end,
                type,
            }
        })
            .then(res => res ? res : [])

    }

    static putInnerApply({applyId, state, remark, cost}) {
        return Request.put({
            url: API.putInnerApply(applyId),
            data: {api_token: Auth.getToken(), state, teacher_remark: remark, money: cost}
        })
            .then(res => ED.dispatch({type: "put innerApply ok"}))
    }

    static putOuterApply({applyId, state}) {
        return Request.put({
            url: API.putOuterApply(applyId),
            data: {api_token: Auth.getToken(), state}
        })
            .then(res => ED.dispatch({type: "put outerApply ok"}))
    }

    static deleteInnerApply({applyId}) {
        return Request.delete({
            url: API.deleteInnerApply(applyId),
            data: {
                api_token: Auth.getToken()
            }
        })
            .then(res => ED.dispatch({type: "delete innerApply ok"}))
    }

    static deleteOuterApply({applyId}) {
        return Request.delete({
            url: API.deleteOuterApply(applyId),
            data: {
                api_token: Auth.getToken()
            }
        })
            .then(res => ED.dispatch({type: "delete outerApply ok"}))
    }

    static queryInnerApplyByTel({tel}) {
        return Request.get({
            url: API.queryInnerApplyByTel(tel),
            data: {}
        })
            .then(res => res ? res : null)
    }

    static queryOuterApplyByTel({tel}) {
        return Request.get({
            url: API.queryOuterApplyByTel(tel),
            data: {}
        })
            .then(res => res ? res : null)
    }

    static exportInner({start, end, campus}) {
        const a = document.createElement('a');
        a.href = API.exportInnerApply+'?'+Request.parseData({data: {api_token: Auth.getToken(),start, end, campus}});
        a.download = 'download';
        a.click();
        a.remove();
    }

    static exportOuter({start, end, campus}) {
        const a = document.createElement('a');
        a.href = API.exportOuterApply+'?'+Request.parseData({data: {api_token: Auth.getToken(),start, end, campus}});
        a.download = 'download';
        a.click();
        a.remove();
    }
}