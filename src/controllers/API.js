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

    //器材管理
    getEquipment: (campus) => `${base}equipments/campus/${campus}`,
    postEquipment: `${base}equipments`,
    deleteEquipment: (id) => `${base}equipments/id/${id}`,

    transEquipment: `${base}equipments/adjust`,
    getTrans:  (campus) => `${base}equipments/adjust/campus/${campus}`,
    deleteTrans:  (id) => `${base}equipments/adjust/id/${id}`,


    //新闻相关
    getNews: `${base}news/list`,
    getAllNews: `${base}news/list/all`,
    postNews: `${base}news/content`,
    getNewsDetail: id => `${base}news/content/id/${id}`,
    acceptNews: id => `${base}news/id/${id}`,
    putNews: id => `${base}news/content/id/${id}`,
    deleteNews: id => `${base}news/id/${id}`,

//财务相关
    getFinance:`${base}api/finances`,
    deleteFinance: (id)=>`${base}api/finances/id/${id}`,
    postFinance:`${base}api/finances`,
    potFinance: (id)=>`${base}api/finances/id/${id}`,

    //文件相关
    getFile: `${base}documents`,
    deleteFile: id => `${base}documents/id/${id}`,
    uploadFile: `${base}documents`,
    downloadFile: id => `${base}documents/id/${id}`,

}
export default API;