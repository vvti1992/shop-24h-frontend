import { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import FilterComponent from "./content/FilterComponent";
import Introduce from "./content/introduce";
import ProductListComponent from "./content/ProductListComponent";
function Content({keySearch}) {
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
            window.scrollTo(0, 0);
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

    useEffect (()=> {
        var tempArr=[];
        if(keySearch.trim()!=="")
        {
            fetchApi(Url)
            .then((data) => {
                data.products.forEach(element => {
                    if(element.name.toLowerCase().includes(keySearch.toLowerCase())) {
                        tempArr.push(element);
                    }
                });
                setResponseObj(tempArr);
            })
            .catch(console.error());
        } else
        {
            fetchApi(Url)
            .then((data) => {
                setResponseObj(data.products);
                // console.log(data.products);
            })
            .catch(console.error());
            window.scrollTo(0, 0);
        }
    }, [keySearch])

    return (
        <Container className="bg-light">
            <Row>
                <Introduce />
            </Row>
            <Row>
                <Col sm='12' md='3' lg='3'>
                    <FilterComponent getFilter={setFilterReceive} />
                </Col>
                <Col sm='12' md='9' lg='9'>
                    {
                        responseObj.length > 0 ?
                        <>
                        {keySearch !== "" ? <p className="pt-5">{`Tìm thấy ${responseObj.length} sản phẩm tương ứng.`}</p> : ""}
                        <ProductListComponent displayProduct={responseObj} />
                        </> :
                        <p className="h4 text-center pt-5">Không tìm thấy danh sách sản phẩm</p>
                    }
                </Col>
            </Row> 
            <hr />
        </Container>
    )
}
export default Content;