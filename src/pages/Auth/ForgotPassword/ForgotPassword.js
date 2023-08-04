import React, {useState} from 'react';
import './ForgotPassword.css'
import Layout from '../../../Layout/Layout';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Auth from '../../../http/Auth';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await Auth.forgotPassword("/api/v1/auth/forgot-password", {
            email,
            answer,
            newPassword,
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
        <Layout title={'Forgot Password'}>
           <div className="form-container" style={{ minHeight: "90vh" }}>
                <form onSubmit={handleSubmit} style={{width: '50%'}}>
                <h4 className="title">FORGOT PASSWORD</h4>
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
                    title={'Answer'}
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="form-control answer-input"
                    id="exampleInputAnswer"
                    placeholder="What is your favourite sport?"
                    required
                    />
                </div>
                <div className="mb-3">
                    <Input
                    title={'New Password'}
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="form-control password-input"
                    id="exampleInputPassword"
                    placeholder="Enter Your New Password"
                    required
                    />
                </div>
                <Button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                    RESET PASSWORD
                </Button>
                </form>
            </div>
        </Layout>
    );
}

export default ForgotPassword;
