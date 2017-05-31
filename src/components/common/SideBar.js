import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router-dom';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';


import Auth from '../../controllers/Auth';
import User from '../../controllers/User';

export default class SideBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = 
    {       sideBarItems: [
            {
                iconFamily: "fa fa-home",
                content: "主页",
                link: "/",
            },
            // {
            //     iconFamily: "fa fa-home",
            //     content: "新闻",
            //     link: "/news",
            // },
            // {
            //     iconFamily: "fa fa-tachometer",
            //     content: "场馆介绍",
            //     subItems: [
            //         {
            //             content: "综合体育馆",
            //             link: "/intro/zh",
            //             iconFamily: "fa fa-location-arrow"
            //         },
            //         {
            //             content: "中心校区",
            //             link: "/intro/zx",
            //             iconFamily: "fa fa-location-arrow"                        
            //         },
            //         {
            //             content: "洪家楼校区",
            //             link: "/intro/hjl",
            //             iconFamily: "fa fa-location-arrow"                        
            //         },
            //         {
            //             content: "千佛山校区",
            //             link: "/intro/qfs",
            //             iconFamily: "fa fa-location-arrow"                        
            //         },
            //         {
            //             content: "趵突泉校区",
            //             link: "/intro/btq",
            //             iconFamily: "fa fa-location-arrow"                        
            //         },
            //         {
            //             content: "兴隆山校区",
            //             link: "/intro/xls",
            //             iconFamily: "fa fa-location-arrow"                        
            //         },
            //         {
            //             content: "软件园校区",
            //             link: "/intro/rjy",
            //             iconFamily: "fa fa-location-arrow"                        
            //         },
            //     ]
            // },
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
            // {
            //     iconFamily: "fa fa-search",
            //     content: "场馆查询",
            //     link: "/query",
            // },
            // {
            //     iconFamily: "fa fa-pencil-square-o",
            //     content: "场馆申请",
            //     link: "/apply",
            // },
            // {
            //     iconFamily: "fa fa-cloud-download",
            //     content: "文件下载",
            //     link: "/download",
            // },
            // {
            //     iconFamily: "fa fa-comment-o",
            //     content: "留言板",
            //     link: "/comment",
            // },
            // {
            //     iconFamily: "fa fa-user",
            //     content: "管理员",
            //     option: true,
            //     subItems: [
                    {
                        content: "个人中心",
                        link: "/admin/mine",
                        iconFamily: "fa fa-user-circle-o"
                    },
                    {
                        content: "账户管理",
                        iconFamily: "fa fa-user-plus",
                        link: "/admin/account",
                    },
                    {
                        content: "新闻管理",
                        link: "/admin/news",
                        iconFamily: "fa fa-newspaper-o"
                    },
                    {
                        content: "通知管理",
                        link: "/admin/notice",
                        iconFamily: "fa fa-paper-plane"
                    },
                    {
                        content: "留言管理",
                        link: "/admin/comment",
                        iconFamily: "fa fa-envelope"
                    },
                    {
                        content: "场馆管理",
                        link: "/admin/gym",
                        iconFamily: "fa fa-university"                        
                    },
                    {
                        content: "申请管理",
                        link: "/admin/apply",
                        iconFamily: "fa fa-pencil-square-o"                        
                    },
                    {
                        content: "器材管理",
                        link: "/admin/equipment",
                        iconFamily: "fa fa-futbol-o"                        
                    },
                    {
                        content: "文件管理",
                        link: "/admin/file",
                        iconFamily: "fa fa-file-archive-o"                        
                    },
                    {
                        content: "财务管理",
                        link: "/admin/finance",
                        iconFamily: "fa fa-jpy"
                    }
                // ]
            // }
        ],
        isLogin: Auth.isLogin()
    };
    
    // addEventListener('login ok', () => {
    //     this.setState({isLogin: Auth.isLogin()});
    //  });
  }

  componentDidMount() {
      User.canAuthAccount()
        .then(res => {
            if(!res)
                this.setState({sideBarItems: this.state.sideBarItems.filter(ele => ele.content != '账户管理')})
        })
    User.canAuthEquip()
        .then(res => {
            if(!res)
                this.setState({sideBarItems: this.state.sideBarItems.filter(ele => ele.content != '器材管理')})
        })
    User.canAuthNews()
        .then(res => {
            if(!res)
                this.setState({sideBarItems: this.state.sideBarItems.filter(ele => ele.content != '新闻管理')})
        })
    User.canAuthFinance()
        .then(res => {
            if(!res)
                this.setState({sideBarItems: this.state.sideBarItems.filter(ele => ele.content != '财务管理')})
        })
    User.canAuthDocument()
        .then(res => {
            if(!res)
                this.setState({sideBarItems: this.state.sideBarItems.filter(ele => ele.content != '文件管理')})
        })
        
  }

  handleToggle() {
      this.setState({open: !this.state.open});
  }

  render() {
    return (
      <div>
        
        <Drawer
            docked={this.props.drawerDocked}
            open={this.props.open}
            width={256}
            onRequestChange={this.props.handleDrawer}
            >
            <List style={{padding: "12vh 0px"}}>
            {this.state.sideBarItems.map( (e, idx) => {
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
                        style={{backgroundColor: location.pathname == e.link ? 'lightgray' : 'white'}}
                    />
                )
            })}
          </List>
            
        </Drawer>
        
      </div>
    );
  }
}