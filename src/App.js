import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Policy from './pages/Policy/Policy';
import PageNotFound from './pages/404/PageNotFound';
import Login from './pages/Auth/Login/Login';
import Register from './pages/Auth/Register/Register';
import Dashboard from './pages/User/Dasboard/Dashboard';
import PrivateRoutes from './Routes/Private';
import ForgotPassword from './pages/Auth/ForgotPassword/ForgotPassword';
import AdminDasboard from './pages/Admin/AdminDasboard/AdminDasboard';
import AdminRoute from './Routes/AdminRoute';
import CreateCategory from './pages/Admin/CreateCategory/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct/CreateProduct';
import Users from './pages/Admin/Users/Users';
import Orders from './pages/User/Orders/Orders';
import Profile from './pages/User/Profile/Profile';
import Products from './pages/Admin/Products/Products';
import UpdateProduct from './pages/Admin/UpdateProduct/UpdateProduct';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<AdminRoute />}>
          <Route path='admin' element={<AdminDasboard />}/>
          <Route path='admin/create-category' element={<CreateCategory />}/>
          <Route path='admin/create-product' element={<CreateProduct />}/>
          <Route path='admin/products/:slug' element={<UpdateProduct />}/>
          <Route path='admin/products' element={<Products />}/>
          <Route path='admin/users' element={<Users />}/>
        </Route>
        <Route path='/dashboard' element={<PrivateRoutes />}>
          <Route path='user' element={<Dashboard />} />
          <Route path='user/orders' element={<Orders />}/>
          <Route path='user/profile' element={<Profile />}/>
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
