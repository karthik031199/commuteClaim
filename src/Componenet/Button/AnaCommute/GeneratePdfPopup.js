import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import GeneratePdf from './GeneratePdf.js'

function GeneratePdfPopup(props) {
    const { data } = props;

    return (
        <Popup contentStyle={{width:'55%'}} trigger=
          {<button class="button-color button">Monthly Commute</button>}
          modal nested>
          {
            close => (
              <>
                <div class="display-flex-end">
                  <button class="btn-close" aria-label="Close" onClick={() => close()}></button>
                </div>
                <GeneratePdf data={data}></GeneratePdf>
              </>
            )
          }
        </Popup>
    );
}

export default GeneratePdfPopup;