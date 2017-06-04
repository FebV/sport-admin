import React from 'react';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import camGym from '../../controllers/CamGym';
export default class GymSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            camGym: null,
            campus: [],
            type: [],
            gym: [],
            selectedCampus: null,
            selectedType: null,
            selectedGym: null,
        }
    }

    componentDidMount() {
        camGym.getCamGym().then(res => {
            this.setState({camGym: res});
            const campusSet = new Set();
            const campusArr = [];
            res.map(e => {
                let oriLen = campusSet.size;
                campusSet.add(e.campus_chinese);
                let aftLen = campusSet.size;
                if(aftLen > oriLen)
                    campusArr.push(e);
            })
            this.setState({campus: campusArr});
        })
    }

    onSelectCampus(e, k, v) {
        console.log(v);
        // console.log(this.state.campus[k]);
        this.setState({selectedCampus: v}, () => {
            if(this.props.onChange)
                this.props.onChange(v);
        });
        this.setState({gym: []});
        const typeSet = new Set();
        const targetType = this.state.camGym.filter(e => e.campus == v.campus);

        const typeArr = targetType.filter(e => {
            const oriLen = typeSet.size;
            typeSet.add(e.type);
            const aftLen = typeSet.size;
            return aftLen > oriLen;
        })
        this.setState({type: typeArr});

    }

    onSelectType(e, k, v) {
        this.setState({selectedType: v});
        const GymSet = new Set();
        const targetGym = this.state.camGym.filter(e => e.campus == this.state.selectedCampus.campus).filter(e => e.type == v.type);
        this.setState({gym: targetGym}, () => {
            if(this.props.onChange)
                this.props.onChange(v);
        });
    }

    onSelectGym(e, k, v) {
        this.setState({selectedGym: v});
        console.log(v);
        if(this.props.onChange)
            this.props.onChange(v);
    }


    render() {
        return (
            <span style={this.props.style}>
                校区
                <DropDownMenu
                    style={{position: 'relative', top: '20px'}}
                    value={this.state.selectedCampus}
                    onChange={this.onSelectCampus.bind(this)}
                >
                {this.state.campus.map(
                    (e, idx) => (
                        <MenuItem key={idx} value={e} primaryText={e.campus_chinese} />
                    )
                )}
                </DropDownMenu>
                {
                    this.props.dropType !== true ?
                <span>
                    类型
                <DropDownMenu
                    style={{position: 'relative', top: '20px'}}
                    value={this.state.selectedType}
                    onChange={this.onSelectType.bind(this)}
                >
                    {this.state.type.map((e, idx) => {
                        return <MenuItem key={idx} value={e} primaryText={e.type} />
                    })
                }
                </DropDownMenu>
                </span>
                :
                null
                }
                {
                    this.props.dropGym !== true ?
                <span>
                    场馆
                <DropDownMenu
                    style={{position: 'relative', top: '20px'}}
                    value={this.state.selectedGym}
                    onChange={this.onSelectGym.bind(this)}
                >
                    {this.state.gym.map((e, idx) => {
                        return <MenuItem key={idx} value={e} primaryText={e.gym} />
                    })
                }
                    
                </DropDownMenu>
                </span>
                :
                null
                }
            </span>
        )
    }
}