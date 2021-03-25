import React from 'react'

import "./index.css";

const Pagination = props =>{
const {
    pageNumber,
    onPaginationButtonClick
} = props;

    return (
        <div className={'pagination-section'}>
       {pageNumber!== 0 && <button 
       className={"page-button"}
       onClick={()=>{
        onPaginationButtonClick(-1);
       }}
       >{'<'}</button>}
       <span className={"page-number"}>{pageNumber+1}</span>
        
        <button 
       className={"page-button"}
       onClick={()=>{
        onPaginationButtonClick(1);
       }}
        >{'>'}</button>
        </div>
    )
}

export default Pagination;