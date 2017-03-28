export default class Request {

    static post({data}) {
        console.log(data);
        return fetch('/', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded'
            },
            body: Request.parseData({data})
        });
    }

    static parseData({data}) {
        let query = '';
        for(let i in data) {
            query += `&${i}=${data[i]}`
        }
        return query.substr(1);
    }
}