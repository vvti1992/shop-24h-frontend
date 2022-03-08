import Header from './header/header';
import Content from './content/content';
import Footer from './footer/footer';
import { Breadcrumb, BreadcrumbItem, Container } from "reactstrap";

function HomePage() {
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
                        <a>
                            Product
                        </a>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Container>
            <Content />
            <Footer />
        </>
    )
}
export default HomePage;