import React from 'react'
import {Formik, Form, Field} from 'formik'
//can also use ErrorMessage for displaying error messages
import * as Yup from 'yup'
import axios from 'axios';

const AddProduct = () => {

  const initialValues = {
    name : "",
    description : "",
    price : "",
    category : "",
    quantity : 0,
    image : "",
  }

  const validationSchema = Yup.object().shape({
    name : Yup.string().required(),
    description : Yup.string().max(200),
    price : Yup.number().required(),
    category : Yup.string().required(),
    quantity : Yup.number().required(),
    image : Yup.string(),
  })

  const onSubmit = (data : object) => {
      console.log("add product");
    }
    
  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form>
          <label> Product Name :
          <Field name="name" placeholder="Enter product name"/>
          </label>
          <label> Description :
          <Field name="description" placeholder="Describe product here..."/>
          </label>
          <label> Price per unit :
          <Field name="price" placeholder=""/>
          </label>
          <label> Product Category :
          <Field name="category" placeholder=""/>
          </label>
          <label> Quantity :
          <Field name="quantity" placeholder=""/>
          </label>
          <label> Image URL :
          <Field name="image" placeholder=""/>
          </label>
          
          <button type="submit">Add Product</button>

        </Form>

      </Formik>
      
    </div>
  )
}

export default AddProduct