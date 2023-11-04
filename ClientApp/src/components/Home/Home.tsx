import React, { Suspense, lazy, useEffect, useState } from 'react';
import { getCdis, getFilteredCdis } from '../../data/cdi'; 
import { Cdi } from '../../types/CdiType';
import style from './Home.module.scss';
import { Button } from '../Button/Button';
import { Filter } from '../Filter/Filter';
import { Link, useNavigate } from "react-router-dom";

const ListItem = lazy(() => import("../ListItem/ListItem"));

export const Home = ({searchParams, setSearchParams} : {searchParams: any, setSearchParams: any}) => {
  const [cdis, setCdis] = useState<Cdi[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchInitalCdi = async () => {
      setCdis(await getCdis());
    } 
    if (!searchParams.toString()) {
      fetchInitalCdi()
    };
  }, [])

  const handleLoadMore = () => {
    let page = parseInt(searchParams.get("pageNumber") || "1") + 1;
    setSearchParams((prev: any) => {
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

        <Button handleClick={() => navigate('/add')} text="Add data" classBtn="addBtn"/>
  
        
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
