import React from 'react';
import classes from './ProfileInfo.module.css';
// import Preloader from '../../common/Preloader/Preloader';
// import ProfileStatus from './ProfileStatus';

class ProfileStatus extends React.Component {

    // statusInputRef = React.createRef()

    state = {editMode: false,
    status: this.props.status
}

    activateEditMode = () => {
        // debugger;
        // console.log(this);
        this.setState({editMode: true})
        // this.state.editMode = true;
        // this.forceUpdate();
    }

    deactivateEditMode = () => {
        this.setState({editMode: false});
        this.props.updateStatus(this.state.status);
        // this.state.editMode = false;
        // this.forceUpdate();
    }

    onStatusChange = (e) => {
        this.setState({status: e.currentTarget.value});
    }

    render() {
        return (<div>
            {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditMode}>{this.props.status || "-----"}</span>
                </div>}
            {this.state.editMode &&
                <div>
                    <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status} />
                </div>}
        </div>
        )
    }
}

export default ProfileStatus;