import Request from './Request';
import API from './API';
import Auth from './Auth';
import ED from './EventDispatcher';

export default class User {

    static getEquipment(campus) {
        return Request.get({
            url: API.getEquipment(campus),
            data: {
                api_token: Auth.getToken()
            }
        })
            .then(res => res ? res : [])
    }

    static searchByName({name}) {
        return Request.get({
            url: API.searchEquipByName(name),
            data: {
                api_token: Auth.getToken()
            }
        })
            .then(res => res ? res : [])
    }

    static postEquipment({campus, campus_chinese, gym, type, equipment_name, buy_date, buy_number, use_campus, use_number, price, remark, unit}) {
        Request.post({
            url: API.postEquipment,
            data: {
                api_token: Auth.getToken(),
                campus, campus_chinese, gym, type, equipment_name, buy_date, buy_number, use_campus, use_number, price, remark, unit
            }
        })
            .then(res => ED.dispatch({type: 'post equipment ok', msg: "器材新增成功"}))
    }
    
    static modEquipment({id, buy_number, in_number, price, remark, no_number, unit}) {
        Request.put({
            url: API.modEquipment(id),
            data: {
                api_token: Auth.getToken(),
                buy_number, in_number, price, remark, no_number, unit
            }
        })
            .then(res => ED.dispatch({type: 'post equipment ok', msg: "器材修改成功"}))
    }

    static deleteEquipment(id) {
        Request.delete({
            url: API.deleteEquipment(id),
            data: {
                api_token: Auth.getToken()
            }
        })
            .then(res => ED.dispatch({type: 'delete equipment ok'}))
    }

    static transEquipment({belong_campus, use_campus, belong_gym, use_gym, equipment_name, use_number, remark}) {
        Request.post({
            url: API.transEquipment,
            data: {
                api_token: Auth.getToken(),
                belong_campus, belong_gym, use_campus, use_gym, equipment_name, use_number, remark
            }
        })
            .then(res => ED.dispatch({type: 'trans Equipment ok', msg: '新增器材调入记录成功'}))
    }

    static getTrans(campus) {
        return Request.get({
            url: API.getTrans(campus),
            data: {
                api_token: Auth.getToken(),
            }
        })
            .then(res => res ? res : []);
    }

    static deleteTrans(id) {
        Request.delete({
            url: API.deleteTrans(id),
            data: {
                api_token: Auth.getToken(),
            }
        })
            .then(res => ED.dispatch({type: 'delete trans ok', msg: '记录删除成功'}))
    }

    static export({start, end, campus}) {
        const a = document.createElement('a');
        a.href = API.exportEquipment+'?'+Request.parseData({data: {api_token: Auth.getToken(),start, end, campus}});
        a.download = 'download';
        a.click();
        a.remove();
    }
}