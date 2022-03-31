import { Breadcrumb, BreadcrumbItem, Container } from 'reactstrap';
import OrderDetailConfirm from "../content/content/order-detail-confirm";
import Footer from "../footer/footer";
import Header from "../header/header";


function OrderDetailConfirmPage() {

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
            <OrderDetailConfirm />
            <Footer />
        </>
    )
}
export default OrderDetailConfirmPage;