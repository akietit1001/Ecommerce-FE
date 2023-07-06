import React, {useState, useEffect} from 'react';
import './Profile.css'
import Layout from '../../../Layout/Layout';
import UserMenu from '../../../Layout/UserMenu/UserMenu';
import { useAuth } from '../../../context/auth';
import { toast } from 'react-hot-toast';
import Auth from '../../../http/Auth';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';

const Profile = () => {
    const [auth, setAuth] = useAuth()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')

    // Get user data
    useEffect(()=> {
        const { email, name, phone, address, password} = auth.user
        setName(name)
        setPhone(phone)
        setAddress(address)
        setEmail(email)
        setPassword(password)
        }, [auth?.user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await Auth.updateProfile("/api/v1/auth/profile", {
            name,
            email,
            password,
            phone,
            address,
          });
          if (res.success) {
            setAuth({...auth, user: res?.updatedUser})
            let ls = localStorage.getItem('auth')
            ls = JSON.parse(ls)
            ls.user = res.updatedUser
            localStorage.setItem('auth', JSON.stringify(ls))
            toast.success('Profile updated successfully')
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
        }
      };

    return (
        <Layout title={'Profile'}>
            <div className="container-fluid p-3 m-3">
                <div className='row'>
                    <div className='col-md-3' style={{marginTop: '30px'}}>
                        <UserMenu />
                    </div>
                    <div className='col-md-9' style={{marginTop: '30px'}}>
                        <div className="form-container" style={{ minHeight: "90vh" }}>
                            <form onSubmit={handleSubmit}>
                            <h4 className="title">USER PROFILE</h4>
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
                            <Button type="submit" className="btn" width={'100%'}>
                                UPDATE
                            </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Profile;
