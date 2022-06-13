import React from "react";
import './Pagination.css';

//pokesXpage={pokesXpage} pokes={allP.length} pagination={pagination} currentpage={currentpage}
export default function Pagination({pokesXpage, pokes, pagination, currentpage}){

    const numPage = [];

    for(let i=1; i <= Math.ceil(pokes / pokesXpage); i++){
        numPage.push(i);
    }

    return(
        <div className="pagination">

            {/*btn Prev */}
            {
                numPage && currentpage > 1 ?
                <button className="navigate" onClick={() => pagination(currentpage -1)}>Prev</button> : null
            }

            {/* btn Paginas ->num paginas-> 1-2-3 etc*/}
            {
                numPage && numPage.map((num) => {
                    return(
                        <button className={currentpage === num ? "pageSelected" : "page"} key={num}
                                onClick={() => pagination(num)}>{num}</button>
                    )
                })
            }

             {/*btn  Next*/}
             {
                numPage && currentpage <= numPage.lenght -1 ?
                <button className="navigate" onClick={() => pagination(currentpage + 1)}>Next</button> : null
            }
        </div>
    )
}