import ED from './EventDispatcher';


export default class Request {

    static get({url, data}) {
        return fetch(`${url}?${Request.parseData({data})}`)
                .catch(err => {
                    ED.dispatch({type: "alert", msg: "网络错误"})
                    throw new Error(`网络错误`)

                })
                .then(res => res.json())
                .catch(res => {
                    ED.dispatch({type: "alert", msg: `解析时出错`})
                    throw new Error(`解析时出错`)
                })
                .then(res => {
                    handleApiTokenFail(res.code);
                    if(res.code != 1) {
                        ED.dispatch({type: "alert", msg: res.status})
                        throw new Error(res.status);
                    }
                    return res.data
                })
        }


    static post({url, data}) {
        return fetch(url, {
                    method: 'POST',
                    headers: {
                        "Content-Type": 'application/x-www-form-urlencoded'
                    },
                    body: Request.parseData({data})
                })
                .catch(err => {
                    ED.dispatch({type: "alert", msg: "网络错误"})
                    throw new Error(`网络错误`)

                })                    .then(res => res.json())
                    .catch(res => {
                        ED.dispatch({type: "alert", msg: `解析时出错`})
                        throw new Error(`解析时出错`)
                    })
                    .then(res => {
                        handleApiTokenFail(res.code);
                        if(res.code != 1) {
                            ED.dispatch({type: "alert", msg: res.status})
                            throw new Error(res.status);
                        }
                        return res.data
                    })
    }

    static put({url, data}) {
        return fetch(url, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": 'application/x-www-form-urlencoded'
                    },
                    body: Request.parseData({data})
                })
                    .catch(err => {
                        ED.dispatch({type: "alert", msg: "网络错误"})
                        throw new Error(`网络错误`)

                    })     
                    .then(res => res.json())
                    .catch(res => {
                        ED.dispatch({type: "alert", msg: `解析时出错`})
                        throw new Error(`解析时出错`)
                    })
                    .then(res => {
                        handleApiTokenFail(res.code);
                        if(res.code != 1) {
                            ED.dispatch({type: "alert", msg: res.status})
                            throw new Error(res.status);
                        }
                        return res.data
                    })
    }

    static delete({url, data}) {
        return fetch(url, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": 'application/x-www-form-urlencoded'
                    },
                    body: Request.parseData({data})
                })
                    .catch(err => {
                        ED.dispatch({type: "alert", msg: "网络错误"})
                        throw new Error(`网络错误`)

                    })     
                    .then(res => res.json())
                    .catch(res => {
                        ED.dispatch({type: "alert", msg: `解析时出错`})
                        throw new Error(`解析时出错`)
                    })
                    .then(res => {
                        handleApiTokenFail(res.code);
                        if(res.code != 1) {
                            ED.dispatch({type: "alert", msg: res.status})
                            throw new Error(res.status);

                        }
                        return res.data
                    })
    }

    static parseData({data}) {
        // if(!data)
        //     throw new Error('no data provided @ parseData @ Controller/Request')
        let query = '';
        for(let i in data) {
            const encoded = encodeURIComponent(data[i]);
            query += `&${ i}=${encoded}`
        }
        return query.substr(1);
    }

}
function handleApiTokenFail(code) {
    if(code == '-3') {
        localStorage.clear();
        location.href = '/';
    }
}