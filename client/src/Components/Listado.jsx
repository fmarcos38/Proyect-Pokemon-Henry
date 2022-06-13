import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from './Loading/Loading';
import { getAllT } from "../Redux/Actions";


export default function Listados(){

    const allT = useSelector(state => state.allTypes);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllT());
    },[dispatch]);

    return(
        <div>
          {
              allT.length ?
              (<div>
                  {
                      allT.map(T => {
                          return(
                              <div key={T.id}>
                                  <p>{T.name}</p>
                              </div>
                          )
                      })
                  }
              </div>): <Loading/>
          }
        </div>
    )
}