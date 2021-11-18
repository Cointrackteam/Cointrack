import { Spinner } from 'react-bootstrap';
export default function Loader (){
    return (
        <Spinner animation="border" 
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"/>
    )
}