import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { doc } from 'prettier';
import logo from '../static/images/customer-logo-6.png';

const marginX = 25;
const marginY = 25;

export function createPDF(walletAddress, data){

    // data / walletAddress as input 
    let pdf = new jsPDF({
        orientation: 'p',
        unit: 'px',
        format: 'a4'
    })
    const totalPagesExp = '{total_pages_count_string}'
    // var pageHeight = pdf.internal.pageSize.height || doc.internal.pageSize.getHeight();
    // var pageWidth = pdf.internal.pageSize.width || doc.internal.pageSize.getWidth();
    // console.log(pageHeight);
    // console.log(pageWidth);
    // let tableHeightStart = pdf.getTextDimensions("Transaction Report").h + marginY + marginY + marginY;
    
    pdf.autoTable({
        startY: 50,
        head: [
            [

                {
                    content: `Wallet: ${walletAddress}`,
                    colSpan: 2,
                }
            ]
        ],
        body: parseData(data),
        headStyles: {halign: 'left', fillColor: "#0099ff", textColor: "#ffffff"},
        bodyStyles: {halign: 'left', textColor: "#000000"},
        didDrawPage: () => {
            pdf.setFont('courier', 'bold');
            pdf.setFontSize(21);
            pdf.setTextColor("#110404");
            pdf.addImage(logo, 'SVG', marginX, marginY);        
            pdf.text("Transaction Report", marginX + 50, marginY, 'left');

            // footer 
            let str = 'Page ' + pdf.internal.getNumberOfPages();
            // if (typeof pdf.putTotalPages === 'function') {
            //     str = str + ' of ' + totalPagesExp
            // } 
            pdf.setFontSize(10)
            // jsPDF 1.4+ uses getWidth, <1.4 uses .width
            let pageSize = pdf.internal.pageSize
            let pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
            pdf.text(str, marginX, pageHeight - 10)
            },
            theme: 'grid',
            margin: {top: marginY}
    });
    console.log(parseData(data))

    function parseData(data){
        return data.map( data => (
                [data.cxName, data.direction === 'to' ? String(`Your wallet sent tokens to ${data.cxName} on ${new Date(data.timestamp)}`):
                String(`Your wallet reived tokens from ${data.cxName} on ${new Date(data.timestamp)}`)]
            )
        )
    }
    
    pdf.save("tranasaction_report.pdf"); 
}