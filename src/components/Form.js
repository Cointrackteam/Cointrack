import React, {useState, useEffect } from 'react';
import { useForm}  from "react-hook-form";
import Loader from './Spinner';
import { Button, Toast} from 'react-bootstrap'; 
import { requestAction } from '../helpers/etherscan';
import { useAppContext } from '../AppContext';
import { analyzeNormalTransActions } from '../helpers/analyzetx';
import DownloadPDF from './DownloadPDF';
import AccountAddressButton from './AccountAddressButton';

export default function Form(){
    const { setAnalysisResults, analysisResults, cexAddressMap } = useAppContext();
    const {analysisReady, setAnalysisReady } = useState(false);

    useEffect(() => 
            console.log("checking for results")
    ,[analysisResults]);

    
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
        // should trigger a payment flow first
        // if payment is completed then trigger analysis
        // start payment 
        // receive transaction
        // start analysis -> trigger 
        let response = await requestAction('get_account_transactions', data.ethAddress);
        let results = analyzeNormalTransActions(response.data.result, cexAddressMap);

        console.log(results);
        setAnalysisResults({clientAddress: data.ethAddress, results: results});
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
   

    const buttons = (
        <div className="form-group">
            {/* {console.log(isSubmitting)} */}
            {isSubmitting ? spinnerButton : submitButton }
        </div>
    )

    const results = {
        results: 'no results'
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
                {input}
                {buttons}
                <AccountAddressButton setAddress={setValue} />
                <DownloadPDF analysisReady={analysisReady}/> 
            </form>
        </>
    )
}