import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';
import { isAuthenticate } from "../auth";
import Layout from "../core/Layout/Layout";
import { getCategory, getSingleProduct, updateProduct } from "./apiAdmin";

const UpdateProduct = (props) => {
  let [category, setCategory] = useState([]);
  let [values, setValues] = useState({
    loading: false,
    error: "",
    createProductName: "",
    redirectToProfile: false,
    categories: [],
  });

  const form = useRef(null);
  let {productId} = useParams()
  const navigate = useNavigate()

  const { user, token } = isAuthenticate();
  const { loading, error, createProductName, redirectToProfile } = values;
  //const navigate = useNavigate()
   console.log("Edit form user", productId)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const init =(productId)=>{
    getSingleProduct(productId).then((data)=>{
        if (data.error) {
            setValues({ ...values, error: data.error });
          } else {
            setValue("name", data.name, { shouldValidate: false });
            setValue("photo", "", { shouldValidate: false });
            setValue("description", data.description, { shouldValidate: false });
            setValue("price", data.price, { shouldValidate: false });
            setValue("quantity", data.quantity, { shouldValidate: false });
            setValue("category", data.category.name, { shouldValidate: false });
            setValue("shipping", data.shipping, { shouldValidate: false });
          }
    })
  }

  useEffect(() => {
    init(productId);
    getCategory().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategory((category) => data);
      }
    });
  }, []);

  let onSubmit = (data) => {
    //console.log("form data", user.id)
    const data1 = new FormData(form.current);
    setValues({...values, error: "", loading:true})

    updateProduct(productId, user._id, token, data1).then((data) => {
      if (data.error) {
        setValues({...values, error: data.error})
      } else {
         setValue("name", "", { shouldValidate: false });
         setValue("photo", "", { shouldValidate: false });
         setValue("description", "", { shouldValidate: false });
         setValue("price", "", { shouldValidate: false });
         setValue("quantity", "", { shouldValidate: false });
         setValue("shipping", "0", { shouldValidate: false });

         setValues({
            ...values,
            error:'',
            loading: false,
            redirectToProfile:true,
            createProductName: data.name
         })
      }
    });
  };

  //New Product Form
  const newProductForm = () => {
    return (
      <form ref={form} className="mb-3" onSubmit={handleSubmit(onSubmit)}>
        <h4>Post Photo</h4>
        <span className="err">{errors.photo && "This is Required"}</span>
        <div className="form-group">
          <label className="btn btn-secondary">
            <input
                type="file"
                accept="image/*"
                {...register("photo")}
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="product" className="text-muted">
            <strong>Product Name:</strong>
            <span className="err">{errors.name && "This is Required"}</span>
          </label>

          <input
            type="text"
            id="product"
            placeholder="product"
            className="form-control"
            {...register("name")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description" className="text-muted">
            <strong>Description:</strong>
            <span className="err">{errors.description && "This is Required"}</span>
          </label>

          <textarea
            id="description"
            placeholder="description"
            className="form-control"
            {...register("description", { maxLength: 2000})}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price" className="text-muted">
            <strong>Price:</strong>
            <span className="err">{errors.price && "This is Required"}</span>
          </label>

          <input
            type="number"
            id="price"
            placeholder="price"
            className="form-control"
            {...register("price")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category" className="text-muted">
            <strong>Category:</strong>
            <span className="err">{errors.category && "This is Required"}</span>
          </label>

          <select id="category" type="text" className="form-control" {...register("category")}>
                <option>Please Select One</option>
                {category.map((c,i)=>(
                    <option value={c._id} key={i}>
                        {c.name}
                    </option>
                ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="shipping" className="text-muted">
            <strong>Shipping:</strong>
            <span className="err">{errors.shipping && "This is Required"}</span>
          </label>

          <select id="shipping" type="text" className="form-control" {...register("shipping")}>
                <option>Please Select One</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="quantity" className="text-muted">
            <strong>Quantity:</strong>
            <span className="err">{errors.quantity && "This is Required"}</span>
          </label>

          <input
            type="number"
            id="quantity"
            placeholder="quantity"
            className="form-control"
            {...register("quantity")}
          />
        </div>

        <button className="btn btn-outline-primary mt-5" type="submit">
          Update Product
        </button>
      </form>
    );
  };

  //show error msg
  const showError = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  //show Success  msg
  const showSuccess = () => {
    return (
      <div
        className="alert alert-info"
        style={{ display: createProductName ? "" : "none" }}
      >
        <h3>{`${createProductName} is created`}</h3>
      </div>
    );
  };

  //show loading msg
  const showLoading = ()=>{
    return <div className="alert alert-success">Loading...</div>
  }

  //redirect
  const redirectAdmin = ()=>{
    if(redirectToProfile){
        navigate("/");
    }
  }


  return (
    <Layout description="Create Category" title="Create Category">
        <Container>
            <Row>
                <Col md={8} className="offset-2">
                    {showError()}
                    {showSuccess()}
                    {loading && showLoading()}
                    {redirectAdmin()}
                    {newProductForm()}
                </Col>
            </Row>
        </Container>
    </Layout>
  );
};

export default UpdateProduct;
