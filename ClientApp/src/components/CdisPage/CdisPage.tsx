import React, { Suspense, lazy, useEffect, useState } from 'react';
import { getCdi, getCdis, getFilteredCdis } from '../../data/cdi'; 
import { Cdi } from '../../types/CdiType';
import style from './CdisPage.module.scss';
import { Button } from '../Button/Button';
import { Filter } from '../Filter/Filter';
import { useNavigate, useParams } from "react-router-dom";
import { Input } from '../Input/NumericInput/Input';

const ListItem = lazy(() => import("../ListItem/ListItem"));

export const CdisPage = ({searchParams, setSearchParams} : {searchParams: any, setSearchParams: any}) => {
  const {newId} = useParams();
  const [id, setId] = useState<number>(newId ? parseInt(newId) : NaN);
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
    searchParams.set('pageNumber', page)
    setSearchParams(searchParams)
  }
  
  const handleLoadLess = () => {
    let page = parseInt(searchParams.get("pageNumber") || "1") - 1;
    searchParams.set('pageNumber', page)
    setSearchParams(searchParams)
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
        {/* <div>
          <h5>Statistics</h5>
          <p><b>Most common CDI: </b></p>
        </div> */}
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
