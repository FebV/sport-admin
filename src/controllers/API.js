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
    authPeople: function(id){return `${base}users/i/people/${id}/auth`},

    //Schedule 排期相关
    getSchedules: ({campus, gym}) => `${base}schedules/campus/${campus}/gym/${gym}`,
    //getSchedules: () => `/mock/gym.json`,
    postSchedules: ({campus, gym}) => `${base}schedules/campus/${campus}/gym/${gym}`,
    putSchedules: ({campus, gym}) => `${base}schedules/campus/${campus}/gym/${gym}`,

    //apply 申请相关
    getInnerApply: ({campus, gym}) => `${base}apply/campus/${campus}/gym/${gym}`,
    getOuterApply: ({campus, gym}) => `${base}apply/train/campus/${campus}/gym/${gym}`,
    postApply: `${base}apply`,
    postOuterApply: `${base}apply/train`,
    putInnerApply: id => `${base}apply/${id}`,
    putOuterApply: id => `${base}apply/train/${id}`,
    deleteInnerApply: id => `${base}apply/${id}`,
    deleteOuterApply: id => `${base}apply/train/${id}`,

    //留言板
    getInnerComment: `${base}messages/type/1`, //1内部留言
    postInnerComment: `${base}messages`,
    deleteInnerComment: id => `${base}messages/${id}`,
}
export default API;