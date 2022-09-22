import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { isAuthenticate } from '../auth';
import Layout from '../core/Layout/Layout';
import { getUserInfo, updateUserInfo } from './apiUser';


const Profile = () => {
    const[values, setValues] = useState({
        name:'',
        password:'',
        error: false,
        success: false
    })

    const {name, password, error, success} = values
    let {userId} = useParams()
    const {token} = isAuthenticate()

    //get user info
    const init = (userId)=>{
        getUserInfo(userId, token).then(data=>{
            if(data.error){
                setValues({...values, error: true})
            }else{
                setValues({...values, name: data.name})
            }
        })
    }

    useEffect(()=>{
        init(userId)
    },[])

    //Handel Change
    const handleChange = name => e =>{
        setValues({...values, error:false, [name]: e.target.value})
    }

    //Update User info
    const clickSubmit = (e) =>{
        e.preventDefault();
        updateUserInfo(userId, token, {name, password}).then(data=>{
            if(data.error){
                setValues({...values, error:true})
            }else{
                setValues({...values, name: data.name, password: data.password, success: true})
            }
        })
    }

    //Profile Update
    const profileUpdate = (name, password)=>{
        return(
            <Container>
            <Row>
                <Col md={12}>
                    <h2 className="mb-4">Profile Update</h2>
                    <form className='form-group'>
                        <div className="form-group">
                            <label><strong>Name</strong></label>
                            <input type="text" onChange={handleChange('name')} className='form-control' value={name} />
                        </div>
                        <div className="form-group">
                            <label><strong>Password</strong></label>
                            <input type="text" onChange={handleChange('password')} className='form-control' value={password} />
                        </div>

                        <button className='btn btn-info' onClick={clickSubmit}>Update</button>
                    </form>
                </Col>
            </Row>
        </Container>
        )
    }
    return (
        <Layout title='Update Profile' description='Update Profile'>
            {profileUpdate(name, password)}
        </Layout>
    );
};

export default Profile;