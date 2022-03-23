import { useState, useEffect } from "react";
import CustomerLte from "./adminLte/customer";
import FooterLte from "./adminLte/footer";
import HeaderLte from "./adminLte/header";
import MenuLte from "./adminLte/menu";
import OrderLte from "./adminLte/order";
import ProductLte from "./adminLte/product";

function AdminLtePage() {
    const [state, setState] = useState(0);
    const [reset, setReset] = useState(false);
    const [searchCustomer, setSearchCustomer] = useState ({
        key: "",
        value: ""
    });
    const [searchProduct, setSearchProduct] = useState ({
        key: "",
        value: ""
    });
    const [searchOrder, setSearchOrder] = useState ({
        key: "",
        value: ""
    });
    useEffect(() => {
        if (state == 0) {
            setSearchProduct({
              key: 0,
              value: ""
            });
            setSearchOrder({
              key: 0,
              value: ""
            });
          }
          if (state == 1) {
            setSearchCustomer({
              key: 0,
              value: ""
            });
            setSearchOrder({
              key: 0,
              value: ""
            });
          }
          if (state == 2) {
            setSearchCustomer({
              key: 0,
              value: ""
            });
            setSearchProduct({
              key: 0,
              value: ""
            });
          }
      }, [state])
    return (
        <div className='wrapper'>
            <HeaderLte mode={state} setSearchCustomer = {setSearchCustomer} 
                        setSearchProduct= {setSearchProduct} 
                        setSearchOrder = {setSearchOrder}
                        setReset = {setReset} />
            <MenuLte state={state} setState={setState}/>
            {state === 0 ? 
                <CustomerLte search= {searchCustomer} reset= {reset} setReset = {setReset}/>
                : state === 1 ? 
                <ProductLte search= {searchProduct} reset= {reset} setReset = {setReset}/>
                : 
                <OrderLte search= {searchOrder} reset= {reset} setReset = {setReset}/>}
            {/* <FooterLte/> */}
        </div>
    )
}
export default AdminLtePage;