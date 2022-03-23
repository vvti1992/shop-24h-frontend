import OrderDetail from "./content/content/order-detail";
import {Container, Breadcrumb , BreadcrumbItem} from 'reactstrap'
import Footer from "./footer/footer";
import Header from "./header/header";
import ViewOrder from "./content/content/view-order";


function ViewOrderPage() {

    return (
        <>
            <Header />
            <Container>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <a href='/'>
                            Trang chủ
                        </a>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <a href='/'>
                            Giỏ hàng
                        </a>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Container>
            <ViewOrder />
            <Footer />
        </>
    )
}
export default ViewOrderPage;