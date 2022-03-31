
import { Route, Routes } from 'react-router-dom';
import './App.css';
import DetailPage from './components/pages/detailPage';
import HomePage from './components/pages/homePage';
import Login from './components/login/Login';
import OrderDetailConfirmPage from './components/pages/order-detail-confirm-page';
import OrderDetailPage from './components/pages/order-detail-page';
import AdminLtePage from './components/pages/adminLtePage';
import ViewOrderPage from './components/pages/view-order-page';
function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/products/:id" element={<DetailPage/>}></Route>
        <Route path="/buyorder" element={<OrderDetailPage/>}></Route>
        <Route path="/confirm_order" element={<OrderDetailConfirmPage/>}></Route>
        <Route path="/admin" element={<AdminLtePage/>}></Route>
        <Route path='/my-order' element = {<ViewOrderPage/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
