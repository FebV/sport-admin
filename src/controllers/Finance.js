import API from './API';
import Auth from './Auth';
import Request from './Request';

export default class Finance{
    constructor(){

    }

    static getFinance(page){
        return Request.get({
            url:API.getFinance,
            data:{
                page,
                rows:5,
                api_token: Auth.getToken()
            }
            })
            .then(res => res.json())
    }
    static deleteFinance({id}) {
        return Request.delete({
            url: API.deleteFinance(id),
            data: {api_token: Auth.getToken()}
        })
            .then(res => res.json())
            .then(res => ED.dispatch({type: 'delete comment ok', msg: "删除成功"}))
    }
    static postFinance({title, content, money,billing_time,remark}) {
        return Request.post({
            url:API.postFinance,
            data:{
                api_token: Auth.getToken(),
                title, content, money,billing_time,remark

            }
        })
            .then(res => res.json())
            .then(res => console.log(res));
    }
    static putFinance({id,title, content, money,billing_time,remark}){
        return Request.post({
            url:API.putFinance(id),
            data:{
                api_token: Auth.getToken(),
                title, content, money,billing_time,remark
            }
        })
    }


}