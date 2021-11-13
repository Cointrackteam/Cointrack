import React from 'react'; 
import {useForm} from "react-hook-form";
import HeaderBulbTable from "../static/images/header-bulb-table.png";


const Hero = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <div id="header" className="header">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-xl-5">
                        <div className="text-container">
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
                            </form>

                            {/* <!-- end of sign up form --> */}
                        </div> {/* <!-- end of text-container --> */}
                    </div>  {/* <!-- end of col --> */}
                    <div className="col-lg-6 col-xl-7">
                        <div className="image-container">
                            <img className="img-fluid" src={HeaderBulbTable} alt="alternative"/>
                        </div>  {/* <!-- end of image-container --> */}
                    </div> {/* <!-- end of col --> */}
                </div>
                <div className="row">
                    <div className="col-lg-12">

                        {/* <!-- Card --> */}
                        <div className="card first">
                            <div className="card-icon">
                                <span className="fas fa-rocket green"></span>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Find forgotten accounts</h5>
                                <div className="card-text">Recieve a report detailing the name of exchanges that have interected with your wallet some time in the past</div>
                            </div>
                        </div>
                        {/* <!-- end of card --> */}

                        {/* <!-- Card --> */}
                        <div className="card second">
                            <div className="card-icon">
                                <span className="far fa-clock green"></span>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Descover forgotten cryptocurrencies</h5>
                                <div className="card-text">So child truth honoured peculiar families sensible up likewise by on in and of course other skill</div>
                            </div>
                        </div>
                        {/* <!-- end of card --> */}

                        {/* <!-- Card --> */}
                        <div className="card third">
                            <div className="card-icon">
                                <span className="far fa-comments green"></span>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Improve Communications</h5>
                                <div className="card-text">Months on ye at by esteem desire warmth former sure that that way gave any fond now his boy</div>
                            </div>
                        </div>
                        {/* <!-- end of card -->*/}

                    </div> {/* <!-- end of col -->*/}
                </div> {/* <!-- end of row -->*/} 
            </div>
        </div>
    )
}

export default Hero;
