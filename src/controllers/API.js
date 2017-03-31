const base = 'http://115.28.201.92:8000/api/';
// const base = '/mock/';
const API = {
    login: `${base}users/i/auth`,
    logout: `${base}users/i/auth`,
    
    //User Info
    getInfo: `${base}users/i/info`,
    putInfo: `${base}users/i/info`,
    // getInfo: `${base}info.json`,
}
export default API;