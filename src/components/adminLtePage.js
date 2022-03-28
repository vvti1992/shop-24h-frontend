import { useState, useEffect } from "react";
import CustomerLte from "./adminLte/customer";
import FooterLte from "./adminLte/footer";
import HeaderLte from "./adminLte/header";
import MenuLte from "./adminLte/menu";
import OrderLte from "./adminLte/order";
import ProductLte from "./adminLte/product";
import { Row, Col } from 'reactstrap'

function AdminLtePage() {
  const [state, setState] = useState(0);
  const [searchCustomer, setSearchCustomer] = useState({
    key: "",
    value: ""
  });
  const [searchProduct, setSearchProduct] = useState({
    key: "",
    value: ""
  });
  const [searchOrder, setSearchOrder] = useState({
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
  }, [state]);
  return (
    <div className='wrapper'>
      <Row>
        <Col className="col-2 col-sm-8 col-md-3 col-lg-2">
          <MenuLte state={state} setState={setState} />
        </Col>
        <Col className="col-12">
          <Row>
            <Col className="col-12">
              <HeaderLte mode={state} setSearchCustomer={setSearchCustomer}
                setSearchProduct={setSearchProduct}
                setSearchOrder={setSearchOrder}
              />
            </Col>
          </Row>
          <Row>
            <Col className='col-12'>
              {state === 0 ?
                <CustomerLte search={searchCustomer} />
                : state === 1 ?
                  <ProductLte search={searchProduct} />
                  :
                  <OrderLte search={searchOrder} />}
            </Col>
          </Row>
          <Row>
                <Col className="col-12 mt-5">
                  <FooterLte/>
                </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}
export default AdminLtePage;