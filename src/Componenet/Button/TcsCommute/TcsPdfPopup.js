import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import TcsGeneratePdf from './TcsGeneratePdf.js'

function TcsPdfPopup(props) {
    const { data } = props;

    return (
        <Popup contentStyle={{width:'98%'}} trigger={<button class="button-color button">Local Commute</button>}
            modal nested>
            {
                close => (
                    <>
                        <div class="display-flex-end">
                            <button class="btn-close" aria-label="Close" onClick={() => close()}></button>
                        </div>
                        <TcsGeneratePdf data={data}></TcsGeneratePdf>
                    </>
                )
            }
        </Popup>
    );
}

export default TcsPdfPopup;