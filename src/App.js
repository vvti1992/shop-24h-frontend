
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/homePage';
import Login from './components/login/Login';
function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
