import Header from './header/header';
import Content from './content/content';
import Footer from './footer/footer';
import { Breadcrumb, BreadcrumbItem, Container } from "reactstrap";
import { useState } from 'react';

function HomePage() {
    const [keySearch, setKeySearch] = useState("");
    return (
        <>
            <Header setKeySearch={setKeySearch}/>
            <Container>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <a href='/'>
                            Trang chủ
                        </a>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <a>
                            Sản phẩm
                        </a>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Container>
            <Content keySearch = {keySearch}/>
            <Footer />
        </>
    )
}
export default HomePage;