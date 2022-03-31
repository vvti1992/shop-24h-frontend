import { Breadcrumb, BreadcrumbItem, Container } from 'reactstrap';
import ViewOrder from "../content/content/view-order";
import Footer from "../footer/footer";
import Header from "../header/header";


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