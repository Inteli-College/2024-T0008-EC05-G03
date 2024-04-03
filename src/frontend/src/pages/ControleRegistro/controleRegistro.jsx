import React, { useState, useMemo } from 'react';
import SortDropdown from '../../components/controleRegistro/dropdown';
import FilterInput from '../../components/controleRegistro/filtro';
import ActivityTable from '../../components/controleRegistro/tabela';
import './controleRegistro.css';

const ActivityLogPage = () => {
  const [sortOrder, setSortOrder] = useState('');
  const [filterKeyword, setFilterKeyword] = useState('');

  const activities = useMemo(() => [
    { date: '2023-01-01', time: '10:00', user: 'Alfonso', layout: 'Layout 2' },
    { date: '2023-01-03', time: '10:00', user: 'CLEITON', layout: 'Layout 3' },
    { date: '2023-01-04', time: '10:00', user: 'TicuTuca', layout: 'Layout 1' },
  ], []);

 
  const sortedActivities = useMemo(() => {
    const sortFunctions = {
      date_asc: (a, b) => new Date(a.date) - new Date(b.date),
      date_desc: (a, b) => new Date(b.date) - new Date(a.date),
      user: (a, b) => a.user.localeCompare(b.user),
      layout: (a, b) => extractNumber(a.layout) - extractNumber(b.layout),
    };


    function extractNumber(layout) {
      const match = layout.match(/\d+$/); 
      return match ? parseInt(match[0], 10) : 0;
    }

    return activities.slice().sort(sortFunctions[sortOrder] || (() => 0));
  }, [activities, sortOrder]);


  const filteredAndSortedActivities = useMemo(() => {
    const lowercasedFilter = filterKeyword.toLowerCase();
    return sortedActivities.filter((activity) => {
      return (
        activity.date.toLowerCase().includes(lowercasedFilter) ||
        activity.user.toLowerCase().includes(lowercasedFilter) ||
        activity.layout.toLowerCase().includes(lowercasedFilter)
      );
    });
  }, [sortedActivities, filterKeyword]);
  
  return (
    <div className="activity-log-page">
      <h1 className="activity-log-header">Registro de Atividades:</h1>
      <div className="controls">
      <SortDropdown setSortOrder={setSortOrder} />
      <FilterInput setFilterKeyword={setFilterKeyword} />
      </div>
      <ActivityTable activities={filteredAndSortedActivities} />
    </div>

  );
};
export default ActivityLogPage;