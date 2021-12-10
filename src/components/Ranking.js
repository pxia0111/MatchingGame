import React from 'react';

function RankTable(props) {
  const { ranking } = props;

  return (
  <table> 
    <caption>Ranking Who Is The King</caption>
    <thead>
      <tr>
        <th>Address</th>
        <th>Score</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {ranking.map((ranks) => (
        <tr key={ranks.id}>
          <td>{ranks.address}</td>
          <td>{ranks.score}</td>
          <td>{ranks.date}</td>
        </tr>
      ))}
    </tbody>
  </table>
  );
}

export default RankTable;