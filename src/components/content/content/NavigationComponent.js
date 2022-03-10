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
        <Row className="py-4">
            <div className='pagination'>
                <Pagination count={count} defaultPage={page} color="primary" onChange={onSelectPage} />
            </div>
            <hr />
        </Row>
    )
}
export default NavigationComponent;