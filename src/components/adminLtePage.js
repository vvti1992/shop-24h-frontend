import { useState } from "react";
import CustomerLte from "./adminLte/customer";
import FooterLte from "./adminLte/footer";
import HeaderLte from "./adminLte/header";
import MenuLte from "./adminLte/menu";
import OrderLte from "./adminLte/order";
import ProductLte from "./adminLte/product";

function AdminLtePage() {
    const [state, setState] = useState(0);
    return (
        <div className='wrapper'>
            <HeaderLte/>
            <MenuLte state={state} setState={setState}/>
            {state === 0 ? <CustomerLte/> : state === 1 ? <ProductLte/> : <OrderLte/>}
            <FooterLte/>
        </div>
    )
}
export default AdminLtePage;