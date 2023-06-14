import React from 'react';
import "./Body.css"

function Body({children}){
    return (
        <body id='Container'>
            <div className='bodyContent'>
                {children}
            </div>
        </body>
    );
}

export default Body;
