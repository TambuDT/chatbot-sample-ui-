import React from 'react'


function QueryComponent({message}) {
    return (
        <div className='query-item'>
            <p className='message'>{message}</p>
        </div>
    )
}

export default QueryComponent