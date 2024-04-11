import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import SortDropdown from '../../components/controleRegistro/dropdown';
import FilterInput from '../../components/controleRegistro/filtro';
import ActivityTable from '../../components/controleRegistro/tabela';
import './controleRegistro.css';

// Função geral JSX para a página de ControleRegistro
const ActivityLogPage = () => {
  // Estados para controlar a ordenação e filtro
  const [sortOrder, setSortOrder] = useState('');
  const [filterKeyword, setFilterKeyword] = useState('');
  const [activities, setActivities] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Função para obter as atividades
  useEffect(() => {
    const fetchActivities = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND}/get_uso`); 
        const data = response.data;
        const formattedData = data.map(activity => ({
          ...activity,
          date: activity.horario.split(',')[0],
          time: activity.horario.split(',')[1], 
          user: activity.username,
          layout: activity.nome_layout,
        }));
        setActivities(formattedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivities();
  }, []);
 
  // Função para ordenar as atividades
  const sortedActivities = useMemo(() => {
    const sortFunctions = {
      date_asc: (a, b) => new Date(a.date) - new Date(b.date),
      date_desc: (a, b) => new Date(b.date) - new Date(a.date),
      user: (a, b) => a.user.localeCompare(b.user),
      layout: (a, b) => extractNumber(a.layout) - extractNumber(b.layout),
    };

    // Função para extrair o número do layout
    function extractNumber(layout) {
      const match = layout.match(/\d+$/); 
      return match ? parseInt(match[0], 10) : 0;
    }

    return activities.slice().sort(sortFunctions[sortOrder] || (() => 0));
  }, [activities, sortOrder]);

  // Função para filtrar e ordenar as atividades
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


  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  
  // Div principal da página de ControleRegistro
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