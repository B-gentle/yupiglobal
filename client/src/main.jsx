import React from 'react'
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from 'react-redux';
import App from './App.jsx'
import './index.css'
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Product from './pages/Product.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Signup from './pages/Signup.jsx';
import store from './redux/store.js';
import Cartscreen from './components/Cartscreen.jsx';
import ShippingScreen from './pages/ShippingScreen.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import PaymentScreen from './pages/PaymentScreen.jsx';
import PlaceOrder from './pages/PlaceOrder.jsx';
import OrdersPage from './pages/OrdersPage.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import ViewOrders from './pages/admin/ViewOrders.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ProductList from './pages/admin/ProductList.jsx';
import ProductCategory from './pages/admin/ProductCategory.jsx';
import Site from './pages/Site.jsx';
import ProductEditPage from './pages/admin/ProductEditPage.jsx';
import UsersListPage from './pages/admin/UsersListPage.jsx';
import EditUserPage from './pages/admin/EditUserPage.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path='/products' element={<Product />} />
      <Route path='/products/:id' element={<ProductDetails />} />
      <Route path='/login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
      <Route path='cart' element={<Cartscreen />} />
      <Route path='site' element={<Site /> } />
      <Route path='' element={<PrivateRoute />}>
        <Route path='shipping' element={<ShippingScreen />} />
        <Route path='payment' element={<PaymentScreen /> } />
        <Route path='placeorder' element={<PlaceOrder />} />
        <Route path='order/:id' element={<OrdersPage /> } />
        <Route path='profile' element={<ProfilePage /> } />
      </Route>
      <Route path='' element={<AdminRoute /> }>
        <Route path='/admin/vieworders' element={<ViewOrders />} />
        <Route path='/admin/productlist' element={<ProductList /> } />
        <Route path='/admin/product/:id/edit' element={<ProductEditPage />} />
        <Route path='/admin/productcategories' element={<ProductCategory /> } />
        <Route path='/admin/userslist' element={<UsersListPage /> } />
        <Route path='/admin/user/:id/edit' element={<EditUserPage /> } />
      </Route>
    </Route>
  )
);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
