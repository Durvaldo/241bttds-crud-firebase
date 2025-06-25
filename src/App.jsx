import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from './firebase/config.js';
import { useEffect, useState } from 'react';

export default function App() {
  const [inputEditar, setInputValue] = useState(null);
  const [listaTarefa, setListaTarefa] = useState([]);
  const [tarefaInput, setTarefaInput] = useState('');
  const [abrirEditarId, setAbrirEditarId] = useState(null);

  async function salvarTarefa() {
    if (!tarefaInput.trim()) return;
    try {
      const docRef = await addDoc(collection(db, 'tarefas'), {
        nome: tarefaInput,
      });
      setTarefaInput('');
      console.log('Id da tarefa', docRef.id);
    } catch (e) {
      console.error('Erro ao adicionar tarefa: ', e);
    }
  }

  function buscarTarefas() {
    onSnapshot(
      query(collection(db, 'tarefas'), orderBy('nome')),
      (snapshot) => {
        let lista = [];
        snapshot.forEach((doc) => {
          const item = {
            id: doc.id,
            ...doc.data(),
          };
          lista.push(item);
        });
        setListaTarefa(lista);
      }
    );
  }

  async function apagarItem(tarefa) {
    await deleteDoc(doc(db, 'tarefas', tarefa.id));
  }

  function abrirEditar(tarefa) {
    if (tarefa.id != abrirEditarId) {
      setAbrirEditarId(tarefa.id);
    } else {
      setAbrirEditarId(null);
    }
    setInputValue(tarefa.nome);
  }

  async function editarTarefa(tarefaId) {
    await updateDoc(doc(db, 'tarefas', tarefaId), { nome: inputEditar });
    setAbrirEditarId(null);
  }

  useEffect(() => {
    buscarTarefas();
  }, []);

  return (
    <div className='bg-indigo-500 mt-10 p-5 rounded-lg'>
      <h1 className='text-xl font-bold text-center'>Lista de tarefas proz</h1>
      <hr />
      <div>
        <input
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full px-2'
          type="text"
          id="addTarefa"
          value={tarefaInput}
          onChange={(e) => {
            setTarefaInput(e.target.value);
          }}
        />
        <button 
          className='ml-4 rounded-lg px-1 cursor-pointer bg-sky-800 hover:bg-sky-900' 
          onClick={salvarTarefa}
        >
            Adicionar tarefa
        </button>
      </div>
      <ul>
        {listaTarefa.map((tarefa, index) => (
          <li key={index}>
            {abrirEditarId == tarefa.id ? (
              <span>
                <input
                  type="text"
                  value={inputEditar}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    editarTarefa(tarefa.id);
                  }}
                >
                  Salvar
                </button>
              </span>
            ) : (
              tarefa.nome
            )}
            <button
              onClick={() => {
                abrirEditar(tarefa);
              }}
            >
              e
            </button>
            <button
              onClick={() => {
                apagarItem(tarefa);
              }}
            >
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
