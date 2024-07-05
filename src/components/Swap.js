import React from 'react';
import '../css/swap.css';

function Swap() {
    return (
        <div className="swap-container">
            <h1>Quick Swap</h1>
            <iframe 
                src={`${process.env.PUBLIC_URL}/quickswap.html`} 
                title="Quick Swap" 
                className="quickswap-iframe"
            ></iframe>
        </div>
    );
}

export default Swap;
