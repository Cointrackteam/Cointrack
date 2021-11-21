import React from 'react'; 
import HeroForm from './HeroForm';
import Video from '../static/videos/placeholder.mp4';
import ReactPlayer from 'react-player';
import HeaderBulbTable from "../static/images/header-bulb-table.png";
import { Row, Col, Container, Card } from 'react-bootstrap'; 

const Hero = ({userAddress, targetNetwork, chainId}) => {
    return (
        <>  
            <Row>
                <Col lg={6} xl={5}>
                    <Container as='div' className="text-container">
                        <h1>Cointrack helps you find your forgotten coins</h1>
                        <p className="p-large">We analyze your transaction history and match it with public addresses of exchanges. Giving you detailed information about when and where you sent your coins.</p>
                        
                        {/* <!-- Sign Up Form --> */}
                        <HeroForm userAddress={userAddress} chainId={chainId} targetNetwork={targetNetwork} />
                    </Container> {/* <!-- end of text-container --> */}
                </Col>
                <Col lg='6' xl='7'>
                    <Container as='div' className='img-container'>
                        <img className='image-fluid' src={HeaderBulbTable} alt="alternative"></img>
                    </Container> {/* <!-- end of image-container --> */}
                </Col>{/* <!-- end of col --> */}
            </Row >
            <Row >
                <Container className="mt-5">
                    <h1>Video Title</h1>
                    <p className="p-large">video goes here explainning how this works</p>
                </Container>
                <Col lg='6' xl='7' gap="5">
                    <ReactPlayer 
                    url={Video}
                    width="600" 
                    height="300" 
                    controls={true}
                    muted={true} 
                    playing={true}/>
                </Col>
            </Row>
            <Row>
                <Container className="mt-5">
                    <h1>We support the following chains <br/> <small> (More coming soon) </small> </h1>
                </Container>
            </Row>
            <Row >
                <Col lg='12' className="pt-5">
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
