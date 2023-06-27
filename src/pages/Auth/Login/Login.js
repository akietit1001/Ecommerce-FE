import React, {useState} from 'react';
import './Login.css'
import Layout from '../../../Layout/Layout';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Auth from '../../../http/Auth';
import { useAuth } from '../../../context/auth';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth()
    
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await Auth.signUp("/api/v1/auth/login", {
            email,
            password,
          });
          if (res && res.success) {
            toast.success(res && res.message);
            setAuth({
              ...auth,
              user: res.user,
              token: res.token,
            })
            localStorage.setItem('auth', JSON.stringify(res))
            navigate(location.state || "/");
          } else {
            toast.error(res.message);
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
        }
      };
    return (
        <Layout title={'Sign In'}>
            <div className="form-container" style={{ minHeight: "90vh" }}>
                <form onSubmit={handleSubmit}>
                <h4 className="title">LOGIN</h4>
                <div className="mb-3">
                    <Input
                    title={'Email'}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control email-input"
                    id="exampleInputEmail"
                    placeholder="Enter Your Email "
                    required={true}
                    width={'22vw'}
                    />
                </div>
                <div className="mb-3">
                    <Input
                    title={'Password'}
                    type= 'password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control password-input"
                    id="exampleInputPassword"
                    placeholder="Enter Your Password"
                    required
                    />
                </div>
                <p className='forgot-password' onClick={()=> navigate('/forgot-password')}>Forgot Password</p>
                <div className='login-btn'>
                  <Button type="submit" className="btn" width={'100%'}>
                      LOGIN
                  </Button>
                </div>
                <p className='havent-account'>Not a member.<NavLink className='link-to-sign-up' to={'/register'}>Sign up</NavLink>now!</p>
                </form>
            </div>
        </Layout>
    );
}

export default Login;
