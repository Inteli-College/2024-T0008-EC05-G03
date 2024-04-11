import React from 'react';
import './tabela.css';

// Função geral JSX para o componente ActivityTable
const ActivityTable = ({ activities }) => {
  return (
   <div className="table-container">
      <table className='activity-table'>
        <thead>
          <tr>
            <th>Data</th>
            <th>Horário</th>
            <th>Usuário</th>
            <th>Layout Aplicado</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, index) => (
            <tr key={index}>
              <td>{activity.date}</td>
              <td>{activity.time}</td>
              <td>{activity.user}</td>
              <td>{activity.layout}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityTable;