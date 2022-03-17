import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUserLogin } from "../../Redux/userslice";


function MenuLte( {state, setState}) {
    const userLogin = useSelector(selectUserLogin);
    const goToCustomerPage = () => {
        setState(0);
    };
    const goToProductPage = () => {
        setState(1);
    };
    const goToOrderPage = () => {
        setState(2);
    }
    return (
        <div>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <a href="index3.html" className="brand-link">
                    <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                    <span className="brand-text font-weight-light">Shop 24H</span>
                </a>
                <div className="sidebar">
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                        </div>
                        <div className="info">
                            <a className="d-block">{userLogin.fullName}</a>
                        </div>
                    </div>
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item menu-open">
                                <a className="nav-link active">
                                    <i className="nav-icon fas fa-tachometer-alt" />
                                    <p>
                                        Quản lý thông tin
                                        <i className="right fas fa-angle-left" />
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item" >
                                        <a  className={state === 0 ? "nav-link active" : "nav-link"} onClick={goToCustomerPage}>
                                        <i className="nav-icon fas fa-users"/>
                                            <p> Khách hàng</p>
                                        </a>
                                    </li>
                                    <li className="nav-item" >
                                        <a  className={state === 1 ? "nav-link active" : "nav-link"} onClick={goToProductPage}>
                                        <i className="nav-icon fas fa-people-carry"/>
                                            <p> Sản phẩm</p>
                                        </a>
                                    </li>
                                    <li className="nav-item" >
                                        <a  className={state === 2 ? "nav-link active" : "nav-link"} onClick={goToOrderPage}>
                                        <i className="nav-icon fa-solid fa-basket-shopping"/>
                                            <p> Đơn hàng</p>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a href="pages/widgets.html" className="nav-link">
                                <i className="nav-icon fa-solid fa-user-group" />
                                    <p>
                                         Phân quyền
                                        <span className="right badge badge-danger">New</span>
                                    </p>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </div>

    )
}
export default MenuLte;