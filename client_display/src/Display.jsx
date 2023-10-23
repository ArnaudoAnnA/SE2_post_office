import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function RandomTable(props) {
    const row = props.row;

  return (
    <table class="table" style={{width: '60vw', height:'60vh'}}> 
      <thead class="table-light">
        <tr>
          <th scope="col" style={{fontSize: '40px'}}>Counter</th>
          <th scope="col" style={{fontSize: '40px'}}>Serving</th>
          <th scope="col" style={{fontSize: '40px'}}>Service Type</th>
        </tr>
      </thead>
      <tbody>
        {row.map((row, index) => (
          <tr key={index}>
            <td scope="row" style={{fontSize: '20px'}}>{row.counterID}</td>
            <td scope="row" style={{fontSize: '20px'}}>{row.clientNumber}</td>
            <td scope="row" style={{fontSize: '20px', fontFamily:'monospace'}}>{row.serviceType}</td>
          
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default RandomTable;