import { useState } from "react";

export function GridView({title, properties, getData}:any) {
    const [filterText, setFilterText] = useState('');
    const [isActive, setIsActive] = useState(true);

    return (
        <div className="modal-container" style={{width:"100%"}}>
            <div className="row">
                <div style={{width:"100%", textAlign:"center", paddingTop:"15px"}}>
                    {title}
                </div>
                <br/>
                <br/>
                <br/>
            </div>
            <div className="row">
                <SearchBar filterText={filterText} isActive={isActive} getData={getData}
                onFilterTextChange={setFilterText} onIsActiveChange={setIsActive}/>
            </div>
            <br/>
            <div className="row table-content">
                <div className='content-scroll'>
                    <PropertyTable properties={properties} filterText={filterText} isActive={isActive} />
                </div>
            </div>
        </div>
    );
}

function SearchBar({filterText, isActive, onFilterTextChange, onIsActiveChange, getData}: any) {
    const lookUp = ()=> {
        getData(filterText);
    }

    const handleSubmit = (event:any) => {
        event.preventDefault();
    }

    return (
      <form onSubmit={handleSubmit}>
        <div className="row">
            <div className="col">
                <div className="row search-content">
                    <div className="col">
                        <input className="text-box" type="text" value={filterText} placeholder="Search..." onChange={(e) => onFilterTextChange(e.target.value)}/>
                    </div>
                    <div className="col">
                        <button style={{ float: "left" }} className="link-button" onClick={ lookUp }>Load</button>
                    </div>
                </div>
            </div>
            <div className="col">
            <label>
                <input className="check-box" type="checkbox" checked={isActive} onChange={(e) => onIsActiveChange(e.target.checked)}/>
                    {'- '} Only show active properties
                </label>
            </div>
        </div>
      </form>
    );
  }

  function PropertyTable({ properties, filterText, isActive }:any) {
    const rows:any[] = [];
    let locationId:number = 0;
  
    properties.forEach((property:any) => {
        if (property.propertyName.toLowerCase().indexOf(filterText.toLowerCase()) === -1) return;
        if (!isActive && property.active) return;
        if (property.locationId !== locationId) {
            rows.push(<PropertyLocationRow key={property.id + '-' + property.locationId} location={`Zip Code: ${property.zipCode}`} />);
        }
        rows.push(<PropertyRow key={property.id} property={property}/>);
        locationId = property.locationId;
    });
  
    return (
      <table style={{width:"100%"}}>
        <thead>
          <tr>
            <th>Property Name</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody style={{background:"#EFFFFF"}}>{rows}</tbody>
      </table>
    );
  }

  function PropertyRow({ property }:any) {
    const name = property.active ? property.propertyName :
      <span style={{ color: 'red' }}>
        {property.propertyName}
      </span>;
  
    return (
      <tr style={{width:"100%"}}>
        <td style={{textAlign:"left", border: "1px solid white"}}>{name}</td>
        <td style={{border: "1px solid white"}}>{property.address}</td>
      </tr>
    );
  }

  function PropertyLocationRow({ location }:any) {
    return (
      <tr style={{background:"#DAF0EF"}}>
        <th colSpan={2}>
          {location}
        </th>
      </tr>
    );
  }