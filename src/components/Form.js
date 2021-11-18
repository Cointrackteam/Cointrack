import React, {useState, useEffect } from 'react';
import { useForm}  from "react-hook-form";
import Loader from './Spinner';
import { Button, Toast} from 'react-bootstrap'; 
import { requestAction } from '../helpers/etherscan';
import { useAppContext } from '../AppContext';

export default function Form(){
    const [showToastAddressSet, setShowToastAddressSet] = useState(false);
    const { setAnalysisData, analysisData } = useAppContext();
    const [ analysisResults, setAnalysisResults ] = useState(); 
    console.log(analysisResults)
    useEffect(() => 
            setAnalysisResults(analysisData)
    ,[analysisData]);

    const { register, 
        formState, 
        setFocus, 
        getValues, 
        setValue,
        resetField,
        reset, 
        handleSubmit,
        formState: {error, isDirty, isSubmitting, touchedFields, submitCount}
    } = useForm({
        mode: 'onSubmit',
        revalidate: 'onChange',
        defaultValues: {
            ethAddress: ''
        }
    }) 

    const onSubmit = async (data, e) => {
        let res = await requestAction('get_account_transactions', data.ethAddress);
        // console.log(res.data);
        setAnalysisData(res.data);
        // console.log(analysisData);

    } 

    const onError = (errors, e) => {
        console.log(errors);
        console.log(e);
    } 
    
    const input = (
        <div className="form-group">
            <input className="form-control-input" placeholder="Ethereum Address" {...register("ethAddress", {required: "eth address invalid", maxLength: 42})}/>
        </div>
    )

    const spinnerButton = (
        <Button variant="primary" disabled>
            <Loader
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            />
            <span className="sr-only">Loading...</span>
        </Button> 
    )
    const submitButton = (
        <Button type="submit" className="form-control-submit-button">Lets find out</Button>
    ) 

    let styleToast = {position: "absolute", marginTop: "15px"}
    const setAccountAddressButton = (
        
        <div className="form-group">
            <Button className="btn-solid-sm" 
            onClick={() => 
                window.ethereum.selectedAddress ? 
                setValue("ethAddress", window.ethereum.selectedAddress):
                setValue("ethAddress", "") 
            }
            >Use wallet Address</Button>
            <Toast show={showToastAddressSet} onClose={()=>{setShowToastAddressSet(false)}} delay={1500} style={styleToast} className='bg-danger text-light' autohide>
                <Toast.Body className="p-2">
                    <span className="mr-auto">connect to wallet</span> 
                </Toast.Body>
            </Toast>
        </div>
    )

    const buttons = (
        <div className="form-group">
            {/* {console.log(isSubmitting)} */}
            {isSubmitting ? spinnerButton : submitButton }
        </div>
    )


    return (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
            {input}
            {buttons}
            {setAccountAddressButton}
        </form>
    )
}