import React from 'react'; 
import {useForm} from "react-hook-form";
import HeaderBulbTable from "../static/images/header-bulb-table.png";
import { Row, Col, Container, Card } from 'react-bootstrap'; 

const Hero = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <>
            <Row>
                <Col lg={6} xl={5}>
                    <Container as='div' className="text-container">
                        <h1>Cointrack helps you find your forgotten coins</h1>
                        <p className="p-large">We analyze your transaction history with the records of exchanges</p>
                        
                        {/* <!-- Sign Up Form --> */}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <input type="text" className="form-control-input" placeholder="Ethereum Address" {...register("Ethereum Address", {required: true, maxLength: 42})} />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="form-control-submit-button">Lets find out</button>
                            </div>
                        </form> {/* <!-- end of sign up form --> */}
                    </Container> {/* <!-- end of text-container --> */}
                </Col>
                <Col lg='6' xl='7'>
                    <Container as='div' className='img-container'>
                        <img className='image-fluid' src={HeaderBulbTable} alt="alternative"></img>
                    </Container> {/* <!-- end of image-container --> */}
                </Col>{/* <!-- end of col --> */}
            </Row>
            <Row>
                <Col lg='12'>
                    <Card className='first'> {/* <!-- Card --> */}
                        <div className='card-icon'>
                            <span className="fas fa-rocket green"></span>
                        </div>
                        <Card.Body>
                            <Card.Title as='h5'>
                            Find forgotten accounts
                            </Card.Title>
                            <Card.Text>
                            Recieve a report detailing the name of exchanges that have interected with your wallet some time in the past
                            </Card.Text>
                        </Card.Body>{/* <!-- end of card --> */}
                    </Card>
                    <Card className='second'> {/* <!-- Card --> */}
                        <div className='card-icon'>
                            <span className="far fa-clock green"></span>
                        </div>
                        <Card.Body>
                            <Card.Title as='h5'>
                            Descover forgotten cryptocurrencies
                            </Card.Title>
                            <Card.Text>
                            So child truth honoured peculiar families sensible up likewise by on in and of course other skill
                            </Card.Text>
                        </Card.Body>{/* <!-- end of card --> */}
                    </Card>
                    <Card className='third'> {/* <!-- Card --> */}
                        <div className='card-icon'>
                            <span className="far fa-comments green"></span>
                        </div>
                        <Card.Body>
                            <Card.Title as='h5'>
                            Improve Communications
                            </Card.Title>
                            <Card.Text>
                            Months on ye at by esteem desire warmth former sure that that way gave any fond now his boy
                            </Card.Text>
                        </Card.Body>{/* <!-- end of card --> */}
                    </Card>
                    
                </Col>
            </Row>
        </> 
    )
}

export default Hero;
