export default class Auth {
    static isLogin() {
        return !!localStorage.getItem('token');
    }
}