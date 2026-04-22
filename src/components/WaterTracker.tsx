import { useState, useEffect } from 'react';
import { Droplets, Plus, Minus, Calendar, CheckCircle, Save, Bell, BellOff, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface WaterEntry {
  id: string;
  timestamp: number;
  date: string;
  time: string;
  glasses: number;
}

export function WaterTracker() {
  const { userData, updateUserData } = useAuth();
  const [glasses, setGlasses] = useState(() => {
    return parseInt(localStorage.getItem('current_glasses') || '0', 10);
  });
  const [entries, setEntries] = useState<WaterEntry[]>([]);
  const goal = 8; // 8 glasses = ~2 liters
  const today = new Date().toLocaleDateString('pt-BR');
  const [savedToHistory, setSavedToHistory] = useState(false);
  const [isReminderMenuOpen, setIsReminderMenuOpen] = useState(false);

  useEffect(() => {
    if (userData) {
      if (userData.waterEntries) {
        setEntries(userData.waterEntries);
      } else if (userData.waterHistory) {
        // Migrate legacy history if needed, or just leave it empty
        const migrated: WaterEntry[] = [];
        Object.entries(userData.waterHistory).forEach(([date, count]) => {
          if (count > 0) {
            migrated.push({
              id: `legacy-${date}`,
              timestamp: new Date(date.split('/').reverse().join('-')).getTime(),
              date,
              time: '00:00',
              glasses: count
            });
          }
        });
        setEntries(migrated);
      }
    }
  }, [userData]);

  const updateGlasses = (newVal: number) => {
    const validVal = Math.max(0, newVal);
    setGlasses(validVal);
    localStorage.setItem('current_glasses', validVal.toString());
  };

  const handleSaveToHistory = async () => {
    if (glasses === 0) return;

    const now = new Date();
    const newEntry: WaterEntry = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      timestamp: now.getTime(),
      date: now.toLocaleDateString('pt-BR'),
      time: now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      glasses: glasses
    };

    const newEntries = [newEntry, ...entries];
    setEntries(newEntries);
    
    if (userData) {
      await updateUserData({ waterEntries: newEntries });
    }
    
    setGlasses(0);
    localStorage.setItem('current_glasses', '0');
    
    setSavedToHistory(true);
    setTimeout(() => setSavedToHistory(false), 3000);
  };

  const handleDeleteEntry = async (id: string) => {
    const newEntries = entries.filter(entry => entry.id !== id);
    setEntries(newEntries);
    if (userData) {
      await updateUserData({ waterEntries: newEntries });
    }
  };

  const handleSetReminder = async (minutes: number | null) => {
    if (minutes !== null) {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
          alert('Por favor, permita as notificações no seu navegador para receber os lembretes.');
          return;
        }
      }
    }
    
    if (userData) {
      await updateUserData({ waterReminderInterval: minutes });
    }
    setIsReminderMenuOpen(false);
  };

  const percentage = Math.min(100, (glasses / goal) * 100);

  // Sort entries by timestamp descending
  const sortedEntries = [...entries].sort((a, b) => b.timestamp - a.timestamp);

  const currentReminder = userData?.waterReminderInterval;

  return (
    <div className="p-4 pb-24">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex-1"></div>
        <div className="text-center flex-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Controle de Água</h2>
          <p className="text-sm text-gray-600">Mantenha-se hidratado.</p>
        </div>
        <div className="flex-1 flex justify-end relative">
          <button 
            onClick={() => setIsReminderMenuOpen(!isReminderMenuOpen)}
            className={`p-2 rounded-full transition-colors ${currentReminder ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
            title="Configurar Lembretes"
          >
            {currentReminder ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
          </button>

          {isReminderMenuOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-20">
              <div className="p-3 bg-gray-50 border-b border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Lembrar a cada:</p>
              </div>
              <div className="flex flex-col">
                <button 
                  onClick={() => handleSetReminder(30)}
                  className={`px-4 py-3 text-sm text-left hover:bg-blue-50 transition-colors ${currentReminder === 30 ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'}`}
                >
                  30 minutos
                </button>
                <button 
                  onClick={() => handleSetReminder(60)}
                  className={`px-4 py-3 text-sm text-left hover:bg-blue-50 transition-colors ${currentReminder === 60 ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'}`}
                >
                  1 hora
                </button>
                <button 
                  onClick={() => handleSetReminder(120)}
                  className={`px-4 py-3 text-sm text-left hover:bg-blue-50 transition-colors ${currentReminder === 120 ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'}`}
                >
                  2 horas
                </button>
                <button 
                  onClick={() => handleSetReminder(null)}
                  className={`px-4 py-3 text-sm text-left hover:bg-red-50 transition-colors border-t border-gray-100 ${currentReminder === null ? 'text-red-600 font-medium' : 'text-red-500'}`}
                >
                  Desativar Lembretes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-blue-50 p-5 rounded-2xl mb-6 border border-blue-100 shadow-sm">
        <h3 className="font-bold text-blue-800 flex items-center gap-2 mb-3">
          <Droplets className="w-5 h-5" />
          Comece aos poucos!
        </h3>
        <p className="text-sm text-blue-900 mb-3 leading-relaxed">
          Inicie com cerca de <strong>2L de água por dia</strong> e aumente gradualmente até 4L, conforme sua necessidade.
        </p>
        <div className="bg-white/60 p-3 rounded-xl border border-blue-100/50">
          <p className="text-sm text-blue-800 italic font-medium">
            Lembre-se: a água é a "faxineira" do seu corpo. Sem quantidade suficiente, a limpeza não acontece.
          </p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-blue-100 flex flex-col items-center mb-6">
        <div className="relative w-48 h-48 mb-6">
          {/* Circular Progress */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              className="stroke-blue-50"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              className="stroke-blue-500 transition-all duration-500 ease-out"
              strokeWidth="12"
              fill="none"
              strokeDasharray={2 * Math.PI * 88}
              strokeDashoffset={2 * Math.PI * 88 * (1 - percentage / 100)}
              strokeLinecap="round"
            />
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Droplets className="w-10 h-10 text-blue-500 mb-2" />
            <span className="text-3xl font-bold text-gray-800">{glasses}</span>
            <span className="text-xs text-gray-500">de {goal} copos</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={() => updateGlasses(glasses - 1)}
            disabled={glasses === 0}
            className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 disabled:opacity-50 hover:bg-gray-200 transition-colors"
          >
            <Minus className="w-6 h-6" />
          </button>
          
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700">~ {glasses * 250} ml</p>
          </div>

          <button
            onClick={() => updateGlasses(glasses + 1)}
            className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-200 transition-colors"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>

      {glasses > 0 && !savedToHistory && (
        <button
          onClick={handleSaveToHistory}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-md hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mb-8"
        >
          <Save className="w-5 h-5" />
          Salvar no Histórico ({glasses * 250} ml)
        </button>
      )}

      {savedToHistory && (
        <div className="bg-green-50 text-green-800 p-4 rounded-xl flex items-center justify-center gap-2 text-sm font-medium border border-green-200 mb-8">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          Água salva no histórico com sucesso!
        </div>
      )}

      {/* History Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-500" />
          <h3 className="font-semibold text-gray-800">Histórico de Hidratação</h3>
        </div>
        <div className="p-4">
          {sortedEntries.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">Nenhum histórico anterior registrado.</p>
          ) : (
            <div className="space-y-3">
              {sortedEntries.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-700">
                      {entry.date === today ? 'Hoje' : entry.date}
                    </span>
                    <span className="text-xs text-gray-500">
                      {entry.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Droplets className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-bold text-gray-800">{entry.glasses} copos</span>
                      <span className="text-xs text-gray-500">({entry.glasses * 250} ml)</span>
                    </div>
                    <button 
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Excluir registro"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
