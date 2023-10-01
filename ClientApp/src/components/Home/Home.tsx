import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Cdi, getCdis, getFilteredCdis } from '../../data/cdi'; 
import style from './Home.module.scss';
import { Button } from '../Button/Button';
import { Filter } from '../Filter/Filter';
import { useSearchParams } from "react-router-dom";

const ListItem = lazy(() => import("../ListItem/ListItem"));

export const Home = () => {
  const [cdis, setCdis] = useState<Cdi[]>([]);

  useEffect(() => {
    const fetchInitalCdi = async () => {
      setCdis(await getCdis());
    } 
    fetchInitalCdi();
  }, [])
 
  let [searchParams, setSearchParams] = useSearchParams();

  const handleLoadMore = async () => {
    let page = parseInt(searchParams.get("pageNumber") || "1") + 1;
    setSearchParams((prev) => {
      return {
        ...prev,
        pageNumber: page
      }
    })
    
  }

  useEffect(() => {
    const filterCdis = async () => {
      setCdis(await getFilteredCdis(searchParams.toString()));
    }
    filterCdis();
  }, [searchParams])
 
  return (
    <div className={style.home}>
      <div className={style.infoDiv}>
        {/* <div>
          <h5>Statistics</h5>
          <p><b>Most common CDI: </b></p>
        </div> */}
        <div className={style.listItems}>
          {cdis.length > 0 && cdis.map((cdi: Cdi) => {
              return (
                <Suspense key={cdi.id} fallback={<div>Loading...</div>}>
                  <ListItem key={cdi.id} item={cdi}/>
                </Suspense>
              )
            })
          }
        </div>
      </div>
      
      <Filter searchParams={searchParams} setSearchParams={setSearchParams}/> 
      {cdis.length > 0 && <div className={style.loadMoreBtn}>
        <Button handleClick={handleLoadMore} text="Show more" classBtn="loadMoreBtn"/>
      </div>}
    </div>
  );

}
