import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProfile, deleteProfile } from '../actions';
import {keys} from '../actions';

class ShowProfile extends Component {
    componentDidMount() {
        this.props.fetchProfile();
    }
    onDeleteClick() {
        this.props.deleteProfile((success) => {
            this.props.history.push('/');
        });
    }
    onLogoutClick() {
        keys.token = undefined;
        this.props.history.push('/');
    }
    render() {
        const { user } = this.props;
       // console.log(user);
        if(!user) {
            window.alert('Please login to see profile!');
            this.props.history.push('/login');
            return <div>Loading...</div>
        }
        return (
            <div>
                <br></br>
                <h1>User Profile</h1>
                <div className="details-box">
                    <h3>User Email: {user.email}</h3>
                    
                    <h4>Name: {user.name}</h4>
                    <h5>Age: {user.age}</h5>
                    <Link className="btn btn-primary detail" to="/users/me/edit">Edit Profile</Link>
                    <button
                        className="btn btn-danger"
                        onClick={this.onDeleteClick.bind(this)}

                    >
                        Delete Profile
                    </button>
                    <Link className="back-to-list" to="/">Back to list</Link>
                    
                </div>
                <button className="btn btn-danger logout-btn" onClick={this.onLogoutClick.bind(this)}>
                    Logout
                </button>
            </div>
        );
    }
}
function mapStateToProps(state) {
   // console.log(state.users)
    return { user: state.users };
}

export default connect(mapStateToProps, { fetchProfile, deleteProfile })(ShowProfile);