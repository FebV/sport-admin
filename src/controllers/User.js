import Request from './Request';
import API from './API';
import Auth from './Auth';

export default class User {

    static getInfo() {
        return Request.get({url: API.getInfo, data: {api_token: Auth.getToken()}})
                .then(res => res.json())
                .then(json => json.data);
    }
}