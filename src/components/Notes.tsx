import { useState, useEffect } from 'react';
import { BookOpen, Save, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Note {
  id: string;
  date: string;
  content: string;
}

export function Notes() {
  const { userData, updateUserData } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState('');

  useEffect(() => {
    if (userData?.generalNotes) {
      setNotes(userData.generalNotes);
    }
  }, [userData]);

  const saveNote = async () => {
    if (!currentNote.trim()) return;

    const newNote: Note = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('pt-BR', { 
        day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' 
      }),
      content: currentNote.trim()
    };

    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    
    if (userData) {
      await updateUserData({ generalNotes: updatedNotes });
    }
    setCurrentNote('');
  };

  const deleteNote = async (id: string) => {
    const updatedNotes = notes.filter(n => n.id !== id);
    setNotes(updatedNotes);
    
    if (userData) {
      await updateUserData({ generalNotes: updatedNotes });
    }
  };

  return (
    <div className="p-4 pb-24">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Anotações Gerais</h2>
        <p className="text-sm text-gray-600">Registre pensamentos, orações ou ideias.</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-amber-100 mb-8">
        <textarea
          value={currentNote}
          onChange={(e) => setCurrentNote(e.target.value)}
          placeholder="O que está no seu coração hoje?"
          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none min-h-[120px] text-sm mb-3"
        />
        <button
          onClick={saveNote}
          disabled={!currentNote.trim()}
          className="w-full flex items-center justify-center gap-2 bg-amber-500 text-white py-3 rounded-lg font-semibold shadow-sm hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Save className="w-4 h-4" />
          Salvar Anotação
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-gray-700 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-500" />
          Histórico
        </h3>
        
        {notes.length === 0 ? (
          <p className="text-center text-gray-500 text-sm py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            Nenhuma anotação ainda.
          </p>
        ) : (
          notes.map(note => (
            <div key={note.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 relative group">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-md">
                  {note.date}
                </span>
                <button 
                  onClick={() => deleteNote(note.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{note.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
