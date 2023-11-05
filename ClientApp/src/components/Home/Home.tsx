import React, { Suspense, lazy, useEffect, useState } from 'react';
import { getCdi, getCdis, getFilteredCdis } from '../../data/cdi'; 
import { Cdi } from '../../types/CdiType';
import style from './Home.module.scss';
import { Button } from '../Button/Button';
import { Filter } from '../Filter/Filter';
import { useNavigate } from "react-router-dom";
import { Input } from '../Input/NumericInput/Input';

const ListItem = lazy(() => import("../ListItem/ListItem"));

export const Home = ({searchParams, setSearchParams} : {searchParams: any, setSearchParams: any}) => {
  const [id, setId] = useState<number>();
  const [cdi, setCdi] = useState<Cdi | null>();
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
  
  const handleLoadLess = () => {
    let page = parseInt(searchParams.get("pageNumber") || "1") - 1;
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

  const handleIdChange = (e: any) => {
    let val = e.target.value;
    setId(parseInt(val));
  }

  useEffect(() => {
    const fetchCdiById = async () => {
      if (id && typeof id === 'number') {
        console.log("fetch by id")
        setCdi(await getCdi(id));
      } else {
        setCdi(null);
      }
    }
    fetchCdiById()
  }, [id])

  useEffect(() => {
    console.log(cdi)
  }, [cdi])
  
  return (
    <div className={style.home}>
      <div className={style.infoDiv}>
        {/* <div>
          <h5>Statistics</h5>
          <p><b>Most common CDI: </b></p>
        </div> */}
        <div className={style.homeTopDiv}>
          <Button handleClick={() => navigate('/add')} text="Add data" classBtn="addBtn"/>
          <div>
            <Input handleChange={handleIdChange} placeholder="Search by id..."/>
          </div>
        </div>
        
        {
          cdi ?
          <ListItem key={cdi.id} item={cdi}/>
          :
          <div>
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

            <div className={style.loadBtnDiv}>
              {cdis.length > 10 
              && 
              <div>
                <Button handleClick={handleLoadLess} text="Show less" classBtn="loadBtn"/>
              </div>
              }

              {cdis.length > 0 
              &&
              <div> 
                <Button handleClick={handleLoadMore} text="Show more" classBtn="loadBtn"/>
              </div>
              }
            </div> 
          </div>
        }
        
      </div>
      
      <Filter searchParams={searchParams} setSearchParams={setSearchParams}/> 
           
      
    </div>
  );

}
