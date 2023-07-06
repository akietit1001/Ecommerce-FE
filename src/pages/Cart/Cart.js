import React, {useState, useEffect } from 'react';
import '../../styles/CartStyle.css'
import Layout from '../../Layout/Layout';
import { useCart } from '../../context/cart';
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import DropIn from 'braintree-web-drop-in-react'
import { paymentApi } from '../../http/Payment';
import { toast } from 'react-hot-toast';

const Cart = () => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const [instance, setInstance] = useState('')
    const [loading, setLoading] = useState(false)
    const [clientToken, setClientToken] = useState('');
    const navigate = useNavigate();

    // Total price
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item)=> {
                total = total + item.price
            })
            return total.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
            });
        } catch (error) {
            console.log(error)
        }
    }

    // delete item
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart]
            let index = myCart.findIndex(item => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart)
            localStorage.setItem('cart', JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    }

    // get payment gateway token
    const getToken = async () => {
        try {
            const res = await paymentApi.getToken('/api/v1/product/braintree/token')
            setClientToken(res?.clientToken)
        } catch (error) {
                console.log(error)
        }
    }

    useEffect(() => {
        getToken()
    },[auth?.token])

    // handle payment
    const handlePayment = async () => {
        try {
            setLoading(true);
            const id = await auth?.user._id
            const { nonce } = await instance.requestPaymentMethod();
            const data = await paymentApi.payment("/api/v1/product/braintree/payment", {
                nonce,
                cart,
                id
            });
            setLoading(false);
            localStorage.removeItem("cart");
            setCart([]);
            navigate("/dashboard/user/orders");
            toast.success("Payment Completed Successfully ");
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }


    return (
        <Layout title={'Your Cart'}>
            <div className="container cart-page">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className='text-center p-2 mb-1'>
                            {`Hello ${auth?.token && auth?.user.name}`}
                        </h1>
                        <h4 className='text-center'>
                            {cart?.length > 0 ? `Yout have ${cart?.length} items in your cart ${auth?.token 
                            ? '' : 'Please login to checkout'}` 
                            : 'Your cart to empty'}
                        </h4>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-7 p-0 m-0">
                            {
                                cart?.map((c)=>(
                                    <div className='row card flex-row' key={c._id}>
                                        <div className="col-md-4 d-flex justify-content-center align-items-center">
                                            <img src={`http://localhost:8080/api/v1/product/product-photo/${c._id}`}
                                            className='cart-img-top' 
                                            alt={c.name}
                                            width={'100px'}
                                            />
                                        </div>
                                        <div className="col-md-4 d-flex flex-column justify-content-center">
                                            <p>{c.name.substring(0,30)}</p>
                                            <p>{c.description.substring(0,30)}...</p>
                                            <h4>Price: {c.price.toLocaleString("en-US", {
                                                style: "currency",
                                                currency: "USD",
                                            })}</h4>
                                        </div>
                                        <div className='col-md-4 cart-remove-btn'>
                                            <span 
                                                    className={'remove-item'}
                                                    onClick={()=> removeCartItem(c._id)}>
                                                    Remove
                                            </span>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="col-md-4 cart-summary">
                            <h4>Cart Summary</h4>
                            <p>Total | Checkout | Payment</p>
                            <hr />
                            <h4>Total: {totalPrice()}</h4>
                            {auth?.user?.address ? (
                                <>
                                <div className="mb-3">
                                    <h4>{`Current Address: ${auth?.user?.address}`}</h4>
                                    <Button onClick={()=> navigate('/dashboard/user/profile', {
                                        state: '/cart'
                                    })}>Update Address</Button>
                                </div>
                                </>
                            ) : (
                                <div className="mb-3">
                                    {
                                        auth?.token ? (
                                            <Button onClick={()=> navigate('/dashboard/user/profile', {
                                            state: '/cart'
                                        })}>Update Address</Button>
                                        ) : (
                                            <Button onClick={() =>
                                                navigate("/login", {
                                                    state: '/cart'
                                                })
                                            }>Please Login to checkout</Button>
                                        )
                                    }
                                </div>
                            )}
                            <div className="mt-2">
                            {
                                !clientToken || !cart?.length ? ('') : (
                                    <>
                                    <DropIn 
                                    options={{
                                        authorization: clientToken,
                                        paypal: {
                                            flow: 'vault'
                                        }
                                    }}
                                    onInstance={instance => setInstance(instance)}
                                    />
                                    <Button onClick={handlePayment} disabled={loading || !instance || !auth?.user?.address}>
                                        {loading ? "Processing....." : 'Make Payment'}
                                    </Button>
                                    </>
                                )
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Cart;
