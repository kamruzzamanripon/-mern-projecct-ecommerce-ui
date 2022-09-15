import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { singUp } from '../auth';
import Layout from '../core/Layout/Layout';

const Signup = (props)=> {
    const { register, handleSubmit, setValue, formState:{errors}} = useForm();
    let [error, setError] = useState(0);
    let [success, setSuccess] = useState(0)

    let onSubmit =(data)=>{
        console.log(data)
        let {email, name, password, about} = data;
        singUp({email, name, password, about}).then((data)=>{
            if(data.error){
                setSuccess(0);
                setError(data.error);
            }else{
                setSuccess(1);
                setError(0);
                setValue("name", "", {shouldValidate: false});
                setValue("email", "", {shouldValidate: false});
                setValue("password", "", {shouldValidate: false});
                setValue("about", "", {shouldValidate: false});
            }
        })
    }

    //Show Singup Form
    const signUpForm = ()=>{
        return (
            <Container>
            <Row>
                <Col md={8} className="offset-md-2">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label htmlFor="name" className="text-muted">
                                <strong>Name:</strong>
                                <span className="err">
                                    { errors.name && "This is Required" }
                                </span>
                            </label>

                            <input type="text" id='name' placeholder='Your Name' className="form-control" {...register("name", {required: true, maxLength: 32 })} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email" className="text-muted">
                                <strong>Email:</strong>
                                <span className="err">
                                    { errors.email && "This is Required" }
                                </span>
                            </label>

                            <input type="email" id='email' placeholder='Your email' className="form-control" {...register("email")} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="about" className="text-muted">
                                <strong>About:</strong>
                                <span className="err">
                                    { errors.about && "This is Required" }
                                </span>
                            </label>

                            <input type="text" id='about' placeholder='Your about' className="form-control" {...register("about", {required: true})} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="text-muted">
                                <strong>Password:</strong>
                                <span className="err">
                                    { errors.password && "This is Required" }
                                </span>
                            </label>

                            <input type="password" id='password' placeholder='Your password' className="form-control" {...register("password", {required: true})} />
                        </div>

                        <button className="btn btn-outline-primary mt-5" type='submit'>Submit</button>
                    </form>
                </Col>
            </Row>
        </Container>
        )
    }

    //show error msg
    const showError = ()=>{
        return(
            <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                {error}
            </div>
        )
    }

    //show Success  msg
    const showSuccess = ()=>{
        return(
            <div className="alert alert-info" style={{ display: success ? "" : "none" }}>
                Account Created Successfully! Please <Link to="/signin">Sign In</Link>
            </div>
        )
    }
    return (
        <Layout description="This is Sign Up Page" title="Sign Up">
            {showError()}
            {showSuccess()}
            {signUpForm()}
        </Layout>
    );
}

export default Signup;