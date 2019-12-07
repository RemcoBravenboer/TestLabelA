import React from 'react';
import spinnerStyle from '../css/Spinner.module.css';
/*
    Spinner by https://loading.io/css/
 */
const Spinner = () => {
    return (
        <div className={spinnerStyle.ldsContainer}>
            <div className={spinnerStyle.ldsRing}><div></div><div></div><div></div><div></div></div>
            <br/>
            Loading...
        </div>
    );
};

export default Spinner;