import React, { Suspense, lazy, useEffect, useState } from 'react';
import { getCdi, getCdis, getFilteredCdis } from '../../data/cdi'; 
import { Cdi } from '../../types/CdiType';
import style from './CdisPage.module.scss';
import { Button } from '../Button/Button';
import { Filter } from '../Filter/Filter';
import { useNavigate, useParams } from "react-router-dom";
import { Input } from '../Input/NumericInput/Input';

const ListItem = lazy(() => import("../ListItem/ListItem"));

/*
    Page to manage CDI data 
    @param {any} searchParams - search params from the URL
    @param {any} setSearchParams - function that sets state of search params
*/
export const CdisPage = ({searchParams, setSearchParams} : {searchParams: any, setSearchParams: any}) => {
  const {newId} = useParams();
  const [id, setId] = useState<number>(newId ? parseInt(newId) : NaN);
  const [cdi, setCdi] = useState<Cdi | null>();
  const [cdis, setCdis] = useState<Cdi[]>([]);
  const navigate = useNavigate();

  // fetch the initial cdis to display 
  useEffect(() => {
    const fetchInitalCdi = async () => {
      setCdis(await getCdis());
    } 
    if (!searchParams.toString()) {
      fetchInitalCdi()
    };
  }, [])

  // function shows 10 more cdis
  const handleLoadMore = () => {
    let page = parseInt(searchParams.get("pageNumber") || "1") + 1;
    searchParams.set('pageNumber', page)
    setSearchParams(searchParams)
  }
  
  // functoin shows 10 less cdis
  const handleLoadLess = () => {
    let page = parseInt(searchParams.get("pageNumber") || "1") - 1;
    searchParams.set('pageNumber', page)
    setSearchParams(searchParams)
  }

  // fetches cdis based on the filters
  useEffect(() => {
    const filterCdis = async () => {
      setCdis(await getFilteredCdis(searchParams.toString()));
    }
    filterCdis();
  }, [searchParams])

  // set the id from input box
  const handleIdChange = (e: any) => {
    let val = e.target.value;
    setId(parseInt(val));
  }

  // fetches cdi by id when id is changed
  useEffect(() => {
    const fetchCdiById = async () => {
      if (id && typeof id === 'number') {
        const response = await getCdi(id);
        if (response.status >= 300 || response.status < 200) {
          setCdi(null)
        } else {
          setCdi(response);
        }
      } else {
        setCdi(null);
      }
    }
    fetchCdiById()
  }, [id])
  
  return (
    <div className={style.home}>
      <div className={style.infoDiv}>
        <div className={style.homeTopDiv}>
          <Button handleClick={() => navigate('/cdis/add')} text="Add data" classBtn="addBtn"/>
          <div>
            <Input defaultVal={newId ? parseInt(newId) : undefined} handleChange={handleIdChange} placeholder="Search by id..."/>
          </div>
        </div>
        
        { id
          ?
            cdi ?
            <ListItem key={cdi.id} item={cdi}/>
            :
            <p className={style.greyText}>No data found with id...</p>
          :
            <div>
              <div className={style.listItems}>
                {cdis.length ? cdis.map((cdi: Cdi) => {
                    return (
                      <Suspense key={cdi.id} fallback={<div>Loading...</div>}>
                        <ListItem key={cdi.id} item={cdi}/>
                      </Suspense>
                    )
                  })
                  :
                  <p className={style.greyText}>No data found with filters...</p>
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
