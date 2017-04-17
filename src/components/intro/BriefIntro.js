/**
 * Created by weng on 2017/4/13.
 */


import React from 'react';
import intorJson from './intro.json'

export default class BriefIntro extends React.Component {
    constructor(props) {
        super(props);

    }



    render(){
        const path = window.location.pathname;
        const inJson = intorJson;


        if(path == '/intro/zh'){
            return (
                <div>
                    <div style={{width:"70%",margin:'0 auto'}}>
                        <img className="centerImg" src="../images/zh1.png"/>
                        <p className="centerText">（综合体育场外景）</p>
                        <p className="ptexts">&nbsp;&nbsp;外部造型独具匠心的综合体育馆位于中心校区北门东侧的东运动场，北临山大北路，南侧是建设中的综合科研楼。2011年建成并投入使用，总占地面积约32000平方米。其外形设计理念是以其圆润的形态化解与周边建筑间距的矛盾，两个椭圆体相互穿插，包容而又不失张扬，体现力与美的结合；此造型设计新颖，富有时代感，其形象既与周围环境相协调、又体现了大学校园建筑的特点。</p>
                        <p className="ptexts">&nbsp;&nbsp;该馆为乙级体育馆，内部功能齐全，既可满足正常体育教学的需要，又能满足体育赛事和各类典礼及文体活动的需要。该场馆： ①设有座席7263个（总数），32个观众出入口，标准游泳池一座，篮球训练馆两座及中央比赛场地一处。 ②体育场馆建筑面积34472平方米，占地面积约3.9平方米，其中中央比赛场地长30米，宽50米，可进行手球、排球、篮球、体操比赛；平时可容纳15个羽毛球练习场地或16个乒乓球练习场地。标准游泳馆设在地下一层，游泳池长50米，宽22米，设有8个泳道线。 ③不仅可作为篮球、羽毛球、排球、乒乓球、手球等正式比赛使用，而且其内部还设置了室内游泳池和健身房等体育设施。另外，综合体育馆还通过设置多功能活动用房，充分利用了体育馆的空间。</p>
                        <img className="centerImg" src="../images/zh2.png"/>
                        <p className="ptexts">&nbsp;&nbsp;该馆的建造、使用过程中人们通过结合使用被动式建筑技术，达到节约能源，减少环境负荷的效果。在采光方面：建筑体量、平面设计、剖面设计和窗的设计都是控制能量（自然光、风等）流动的决定因素。为了节约能源、提高能效，建筑通过使用成熟、可靠、无需维护的绿色照明系统——索乐图导光管日光照明系统，巧妙地借助自然光的力量，解决了综合体育馆照明设备与用电负荷之间的矛盾。
                            综合体育馆周围道路便利，场地平整，水、暖、电、电讯等配套设施良好。</p>
                    </div>

                </div>
            )
        }else{
            const subPath = path.substr(7);
            const newJson = eval('inJson.'+subPath+'.brief');
            return (
                <div>
                    <div style={{width:"70%",margin:'0 auto',marginTop:'20px'}}>
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