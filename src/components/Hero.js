import React from 'react'; 
import {useForm} from "react-hook-form";
import HeaderBulbTable from "../static/images/header-bulb-table.png";
import { Row, Col, Container, Card } from 'react-bootstrap'; 

const Hero = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    return (
<<<<<<< HEAD
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
=======
        <div id="header" className="header">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-xl-5">
                        <div className="text-container">
                            <h1>Cointrack helps you find your forgotten coins</h1>
                            <p className="p-large">We analyze your transaction history and match it with public addresses of exchanges. Giving you detailed information about when and where you sent your coins.</p>
                            
                            {/* <!-- Sign Up Form --> */}
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group">
                                    <input type="text" className="form-control-input" placeholder="Ethereum Address" {...register("Ethereum Address", {required: true, maxLength: 42})} />
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="form-control-submit-button">Lets find out</button>
                                </div>
                            </form>

                            {/* <!-- end of sign up form --> */}
                        </div> {/* <!-- end of text-container --> */}
                    </div>  {/* <!-- end of col --> */}
                    <div className="col-lg-6 col-xl-7">
                        <div className="image-container">
                            <img className="img-fluid" src={HeaderBulbTable} alt="alternative"/>
                        </div>  {/* <!-- end of image-container --> */}
                    </div> {/* <!-- end of col --> */}

                    <div class="page-header">
                    <br/>
                    <h1>How it works?</h1>

                    
                            </div>

                            <div class="jumbotron jumbotron-fluid">
                                 <div class="container">
                                 <h1 class="display-4">video location</h1>
                                          <p class="lead">video goes here explainning how this works</p>
                    </div>
                                    </div>

                    <div class="page-header">
                            <h1>We support the following blockchains <br/>   <small> (More coming soon) </small> </h1>
                                                </div>

                </div>
                <div className="row">
                    <div className="col-lg-12">

                        {/* <!-- Card --> */}
                        <div className="card first">
                            <div className="card-icon">
                                <span className="fas fa-rocket green"></span>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Ethereum</h5>
                                <div className="card-text">Recieve a report detailing the name of exchanges that have interected with your wallet in the past.</div>
>>>>>>> 93148a4704885eb822079a416f435aa589f8dd80
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
<<<<<<< HEAD
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
=======
                        {/* <!-- end of card --> */}

                        {/* <!-- Card --> */}
                        <div className="card second">
                            <div className="card-icon">
                                <span className="far fa-clock green"></span>
                            </div>
                            <div className="card-soon-body">
                                <h5 className="card-title">More coming soon</h5>
                                <div className="card-text">More blockchains coming soon</div>
                            </div>
                        </div>
                        {/* <!-- end of card --> */}

                        {/* <!-- Card --> */}
                        <div className="card third">
                            <div className="card-icon">
                                <span className="far fa-comments green"></span>
                            </div>
                            <div className="card-soon-body">
                                <h5 className="card-title">Improve Communications</h5>
                                <div className="card-text">Months on ye at by esteem desire warmth former sure that that way gave any fond now his boy</div>
                            </div>
                        </div>
                        {/* <!-- end of card -->*/}
                        <p class="love">Made with <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                                </svg> in Argentina and Netherlands</p>

                    </div> {/* <!-- end of col -->*/}
                </div> {/* <!-- end of row -->*/} 
            </div>
        </div>
>>>>>>> 93148a4704885eb822079a416f435aa589f8dd80
    )
}

export default Hero;
