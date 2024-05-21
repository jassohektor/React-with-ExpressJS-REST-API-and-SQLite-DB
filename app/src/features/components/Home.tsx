import React, { useCallback, useEffect, useState } from 'react';
import { axiosClient } from '../../core/services';
import { GridView } from '../../shared/ui'
import { Context } from 'src/core/contexts/Context';

export function Home() {
  const { isAuthenticated, setAuth } = React.useContext(Context);
  const [properties, setProperties] = useState([]);
  let search:string;

  function getData(searchText:string) {
    if(searchText){
      search = `property/${searchText}`;
    }
    else {
      search = 'property/Hotel';
    }
    axiosClient.get(search).then((res:any)=> {
        let properties:any = [];
        if(res.data) {
            res.data.forEach((user:any) => {
              properties.push(user);
            });
            setProperties(properties);
        }
        else if(res.response.status === 401) {
            setAuth(false);
            localStorage.clear();
            window.location.assign('/login');
        }
    });
  }

  useEffect(()=>{ 
    getData('');
  }, []);

  const title:string = "Properties";
    return (<div className="container">
        <GridView title={title} properties={properties} getData={getData}/>
      </div>);
}