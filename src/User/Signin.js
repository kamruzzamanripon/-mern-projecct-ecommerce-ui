import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { authenticate, isAuthenticate, singIn } from '../auth';
import Layout from '../core/Layout/Layout';

const Signin = (props)=> {
    const { register, handleSubmit, setValue, formState:{errors}} = useForm();
    let [error, setError] = useState(0);
    let [success, setSuccess] = useState(0);
    let [redirect, setRedirect] = useState(false);

    const {user} = isAuthenticate();
    const navigate = useNavigate()

    let onSubmit =(data)=>{
        console.log(data)
        let {email, password} = data;
        singIn({email, password}).then((data)=>{
            if(data.error){
                setSuccess(0);
                setError(data.error);
            }else{
                authenticate(data, ()=>{
                    setRedirect(true)
                    setSuccess(1);
                    setError(0);
                    setValue("email", "", {shouldValidate: false});
                    setValue("password", "", {shouldValidate: false});
                })
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
                            <label htmlFor="email" className="text-muted">
                                <strong>Email:</strong>
                                <span className="err">
                                    { errors.email && "This is Required" }
                                </span>
                            </label>

                            <input type="email" id='email' placeholder='Your email' className="form-control" {...register("email")} />
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
                Login Successfully!
            </div>
        )
    }

    //redirect
    const redirectHome = ()=>{
        if(isAuthenticate()){
            //return <Redirect to="/" />
            navigate("/");
        }

        if(redirect){
            if(user && user.role === 1){

            }
        }
    }
    return (
        <Layout description="This is Sign In Page" title="Sign In">
            {redirectHome()}
            {showError()}
            {showSuccess()}
            {signUpForm()}
        </Layout>
    );
}

export default Signin;