import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";



const Form = () => {
    const [formInputs, setFormInputs] = useState({
        name:"",
        email:"",
        password:"",
        TOS:"",
    });

    const [errors ,setErrors] = useState({
        name:'',
        email:'',
        password:'',
        TOS:'',
    });

    const [buttonDisable, setButtonDisable] = useState("")
    const [users, setUsers] = useState([])
    const validForm = yup.object().shape({
        name: yup.string().trim().required("Your Name is Missing"),
        email: yup.string().email().required('your Email is required'),
        password: yup.string().trim().required('A Password is required'),
        TOS: yup.boolean().oneOf([true], "Terms of Service must be checked"),
    });

    const validateChange = evt => {
        yup.reach(validForm, evt.target.name)
        .validate(evt.target.value)
        .then(valid =>{setErrors({
            ...errors,
            [evt.target.name]: ''
        })})
        .catch(err => {
            setErrors({
                ...errors,
                [evt.target.name]: err.errors[0]
            });
        });
    };

    useEffect(() =>{
        validForm.isValid(formInputs)
        .then((valid) => {
            setButtonDisable(!valid);
        });
    });

    const inputChange = (evt) =>{
        evt.persist();
        const newFormData ={
            ...formInputs,
            [evt.target.name]: evt.target.type ===  "checkbox" ? evt.target.checked : evt.target.value
            
        }
        validateChange(evt)
        setFormInputs(newFormData)
    }

    const formSubmit = evt => {
        evt.preventDefault();
        axios.post('https://reqres.in/api/users', formInputs)
        .then(res => {
            setUsers(...users, res.data)
            setFormInputs({
                name:'',
                email:'',
                password:'',
                TOS:'',
            })
        })
        .catch(err => {
            console.log('Error in Form', err.responce)
        })
    }



    return (
        <form onSubmit={formSubmit}>
            <div>
                <h2>fill out the form below</h2>

                <label>Full Name
                    <input
                    value={formInputs.name}
                    onChange={inputChange}
                    name="name"
                    type="text"
                    placeholder="your name"
                    
                    />
                </label>
                <label>Email
                    <input
                    value={formInputs.email}
                    onChange={inputChange}
                    name="email"
                    type="text"
                    placeholder="your email"
                    
                    />
                </label>
                <label>Password
                    <input
                    value={formInputs.password}
                    onChange={inputChange}
                    name="password"
                    type="password"
                    placeholder="*******"
                    
                    />
                </label>
                <label>Terms of Service
                    <input
                    type="checkbox"
                    name="TOS"
                    checked={formInputs.TOS}
                    onChange={inputChange}
                    />
                </label>
            </div>


            <button disabled={buttonDisable} type="submit">Submit</button>

            <div>
                <div>{errors.name}</div>
                <div>{errors.email}</div>
                <div>{errors.password}</div>
                <div>{errors.TOS}</div>
            </div>

                <div>
                    <p>{users.name}</p>
                    <p>{users.email}</p>
                </div>
        


        </form>
    )
}

export default Form;
