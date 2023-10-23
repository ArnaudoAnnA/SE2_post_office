import React from 'react';
import { useState } from 'react'

function RandomTable(props) {
    const row = props.row;

  return (
    <table>
      <thead>
        <tr>
          <th>Counter</th>
          <th>Serving</th>
          <th>Last Served</th>
        </tr>
      </thead>
      <tbody>
        {row.map((row, index) => (
          <tr key={index}>
            <td>{row.counterID}</td>
            <td>{row.clientNumber}</td>
            <td>{(row.clientNumber -1)}</td>
          
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default RandomTable;