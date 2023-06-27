import React, {useState} from 'react';
import './Register.css'
import Layout from '../../../Layout/Layout';
import {toast} from 'react-hot-toast'
import { NavLink, useNavigate } from 'react-router-dom'
import Auth from '../../../http/Auth';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await Auth.signUp("/api/v1/auth/register", {
            name,
            email,
            password,
            phone,
            address,
            answer
          });
          if (res && res.success) {
            toast.success(res && res.message);
            navigate("/login");
          } else {
            toast.error(res.message);
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
        }
      };
    return (
        <Layout title={'Sign Up'}>
            <div className="form-container" style={{ minHeight: "90vh" }}>
                <form onSubmit={handleSubmit}>
                <h4 className="title">REGISTER</h4>
                <div className="mb-3">
                    <Input
                    title={'Name'}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control name-input"
                    id="exampleInputName"
                    placeholder="Enter Your Name"
                    required
                    width={'22vw'}
                    />
                </div>
                <div className="mb-3">
                    <Input
                    title={'Email'}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control email-input"
                    id="exampleInputEmail"
                    placeholder="Enter Your Email "
                    required
                    />
                </div>
                <div className="mb-3">
                    <Input
                    title={'Password'}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control password-input"
                    id="exampleInputPassword"
                    placeholder="Enter Your Password"
                    required
                    />
                </div>
                <div className="mb-3">
                    <Input
                    title={'Phone Number'}
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control phone-input"
                    id="exampleInputPhone"
                    placeholder="Enter Your Phone"
                    required
                    />
                </div>
                <div className="mb-3">
                    <Input
                    title={'Address'}
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control address-input"
                    id="exampleInputAdresss"
                    placeholder="Enter Your Address"
                    required
                    />
                </div>
                <div className="mb-3">
                    <Input
                    title={'Answer'}
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="form-control answer-input"
                    id="exampleInputAnswer"
                    placeholder="What is your favorite sport?"
                    required
                    />
                </div>
                <p className='have-account'>I have account.<NavLink className='link-to-sign_in' to='/login'>Sign In</NavLink>now!</p>
                <Button type="submit" className="btn" width={'100%'}>
                    REGISTER
                </Button>
                </form>
            </div>
        </Layout>
    );
}

export default Register;
