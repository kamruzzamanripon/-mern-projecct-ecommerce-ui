import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { singIn, singUp } from '../auth';

const Signin = (props)=> {
    const { register, handleSubmit, setValue, formState:{errors}} = useForm();
    let [error, setError] = useState(0);
    let [success, setSuccess] = useState(0)

    let onSubmit =(data)=>{
        console.log(data)
        let {email, password} = data;
        singIn({email, password}).then((data)=>{
            if(data.error){
                setSuccess(0);
                setError(data.error);
            }else{
                setSuccess(1);
                setError(0);
                setValue("email", "", {shouldValidate: false});
                setValue("password", "", {shouldValidate: false});
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
    return (
        <div>
            {showError()}
            {showSuccess()}
            {signUpForm()}
        </div>
    );
}

export default Signin;