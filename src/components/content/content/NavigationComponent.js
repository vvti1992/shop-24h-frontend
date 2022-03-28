import { Pagination } from '@mui/material'
import { useEffect } from 'react';
import {Row} from 'reactstrap'
function NavigationComponent({count,page, setPage}) {
    const onSelectPage = (event, value) => {
        setPage(value);
    }
    useEffect(()=> {
        setPage(1);
    },[]);
    return (
        <Row className=" mb-4 pb-2">
            <div className='pagination'>
                <Pagination count={count} defaultPage={page} color="primary" onChange={onSelectPage} />
            </div>
            
        </Row>
    )
}
export default NavigationComponent;