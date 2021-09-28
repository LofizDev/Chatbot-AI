import React from 'react'
function Pagination({ postPerPage,totalPosts,paginate}) {
    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++ ) {
        pageNumbers.push(i)
    }

    return (
       <nav className='d-flex align-items-center justify-content-between' >
           <div className="h6 text-muted text-table">Hiển thị 1 - 10 trong số 100</div>
           <ul className='pagination p-2'>
             {pageNumbers.map(number => (
                 <li key={number} className='page-item m-1'>
                     <a onClick={() => paginate(number)} className="h6 page-link">
                         {number}
                     </a>
                 </li>
             ))}
           </ul>
       </nav>
    )
}

export default Pagination
