import React from 'react'


function ReplyComponent({message}) {
    return (
        <div className='reply-item'>
            <p className='message'>{message}</p>
        </div>
    )
}

export default ReplyComponent