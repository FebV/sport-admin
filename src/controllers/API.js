const base = 'http://115.28.201.92:8000/api/';
// const base = '/mock/';
const API = {
    base,
    login: `${base}users/i/auth`,
    logout: `${base}users/i/auth`,
    camGym: `${base}campus/gym`,
    
    //User Info
    getInfo: `${base}users/i/info`,
    putInfo: `${base}users/i/info`,
    getLevel: `${base}users/i/gp`,
    // getInfo: `${base}info.json`,
    //修改密码
    putPass: `${base}users/i/pass`,
    resetPass: `${base}users/i/people/pass`,

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
    queryInnerApplyByTel: tel => `${base}apply/tel/${tel}`,
    queryOuterApplyByTel: tel => `${base}apply/train/tel/${tel}`,

    exportInnerApply: `${base}apply/export`,
    exportOuterApply: `${base}apply/train/export`,



    //留言板
    getInnerComment: `${base}messages/type/1`, //1内部留言
    getAllInnerComment: `${base}messages/all/type/1`, //1内部留言
    postInnerComment: `${base}messages`,
    deleteInnerComment: id => `${base}messages/id/${id}`,
    getCommentDetail: id => `${base}messages/id/${id}`,

    acceptInnerComment: id => `${base}messages/id/${id}`,

    //器材管理
    getEquipment: (campus) => `${base}equipments/campus/${campus}`,
    postEquipment: `${base}equipments`,
    deleteEquipment: (id) => `${base}equipments/id/${id}`,

    transEquipment: `${base}equipments/adjust`,
    getTrans:  (campus) => `${base}equipments/adjust/campus/${campus}`,
    deleteTrans:  (id) => `${base}equipments/adjust/id/${id}`,

    searchEquipByName: name => `${base}equipments/name/${name}`,

    exportEquipment: `${base}equipments/export`,


    //新闻相关
    getNews: `${base}news/list`,
    getAllNews: `${base}news/list/all`,
    postNews: `${base}news/content`,
    getNewsDetail: id => `${base}news/content/id/${id}`,
    acceptNews: id => `${base}news/id/${id}`,
    putNews: id => `${base}news/content/id/${id}`,
    deleteNews: id => `${base}news/id/${id}`,
    //新闻题图
    postCover: `${base}news/picture`,


    //管理规定
    getRegular: `${base}regular/list`,
    getAllRegular: `${base}regular/list/all`,
    postRegular: `${base}regular/content`,
    getRegularDetail: id => `${base}regular/content/id/${id}`,
    acceptRegular: id => `${base}regular/id/${id}`,
    putRegular: id => `${base}regular/content/id/${id}`,
    deleteRegular: id => `${base}regular/id/${id}`,

    //通知相关
    getNotice: `${base}notices/list`,
    getAllNotice: `${base}notices/list/all`,
    postNotice: `${base}notices/content`,
    getNoticeDetail: id => `${base}notices/content/id/${id}`,
    acceptNotice: id => `${base}notices/id/${id}`,
    putNotice: id => `${base}notices/content/id/${id}`,
    deleteNotice: id => `${base}notices/id/${id}`,

//财务相关
    getFinance:`${base}finances`,
    exportFinance:`${base}finances/export`,
    deleteFinance: (id)=>`${base}finances/id/${id}`,
    postFinance:`${base}finances`,
    putFinance: (id)=>`${base}finances/id/${id}`,

    //文件相关
    getFile: `${base}documents`,
    deleteFile: id => `${base}documents/id/${id}`,
    uploadFile: `${base}documents`,
    downloadFile: id => `${base}documents/id/${id}`,

}
export default API;