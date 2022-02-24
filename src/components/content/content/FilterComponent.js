import { useEffect, useState } from "react";
import { Row, Col, Input, Label } from "reactstrap";
import FilterProduct from "../../list-products";

function FilterComponent({setListProduct}) {
    const [result, setResult] = useState([])
    const [filter, setFilter] = useState({
        minPrice: null,
        maxPrice: null,
        apple: false,
        samsung: false,
        xiaomi: false,
        vivo: false,
        ios: false,
        android: false
    })
    const minPriceChange = (event) => {
        setFilter({
            ...filter,minPrice: event.target.value
        });
    };
    const maxPriceChange = (event) => {
        setFilter({
            ...filter,maxPrice:event.target.value
        })
    }
    useEffect(()=>{
        setListProduct(result);
        // console.log(result);
    }, [result]);
    return (
        <div className="form-filter py-4">
            <div className="py-4">
                <h4>Categories</h4>
                <ul>
                    <li>Smartphone</li>
                    <li>Laptop</li>
                    <li>Máy tính bảng</li>
                    <li>Tai nghe</li>
                </ul>
            </div>
            <div className="py-4">
                <p>Lọc theo giá sản phẩm: </p>
                <Row className="h6">
                    <Col xs='6'>
                        Từ: <Input className=" w-100" onChange={minPriceChange}></Input>
                    </Col>
                    <Col xs='6'>
                        Đến: <Input className=" w-100" onChange={maxPriceChange}></Input>
                    </Col>
                </Row>
            </div>
            <div className="py-4">
                <p>Lọc theo tên sản phẩm: </p>
                <Label><Input type="checkbox" name="checkbox" defaultChecked={filter.apple} onChange={()=>setFilter({...filter, apple: !filter.apple})}/> Apple</Label><br/>
                <Label><Input type="checkbox" name="checkbox" defaultChecked={filter.samsung} onChange={()=>setFilter({...filter,samsung: !filter.samsung})}/> Samsung</Label><br/>
                <Label><Input type="checkbox" name="checkbox" defaultChecked={filter.xiaomi} onChange={()=>setFilter({...filter,xiaomi: !filter.xiaomi})}/> Xiaomi</Label><br/>
                <Label><Input type="checkbox" name="checkbox" defaultChecked={filter.vivo} onChange={()=>setFilter({...filter,vivo: !filter.vivo})}/> Vivo</Label><br/>
                
            </div>
            <div className="py-4">
                <p>Lọc theo hệ điều hành: </p>
                <Label><Input type="checkbox" name="checkbox" defaultChecked={filter.ios} onChange={()=>setFilter({...filter,ios: !filter.ios})}/> IOS</Label><br/>
                <Label><Input type="checkbox" name="checkbox" defaultChecked={filter.android} onChange={()=>setFilter({...filter,android: !filter.android})}/> Android</Label><br/>
            </div>
           <FilterProduct data = {filter} setListProduct={setResult}/>
        </div>
    )
}
export default FilterComponent;