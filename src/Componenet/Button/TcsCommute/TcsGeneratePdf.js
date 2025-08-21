import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRef } from 'react';
import localConvy from './localconvy.png'

function TcsGeneratePdf(props) {
    const { data } = props;
    console.log(data);
    const pdfRef = useRef(null);
    const downloadPdf = async () => {
        if (!pdfRef.current) return;
        try {
            const canvas = await html2canvas(pdfRef.current, { scale: 3 });
            const imageData = canvas.toDataURL("image/png");
            const pdf = new jsPDF({ orientation: "l", unit: "mm", format: "a3", compress: true });
            const pdfWidth = pdf.internal.pageSize.getWidth() - 100;
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage({
                imageData: imageData,
                format: "PNG",
                x: 10,
                y: 10,
                width: pdfWidth,
                height: pdfHeight
            });
            pdf.save("document.pdf");
        } catch (error) {
            console.error("An error occurred while generating the PDF:", error);
        }
    };
    const tableData = [];
    let total = 0;
    for (let i = 1; i <= 30; i++) {
        let idBasedRoute;
        if (data.monthlyCommuteDatesList != undefined && i <= data.monthlyCommuteDatesList.length) {
            total = total + (data.monthlyOneWayFare ? parseInt(data.monthlyOneWayFare) * 2 : 0);
            idBasedRoute = { id: i, date: data.monthlyCommuteDatesList[i - 1], from: data.monthlyCommuteFrom, to: data.monthlyCommuteTo, routeType: 'Round trip', transport: 'Train', bill: data.monthlyOneWayFare ? parseInt(data.monthlyOneWayFare) * 2 : '' }
        } else {
            idBasedRoute = { id: i, date: '', from: '', to: '', routeType: '', tansport: '', bill: '' }
        }
        tableData.push(Object.assign({}, idBasedRoute));
    }

    return (
        <div class="div-tcs-scroll" >
            <div ref={pdfRef}>
                <div class="container">
                    <div>
                        <h6>Local Conveyance public transportation report</h6>
                        <div class="header-info">
                            <div>
                                <div class="flexDisplay space-between">
                                    <label class="field-tcs">Employee #:</label>
                                    <label class="input-tcs">{data.empNo}</label>
                                </div>
                                <div class="flexDisplay space-between padding-top-2">
                                    <label class="field-tcs">Name:</label>
                                    <label class="input-tcs">{data.empName}</label>
                                </div>
                            </div>
                            <div class="flex-col">
                                <label class="total">Total Amount</label>
                                <label class="total-amount">{total ? total.toLocaleString('en-US') : ''}</label>
                            </div>
                        </div>

                        <div class="checkpoints">
                            <ol>
                                <div class="conf-point">Confirmation point</div>
                                <div class="paragraph">
                                    <div class="padding-right-40">
                                        <input type='checkbox' disabled checked></input>
                                    </div>
                                    <div>
                                        <li class="padding-left-90">
                                            The route which you input below is not commuting route which you registerred with HROne or ODS. Commute
                                            case,
                                            please apply under different claim head.<br />
                                            下記に入力したルートはHROneもしくはODSに登録した通勤経路ではない。通勤経路の場合は別のClaim headに申請のこと。
                                        </li>
                                    </div>
                                </div>
                                <div class="paragraph">
                                    <div class="padding-right-40">
                                        <input type='checkbox' disabled checked></input>
                                    </div>
                                    <div>
                                        <li class="padding-left-90">
                                            Total amount is less than 30000JPY.<br />
                                            合計金額が3万円以下である。
                                        </li>
                                    </div>
                                </div>
                                <div class="paragraph">
                                    <div class="padding-right-40">
                                        <input type='checkbox' disabled checked></input>
                                    </div>
                                    <div>
                                        <li class="padding-left-90">
                                            No taxi or express expenses in the list below.<br />
                                            下記のリストにはタクシー代や特急料金は含まれていない。
                                        </li>
                                    </div>
                                </div>
                                <div class="paragraph">
                                    <div class="padding-right-40">
                                        <input type='checkbox' disabled checked></input>
                                    </div>
                                    <div>
                                        <li class="padding-left-90">
                                            There is no transportation fee related business trip.<br />
                                            出張に関連する交通費は含まれていない。
                                        </li>
                                    </div>
                                </div>
                            </ol>
                        </div>
                    </div>
                    <div>
                        <div class="transportation">
                            <div class="trans-div">
                                Transportation / 交通費
                                <img class='tcs-img-size' src={localConvy}></img>
                            </div>
                            <div class="trans-note">
                                ※Exception: If the purpose is Client Entertainment/Internal Meal,<br />refer to "Transportation Handbook"
                            </div>
                        </div>
                        <table class="tcs-commute-table">
                            <thead>
                                <tr>
                                    <th style={{ textAlign: 'center', width: '1%' }}>No.</th>
                                    <th style={{ textAlign: 'center', width: '6%' }}>Date</th>
                                    <th style={{ textAlign: 'center', width: '11%' }}>From</th>
                                    <th style={{ textAlign: 'center', width: '11%' }}>To</th>
                                    <th style={{ textAlign: 'center', width: '9%' }}>One way <br />or <br />Round trip</th>
                                    <th style={{ textAlign: 'center', width: '10%' }}>Transportation<br />*Use Dropdown</th>
                                    <th style={{ textAlign: 'center', width: '6%' }}>Bill<br /> Amount</th>
                                    <th style={{ textAlign: 'center', width: '3.5%' }}>Curr<br />ency</th>
                                    <th style={{ textAlign: 'center', width: '5.4%' }}>Exch rate</th>
                                    <th style={{ textAlign: 'center', width: '6%' }}>JPY <br />Amount</th>
                                    <th style={{ textAlign: 'center' }}>Remarks</th>
                                </tr>
                            </thead>

                            {tableData.map(item => (
                                <tr key={item.id}> {
                                    (<><td class="text-align-center">{item.id}</td>
                                        <td class="text-align-end">{item.date}</td>
                                        <td>{item.from}</td>
                                        <td>{item.to}</td>
                                        <td>{item.routeType}</td>
                                        <td>{item.transport}</td>
                                        <td class="text-align-end">{item.bill}</td>
                                        <td class="text-align-center text-italic">JPY</td>
                                        <td class="text-align-center">1.00</td>
                                        <td class="text-align-end">{item.bill ? item.bill : 0}</td>
                                        <td></td></>)
                                }
                                </tr>
                            ))}
                        </table>
                        <div class="total-div">
                            <div class="total-row">
                                I. Total
                            </div>
                            <div class="color-white">
                                {total ? total.toLocaleString('en-US') : ''}
                            </div>
                            <div class="total-note">
                                ←Total amount must be less than 30000 JPY
                            </div>
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

export default TcsGeneratePdf;