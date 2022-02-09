
import './App.css';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import LIST_PRODUCE_JSON from './components/list-products';

function App() {
  const LIST_PRODUCE = JSON.parse(LIST_PRODUCE_JSON);
  console.log(LIST_PRODUCE);
  return (
    <div >
      <Header/>
      <p>123</p>
      <Footer/>
    </div>
  );
}

export default App;
