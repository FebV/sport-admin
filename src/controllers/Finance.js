import API from './API';
import Auth from './Auth';
import Request from './Request';
import ED from './EventDispatcher';
import User from './User';

export default class Finance{
    constructor(){

    }

    static getFinance(page,searchCampus,startTime,endTime){
        return Request.get({
            url:API.getFinance,
            data:{
                page,
                rows:15,
                api_token: Auth.getToken(),
                campus:searchCampus,
                start:startTime,
                end:endTime
                            }
                        })



                }
    static exportFinance({campus, start, end}){

        const a = document.createElement('a');
        a.href = API.exportFinance+'?'+Request.parseData({data: {api_token: Auth.getToken(),start, end, campus}});
        console.log(a.href);
        a.download = 'download';
        a.click();
        a.remove();

        // return Request.get({
        //     url:API.exportFinance,
        //     data:{
        //         page,
        //         rows:15,
        //         api_token: Auth.getToken(),
        //         campus:searchCampus,
        //         start:startTime,
        //         end:endTime
        //     }
        // })



    }


    static deleteFinance(id) {
        // console.log(id);
        return Request.delete({
            url: API.deleteFinance(id),
            data: {api_token: Auth.getToken()}
        })
            .then(res => ED.dispatch({type: 'delete finance ok', msg: res}))
    }
    static postFinance({department,campus,content,billing_time, money,remark}) {
        return Request.post({
            url:API.postFinance,
            data:{
                api_token: Auth.getToken(),
                department,campus,content, money,remark,billing_time

            }
        })
            // .then(res => res.json())
            .then(res => console.log(res))
            .then(res => ED.dispatch({type: 'post finance ok', msg: "发布成功"}))
    }
    static putFinance({id,content,department,campus,money,billing_time,admin,remark}){
        return Request.put({
            url:API.putFinance(id),
            data:{
                api_token: Auth.getToken(),
                content, money,billing_time,remark,department,campus,admin
            }
        })
            .then(res => ED.dispatch({type: 'put finance ok', msg: "修改成功"}))
    }


}