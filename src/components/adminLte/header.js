import { useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem, NativeSelect, styled, InputBase } from '@mui/material';
import ModalAddNewUser from "../alert-dialog/alertModa-addNewUser";
import RefreshIcon from '@mui/icons-material/Refresh';
import {UncontrolledTooltip} from 'reactstrap';
import { useNavigate } from "react-router-dom";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

function HeaderLte({ mode, setSearchCustomer, setSearchProduct, setSearchOrder }) {

  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [inputValue, setInputValue] = useState("");

  //set open modal & send message to modal
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState("");
  //Get value search condition
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  //clear dữ liệu tìm kiếm khi thay đổi trạng thái
  useEffect(() => {
    setValue(0);
    setInputValue("");
  }, [mode])
  //Hàm xử lý khi ấn nút Enter và ô tìm kiếm
  const handleSearch = (event) => {
    if (event.key === "Enter") {
      if (value == 0) {
        setModal(true);
        setMessage("Vui lòng chọn trước trường dữ liệu cần tìm kiếm!");
        return false
      }
      if (inputValue === "") {
        setModal(true);
        setMessage("Vui lòng nhập giá trị cần tìm kiếm!");
        return false
      }
      if (mode == 0) {
        setSearchCustomer({
          key: value,
          value: inputValue
        })
      }
      if (mode == 1) {
        setSearchProduct({
          key: value,
          value: inputValue
        })
      }
      if (mode == 2) {
        setSearchOrder({
          key: value,
          value: inputValue
        })
      }
    }
  }
  //Khi nhấn nút làm mới dữ liệu
  const handleFreshData = () => {
    setValue(0);
    setInputValue("");
    if (mode == 0) {
      setSearchCustomer({
        key: 0,
        value: ""
      })
    }
    if (mode == 1) {
      setSearchProduct({
        key: 0,
        value: ""
      })
    }
    if (mode == 2) {
      setSearchOrder({
        key: 0,
        value: ""
      })
    }
  }
  //log out function 
  const logOut = () => {
    navigate("/");
  }
  return (
    <>
      <div>
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" data-widget="pushmenu" role="button"><i className="fas fa-bars" /></a>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
              <a className="nav-link">Home</a>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
              <a className="nav-link">Contact</a>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto adminlte-header-search">
            <li className="nav-item ">
              <FormControl variant="standard">
                {
                  mode == 0 ?
                    <NativeSelect
                      id="demo-customized-select-native"
                      value={value}
                      onChange={handleChange}
                      input={<BootstrapInput />}
                    >
                      <option value={0}>Tìm theo</option>
                      <option value={10}>Họ tên</option>
                      <option value={20}>Số điện thoại</option>
                      <option value={30}>Email</option>

                    </NativeSelect>
                    : mode == 1 ?
                      <NativeSelect
                        id="demo-customized-select-native"
                        value={value}
                        onChange={handleChange}
                        input={<BootstrapInput />}
                      >
                        <option value={0}>Tìm theo</option>
                        <option value={10}>Tên sản phẩm</option>
                        <option value={20}>Hệ điều hành</option>
                        <option value={30}>Nhà sản xuất</option>
                      </NativeSelect>
                      :
                      <NativeSelect
                        id="demo-customized-select-native"
                        value={value}
                        onChange={handleChange}
                        input={<BootstrapInput />}
                      >
                        <option value={0}>Tìm theo</option>
                        <option value={10}>Mã đơn hàng</option>
                        <option value={20}>Trạng thái</option>
                        <option value={30}>Mã khách hàng</option>
                      </NativeSelect>

                }

              </FormControl>
              <FormControl variant="standard">
                <BootstrapInput id="demo-customized-textbox" onKeyPress={handleSearch} onChange={(e) => setInputValue(e.target.value)} value={inputValue} />
                <RefreshIcon id="UncontrolledTooltipExample" onClick={handleFreshData} className='mui-icon-refresh'/>
                <UncontrolledTooltip
                  placement="right"
                  target="UncontrolledTooltipExample"
                >
                  Refresh
                </UncontrolledTooltip>
              </FormControl>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link" data-toggle="dropdown" >
                <i className="far fa-comments" />
                <span className="badge badge-danger navbar-badge">3</span>
              </a>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                <a className="dropdown-item">
                  <div className="media">
                    <img src="dist/img/user1-128x128.jpg" alt="User Avatar" className="img-size-50 mr-3 img-circle" />
                    <div className="media-body">
                      <h3 className="dropdown-item-title">
                        Brad Diesel
                        <span className="float-right text-sm text-danger"><i className="fas fa-star" /></span>
                      </h3>
                      <p className="text-sm">Call me whenever you can...</p>
                      <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>
                    </div>
                  </div>
                </a>
                <div className="dropdown-divider" />
                <a className="dropdown-item">
                  <div className="media">
                    <img src="dist/img/user8-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3" />
                    <div className="media-body">
                      <h3 className="dropdown-item-title">
                        John Pierce
                        <span className="float-right text-sm text-muted"><i className="fas fa-star" /></span>
                      </h3>
                      <p className="text-sm">I got your message bro</p>
                      <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>
                    </div>
                  </div>
                </a>
                <div className="dropdown-divider" />
                <a className="dropdown-item">
                  <div className="media">
                    <img src="dist/img/user3-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3" />
                    <div className="media-body">
                      <h3 className="dropdown-item-title">
                        Nora Silvester
                        <span className="float-right text-sm text-warning"><i className="fas fa-star" /></span>
                      </h3>
                      <p className="text-sm">The subject goes here</p>
                      <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>
                    </div>
                  </div>
                </a>
                <div className="dropdown-divider" />
                <a className="dropdown-item dropdown-footer">See All Messages</a>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link" data-toggle="dropdown" >
                <i className="far fa-bell" />
                <span className="badge badge-warning navbar-badge">15</span>
              </a>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                <span className="dropdown-item dropdown-header">15 Notifications</span>
                <div className="dropdown-divider" />
                <a className="dropdown-item">
                  <i className="fas fa-envelope mr-2" /> 4 new messages
                  <span className="float-right text-muted text-sm">3 mins</span>
                </a>
                <div className="dropdown-divider" />
                <a className="dropdown-item">
                  <i className="fas fa-users mr-2" /> 8 friend requests
                  <span className="float-right text-muted text-sm">12 hours</span>
                </a>
                <div className="dropdown-divider" />
                <a className="dropdown-item">
                  <i className="fas fa-file mr-2" /> 3 new reports
                  <span className="float-right text-muted text-sm">2 days</span>
                </a>
                <div className="dropdown-divider" />
                <a className="dropdown-item dropdown-footer">See All Notifications</a>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-widget="fullscreen" role="button">
                <i className="fas fa-expand-arrows-alt" />
              </a>
            </li>
            <li className="nav-item" onClick={logOut}>
              <a className="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true" role="button">
              <i class="fa-solid fa-arrow-right-from-bracket" id="admin-lte-log-out"/>
              <UncontrolledTooltip
                  placement="right"
                  target="admin-lte-log-out"
                >
                  Log out
                </UncontrolledTooltip>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <ModalAddNewUser openAlertModal={modal} setOpenAlertModal={setModal} message={message} />
    </>
  )
}
export default HeaderLte;