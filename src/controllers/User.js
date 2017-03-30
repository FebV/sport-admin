import Request from './Request';
import API from './API';
import Auth from './Auth';

export default class User {
    
    constructor() {
        User.info = null;
    }

    static getInfo() {
        if(!User.info)
            User.info = Request.get({url: API.getInfo, data: {api_token: Auth.getToken()}})
                .then(res => res.json())
                .then(json => {
                    // console.log(json.data);
                    return User.info = Promise.resolve(json.data);
                })
                .catch(err => alert(`net work err`));
        return User.info;
    }

    static putInfo() {

    }
}