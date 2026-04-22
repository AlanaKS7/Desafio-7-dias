import { useState, useEffect } from 'react';
import { Home, TrendingUp, Droplets, BookOpen, Info, Lightbulb, LogOut } from 'lucide-react';
import { DailyChallenge } from './components/DailyChallenge';
import { Progress } from './components/Progress';
import { WaterTracker } from './components/WaterTracker';
import { Notes } from './components/Notes';
import { Extras } from './components/Extras';
import { Login } from './components/Login';
import { useAuth } from './contexts/AuthContext';
import { useWaterReminder } from './hooks/useWaterReminder';
import logoImg from './assets/logo.png';
import desafioLogoImg from './assets/desafio_logo.png';

type Tab = 'home' | 'progress' | 'water' | 'notes' | 'extras';

export default function App() {
  const { user, userData, loading, signOut, updateUserData } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);

  useWaterReminder();

  // Use data from Firestore if available, otherwise default
  const currentDay = userData?.currentDay || 1;
  const completedDays = userData?.completedDays || [];
  const hasStarted = userData?.hasStarted || false;

  const startChallenge = async () => {
    await updateUserData({ hasStarted: true });
    
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  };

  const markDayCompleted = async (day: number) => {
    if (!completedDays.includes(day)) {
      const newCompleted = [...completedDays, day];
      const updates: any = { completedDays: newCompleted };
      
      if (day < 7) {
        updates.currentDay = day + 1;
      }
      
      await updateUserData(updates);
    }
  };

  const restartChallenge = async () => {
    await updateUserData({
      completedDays: [],
      currentDay: 1,
      exercises: {},
      remedies: {},
      notes: {}
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-xl flex items-center justify-center mb-6 bg-white animate-pulse">
          <img src={logoImg} alt="Logo" className="w-full h-full object-cover scale-110" />
        </div>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  const renderContent = () => {
    if (!hasStarted) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-8 text-center">
          <img src={desafioLogoImg} alt="Desafio Rotina Saudável" className="max-w-xs w-full mb-6" />
          <p className="text-lg text-gray-600 mb-8 max-w-md">
            7 dias para transformar seu corpo e sua mente, com foco em saúde física e espiritual.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8 text-left max-w-md shadow-sm">
            <h3 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
              <Info className="w-5 h-5" />
              AVISO PRINCIPAL
            </h3>
            <div className="text-sm text-amber-900 space-y-3">
              <p>
                <strong>👉 Este aplicativo possui caráter educativo e informativo</strong>, com foco na promoção de hábitos naturais para saúde e bem-estar.
              </p>
              <p>
                As orientações apresentadas não substituem avaliação médica, diagnóstico ou qualquer tipo de tratamento profissional.
              </p>
              <p>
                Antes de iniciar mudanças na alimentação ou no estilo de vida, especialmente em casos de doenças, uso de medicamentos, gravidez ou outras condições específicas, é recomendado buscar orientação de um profissional de saúde qualificado.
              </p>
              <p>
                Ao prosseguir, você declara estar ciente dessas informações e concorda em utilizá-las com responsabilidade.
              </p>
            </div>
            
            <label className="flex items-start gap-3 mt-5 cursor-pointer bg-white p-3 rounded-lg border border-amber-100 transition-colors hover:bg-amber-50/50">
              <input 
                type="checkbox" 
                checked={disclaimerAccepted}
                onChange={(e) => setDisclaimerAccepted(e.target.checked)}
                className="mt-0.5 w-5 h-5 text-green-600 rounded border-gray-300 focus:ring-green-500 flex-shrink-0"
              />
              <span className="text-sm font-medium text-amber-900">
                Estou ciente e desejo iniciar o desafio
              </span>
            </label>
          </div>

          <button
            onClick={startChallenge}
            disabled={!disclaimerAccepted}
            className={`px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition-all w-full max-w-xs ${
              disclaimerAccepted 
                ? 'bg-green-600 text-white hover:bg-green-700 active:scale-[0.98]' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Iniciar Desafio
          </button>
        </div>
      );
    }

    switch (activeTab) {
      case 'home':
        return <DailyChallenge 
          currentDay={currentDay} 
          completedDays={completedDays} 
          onComplete={markDayCompleted}
          setCurrentDay={(day) => updateUserData({ currentDay: day })}
          onRestart={restartChallenge}
        />;
      case 'progress':
        return <Progress />;
      case 'water':
        return <WaterTracker />;
      case 'notes':
        return <Notes />;
      case 'extras':
        return <Extras />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      {/* Sidebar for Desktop/Tablet */}
      {hasStarted && (
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden shadow-md flex items-center justify-center bg-white flex-shrink-0">
                <img src={logoImg} alt="Logo" className="w-full h-full object-cover scale-110" />
              </div>
              <h1 className="text-xl font-bold text-gray-800">Rotina Saudável</h1>
            </div>
            <button onClick={signOut} className="text-gray-500 hover:text-red-500 transition-colors" title="Sair">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex items-center gap-3 w-full p-3 rounded-xl transition-colors ${activeTab === 'home' ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Home className="w-5 h-5" />
              <span>Desafio</span>
            </button>
            <button
              onClick={() => setActiveTab('water')}
              className={`flex items-center gap-3 w-full p-3 rounded-xl transition-colors ${activeTab === 'water' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Droplets className="w-5 h-5" />
              <span>Água</span>
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`flex items-center gap-3 w-full p-3 rounded-xl transition-colors ${activeTab === 'progress' ? 'bg-purple-50 text-purple-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <TrendingUp className="w-5 h-5" />
              <span>Progresso</span>
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex items-center gap-3 w-full p-3 rounded-xl transition-colors ${activeTab === 'notes' ? 'bg-amber-50 text-amber-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <BookOpen className="w-5 h-5" />
              <span>Anotações</span>
            </button>
            <button
              onClick={() => setActiveTab('extras')}
              className={`flex items-center gap-3 w-full p-3 rounded-xl transition-colors ${activeTab === 'extras' ? 'bg-yellow-50 text-yellow-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Lightbulb className="w-5 h-5" />
              <span>Dicas Extras</span>
            </button>
          </nav>
        </aside>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Mobile Header */}
        <header className="md:hidden bg-white shadow-sm sticky top-0 z-10 flex-shrink-0">
          <div className="px-4 py-4 flex justify-between items-center">
            <div className="w-8 h-8 rounded-full overflow-hidden shadow-sm flex items-center justify-center bg-white flex-shrink-0">
              <img src={logoImg} alt="Logo" className="w-full h-full object-cover scale-110" />
            </div>
            <h1 className="text-xl font-bold text-gray-800 text-center">Rotina Saudável</h1>
            <button onClick={signOut} className="text-gray-500 hover:text-red-500 transition-colors" title="Sair">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto pb-20 md:pb-8">
          <div className="max-w-4xl mx-auto md:p-6">
            {renderContent()}
          </div>
        </main>

        {/* Bottom Nav for Mobile */}
        {hasStarted && (
          <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-200 pb-safe z-50">
            <div className="flex justify-between items-center h-16 px-2">
              <button
                onClick={() => setActiveTab('home')}
                className={`flex flex-col items-center justify-center w-full h-full ${activeTab === 'home' ? 'text-green-600' : 'text-gray-500'}`}
              >
                <Home className="w-6 h-6 mb-1" />
                <span className="text-[10px] font-medium">Desafio</span>
              </button>
              <button
                onClick={() => setActiveTab('water')}
                className={`flex flex-col items-center justify-center w-full h-full ${activeTab === 'water' ? 'text-blue-600' : 'text-gray-500'}`}
              >
                <Droplets className="w-6 h-6 mb-1" />
                <span className="text-[10px] font-medium">Água</span>
              </button>
              <button
                onClick={() => setActiveTab('progress')}
                className={`flex flex-col items-center justify-center w-full h-full ${activeTab === 'progress' ? 'text-purple-600' : 'text-gray-500'}`}
              >
                <TrendingUp className="w-6 h-6 mb-1" />
                <span className="text-[10px] font-medium">Progresso</span>
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`flex flex-col items-center justify-center w-full h-full ${activeTab === 'notes' ? 'text-amber-600' : 'text-gray-500'}`}
              >
                <BookOpen className="w-6 h-6 mb-1" />
                <span className="text-[10px] font-medium">Anotações</span>
              </button>
              <button
                onClick={() => setActiveTab('extras')}
                className={`flex flex-col items-center justify-center w-full h-full ${activeTab === 'extras' ? 'text-yellow-600' : 'text-gray-500'}`}
              >
                <Lightbulb className="w-6 h-6 mb-1" />
                <span className="text-[10px] font-medium">Dicas</span>
              </button>
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}
