import React from 'react'

const Helmet = ({ title, children }) => {
    // Tiêu đề trang web
    document.title = 'Multimart - ' + title
    return (
        <div className='w-100'>{children}</div>
    )
}

export default Helmet