import { isNumber } from 'lodash';
import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProfile, editProfile } from '../actions';

class EditProfile extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchProfile();
    }
    renderField(field) {
        const { meta } = field;
        const className = `form-group ${meta.touched && meta.error ? 'has-danger' : ''}`;
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input className="form-control"
                    type={field.type || "text"} 
                    {...field.input}
                    placeholder={field.placeholder}
                />
                <div className="text-help">
                    {meta.touched ? meta.error : ''}
                </div>
            </div>
        );
    }
    onSubmit(values) {
        const { id } = this.props.match.params;
        //console.log(values);
        this.props.editProfile(id, values, (success) => {
            if(!success) {
                this.props.history.push(`/users/me`);
            }    
            
        });
    }

    render() {
        const { handleSubmit, user } = this.props;
        if(!user) {
            return <div>Loading...</div>
        }
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Edit Fullname"
                    name="name"
                    placeholder={user.name}
                    component={this.renderField}
                />
                <Field
                    label="Edit Email"
                    type="email"
                    name="email"
                    placeholder={user.email}
                    component={this.renderField}
                />
                <Field
                    label="Edit Password"
                    type="password"
                    name="password"
                    component={this.renderField}
                />
                <Field
                    type="number"
                    label="Edit Age"
                    name="age" 
                    placeholder={user.age}
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Save</button>
                <Link className="btn btn-danger" to="/">Cancel</Link>
            </form>
        );
    }
}
function validate(values) {
    const errors = {};
    if(values.password && values.password.length <8) {
        errors.password = "Minimum 8 characters!";
    }
    return errors;
}
function mapStateToProps(state) {
    return { user: state.users };
}

export default reduxForm({
    validate,
    form: 'ProfileEdit'
})(
    connect(mapStateToProps, {fetchProfile, editProfile})(EditProfile)
);