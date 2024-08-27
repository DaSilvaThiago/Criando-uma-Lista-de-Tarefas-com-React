import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import './App.css';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');

  const handleAdicionarTarefa = () => {
    if (novaTarefa.trim()) {
      const nova = {
        id: Date.now(),
        nome: novaTarefa,
        concluida: false,
      };
      setTarefas([...tarefas, nova]);
      setNovaTarefa('');
    } else {
      alert('Por favor, insira uma tarefa.');
    }
  };

  const handleConcluirTarefa = (id) => {
    const tarefasAtualizadas = tarefas.map(tarefa =>
      tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
    );
    setTarefas(tarefasAtualizadas);
  };

  const handleRemoverTarefa = (id) => {
    const tarefasAtualizadas = tarefas.filter(tarefa => tarefa.id !== id);
    setTarefas(tarefasAtualizadas);
  };

  const totalConcluidas = tarefas.filter(tarefa => tarefa.concluida).length;
  const totalPendentes = tarefas.length - totalConcluidas;

  const data = {
    labels: ['Concluídas', 'Pendentes'],
    datasets: [
      {
        label: '# de Tarefas',
        data: [totalConcluidas, totalPendentes],
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return (
    <div className="App">
      <h1>Lista de Tarefas</h1>
      <div className="input-group">
        <input
          type="text"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
          placeholder="Adicionar nova tarefa"
        />
        <button onClick={handleAdicionarTarefa}>Adicionar</button>
      </div>
      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id} className={tarefa.concluida ? 'concluida' : ''}>
            <span>{tarefa.nome}</span>
            <input
              type="checkbox"
              checked={tarefa.concluida}
              onChange={() => handleConcluirTarefa(tarefa.id)}
            />
            <button onClick={() => handleRemoverTarefa(tarefa.id)}>Remover</button>
          </li>
        ))}
      </ul>
      <div className="chart">
        <Pie data={data} />
      </div>
    </div>
  );
}

export default App;
