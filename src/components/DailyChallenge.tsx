import { useState, useEffect } from 'react';
import { CheckCircle, Circle, ArrowRight, ArrowLeft, Target, Heart, Activity, Book, Utensils, Info, CheckSquare, Square } from 'lucide-react';
import { challengeData } from '../data/challengeData';
import { motion } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import familiaImg from '../assets/familia.jpg';
import desafioLogoImg from '../assets/desafio_logo.png';

interface DailyChallengeProps {
  currentDay: number;
  completedDays: number[];
  onComplete: (day: number) => void;
  setCurrentDay: (day: number) => void;
  onRestart: () => void;
}

const EIGHT_REMEDIES = [
  'Alimentação saudável',
  'Água',
  'Sol',
  'Ar puro',
  'Exercício',
  'Descanso',
  'Equilíbrio',
  'Espiritualidade'
];

export function DailyChallenge({ currentDay, completedDays, onComplete, setCurrentDay, onRestart }: DailyChallengeProps) {
  const { userData, updateUserData } = useAuth();
  const [note, setNote] = useState('');
  const [exerciseDone, setExerciseDone] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [remedies, setRemedies] = useState<Record<string, boolean>>({});

  const dayData = challengeData.find(d => d.day === currentDay) || challengeData[0];
  const isCompleted = completedDays.includes(currentDay);

  useEffect(() => {
    if (userData) {
      setNote(userData.notes?.[currentDay] || '');
      setExerciseDone(userData.exercises?.[currentDay] || false);
      setRemedies(userData.remedies?.[currentDay] || {});
    }
  }, [currentDay, userData]);

  useEffect(() => {
    if (completedDays.length === 7) {
      setShowFinalMessage(true);
    }
  }, [completedDays]);

  const handleSaveNote = async (text: string) => {
    setNote(text);
    if (userData) {
      await updateUserData({
        notes: { ...userData.notes, [currentDay]: text }
      });
    }
  };

  const handleExerciseToggle = async () => {
    const newState = !exerciseDone;
    setExerciseDone(newState);
    if (userData) {
      await updateUserData({
        exercises: { ...userData.exercises, [currentDay]: newState }
      });
    }
  };

  const handleRemedyToggle = async (remedy: string) => {
    const newRemedies = { ...remedies, [remedy]: !remedies[remedy] };
    setRemedies(newRemedies);
    if (userData) {
      await updateUserData({
        remedies: { ...userData.remedies, [currentDay]: newRemedies }
      });
    }
  };

  const handleComplete = () => {
    onComplete(currentDay);
  };

  const handleRestart = () => {
    setShowFinalMessage(false);
    onRestart();
  };

  if (showFinalMessage && currentDay === 7 && isCompleted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-4 pb-24 flex flex-col items-center min-h-[70vh]"
      >
        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-4 mt-8">
          <CheckCircle className="w-10 h-10 text-yellow-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Parabéns!</h2>
        <p className="text-center text-gray-700 mb-6 px-4">
          Você concluiu os 7 dias. Continue esse estilo de vida e colha os frutos da restauração.
        </p>

        <button 
          onClick={handleRestart}
          className="w-full max-w-sm py-4 rounded-xl font-bold text-lg shadow-md bg-green-600 text-white hover:bg-green-700 active:scale-[0.98] mb-8"
        >
          Reiniciar Desafio
        </button>

        <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-left">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Base do Programa – Prática Diária</h3>
          <p className="text-sm text-gray-600 mb-6 text-center">
            Ao reiniciar, você pode ir alterando o cardápio focado nestes princípios. Todos os dias você deve aplicar:
          </p>

          <div className="mb-6">
            <h4 className="font-bold text-orange-600 flex items-center gap-2 mb-2">
              <span>🍽️</span> ALIMENTAÇÃO SAUDÁVEL
            </h4>
            <div className="text-sm text-gray-700 space-y-2 pl-6">
              <p><strong>👉 O que significa na prática:</strong> Comer alimentos naturais e simples.</p>
              <p><strong>👉 Priorizar:</strong> Verduras, Legumes, Frutas, Grãos integrais. Incluir de forma equilibrada: Proteínas nutritivas (fígado, moela, ovos, peixe, carne magra).</p>
              <p><strong>👉 Evitar:</strong> Industrializados, Açúcar refinado, Excesso de sal, Gorduras artificiais.</p>
              <p><strong>👉 Como aplicar no dia a dia:</strong> Montar prato colorido (quanto mais cores, mais nutrientes), Comer devagar e com atenção, Não beber líquidos durante as refeições, Parar antes de sentir excesso.</p>
              <p><strong>👉 Objetivo:</strong> Nutrir, regenerar e fortalecer o corpo de dentro para fora.</p>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-blue-600 flex items-center gap-2 mb-2">
              <span>💧</span> ÁGUA
            </h4>
            <div className="text-sm text-gray-700 space-y-2 pl-6">
              <p><strong>👉 Beber quantidade ideal:</strong> Peso corporal x 45 ml.</p>
              <p><strong>👉 Dicas:</strong> Começar o dia com água, Beber entre as refeições, Evitar beber durante as refeições.</p>
              <p><strong>👉 Benefícios:</strong> Desintoxicação, Energia, Melhor funcionamento do organismo.</p>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-yellow-600 flex items-center gap-2 mb-2">
              <span>☀️</span> SOL
            </h4>
            <div className="text-sm text-gray-700 space-y-2 pl-6">
              <p><strong>👉 Exposição diária:</strong> 15 a 20 minutos.</p>
              <p><strong>👉 Preferência:</strong> Antes das 10h ou após 16h.</p>
              <p><strong>👉 Benefícios:</strong> Vitamina D, Fortalecimento da imunidade, Melhora do humor.</p>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-teal-600 flex items-center gap-2 mb-2">
              <span>🌬️</span> AR PURO
            </h4>
            <div className="text-sm text-gray-700 space-y-2 pl-6">
              <p><strong>👉 O que fazer:</strong> Abrir janelas, Respirar profundamente, Passar tempo ao ar livre.</p>
              <p><strong>👉 Benefícios:</strong> Oxigenação do corpo, Clareza mental, Redução do estresse.</p>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-red-500 flex items-center gap-2 mb-2">
              <span>🏃</span> EXERCÍCIO
            </h4>
            <div className="text-sm text-gray-700 space-y-2 pl-6">
              <p><strong>👉 Prática diária:</strong> Caminhada, Alongamento, Movimentação leve.</p>
              <p><strong>👉 Tempo:</strong> 15 a 30 minutos.</p>
              <p><strong>👉 Benefícios:</strong> Ativa circulação, Aumenta energia, Melhora disposição.</p>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-indigo-500 flex items-center gap-2 mb-2">
              <span>😴</span> DESCANSO
            </h4>
            <div className="text-sm text-gray-700 space-y-2 pl-6">
              <p><strong>👉 Priorizar:</strong> Dormir cedo, Criar rotina de sono.</p>
              <p><strong>👉 Evitar:</strong> Tela antes de dormir, Estímulos à noite.</p>
              <p><strong>👉 Benefícios:</strong> Regeneração celular, Equilíbrio mental, Recuperação do corpo.</p>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-purple-500 flex items-center gap-2 mb-2">
              <span>⚖️</span> EQUILÍBRIO (TEMPERANÇA)
            </h4>
            <div className="text-sm text-gray-700 space-y-2 pl-6">
              <p><strong>👉 Princípio:</strong> Tudo com moderação.</p>
              <p><strong>👉 Aplicação:</strong> Não exagerar, Evitar extremos, Ter disciplina com leveza.</p>
              <p><strong>👉 Benefício:</strong> Sustentabilidade dos hábitos.</p>
            </div>
          </div>

          <div className="mb-2">
            <h4 className="font-bold text-amber-500 flex items-center gap-2 mb-2">
              <span>🙏</span> ESPIRITUALIDADE
            </h4>
            <div className="text-sm text-gray-700 space-y-2 pl-6">
              <p><strong>👉 Prática diária:</strong> Oração, Gratidão, Leitura bíblica.</p>
              <p><strong>👉 Benefícios:</strong> Paz interior, Direção, Força emocional.</p>
            </div>
          </div>

        </div>
      </motion.div>
    );
  }

  return (
    <div className="p-4 md:p-0 pb-24 md:pb-8">
      {/* Progress Bar */}
      <div className="mb-8 max-w-2xl mx-auto">
        <div className="flex justify-between text-xs text-gray-500 mb-2 px-1">
          <span>Dia 1</span>
          <span>Dia 7</span>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5, 6, 7].map((day) => (
            <button
              key={day}
              onClick={() => setCurrentDay(day)}
              disabled={day > Math.max(...completedDays, 0) + 1 && day !== 1}
              className={`h-3 md:h-4 flex-1 rounded-full transition-colors ${
                completedDays.includes(day) 
                  ? 'bg-green-500' 
                  : day === currentDay 
                    ? 'bg-green-300' 
                    : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      <motion.div
        key={currentDay}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={() => setCurrentDay(Math.max(1, currentDay - 1))}
            disabled={currentDay === 1}
            className="p-3 bg-white rounded-full shadow-sm border border-gray-100 text-gray-400 disabled:opacity-30 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">{dayData.title}</h2>
          <button 
            onClick={() => setCurrentDay(Math.min(7, currentDay + 1))}
            disabled={currentDay === 7 || (!isCompleted && currentDay > Math.max(...completedDays, 0))}
            className="p-3 bg-white rounded-full shadow-sm border border-gray-100 text-gray-400 disabled:opacity-30 hover:bg-gray-50 transition-colors"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>

        {currentDay === 1 && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6 text-gray-700 text-base leading-relaxed text-center">
            <img src={desafioLogoImg} alt="Desafio Rotina Saudável" className="w-full max-w-sm mx-auto mb-6 object-contain" />
            <p className="mb-4 font-medium text-lg text-gray-800">Este é um app para você cuidar de si.</p>
            <p className="mb-4">
              Durante 7 dias, você vai aprender hábitos simples e naturais que ajudam a restaurar seu corpo, acalmar sua mente e fortalecer sua conexão com Deus.
            </p>
            <p className="mb-4">
              Não é sobre fazer tudo perfeito…<br/>
              É sobre começar e dar um passo por dia.
            </p>
            <p className="mb-4 font-medium text-green-700">
              Pequenas mudanças geram grandes resultados.
            </p>
            <p className="font-bold text-gray-800">
              🙏 Permita-se viver esse novo começo.
            </p>
          </div>
        )}

        {/* Verse */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-5 rounded-r-xl mb-6 shadow-sm">
          <Book className="w-6 h-6 text-blue-500 mb-3" />
          <p className="text-gray-700 italic text-base leading-relaxed">{dayData.verse}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Focus */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Target className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="font-bold text-lg text-gray-800">Foco do Dia</h3>
            </div>
            <p className="text-gray-600 text-base flex-1">{dayData.focus}</p>
          </div>

          {/* Tip */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-red-50 rounded-lg">
                <Heart className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="font-bold text-lg text-gray-800">Dica Saudável</h3>
            </div>
            <p className="text-gray-600 text-base flex-1">{dayData.tip}</p>
          </div>
        </div>

        {/* Meal Plan */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100 mb-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 bg-orange-50 rounded-lg">
              <Utensils className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="font-bold text-xl text-gray-800">Plano Alimentar</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base">
            {dayData.mealPlan.morning && (
              <div className="bg-orange-50/50 p-4 rounded-xl">
                <span className="font-bold text-orange-800 block mb-1">🌅 Manhã</span>
                <span className="text-gray-700">{dayData.mealPlan.morning}</span>
              </div>
            )}
            <div className="bg-orange-50/50 p-4 rounded-xl">
              <span className="font-bold text-orange-800 block mb-1">🥤 Café da manhã</span>
              <span className="text-gray-700 whitespace-pre-line">{dayData.mealPlan.breakfast}</span>
            </div>
            <div className="bg-orange-50/50 p-4 rounded-xl">
              <span className="font-bold text-orange-800 block mb-1">🍽️ Almoço</span>
              <span className="text-gray-700 whitespace-pre-line">{dayData.mealPlan.lunch}</span>
            </div>
            <div className="bg-orange-50/50 p-4 rounded-xl">
              <span className="font-bold text-orange-800 block mb-1">☕ Tarde</span>
              <span className="text-gray-700 whitespace-pre-line">{dayData.mealPlan.afternoon}</span>
            </div>
            <div className="bg-orange-50/50 p-4 rounded-xl md:col-span-2">
              <span className="font-bold text-orange-800 block mb-1">🌙 Jantar</span>
              <span className="text-gray-700 whitespace-pre-line">{dayData.mealPlan.dinner}</span>
            </div>
            <div className="pt-4 mt-2 border-t border-orange-100 md:col-span-2">
              <span className="font-bold text-orange-800 block mb-1">💡 Foco Nutricional</span>
              <span className="text-gray-700 italic">{dayData.mealPlan.focus}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Important Info */}
          <div className="bg-amber-50 p-5 rounded-2xl shadow-sm border border-amber-200 flex flex-col h-full">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 bg-amber-100 rounded-lg flex-shrink-0">
                <Info className="w-6 h-6 text-amber-700" />
              </div>
              <div>
                <h3 className="font-bold text-amber-900 text-lg">ORIENTAÇÃO IMPORTANTE</h3>
                <p className="text-sm text-amber-800 font-medium mb-1">Diferencial do Método</p>
              </div>
            </div>
            <div className="text-sm text-amber-900 space-y-3 flex-1">
              <p><strong>👉 Fígado e moela:</strong> Usar 2 a 3 vezes na semana. Pequenas quantidades (100 a 150g). Sempre bem preparados.</p>
              <p><strong>👉 Benefícios:</strong> Rico em ferro (combate anemia), altíssimo em vitamina B12, fortalece sangue e energia.</p>
            </div>
          </div>

          {/* Exercise */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-50 rounded-lg">
                <Activity className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="font-bold text-lg text-gray-800">Exercício Simples</h3>
            </div>
            <p className="text-gray-600 text-base mb-6 whitespace-pre-line flex-1">{dayData.exercise}</p>
            <button
              onClick={handleExerciseToggle}
              className={`flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold transition-colors ${
                exerciseDone 
                  ? 'bg-orange-100 text-orange-700 border border-orange-200' 
                  : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              {exerciseDone ? <CheckCircle className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
              {exerciseDone ? 'Exercício Concluído' : 'Marcar Exercício'}
            </button>
          </div>
        </div>

        {/* 8 Remedies Checklist */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-teal-100 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-teal-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-teal-500" />
            </div>
            <h3 className="font-bold text-xl text-gray-800">Os 8 Remédios Naturais</h3>
          </div>
          <p className="text-sm text-gray-500 mb-4">Checklist diário para uma restauração completa:</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {EIGHT_REMEDIES.map((remedy) => (
              <button
                key={remedy}
                onClick={() => handleRemedyToggle(remedy)}
                className={`flex items-center gap-3 p-4 rounded-xl text-base text-left transition-colors ${
                  remedies[remedy] 
                    ? 'bg-teal-50 text-teal-700 font-bold border border-teal-200' 
                    : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {remedies[remedy] ? (
                  <CheckSquare className="w-5 h-5 text-teal-500 flex-shrink-0" />
                ) : (
                  <Square className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
                <span className="truncate">{remedy}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="mb-8">
          <label className="block text-lg font-bold text-gray-800 mb-3">
            Como foi o seu dia? (Anotações)
          </label>
          <textarea
            value={note}
            onChange={(e) => handleSaveNote(e.target.value)}
            placeholder="Escreva aqui sobre seu progresso, dificuldades e vitórias de hoje..."
            className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none min-h-[120px] text-base text-gray-700 resize-y"
          />
        </div>

        {/* Complete Button */}
        <button
          onClick={handleComplete}
          disabled={isCompleted}
          className={`w-full py-5 rounded-2xl font-bold text-xl shadow-lg transition-all ${
            isCompleted
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700 active:scale-[0.98]'
          }`}
        >
          {isCompleted ? 'Dia Concluído ✅' : 'Marcar Dia como Concluído'}
        </button>
      </motion.div>
    </div>
  );
}
