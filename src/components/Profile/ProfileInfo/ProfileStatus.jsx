import React from 'react';
import classes from './ProfileInfo.module.css';
// import Preloader from '../../common/Preloader/Preloader';
// import ProfileStatus from './ProfileStatus';

class ProfileStatus extends React.Component {
    state = {editMode: false}

    activateEditMode = () => {
        // debugger;
        // console.log(this);
        this.setState({editMode: true})
        this.state.editMode = true;
        // this.forceUpdate();
    }

    deactivateEditMode = () => {
        this.setState({editMode: false})
        this.state.editMode = false;
        // this.forceUpdate();
    }

    render() {
        return (<div>
            {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditMode}>{this.props.status}</span>
                </div>}
            {this.state.editMode &&
                <div>
                    <input autoFocus={true} onBlur={this.deactivateEditMode} value={this.props.status} />
                </div>}
        </div>
        )
    }
}

export default ProfileStatus;