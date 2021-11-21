import React, {useState, useEffect } from 'react';
import { useForm}  from "react-hook-form";
import { Button, Form, InputGroup, FormControl, Spinner, Col, Row} from 'react-bootstrap'; 
import { requestAction } from '../helpers/etherscan';
import { useAppContext } from '../AppContext';
import { analyzeNormalTransActions } from '../helpers/analyzetx';
import DownloadPDF from './DownloadPDF';
import AccountAddressButton from './AccountAddressButton';

export default function HeroForm(){
    const { setAnalysisResults, analysisResults, cexAddressMap } = useAppContext();
    const [analysisReady, setAnalysisReady ] = useState(false);

    useEffect(() => setAnalysisReady(true )
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
        console.log(data);
        let response = await requestAction('get_account_transactions', data.ethAddress);
        let results = analyzeNormalTransActions(response.data.result, cexAddressMap);

        // console.log(results);
        setAnalysisResults({clientAddress: data.ethAddress, results: results});
    } 

    const onError = (errors, e) => {
        console.log(errors);
        console.log(e);
    } 
    
    

    const spinnerButton = (
        <Button variant="primary" >Analyzing...
            <Spinner as="span" animation="border" size="lg" role="status" aria-hidden="true"/>
        </Button>            
    )

    const submitButton = (
        <>
            <Button type="submit" className="form-control-submit-button">Lets find out</Button>
        </>
    ) 
  

    const inputWithButton = (
        <>
            <InputGroup className="mb-3" {...register("ethAddress", {required: "eth address invalid", maxLength: 42})}>
                <FormControl placeholder="Ethereum Address" className="p-2"/>
                    { !isSubmitting ? submitButton : spinnerButton}
            </InputGroup>
        </>
    )

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit, onError)}>
                <Form.Group >
                    {inputWithButton}
                </Form.Group>
                <Form.Group >
                    <AccountAddressButton callback={setValue} />
                    <DownloadPDF analysisReady={analysisReady}/> 
                </Form.Group>
            </Form>
        </>
    )
}