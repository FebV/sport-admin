import API from './API';
import Auth from './Auth';
import Request from './Request';
import ED from './EventDispatcher';
import User from './User';

export default class Finance{
    constructor(){

    }

    static getFinance(page){
        Request.get({url: API.getLevel, data: {api_token: Auth.getToken()}})
            .then(res => res ? res : ED.dispatch({type: 'alert', msg: '请求用户级别失败'}))
            .then(
                res =>{
                    console.log(res);
                    if(res.permission == 2){
                         Request.get({
                            url:API.getFinance,
                            data:{
                                page,
                                rows:5,
                                api_token: Auth.getToken(),

                            }
                        })
                            // .then(_res => _res.json())
                            .then(_res => console.log(_res))
                    }

                }
            )

    }
    static deleteFinance({id}) {
        return Request.delete({
            url: API.deleteFinance(id),
            data: {api_token: Auth.getToken()}
        })
            .then(res => res.json())
            .then(res => ED.dispatch({type: 'delete finance ok', msg: "删除成功"}))
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
            .then(res => console.log(res))
            .then(res => ED.dispatch({type: 'post finance ok', msg: "发布成功"}))
    }
    static putFinance({id,title, content, money,billing_time,remark}){
        return Request.post({
            url:API.putFinance(id),
            data:{
                api_token: Auth.getToken(),
                title, content, money,billing_time,remark
            }
        })
            .then(res => ED.dispatch({type: 'put finance ok', msg: "修改成功"}))
    }


}