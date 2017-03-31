export default class EventHandler {

    /*
    Event Type:
        login
        logout
        login fail
    
    */

    static dispatch({type, msg=''}) {
        // if(e.toString() != '[object Event]')
        //     throw new Error('TypeError, EventDispatch need a event type parameter');
        // const e = new Event(type);
        // e.info = info;
        // dispatchEvent(e);
        if(type == 'login') {
            dispatchEvent(new Event('login'));
            dispatchEvent(new Event('log status change'));
            const e = new Event('alert');
            e.msg = msg;
            dispatchEvent(e);
            return;
        }
        if(type == 'logout') {
            dispatchEvent(new Event('logout'));
            dispatchEvent(new Event('log status change'));
            return;
        }
        if(type == 'login fail') {
            const e = new Event('login fail');
            e.msg = msg;
            dispatchEvent(e);
            const eAlert = new Event('alert');
            eAlert.msg = msg;
            dispatchEvent(eAlert);
            return;
        }
        if(type == 'info put fail') {
            dispatchEvent(new Event(type));
            const eAlert = new Event('alert');
            eAlert.msg = msg;
            dispatchEvent(eAlert);
        }
        if(type == 'alert') {
            const e = new Event('alert');
            e.msg = msg;
            dispatchEvent(e);
        }
    }
}