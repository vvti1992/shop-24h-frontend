import Header from './header/header';
import Footer from './footer/footer';
import DetailProduct from './content/content/DetailProduct';
import { useParams } from 'react-router-dom';
import {Container, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { useEffect, useState } from "react";

function DetailPage() {
    const { id } = useParams();
    const [product, setProduct] = useState({
        _id: null,
        name: null,
        type: null,
        imageUrl: null,
        buyPrice: null,
        promotionPrice: null,
        description: null,
        brand: null,
        timeCreated: null,
        timeUpdate: null
    });
    const fetchApi = async (paramUrl, paramOption = {}) => {
        const response = await fetch(paramUrl, paramOption);
        const responseData = await response.json();
        return responseData;
    }
    useEffect(() => {
        fetchApi('http://localhost:8000/products/' + id)
            .then((data) => {
                setProduct(data.product);
                // console.log(data.product);
            })
            .catch(console.error());
            window.scrollTo(0, 0);
    }, [id]);
    return (
        <>
            <Header />
            <Container>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <a href='/'>
                            Home
                        </a>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <a href='/'>
                            Product
                        </a>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <a>
                            {product.name}
                        </a>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Container>
            <DetailProduct id={id} />
            <Footer />
        </>
    )
}
export default DetailPage;