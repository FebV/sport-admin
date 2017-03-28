import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router-dom';


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
            iconFamily: "fa fa-tachometer",
            content: "体育场馆介绍",
            link: "/intro",
        },
        {
            iconFamily: "fa fa-trophy",
            content: "体育活动专栏",
            link: "/arrange",
        },
        {
            iconFamily: "fa fa-list-alt",
            content: "大型活动专栏",
            link: "/activity",
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
    ]
  }

  handleToggle() {
      this.setState({open: !this.state.open});
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
        <Drawer
            open={this.props.open}
            width={256}
            >
          <MenuItem style={{height: "64px"}}></MenuItem>
            {this.sideBarItems.map(
                (e, idx) => {
                    let isCurrent = "white";
                    if(e.link == location.pathname)
                        isCurrent = "lightgray"
                    return (
                    <Link key={idx} to={e.link}>
                        <MenuItem style={{height: "8vh", lineHeight: "8vh", backgroundColor: isCurrent, fontSize: "3vh"}}>
                            <i style={{width:"5vh"}} className={e.iconFamily}></i>
                            {e.content}
                        </MenuItem>
                    </Link>
                )
                }
            )}
        </Drawer>
        </MuiThemeProvider>
      </div>
    );
  }
}