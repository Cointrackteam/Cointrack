import React, {useState, useEffect} from 'react';
import { createPDF } from '../helpers/pdfgenerator';
import { Button, Row, Col} from 'react-bootstrap';
import { useAppContext } from '../AppContext';
import { useAlert } from '../hooks/alertsHooks/useAlertHook';
import { ToastContainer } from 'react-toastify';
import useLogger from "../hooks/useLogger";


// dowload form 
export default function DownLoadPDF() {
    const { analysisResults } = useAppContext();
    const [setTrigger, manualTrigger] = useAlert('pdf ready for download', 'bottom-right', 'info', 1.5);
    
    useEffect(()=> {
        setTrigger(true);    
    })

    const downloadButton = (
            <Col lg='5'>
                <Button className="btn-solid-sm mt-2 pl-3 pr-3" style={{width: "100%"}} onClick={() =>  createPDF(analysisResults.clientAddress, analysisResults.results) }>Download Results</Button>
            </Col>
        )

    return (
        <>
            {downloadButton}
            <ToastContainer />
        </>
    )
}
