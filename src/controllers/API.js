// const base = 'http://121.250.222.41:8000/api/';
const base = '/mock/';
const API = {
    login: `${base}users/i/auth`,
    logout: `${base}users/i/auth`,
    // getInfo: `${base}users/i/info`,
    getInfo: `${base}info.json`,
}
export default API;