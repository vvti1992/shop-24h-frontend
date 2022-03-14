
import { Route, Routes } from 'react-router-dom';
import './App.css';
import DetailPage from './components/detailPage';
import HomePage from './components/homePage';
import Login from './components/login/Login';
import OrderDetailPage from './components/order-detail-page';
function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/products/:id" element={<DetailPage/>}></Route>
        <Route path="/buyorder" element={<OrderDetailPage/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
