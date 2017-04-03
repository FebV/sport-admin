const base = 'http://115.28.201.92:8000/api/';
// const base = '/mock/';
const API = {
    login: `${base}users/i/auth`,
    logout: `${base}users/i/auth`,
    
    //User Info
    getInfo: `${base}users/i/info`,
    putInfo: `${base}users/i/info`,
    getLevel: `${base}users/i/gp`,
    // getInfo: `${base}info.json`,

    //People  下属相关
    getPeople: `${base}users/info`,
    postPeople: `${base}users`,
    deletePeople: function(id){return `${base}users/i/people/${id}`},
    authPeople: function(id){return `${base}users/i/people/${id}/auth`}


}
export default API;