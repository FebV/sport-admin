export default class EventHandler {


    static dispatch({type, msg=''}) {

        if(type == 'alert') {
            const e = new Event('alert');
            e.msg = msg;
            dispatchEvent(e);
            return;
        }
        dispatchEvent(new Event(type));
        if(msg) {
            const e = new Event('alert');
            e.msg = msg;
            dispatchEvent(e);
        }
        // if(type == 'login')
        // if(type == 'login') {
        //     dispatchEvent(new Event('login'));
        //     dispatchEvent(new Event('log status change'));
        //     const e = new Event('alert');
        //     e.msg = msg;
        //     dispatchEvent(e);
        //     return;
        // }
        // if(type == 'logout') {
        //     dispatchEvent(new Event('logout'));
        //     dispatchEvent(new Event('log status change'));
        //     return;
        // }
        // if(type == 'login fail') {
        //     const e = new Event('login fail');
        //     e.msg = msg;
        //     dispatchEvent(e);
        //     const eAlert = new Event('alert');
        //     eAlert.msg = msg;
        //     dispatchEvent(eAlert);
        //     return;
        // }
        // if(type == 'info put fail') {
        //     dispatchEvent(new Event(type));
        //     const eAlert = new Event('alert');
        //     eAlert.msg = msg;
        //     dispatchEvent(eAlert);
        // }
        // if(type == 'info put ok') {
        //     dispatchEvent(new Event(type));
        //     const eAlert = new Event('alert');
        //     eAlert.msg = msg;
        //     dispatchEvent(eAlert);
        // }
        // if(type == 'user post fail') {
        //     dispatchEvent(new Event(type));
        //     const eAlert = new Event('alert');
        //     eAlert.msg = msg;
        //     dispatchEvent(eAlert);
        // }
        // if(type == 'user post ok') {
        //     dispatchEvent(new Event(type));
        //     const eAlert = new Event('alert');
        //     eAlert.msg = msg;
        //     dispatchEvent(eAlert);
        // }
        // if(type == 'user delete ok') {
        //     dispatchEvent(new Event(type));
        //     const eAlert = new Event('alert');
        //     eAlert.msg = msg;
        //     dispatchEvent(eAlert);
        // }
        // if(type == 'user auth ok') {
        //     dispatchEvent(new Event(type));
        //     const eAlert = new Event('alert');
        //     eAlert.msg = '权限设置成功';
        //     dispatchEvent(eAlert);
        // }
        // if(type == 'alert') {
        //     const e = new Event('alert');
        //     e.msg = msg;
        //     dispatchEvent(e);
        // }
    }
    static hasLogStatusChanged(type) {
        return type == 'login' || type == 'logout';
    }
}