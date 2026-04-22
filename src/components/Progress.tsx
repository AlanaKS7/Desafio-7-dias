import { useState, useEffect } from 'react';
import { Camera, Scale, Ruler, Save, Trash2, History, ArrowDown, ArrowUp, Minus, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface MeasurementData {
  weight: string;
  waist: string;
  hips: string;
  notes: string;
}

interface CycleData {
  id: string;
  date: string;
  isHistory: boolean;
  before: MeasurementData;
  after: MeasurementData;
}

const defaultMeasurement: MeasurementData = { weight: '', waist: '', hips: '', notes: '' };

const renderDiff = (diff: number | null, unit: string) => {
  if (diff === null) return null;
  if (diff > 0) {
    return <span className="text-red-500 flex items-center justify-center text-xs font-bold"><ArrowUp className="w-3 h-3 mr-1"/> {diff.toFixed(1)} {unit}</span>;
  } else if (diff < 0) {
    return <span className="text-green-500 flex items-center justify-center text-xs font-bold"><ArrowDown className="w-3 h-3 mr-1"/> {Math.abs(diff).toFixed(1)} {unit}</span>;
  } else {
    return <span className="text-gray-500 flex items-center justify-center text-xs font-bold"><Minus className="w-3 h-3 mr-1"/> Sem alteração</span>;
  }
};

const MeasurementInput = ({ 
  label, 
  value, 
  onChange, 
  icon: Icon,
  placeholder
}: { 
  label: string; 
  value: string; 
  onChange: (val: string) => void;
  icon: any;
  placeholder: string;
}) => (
  <div className="mb-4">
    <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-10 w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm"
      />
    </div>
  </div>
);

export function Progress() {
  const { userData, updateUserData } = useAuth();
  const [currentCycle, setCurrentCycle] = useState<CycleData>({
    id: 'current',
    date: '',
    isHistory: false,
    before: { ...defaultMeasurement },
    after: { ...defaultMeasurement }
  });
  const [historyCycles, setHistoryCycles] = useState<CycleData[]>([]);
  const [saved, setSaved] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  useEffect(() => {
    if (userData?.measurements && userData.measurements.length > 0) {
      const firstItem = userData.measurements[0];
      if (firstItem.before !== undefined) {
        const current = userData.measurements.find((m: any) => !m.isHistory) || {
          id: 'current', date: '', isHistory: false, before: { ...defaultMeasurement }, after: { ...defaultMeasurement }
        };
        const history = userData.measurements.filter((m: any) => m.isHistory);
        setCurrentCycle(current);
        setHistoryCycles(history);
      } else {
        // Migrate old format
        const current = {
          id: 'current',
          date: '',
          isHistory: false,
          before: {
            weight: userData.measurements[0]?.weight || '',
            waist: userData.measurements[0]?.waist || '',
            hips: userData.measurements[0]?.hips || '',
            notes: userData.measurements[0]?.notes || ''
          },
          after: {
            weight: userData.measurements[1]?.weight || '',
            waist: userData.measurements[1]?.waist || '',
            hips: userData.measurements[1]?.hips || '',
            notes: userData.measurements[1]?.notes || ''
          }
        };
        setCurrentCycle(current);
        setHistoryCycles([]);
      }
    }
  }, [userData]);

  const handleSave = async () => {
    const dateStr = new Date().toLocaleDateString('pt-BR');
    const historyEntry: CycleData = {
      ...currentCycle,
      id: Date.now().toString(),
      date: dateStr,
      isHistory: true
    };
    
    const newHistory = [historyEntry, ...historyCycles];
    setHistoryCycles(newHistory);

    if (userData) {
      await updateUserData({ measurements: [currentCycle, ...newHistory] });
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const deleteHistoryEntry = async (id: string) => {
    const newHistory = historyCycles.filter(c => c.id !== id);
    setHistoryCycles(newHistory);
    setConfirmDeleteId(null);
    if (userData) {
      await updateUserData({ measurements: [currentCycle, ...newHistory] });
    }
  };

  const updateCurrent = (type: 'before' | 'after', field: keyof MeasurementData, value: string) => {
    setCurrentCycle(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value
      }
    }));
  };

  const calculateDiff = (beforeStr: string, afterStr: string) => {
    const before = parseFloat(beforeStr.replace(',', '.'));
    const after = parseFloat(afterStr.replace(',', '.'));
    if (isNaN(before) || isNaN(after)) return null;
    return after - before;
  };

  return (
    <div className="p-4 pb-24">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Seu Progresso</h2>
      </div>

      <div className="bg-purple-50 p-5 rounded-2xl mb-6 border border-purple-100 shadow-sm">
        <h3 className="font-bold text-purple-800 mb-3 leading-tight">Acompanhe sua evolução durante o desafio de forma simples, clara e organizada.</h3>
        
        <div className="text-sm text-purple-900 space-y-3">
          <p><strong>👉 Como funciona:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Registre suas medidas no início dos 7 dias</li>
            <li>Ao final do desafio, preencha novamente e clique em salvar</li>
          </ul>
          <p>O aplicativo irá guardar automaticamente seu histórico abaixo, mantendo registrado cada ciclo concluído.</p>

          <p><strong>🔄 Importante:</strong><br/>
          Toda vez que você clicar em "Salvar Medidas Atuais", um novo registro com a data de hoje será adicionado ao seu histórico abaixo.<br/>
          Ao refazer o desafio, <strong>altere somente as medidas do "Depois (Dia 7)"</strong>. Assim, o "Antes (Dia 1)" continua sendo seu ponto de partida original!</p>

          <p><strong>📈 O sistema calcula automaticamente a diferença</strong> entre o início e o final, mostrando seu progresso ao longo dos 7 dias.</p>

          <p><strong>📌 O que você pode acompanhar:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Peso</li>
            <li>Cintura</li>
            <li>Quadril</li>
          </ul>

          <div className="bg-white/60 p-3 rounded-xl border border-purple-100/50 mt-3">
            <p className="text-sm text-purple-800 italic font-medium">
              💡 Dica importante: Sempre realize as medições no mesmo horário (de preferência pela manhã) para garantir maior precisão.
            </p>
          </div>
          <p className="font-bold text-center mt-4 text-purple-800">Acompanhe, evolua e celebre cada conquista no seu processo!</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Antes */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <h3 className="font-bold text-gray-700 flex items-center gap-2 text-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-gray-400"></span>
            Antes (Dia 1)
          </h3>
          
          <MeasurementInput 
            label="Peso (kg)" 
            value={currentCycle.before.weight} 
            onChange={(v) => updateCurrent('before', 'weight', v)}
            icon={Scale}
            placeholder="Ex: 59"
          />
          <MeasurementInput 
            label="Cintura (cm)" 
            value={currentCycle.before.waist} 
            onChange={(v) => updateCurrent('before', 'waist', v)}
            icon={Ruler}
            placeholder="Ex: 50"
          />
          <MeasurementInput 
            label="Quadril (cm)" 
            value={currentCycle.before.hips} 
            onChange={(v) => updateCurrent('before', 'hips', v)}
            icon={Ruler}
            placeholder="Ex: 80"
          />
          
          <div className="mt-auto pt-4">
            <label className="block text-xs font-medium text-gray-500 mb-1">Observações Iniciais</label>
            <textarea
              value={currentCycle.before.notes}
              onChange={(e) => updateCurrent('before', 'notes', e.target.value)}
              placeholder="Como você se sente?"
              className="w-full p-2 border border-gray-200 rounded-lg text-xs min-h-[80px] focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Depois */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-purple-100 flex flex-col">
          <h3 className="font-bold text-purple-700 flex items-center gap-2 text-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            Depois (Dia 7)
          </h3>
          
          <MeasurementInput 
            label="Peso (kg)" 
            value={currentCycle.after.weight} 
            onChange={(v) => updateCurrent('after', 'weight', v)}
            icon={Scale}
            placeholder="Ex: 57"
          />
          <MeasurementInput 
            label="Cintura (cm)" 
            value={currentCycle.after.waist} 
            onChange={(v) => updateCurrent('after', 'waist', v)}
            icon={Ruler}
            placeholder="Ex: 50"
          />
          <MeasurementInput 
            label="Quadril (cm)" 
            value={currentCycle.after.hips} 
            onChange={(v) => updateCurrent('after', 'hips', v)}
            icon={Ruler}
            placeholder="Ex: 70"
          />
          
          <div className="mt-auto pt-4">
            <label className="block text-xs font-medium text-purple-500 mb-1">Observações Finais</label>
            <textarea
              value={currentCycle.after.notes}
              onChange={(e) => updateCurrent('after', 'notes', e.target.value)}
              placeholder="Como você se sente?"
              className="w-full p-2 border border-purple-200 rounded-lg text-xs min-h-[80px] focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100 mb-6">
        <h3 className="font-bold text-green-800 text-sm mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Seus Resultados (Diferença)
        </h3>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-green-50 p-2 rounded-lg">
            <p className="text-xs text-green-700 mb-1">Peso</p>
            {renderDiff(calculateDiff(currentCycle.before.weight, currentCycle.after.weight), 'kg') || <span className="text-xs text-gray-400">-</span>}
          </div>
          <div className="bg-green-50 p-2 rounded-lg">
            <p className="text-xs text-green-700 mb-1">Cintura</p>
            {renderDiff(calculateDiff(currentCycle.before.waist, currentCycle.after.waist), 'cm') || <span className="text-xs text-gray-400">-</span>}
          </div>
          <div className="bg-green-50 p-2 rounded-lg">
            <p className="text-xs text-green-700 mb-1">Quadril</p>
            {renderDiff(calculateDiff(currentCycle.before.hips, currentCycle.after.hips), 'cm') || <span className="text-xs text-gray-400">-</span>}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 mb-8">
        <button
          onClick={handleSave}
          className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-md hover:bg-purple-700 transition-colors"
        >
          <Save className="w-5 h-5" />
          {saved ? 'Salvo com sucesso!' : 'Salvar Medidas Atuais'}
        </button>
      </div>

      {historyCycles.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
            <History className="w-5 h-5 text-purple-600" />
            Histórico de Ciclos
          </h3>
          
          {historyCycles.map((cycle) => (
            <div key={cycle.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-100">
                <span className="font-bold text-gray-700 text-sm">Ciclo salvo em: {cycle.date}</span>
                {confirmDeleteId === cycle.id ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-red-500 font-medium">Excluir?</span>
                    <button onClick={() => deleteHistoryEntry(cycle.id)} className="text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded text-xs font-bold">Sim</button>
                    <button onClick={() => setConfirmDeleteId(null)} className="text-gray-600 bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-xs font-bold">Não</button>
                  </div>
                ) : (
                  <button onClick={() => setConfirmDeleteId(cycle.id)} className="text-gray-400 hover:text-red-500 p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-center mb-3">
                <div className="bg-gray-50 p-2 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Peso</p>
                  {renderDiff(calculateDiff(cycle.before.weight, cycle.after.weight), 'kg') || <span className="text-xs text-gray-400">-</span>}
                </div>
                <div className="bg-gray-50 p-2 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Cintura</p>
                  {renderDiff(calculateDiff(cycle.before.waist, cycle.after.waist), 'cm') || <span className="text-xs text-gray-400">-</span>}
                </div>
                <div className="bg-gray-50 p-2 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Quadril</p>
                  {renderDiff(calculateDiff(cycle.before.hips, cycle.after.hips), 'cm') || <span className="text-xs text-gray-400">-</span>}
                </div>
              </div>
              
              <div className="text-xs text-gray-600 space-y-2 bg-gray-50 p-3 rounded-lg">
                <div>
                  <p><strong>Antes:</strong> Peso: {cycle.before.weight || '-'} | Cintura: {cycle.before.waist || '-'} | Quadril: {cycle.before.hips || '-'}</p>
                  {cycle.before.notes && <p className="mt-1 italic text-gray-500">Obs Iniciais: {cycle.before.notes}</p>}
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <p><strong>Depois:</strong> Peso: {cycle.after.weight || '-'} | Cintura: {cycle.after.waist || '-'} | Quadril: {cycle.after.hips || '-'}</p>
                  {cycle.after.notes && <p className="mt-1 italic text-gray-500">Obs Finais: {cycle.after.notes}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
