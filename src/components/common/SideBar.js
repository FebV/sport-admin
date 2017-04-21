import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router-dom';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';


import Auth from '../../controllers/Auth';

export default class SideBar extends React.Component {

  constructor(props) {
    super(props);
    this.sideBarItems = [
            {
                iconFamily: "fa fa-home",
                content: "主页",
                link: "/",
            },
            {
                iconFamily: "fa fa-home",
                content: "新闻",
                link: "/news",
            },
            {
                iconFamily: "fa fa-tachometer",
                content: "场馆介绍",
                subItems: [
                    {
                        content: "综合体育馆",
                        link: "/intro/zh",
                        iconFamily: "fa fa-location-arrow"
                    },
                    {
                        content: "中心校区",
                        link: "/intro/zx",
                        iconFamily: "fa fa-location-arrow"                        
                    },
                    {
                        content: "洪家楼校区",
                        link: "/intro/hjl",
                        iconFamily: "fa fa-location-arrow"                        
                    },
                    {
                        content: "千佛山校区",
                        link: "/intro/qfs",
                        iconFamily: "fa fa-location-arrow"                        
                    },
                    {
                        content: "趵突泉校区",
                        link: "/intro/btq",
                        iconFamily: "fa fa-location-arrow"                        
                    },
                    {
                        content: "兴隆山校区",
                        link: "/intro/xls",
                        iconFamily: "fa fa-location-arrow"                        
                    },
                    {
                        content: "软件园校区",
                        link: "/intro/rjy",
                        iconFamily: "fa fa-location-arrow"                        
                    },
                ]
            },
            // {
            //     iconFamily: "fa fa-trophy",
            //     content: "体育活动专栏",
            //     link: "/arrange",
            // },
            // {
            //     iconFamily: "fa fa-list-alt",
            //     content: "大型活动专栏",
            //     link: "/activity",
            // },
            {
                iconFamily: "fa fa-search",
                content: "场馆查询",
                link: "/query",
            },
            {
                iconFamily: "fa fa-pencil-square-o",
                content: "场馆申请",
                link: "/apply",
            },
            {
                iconFamily: "fa fa-cloud-download",
                content: "文件下载",
                link: "/download",
            },
            {
                iconFamily: "fa fa-comment-o",
                content: "留言板",
                link: "/comment",
            },
            {
                iconFamily: "fa fa-user",
                content: "管理员",
                option: true,
                subItems: [
                    {
                        content: "个人中心",
                        link: "/admin/mine",
                        iconFamily: "fa fa-cogs"
                    },
                    {
                        content: "新闻公告管理",
                        link: "/admin/announce",
                        iconFamily: "fa fa-cogs"
                    },
                    {
                        content: "场馆管理",
                        link: "/admin/gym",
                        iconFamily: "fa fa-cogs"                        
                    },
                    {
                        content: "账户管理",
                        iconFamily: "fa fa-cogs",
                        link: "/admin/account",
                    },
                    {
                        content: "管理员留言",
                        link: "/admin/comment",
                        iconFamily: "fa fa-cogs"                        
                    },
                    {
                        content: "申请管理",
                        link: "/admin/apply",
                        iconFamily: "fa fa-cogs"                        
                    },
                    {
                        content: "器材管理",
                        link: "/admin/equipment",
                        iconFamily: "fa fa-cogs"                        
                    },
                    {
                        content: "文件管理",
                        link: "/admin/file",
                        iconFamily: "fa fa-cogs"                        
                    },
                    {
                        content: "财务管理",
                        link: "/admin/finance",
                        iconFamily: "fa fa-cogs"                        
                    }
                ]
            }
        ];
    this.state = {
        isLogin: Auth.isLogin()
    }
    

    addEventListener('log status change', () => {
//        this.setState({login: Auth.isLogin()});
        this.setState({isLogin: Auth.isLogin()});
     } );
  }

  handleToggle() {
      this.setState({open: !this.state.open});
  }
  /*
  {this.sideBarItems.map(
                (e, idx) => {
                    if(e.option && !this.state.isLogin)
                        return null;
                    let isCurrent = "white";
                    if(e.link == location.pathname)
                        isCurrent = "lightgray"
                    return (
                    <Link key={idx} to={e.link}>
                        <MenuItem style={{height: "8vh", lineHeight: "8vh", backgroundColor: isCurrent, fontSize: "15px"}}>
                            <i style={{width:"5vh"}} className={e.iconFamily}></i>
                            {e.content}
                        </MenuItem>
                    </Link>
                )
                })}*/

  render() {
    return (
      <div>
        <MuiThemeProvider>
        <Drawer
            docked={this.props.drawerDocked}
            open={this.props.open}
            width={256}
            onRequestChange={this.props.handleDrawer}
            >
            <List style={{padding: "80px 0px"}}>
            {this.sideBarItems.map( (e, idx) => {
                let subItems = [];
                if(e.subItems) {
                    subItems = e.subItems.map( (se, sidx) => {
                        return (
                        
                        <ListItem
                            key={sidx}
                            containerElement={<Link to={se.link}></Link>}
                            primaryText={se.content}
                            leftIcon={<i className={se.iconFamily}></i>}
                        />
                        )});
                }
                return ( 
                    <ListItem
                        insetChildren={true}
                        key={idx}
                        containerElement={e.link ? <Link to={e.link}></Link> : <span></span>}
                        primaryText={e.content}
                        leftIcon={<i className={e.iconFamily} style={{marginTop: "17px"}}></i>}
                        nestedItems={subItems}
                        primaryTogglesNestedList={true}
                    />
                )
            })}
          </List>
            
        </Drawer>
        </MuiThemeProvider>
      </div>
    );
  }
}