import { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import FilterComponent from "./content/FilterComponent";
import Introduce from "./content/introduce";
import ProductListComponent from "./content/ProductListComponent";
function Content() {
    const [filterReceive, setFilterReceive] = useState({
        minPrice: null,
        maxPrice: null,
        apple: false,
        samsung: false,
        xiaomi: false,
        oppo: false,
        vivo: false,
        ios: false,
        android: false
    });
    const [responseObj, setResponseObj] = useState([]);
    const fetchApi = async (paramUrl, paramOption = {}) => {
        const response = await fetch(paramUrl, paramOption);
        const responseData = await response.json();
        return responseData;
    }
    const Url = 'http://localhost:8000/products';
    useEffect(() => {
        fetchApi(Url)
            .then((data) => {
                setResponseObj(data.products);
                // console.log(data.products);
            })
            .catch(console.error());
    }, []);
    // console.log(filterReceive);
    useEffect(() => {
        var vUrlSiteToOpen = "?" + "minPrice=" + (filterReceive.minPrice ? filterReceive.minPrice : "") 
        + "&" + "maxPrice=" + (filterReceive.maxPrice ? filterReceive.maxPrice : "")
        + "&" + "apple=" +( filterReceive.apple ? filterReceive.apple : "")
        + "&" + "samsung=" +(filterReceive.samsung ? filterReceive.samsung : "")
        + "&" + "xiaomi=" +(filterReceive.xiaomi ? filterReceive.xiaomi : "")
        + "&" + "oppo=" +(filterReceive.oppo ? filterReceive.oppo : "")
        + "&" + "vivo=" +(filterReceive.vivo ? filterReceive.vivo : "")
        + "&" + "ios=" +(filterReceive.ios ? filterReceive.ios : "")
        + "&" + "android=" +(filterReceive.android ? filterReceive.android : "");
        
        fetchApi('http://localhost:8000/products' + vUrlSiteToOpen)
            .then((data) => {               
                    setResponseObj(data.products);
            })
            .catch(console.error());
    }, [filterReceive]);

    // console.log(responseObj);
    // console.log(filter);
    return (
        <Container className="bg-light content">
            <Row>
                <Introduce />
            </Row>
            <Row>
                <Col xs='3'>
                    <FilterComponent getFilter={setFilterReceive} />
                </Col>
                <Col xs='9'>
                    <ProductListComponent displayProduct={responseObj} />
                </Col>
            </Row>
        </Container>
    )
}
export default Content;