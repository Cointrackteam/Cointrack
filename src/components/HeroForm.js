import React, {useState, useEffect } from 'react';
import { useForm}  from "react-hook-form";
import { Button, Form, InputGroup, FormControl, Spinner, Col, Row} from 'react-bootstrap'; 
import { requestAction } from '../helpers/etherscan';
import { useAppContext } from '../AppContext';

import { analyzeNormalTransActions } from '../helpers/analyzetx';
import DownloadPDF from './DownloadPDF';
import AccountAddressButton from './AccountAddressButton';
import { payForAnalysis } from '../helpers/transactor';
import { toast, ToastContainer } from 'react-toastify';

export default function HeroForm({userAddress, targetNetwork, chainId}){
    const { setAnalysisResults, analysisResults, cexAddressMap } = useAppContext();
    const [ paying, setPaying ] = useState(false); 
    const [ isCorrectNetwork, setIsCorrectNetwork ] = useState(false);
    const [ analysisReady, setAnalysisReady ] = useState(false);

    useEffect(()=>{
        if (targetNetwork === chainId){
            setIsCorrectNetwork(true);
        }
    }, [targetNetwork, chainId, setAnalysisReady])

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
        let txhash;
        try {
            setPaying(true);
            txhash = await toast.promise(() => payForAnalysis(chainId, userAddress), {pending: 'paying....', success: 'transaction succesffull', error: 'Error'})
        } catch (e){
            let message = alert(e,'bottom-right', 'warning', 0);
            message();
        }
        if (txhash){
            setPaying(false);
            try {
                let response = await requestAction('get_account_transactions', data.ethAddress); 
                while (response.data.result.length < 1){
                    response = await requestAction('get_account_transactions', data.ethAddress);
                }
                let analysisData = analyzeNormalTransActions(response.data.result, cexAddressMap);
                setAnalysisResults({clientAddress: data.ethAddress, results: analysisData});
            } catch (e){
                console.log(e);
            }
        }        
        return setAnalysisReady(true);                
    } 

    const onError = (errors, e) => {
        console.log(errors);
        console.log(e);
    } 
    
    

    const spinnerButtonAnalyzing = (

        <Button variant="primary" >Analyzing...
            <Spinner as="span" animation="border" size="lg" role="status" aria-hidden="true"/>
        </Button>            
    )
    const spinnerButtonProcessing = (

        <Button variant="primary" >Processing...
            <Spinner as="span" animation="border" size="lg" role="status" aria-hidden="true"/>
        </Button>            
    )

    const spinnerButton = !paying ? spinnerButtonAnalyzing : spinnerButtonProcessing 

    const submitButton = (
        <>
            <Button type="submit" className="form-control-submit-button">Lets find out</Button>
        </>
    ) 
  
    const submitButtonDisabled = (
        <>
            <Button type="submit" className="form-control-submit-button" disabled>Lets find out</Button>
        </>
    )   

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <Form.Group >
                {
                    <InputGroup className="mb-3" >
                        <FormControl placeholder="Ethereum Address" className="p-2" {...register("ethAddress", {required: "eth address invalid", maxLength: 42})}/>
                            { !isSubmitting ? !userAddress || chainId != targetNetwork ? submitButtonDisabled : submitButton : spinnerButton}
                    </InputGroup>
                }
            </Form.Group>
            <Form.Group >
                <AccountAddressButton callback={setValue} userAddres={userAddress} />
                {analysisReady ? <DownloadPDF /> : null} 
            </Form.Group>
            <ToastContainer />
        </Form>
    )
}