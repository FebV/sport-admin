/**
 * Created by weng on 2017/4/13.
 */
import React from 'react';
import intorJson from './intro.json'

export default class PlayGround extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const path = window.location.pathname;
        const inJson = intorJson;
        if(path == '/intro/zh'){
            return (
                <div>
                    <div style={{width:"70%",margin:'0 auto'}}>
                        <h2>一、山东大学综合体育馆中心主场地</h2>
                        <img className="centerImg" src="../images/zh3.png"/>
                        <div className="centerImg">
                            <img className="twoImg" src="../images/zh4.png"/>
                            <img className="twoImg" src="../images/zh5.png"/>
                        </div>
                        <p className="centerText">（综合体育场外景）</p>
                        <p className="ptexts">&nbsp;&nbsp;综合体育馆中心主场地包括60m*40m的比赛场地和观众坐席，共分四部分。分为贵宾坐席、新闻媒体坐席、运动员坐席和普通观众坐席，并且还设有残疾人无障碍通道 ，可从南侧观众入口进入观众席。自综合体育馆建成以来主要担任体育教学、训练、110周年校庆典礼及晚会、2011-2016级迎新生晚会、2011-2016级学生开学典礼等多项庆典晚会。2012年中国乒乓球俱乐部超级联赛开幕式在山东大学综合体育馆举行，这是山大综合体育馆投入使用以来首次承办的全国性体育赛事。2015年，中国乒乓球超级联赛、WCBA中国女子篮球联赛多场赛事、全国围棋大赛、全国桥牌比赛、全国智能车比赛都在山东大学综合体育馆举办，效果颇佳。</p>
                        <p className="ptexts">&nbsp;&nbsp;在有限的空间内，通过缜密的排布，综合体育馆不仅作为篮球，排球，足球，乒乓球，羽毛球，体操等体育课程教学，并且在课余时间接受校外人员的体育活动的使用。</p>
                        <h2>二、山东大学综合体育馆附馆训练场地</h2>
                        <p className="ptexts">&nbsp;&nbsp;综合体育馆训练馆设置地下一层西副馆，设有中央空调、音响、电子计时、观光厅。该馆长35米、宽24米，主要供日常篮球训练以及小型体育活动使用。</p>
                        <img className="centerImg" src="../images/zh6.png"/>
                        <h2>三、山东大学综合体育馆智慧健身中心</h2>
                        <img className="centerImg" src="../images/zh10.png"/>
                        <p className="ptexts">&nbsp;&nbsp;综合体育馆训练馆设置地下一层东副馆，该馆长35米、宽24米，有27套智慧健身设施。</p>
                        <h2>四、山东大学综合体育馆游泳馆</h2>
                        <p className="ptexts">&nbsp;&nbsp;山东大学综合体育馆游泳馆位于中部比赛场地下的负一层，内设20*50m的8个泳道，层高约8米，主要是供山大本部学生上课、自由锻炼以及游泳队训练使用，同时也对外开放。</p>
                        <p className="ptexts">&nbsp;&nbsp;游泳馆的泳池水处理系统选用国际先进的臭氧消毒与长效消毒剂相结合的泳池水处理系统，水质符合国际泳联关于游泳池水质标准的规定，并具备水质自动监测系统。
                            游泳馆采用恒温系统，保证了游泳者一年四季的运动舒适度。并且充分考虑日常的运营管理成本，施工中选用大量新型节能环保建筑材料及设备，如空气能加热系统，热泵加热系统。</p>
                        <div className="centerImg">
                            <img className="twoImg" src="../images/zh11.png"/>
                            <img className="twoImg" src="../images/zh12.png"/>
                        </div>
                        <img className="centerImg" src="../images/zh7.png"/>
                        <h2>五、山东大学综合体育馆健身房</h2>
                        <p className="ptexts">&nbsp;&nbsp;2014年12月5日,山东大学中心校区综合体育馆健身房正式开放,山东大学师生和校外人员均可以来健身。健身房内共有24种器械,跑步机、动感单车、卧推器、杠铃等一应俱全。不仅供课程授课，还是平时健身锻炼的最佳之选，现在，到健身房健身已是我校师生课余活动的重要内容。</p>
                        <div className="centerImg">
                            <img className="twoImg" src="../images/zh8.png"/>
                            <img className="twoImg" src="../images/zh9.png"/>
                        </div>
                        <h2>六、山东大学综合体育馆乒乓球场地</h2>
                        <p className="ptexts">&nbsp;&nbsp;乒乓球厅设在地上二层利用体育馆内空地安装了19个乒乓球台（采用标准的长2.74米、宽1.525米，离地面高76厘米的比赛规格）。无论班级人数的多少，都很大程度的满足了乒乓球的教学的使用，克服了因为场地不足而造成的学生运动兴趣下降等因素。在这里，学生不仅可以系统的规范的学习乒乓球，还是休闲娱乐的好地方。</p>
                        <div className="centerImg">
                            <img className="twoImg" src="../images/zh13.png"/>
                            <img className="twoImg" src="../images/zh14.png"/>
                        </div>
                        <h2>七、山东大学综合体育馆形体房</h2>
                        <p className="ptexts">&nbsp;&nbsp;形体房设在体育馆地下一层，复合运动地板，配备有形体礼仪教学所需要的把杆、墙面镜、瑜伽垫等教学设备。设有20匹的中央空调，面积260平方，同时容纳40人进行活动。可进行基本形体训练，基本功训练，身韵训练，舞蹈训练、舞蹈排练，也可进行基本的礼仪体态训练。</p>
                        <img className="centerImg" src="../images/zh15.png"/>
                        <h2>八、山东大学综合体育馆台球厅</h2>
                        <p className="ptexts">&nbsp;&nbsp;台球厅位于东西训练馆的中央观光厅，共有6块花式台球桌。主要供学生课外娱乐以及台球比赛的使用。</p>
                        <img className="centerImg" src="../images/zh16.png"/>
                        <h2>九、山东大学综合体育馆附属用房</h2>
                        <p className="ptexts">&nbsp;&nbsp;综合体育馆举办的重要活动和重大比赛都是在这里召开会议，新闻发布和电子会议。中国乒乓球超级联赛、WCBA中国女子篮球联赛多场赛事、全国围棋大赛、全国桥牌比赛、全国智能车比赛等赛事的会议、新闻发布均在此举行。多功能的会议室和新闻发布厅能同时满足人声会议。视频播放等诸多功能。</p>
                        <div className="centerImg">
                            <img className="twoImg" src="../images/zh17.png"/>
                            <img className="twoImg" src="../images/zh18.png"/>
                        </div>
                        <h2>十、山东大学综合体育馆安全保障</h2>
                        <p className="ptexts">&nbsp;&nbsp;安全、快捷、有序的疏散是山东大学综合体育馆建筑的设计重点。</p>
                        <p className="ptexts">&nbsp;&nbsp;体育馆的安全保障体系对观众疏散、消防系统、反恐防爆等诸多方面做出详细规划和设计：足够宽敞的疏散大厅设计、明显清晰的避难标识设计、消防设计以及笔录显示监控系统。</p>
                        <p className="ptexts">&nbsp;&nbsp;消防设计通过多种防火分区的设计确保消防安全顺利进行。消防车可从校园北侧进入，围绕比赛场馆形成消防环路，并设有消防栓系统、自动喷洒系统、手提式灭火器等消防设施。</p>
                        <p className="ptexts">&nbsp;&nbsp;体育馆内共有彩色红外摄像机125台，分别对安检处、各层入口、主席台周边、主要通道及停车场等进行保安监视。</p>
                        <div className="centerImg">
                            <img className="twoImg" src="../images/zh19.png"/>
                            <img className="twoImg" src="../images/zh20.png"/>
                        </div>

                    </div>

                </div>
            )
        }else {
            const subPath = path.substr(7);
            const newJson = eval('inJson.'+subPath+'.playGround');
            return (
                <div>
                    <div style={{width:"70%",margin:'0 auto'}}>
                        {newJson.map((item,indx)=>{

                            for(let key in item){
                                switch (key){
                                    case "centerImg":
                                        return(<img className="centerImg" src={item.centerImg} key={'b'+indx}/>);
                                        break;
                                    case "ptexts":

                                        return(<p className="ptexts" key={'b'+indx}>&nbsp;&nbsp;&nbsp;&nbsp;{item.ptexts}</p>);
                                        break;
                                    case "head":

                                        return(<h2 key={'b'+indx}>{item.head}</h2>);
                                        break;
                                    case "twoImg1":

                                        return(<div className="centerImg" key={'b'+indx}>
                                            <img className="twoImg" src={item.twoImg1}/>
                                            <img className="twoImg" src={item.twoImg2}/>
                                        </div>);
                                        break;
                                    case "centerText":

                                        return(<p className="centerText" key={'b'+indx}>{item.centerText}</p>);
                                        break;
                                }


                            }


                        })
                        }

                    </div>

                </div>
            )
        }
    }
}