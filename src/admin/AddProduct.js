import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { isAuthenticate } from "../auth";
import Layout from "../core/Layout/Layout";
import { createProduct, getCategory } from "./apiAdmin";

const AddProduct = () => {
  let [category, setCategory] = useState([]);
  let [values, setValues] = useState({
    loading: false,
    error: "",
    createProductName: "",
    redirectToProfile: false,
    categories: [],
  });

  const form = useRef(null);

  const { user, token } = isAuthenticate();
  const { loading, error, createProductName } = values;
  //const navigate = useNavigate()
  // console.log("form user", user)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
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

    createProduct(user._id, token, data1).then((data) => {
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
                {...register("photo", {required: true})}
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
            {...register("name", {required: true})}
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
            {...register("description", {required: true, maxLength: 2000})}
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
            {...register("price", {required: true})}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category" className="text-muted">
            <strong>Category:</strong>
            <span className="err">{errors.category && "This is Required"}</span>
          </label>

          <select id="category" type="text" className="form-control" {...register("category", {required: true})}>
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

          <select id="shipping" type="text" className="form-control" {...register("shipping", {required: true})}>
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
            {...register("quantity", {required: true})}
          />
        </div>

        <button className="btn btn-outline-primary mt-5" type="submit">
          Create
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

  const showLoading = ()=>{
    return <div className="alert alert-success">Loading...</div>
  }
  return (
    <Layout description="Create Category" title="Create Category">
        <Container>
            <Row>
                <Col md={8} className="offset-2">
                    {showError()}
                    {showSuccess()}
                    {loading && showLoading()}
                    {newProductForm()}
                </Col>
            </Row>
        </Container>
    </Layout>
  );
};

export default AddProduct;
