export default class Request {

    static get({url, data}) {
        return fetch(`${url}?${Request.parseData({data})}`);
    }

    static post({url, data}) {
        return fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded'
            },
            body: Request.parseData({data})
        });
    }

    static delete({url, data}) {
        return fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded'
            },
            body: Request.parseData({data})
        });
    }

    static parseData({data}) {
        // if(!data)
        //     throw new Error('no data provided @ parseData @ Controller/Request')
        let query = '';
        for(let i in data) {
            query += `&${i}=${data[i]}`
        }
        return query.substr(1);
    }
}