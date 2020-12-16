import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../actions';


class SignupForm extends Component {
    renderField(field) {
        const { meta } = field;
        const className = `form-group ${meta.touched && meta.error ? 'has-danger' : ''}`;
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input className="form-control"
                    type={field.type || "text"} 
                    {...field.input}
                />
                <div className="text-help">
                    {meta.touched ? meta.error : ''}
                </div>
            </div>
        );
    }
    onSubmit(values) {
        this.props.signup(values, (success) => {
            if(success) {
                this.props.history.push('/users/me'); 
            }
        });
        //console.log(values);
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Enter Fullname"
                    name="fullname"
                    component={this.renderField}
                />
                <Field
                    type="email"
                    label="Enter email"
                    name="email" 
                    component={this.renderField}
                />
                <Field
                    type="password"
                    label="Enter password"
                    name="password" 
                    component={this.renderField}
                />
                <Field
                    type="number"
                    label="Enter Age"
                    name="age"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Sign Up</button>
                <Link className="btn btn-primary" to="/login">Login</Link>
                <Link className="back-to-list" to="/">Back to list</Link>
                
            </form>
        );
    }
}
function validate(values) {
    const errors = {};
    if(!values.email) {
        errors.email = "Enter email!";
    }
    if(!values.password) {
        errors.password = "Enter password!";
    }
    if(!values.fullname) {
        errors.fullname = "Enter Fullname!";
    }
    if(!values.age) {
        errors.age = "Enter correct age!";
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'UserSignupForm'
})(
    connect(null, {signup})(SignupForm)
);