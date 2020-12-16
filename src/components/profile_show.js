import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProfile, deleteProfile } from '../actions';

class ShowProfile extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchProfile();
    }
    onDeleteClick() {
        const { id } = this.props.match.params;
        this.props.deleteProfile(id, (success) => {
            this.props.history.push('/');
        });
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
                    <Link className="btn btn-primary detail" to={`/users/${user._id}/edit`}>Edit Profile</Link>
                    <button
                        className="btn btn-danger"
                        onClick={this.onDeleteClick.bind(this)}

                    >
                        Delete Profile
                    </button>
                    <Link className="back-to-list" to="/">Back to list</Link>
                    
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
   // console.log(state.users)
    return { user: state.users };
}

export default connect(mapStateToProps, { fetchProfile, deleteProfile })(ShowProfile);