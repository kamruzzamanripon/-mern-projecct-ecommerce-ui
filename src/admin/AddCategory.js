import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { isAuthenticate } from '../auth';
import Layout from '../core/Layout/Layout';
import { createCategory } from './apiAdmin';

const AddCategory = ()=> {
    let [error, setError] = useState(0);
    let [success, setSuccess] = useState(0);
    
    const {user, token} = isAuthenticate();
    //const navigate = useNavigate()
   // console.log("form user", user)
    const { register, handleSubmit, setValue, formState:{errors}} = useForm();
    
    let onSubmit =(data)=>{
        //console.log("form data", user.id)
       
        createCategory(user._id, token, data).then((data)=>{
            if(data.error){
                setSuccess(0);
                setError(data.error);
            }else{
                setSuccess(1);
                setError(0);
                setValue("name", "", {shouldValidate: false});
            }
        })
    }

    //New Category Form
    const newCategoryForm = ()=>{
        return (
            <Container>
            <Row>
                <Col md={8} className="offset-md-2">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label htmlFor="category" className="text-muted">
                                <strong>Category Name:</strong>
                                <span className="err">
                                    { errors.name && "This is Required" }
                                </span>
                            </label>

                            <input type="text" id='category' placeholder='category' className="form-control" {...register("name", {required: true})} />
                        </div>

                        
                        <button className="btn btn-outline-primary mt-5" type='submit'>Create</button>
                    </form>

                    <div className="mt-5">
                        <Link to="/admin/dashboard" className="btn btn-outline-danger"> <FontAwesomeIcon icon={faBackward} /> Back to Dashboard</Link>
                    </div>
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
                Created Category Successfully!
            </div>
        )
    }

   
    return (
        <Layout description="Create Category" title="Create Category">
            {showError()}
            {showSuccess()}
            {newCategoryForm()}
        </Layout>
    );
}

export default AddCategory;