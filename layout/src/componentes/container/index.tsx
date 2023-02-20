import { Col, Row } from 'reactstrap';

export function Container({ children }) {
    return (
        <Row style={{ width: '100vw', height: '100vh', background: '#ffddcc', padding: 0, margin: 0 }}>
            <Col className='col-2 hide-sm' style={{minHeight: '100%', background: '#fcfcfc'}}>aaa</Col>
            <Col md={10} sm={12} className='p-1'>
                {children}
            </Col>
        </Row>
    );
}
