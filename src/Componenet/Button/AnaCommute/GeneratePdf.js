import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import localConvyImg from './localConvyimage.png'
import arrowImg from './arrowImage.jpg'
import { useRef } from 'react';

function GeneratePdf(props) {
    const { data } = props;
    const pdfRef = useRef(null);
    const downloadPdf = async () => {
        if (!pdfRef.current) return;
        try {
            const canvas = await html2canvas(pdfRef.current, { scale: 3 });
            const imageData = canvas.toDataURL("image/png");
            const pdf = new jsPDF({ orientation: "p", unit: "mm", format: "a4", compress: true });
            const pdfWidth = pdf.internal.pageSize.getWidth() - 55;
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage({
                imageData: imageData,
                format: "PNG",
                x: 25,
                y: 25,
                width: pdfWidth,
                height: pdfHeight,
            });
            pdf.save("document.pdf");
        } catch (error) {
            console.error("An error occurred while generating the PDF:", error);
        }
    };
    const tableData = [];
    let total = 0;
    for (let i = 1; i <= 31; i++) {
        let idBasedRouteType;
        if (data.localConvyDates != undefined && data.localConvyDates.includes(i)) {
            idBasedRouteType = { id: i, routeType: 'Round Trip/往復' }
            total = total + (parseInt(data.localOneWayFare) * 2);
        } else {
            idBasedRouteType = { id: i, routeType: '' }
        }
        tableData.push(Object.assign({}, idBasedRouteType));
    }

    return (
        <div class="div-scroll">
            <div ref={pdfRef}>
                <div class="container" >
                    <div class="header">
                        <div class="title display-flex-end">
                            <div>
                                <h2 class="heading">通勤費明細 / Details of Monthly Commuting Reimbursement</h2>
                                <h2 class="heading">(月中経路変更なし / No change of commuting route during the month)</h2>
                            </div>
                            <div><img class='img-size' src={localConvyImg}></img></div>
                        </div>
                        <div class="textAlignLast">
                        </div>
                    </div>
                    <table class='main-table'>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td style={{ width: '20%' }}>Employee No.</td>
                                <td colSpan="2">
                                    <div class="highlight" style={{ width: '40%' }}>{data.empNo}</div>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td style={{ width: '20%' }}>Name:</td>
                                <td colSpan="2">
                                    <div class="highlight" style={{ width: '50%' }}>{data.empName}</div>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td style={{ width: '20%' }}> 精算対象月 <br />Month of reimbursement</td>
                                <td class="flexDisplay">
                                    <div class="highlight" style={{ width: '35%' }}>{data.month}</div>
                                    <div class="highlight" style={{ width: '15%', borderLeft: 'none' }}>{data.year}</div>
                                </td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td style={{ width: '20%' }}> 通勤経路 <br /> Commuting Route</td>
                                <td colSpan="2" class="note">
                                    ※(Local) Agile Works「通勤費支給(変更)/住所変更申請書」の経路/Route registered" via Agile Works.<br />
                                    (Expat)Route registered/available with ODS
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td style={{ width: '20%' }}>自宅最寄駅/ <br /> Nearest station from Home</td>
                                <td class="flexDisplay">
                                    <div class="highlight" style={{ width: '35%' }}>{data.localConvyFrom}</div>
                                    <img class='arrow-style' src={arrowImg}></img>
                                    <div style={{ paddingRight: '10px' }}> 勤務先最寄駅/ <br /> Nearest station from <br />workplace</div>
                                    <div class="highlight" style={{ width: '35%' }}>{data.localConvyTo}</div>
                                </td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>片道金額(円) <br />One-way Amount (yen)</td>
                                <td colSpan="2" class="flexDisplay">
                                    <div class="highlight" style={{ width: '35%' }}>{data.localOneWayFare ? parseInt(data.localOneWayFare).toLocaleString('en-US') : ''}</div>
                                    <div class="note">
                                        ※(Local) 10月20日発行給与明細 もしくは Agile Works にて確認<br />
                                        (Expat) One-way Rate of the route available with ODS
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div style={{ paddingTop: '10px' }}>
                        <div class='commute-info'>5 &nbsp; &nbsp; &nbsp;通勤日の精算対象(片道/往復)を選択 / Pls select "One-way" or "Round Trip" from drop down.</div>
                        <table class='details-table'>
                            <tr>
                                <td class='bottom-border'>日付 <br />Date</td>
                                <td class='bottom-border'>通勤日精算対象 (往復/片道)/ <br />Commuting dates (Round/One-way)</td>
                            </tr>
                            {tableData.map(item => (
                                <tr key={item.id}> {
                                    (item.id % 10 === 0) && (item.id !== 30) ?
                                        (<><td class='bottom-border'>{item.id}</td><td class='route-type bottom-border'>{item.routeType}</td></>)
                                        : (<><td>{item.id}</td><td class='route-type'>{item.routeType}</td></>)
                                }
                                </tr>
                            ))}
                        </table>
                        <div class='text-style flexDisplay space-between'>
                            <div>Round Trip/往復 ¥ {data.localOneWayFare ? (data.localOneWayFare * 2).toLocaleString('en-US') : ''}</div>
                            <div>{data.localConvyDates ? data.localConvyDates.length: 0}</div>
                        </div>
                        <div class='text-style flexDisplay space-between'>
                            <div>One-way Trip/片道 ¥ {data.localOneWayFare ? parseInt(data.localOneWayFare).toLocaleString('en-US') : ''}</div>
                            <div> 0</div>

                        </div>
                    </div>
                    <div>
                        <div class='commute-info'>6 &nbsp; &nbsp; &nbsp;申請額 / Bill Amount in GESS Claim</div>
                        <div class="orange-highlight">
                            <div>¥</div>
                            <div>{total ? total.toLocaleString('en-US') : ''}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='center-align-button'>
                <button className='button-color button' onClick={downloadPdf}>Download</button>
            </div>
        </div>
    )
};

export default GeneratePdf;