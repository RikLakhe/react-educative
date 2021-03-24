import React from 'react'
import appConfig from '../../appConfig'

import './index.css'

const Sort = props =>{
    const {
        sortByTerm,
        sortOrderTerm,
        onSortButtonClick,
    }= props;

    return(
        <div className={"button-container"}>
        {
            appConfig.SORT_OPTIONS.map(sortItem=>{
                return(
                <button 
                    key={sortItem.key} 
                    onClick={()=>onSortButtonClick(sortItem.key)}
                    className={`${sortByTerm===sortItem.key ? "button-active" : ""}` }
                >
                    {sortItem.title}
                    <span>
                        {sortByTerm===sortItem.key && "*" }
                    </span>
                    </button>)
            })
        }
        </div>
    )
}

export default Sort;