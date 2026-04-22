import { useState } from 'react';
import { Heart, Book, GraduationCap, Leaf, Bug, X, Moon, Copy, CheckCircle, QrCode } from 'lucide-react';
import QRCode from 'react-qr-code';
import { generatePixPayload } from '../lib/pix';

export function Extras() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyPix = () => {
    navigator.clipboard.writeText('4f9ce957-cf9a-4ebd-b031-2f43edfcc584');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const cards = [
    {
      id: 'apoie',
      title: 'Apoie o Aplicativo',
      icon: <Heart className="w-8 h-8 text-yellow-500" />,
      description: 'Ajude a manter este projeto vivo e gratuito para mais pessoas.',
      color: 'bg-yellow-50 border-yellow-200',
      textColor: 'text-yellow-800'
    },
    {
      id: 'desparasitacao',
      title: 'Desparasitação',
      icon: <Bug className="w-8 h-8 text-red-500" />,
      description: 'Protocolo completo, orientações sobre as fases da lua e suplementação.',
      color: 'bg-red-50 border-red-200',
      textColor: 'text-red-800'
    },
    {
      id: 'livros',
      title: 'Livros Recomendados',
      icon: <Book className="w-8 h-8 text-blue-500" />,
      description: 'Leituras essenciais para aprofundar seu conhecimento em saúde natural.',
      color: 'bg-blue-50 border-blue-200',
      textColor: 'text-blue-800'
    },
    {
      id: 'cursos',
      title: 'Cursos Completos',
      icon: <GraduationCap className="w-8 h-8 text-purple-500" />,
      description: 'Aprenda na prática como transformar seu estilo de vida.',
      color: 'bg-purple-50 border-purple-200',
      textColor: 'text-purple-800'
    },
    {
      id: 'produtos',
      title: 'Produtos Naturais',
      icon: <Leaf className="w-8 h-8 text-green-500" />,
      description: 'Recomendações de suplementos e produtos de qualidade.',
      color: 'bg-green-50 border-green-200',
      textColor: 'text-green-800'
    }
  ];

  return (
    <div className="p-4 pb-24">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Dicas Extras</h2>
        <p className="text-sm text-gray-600">Recursos para aprofundar sua jornada.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div 
            key={card.id} 
            onClick={() => setSelectedCard(card.id)}
            className={`p-6 rounded-2xl shadow-sm border ${card.color} flex items-start gap-4 cursor-pointer hover:shadow-md transition-shadow`}
          >
            <div className="p-3 bg-white rounded-xl shadow-sm flex-shrink-0">
              {card.icon}
            </div>
            <div>
              <h3 className={`font-bold text-lg mb-1 ${card.textColor}`}>{card.title}</h3>
              <p className="text-sm text-gray-700">{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Links */}
      <div className="mt-12 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-500">
        <button 
          onClick={() => setSelectedCard('privacidade')} 
          className="hover:text-gray-800 transition-colors underline"
        >
          Política de Privacidade
        </button>
        <span className="hidden sm:inline">•</span>
        <button 
          onClick={() => setSelectedCard('termos')} 
          className="hover:text-gray-800 transition-colors underline"
        >
          Termos de Uso e Responsabilidade
        </button>
      </div>

      {/* Modal Apoie o Aplicativo */}
      {selectedCard === 'apoie' && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl flex flex-col my-8">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold text-yellow-800 flex items-center gap-2">
                <Heart className="w-6 h-6" />
                APOIE O APLICATIVO
              </h2>
              <button 
                onClick={() => setSelectedCard(null)}
                className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6 text-gray-700 text-sm leading-relaxed text-center">
              <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-100">
                <h3 className="font-bold text-lg text-yellow-900 mb-2">
                  Gosta do app sem anúncios?
                </h3>
                <p className="text-yellow-800 mb-4">
                  Contribua via PIX para ajudar a manter este projeto vivo e gratuito para mais pessoas.
                </p>
                
                <div className="bg-white p-4 rounded-xl border border-yellow-200 mb-4 flex flex-col items-center justify-center">
                  <div className="bg-white p-2 rounded-lg border border-gray-100 mb-2">
                    <QRCode 
                      value={generatePixPayload('4f9ce957-cf9a-4ebd-b031-2f43edfcc584', 'Aks Aks', 'SAO PAULO')} 
                      size={160}
                      level="M"
                    />
                  </div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Escaneie o código QR</p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-yellow-200">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">Chave PIX (Copia e Cola)</p>
                  <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-100">
                    <code className="flex-1 text-xs text-gray-800 truncate font-mono">
                      4f9ce957-cf9a-4ebd-b031-2f43edfcc584
                    </code>
                    <button 
                      onClick={handleCopyPix}
                      className="p-2 bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200 transition-colors flex-shrink-0"
                      title="Copiar chave PIX"
                    >
                      {copied ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  {copied && <p className="text-xs text-green-600 mt-2 font-medium">Chave copiada com sucesso!</p>}
                </div>
                
                <p className="text-xs text-yellow-700 mt-4 font-medium">
                  Mercado Pago - AKS
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Desparasitação */}
      {selectedCard === 'desparasitacao' && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl flex flex-col my-8">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold text-red-800 flex items-center gap-2">
                <Bug className="w-6 h-6" />
                DESPARASITAÇÃO
              </h2>
              <button 
                onClick={() => setSelectedCard(null)}
                className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-5 md:p-6 space-y-6 text-gray-700 text-base leading-relaxed">
              <section>
                <h3 className="font-bold text-lg md:text-xl text-gray-900 mb-3">O que são parasitas?</h3>
                <p className="mb-4">
                  Parasita é um organismo que vive em ou sobre outro organismo, conhecido como hospedeiro, e obtém seus recursos, como nutrientes, em detrimento do hospedeiro. Existem muitos tipos de parasitas, desde bactérias até vermes e protozoários, que podem causar uma variedade de doenças em humanos e animais.
                </p>
                <p className="mb-4">
                  A presença de vermes gera complicações se a doença não for tratada. Cada tipo de parasita afeta o organismo de forma diferente. Os parasitas podem ser transmitidos de várias maneiras, como através da ingestão de água ou alimentos contaminados, (sempre higienize seus alimentos corretamente e use água filtrada ou fervida), picadas de insetos, carnes cruas ou mal passadas, etc.
                </p>
                <p className="bg-red-50 p-4 rounded-xl border border-red-100 text-red-800 font-medium text-sm md:text-base">
                  Observação: é importante manter uma boa higiene, ter cuidado com a procedência dos alimentos. Em caso de suspeita de infecção, busque ajuda médica é fundamental para um diagnóstico preciso e tratamento eficaz. Com cuidado e precaução, é possível prevenir e tratar infestações por parasitas, promovendo a saúde de todos.
                </p>
              </section>

              <section>
                <p className="mb-4">
                  A grande maioria deles são microscópicos e vivem dentro de células. Alguns maiores, vivem em alguns órgãos como: fígado, baço, estômago, músculos, pulmões, pele, rins, etc. Por isso você deve acrescentar ao tratamento o uso de argila verde com chá de cipó mil homens. Você vai preparar a pasta e colocar sobre fígado, baço, estômago, pâncreas, encapar com papel toalha ou enfaixar com insulfilm e vai deixar agir por 2 horas, depois retire tudo. Repita esse processo durante 30 dias seguidos. Fazer apenas a mistura do dia, não reutilizar mistura, então evite desperdício.
                </p>
              </section>

              <section>
                <p className="mb-4">
                  A primeira coisa que precisamos fazer para ter um melhor aproveitamento dos nutrientes de uma alimentação saudável e curativa é limpar o nosso organismo. E para garantir que o processo de desparasitação seja eficaz e beneficie ao máximo a saúde do corpo, é essencial desinflamar o corpo antes de iniciar a desparasitação, eliminando toxinas e reduzindo processos inflamatórios que possam dificultar a ação dos vermífugos.
                </p>
                <p className="bg-green-50 p-4 rounded-xl border border-green-100 text-green-800 text-sm md:text-base">
                  Seja chás, sucos detox, frutas, vegetais, (retire ovos, açúcar, glúten, bebidas alcoólicas, carnes vermelhas, comidas japonesas, enlatados e industrializados), deve ter uma alimentação equilibrada, rica em alimentos naturais e antioxidantes, além de uma boa hidratação e a prática regular de atividades físicas, compressas quentes e fria no fígado. Cuidar da saúde do corpo como um todo é fundamental para garantir a eficácia de qualquer procedimento terapêutico.
                </p>
              </section>

              <section>
                <h3 className="font-bold text-lg md:text-xl text-gray-900 mb-3">Existe uma lua específica para fazer desparasitação?</h3>
                <p className="mb-5">
                  Essa ideia ainda tem sido muito debatida, alguns profissionais indicam que a desparasitação seja iniciada no primeiro dia da lua nova, esse momento é quando os parasitas saem dos tecidos e vão até o intestino para acasalar e desovar. Então seria mais fácil e mais eficiente atingi-los e repetir na Lua Cheia, quando os ovos eclodem e elimina-los. Outros acreditam que não há influência. Coloquei 2 protocolos, você pode decidir qual usar, mas seja qual método você escolher, lembre-se de tomar os chás 1 semana antes de começar. Pesquise sobre o método da Hulda Clark.
                </p>
                
                <div className="flex justify-center gap-2 sm:gap-4 py-5 bg-gray-900 rounded-2xl mb-6">
                  <div className="text-center px-2">
                    <span className="text-4xl sm:text-5xl">🌒</span>
                    <p className="text-sm text-gray-300 mt-2 font-medium">Nova</p>
                  </div>
                  <div className="text-center px-2">
                    <span className="text-4xl sm:text-5xl">🌓</span>
                    <p className="text-sm text-gray-300 mt-2 font-medium">Crescente</p>
                  </div>
                  <div className="text-center px-2">
                    <span className="text-4xl sm:text-5xl">🌕</span>
                    <p className="text-sm text-gray-300 mt-2 font-medium">Cheia</p>
                  </div>
                  <div className="text-center px-2">
                    <span className="text-4xl sm:text-5xl">🌗</span>
                    <p className="text-sm text-gray-300 mt-2 font-medium">Minguante</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="font-bold text-lg md:text-xl text-gray-900 mb-4 text-center bg-gray-100 py-3 rounded-xl">Protocolo Vermífugo</h3>
                
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
                        <th className="p-4 border-b border-gray-200 font-bold">Medicação</th>
                        <th className="p-4 border-b border-gray-200 text-center font-bold">1ª Sem</th>
                        <th className="p-4 border-b border-gray-200 text-center font-bold">2ª Sem</th>
                        <th className="p-4 border-b border-gray-200 text-center font-bold">3ª Sem</th>
                        <th className="p-4 border-b border-gray-200 text-center font-bold">4ª Sem</th>
                        <th className="p-4 border-b border-gray-200 text-center font-bold">5ª Sem</th>
                        <th className="p-4 border-b border-gray-200 text-center font-bold">6ª Sem</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr>
                        <td className="p-4 border-b border-gray-200 font-bold bg-gray-50">
                          ALBENDAZOL<br/>
                          <span className="text-gray-500 font-normal text-sm">400mg</span>
                        </td>
                        <td className="p-4 border-b border-gray-200 text-center bg-blue-50">
                          1 comp/dia<br/>à noite (pós jantar)<br/><strong>3 dias corridos</strong>
                        </td>
                        <td className="p-4 border-b border-gray-200 text-center text-gray-400">-</td>
                        <td className="p-4 border-b border-gray-200 text-center text-gray-400">-</td>
                        <td className="p-4 border-b border-gray-200 text-center text-gray-400">-</td>
                        <td className="p-4 border-b border-gray-200 text-center text-gray-400">-</td>
                        <td className="p-4 border-b border-gray-200 text-center text-gray-400">-</td>
                      </tr>
                      <tr>
                        <td className="p-4 border-b border-gray-200 font-bold bg-gray-50">
                          SECNIDAZOL<br/>
                          <span className="text-gray-500 font-normal text-sm">1000mg</span>
                        </td>
                        <td className="p-4 border-b border-gray-200 text-center text-gray-400">-</td>
                        <td className="p-4 border-b border-gray-200 text-center bg-green-50">
                          2 comp/dia<br/>à noite (pós jantar)<br/><strong>2 dias corridos</strong>
                        </td>
                        <td className="p-4 border-b border-gray-200 text-center text-gray-400">-</td>
                        <td className="p-4 border-b border-gray-200 text-center text-gray-400">-</td>
                        <td className="p-4 border-b border-gray-200 text-center text-gray-400">-</td>
                        <td className="p-4 border-b border-gray-200 text-center text-gray-400">-</td>
                      </tr>
                      <tr>
                        <td className="p-4 border-b border-gray-200 font-bold bg-gray-50">
                          ASCARIDIL<br/>
                          <span className="text-gray-500 font-normal text-sm">150mg</span><br/>
                          <span className="text-sm text-gray-500 font-normal">(à noite - pós jantar)</span>
                        </td>
                        <td className="p-4 border-b border-gray-200 text-center text-gray-400">-</td>
                        <td className="p-4 border-b border-gray-200 text-center text-gray-400">-</td>
                        <td className="p-4 border-b border-gray-200 text-center bg-purple-50">
                          1 comp<br/><strong>1 dia</strong>
                        </td>
                        <td className="p-4 border-b border-gray-200 text-center bg-purple-50">
                          1 comp<br/><strong>1 dia</strong>
                        </td>
                        <td className="p-4 border-b border-gray-200 text-center bg-purple-50">
                          1 comp<br/><strong>1 dia</strong>
                        </td>
                        <td className="p-4 border-b border-gray-200 text-center bg-purple-50">
                          1 comp<br/><strong>1 dia</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="bg-amber-50 p-5 rounded-xl border border-amber-200">
                <h4 className="font-bold text-lg text-amber-900 mb-3">Avisos Importantes:</h4>
                <ul className="list-disc pl-5 space-y-3 text-amber-800 text-base">
                  <li>Na falta de ASCARIDIL pode substituir por <strong>IVERMECTINA 200mg</strong>.<br/>
                    <span className="text-sm block mt-1 opacity-80">30kg = 1 comprimido / 60kg = 2 comprimidos / 90kg = 3 comprimidos / +90kg = 4 comprimidos.</span>
                  </li>
                  <li>Olhe na bula das medicações se tiver qualquer dúvida.</li>
                  <li>Lembre-se que é necessário a mudança no estilo de vida, o cuidado com alimentação, com a água que você ingere. Lavagem adequada dos seus alimentos.</li>
                  <li>Faça desparasitação pelo menos 2x ao ano, junto de toda família.</li>
                </ul>
              </section>

              <section className="bg-blue-50 p-5 rounded-xl border border-blue-200">
                <h4 className="font-bold text-lg text-blue-900 mb-3">SUPLEMENTOS IMPORTANTES PARA USAR NO PÓS LIMPEZA INTESTINAL E DESPARASITAÇÃO</h4>
                <p className="text-blue-800 mb-4 text-base">
                  Para auxiliar na saúde intestinal e fortalecer o organismo, escolha apenas 1 tipo de probiótico para uso.
                </p>
                <p className="text-blue-900 font-bold mb-4 text-base">👉 Opções recomendadas:</p>
                
                <div className="space-y-4 mb-5">
                  <div className="bg-white p-5 rounded-xl border border-blue-100 shadow-sm">
                    <h5 className="font-bold text-blue-900 mb-2 text-base">Bifidobacterium Longum 10 bilhões</h5>
                    <a 
                      href="https://amzn.to/3PLxdln" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full sm:w-auto px-5 py-3 mt-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors text-sm"
                    >
                      🔘 Apoiar o intestino e imunidade
                    </a>
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-blue-100 shadow-sm">
                    <h5 className="font-bold text-blue-900 mb-2 text-base">Simfort 5 bilhões</h5>
                    <a 
                      href="https://amzn.to/3QgdnyJ" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full sm:w-auto px-5 py-3 mt-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors text-sm"
                    >
                      🔘 Equilíbrio da flora intestinal
                    </a>
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-blue-100 shadow-sm">
                    <h5 className="font-bold text-blue-900 mb-2 text-base">L. Rhamnosus 5 bilhões</h5>
                    <a 
                      href="https://amzn.to/4dYeCMP" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full sm:w-auto px-5 py-3 mt-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors text-sm"
                    >
                      🔘 Auxílio na digestão e imunidade
                    </a>
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-blue-100 shadow-sm">
                    <h5 className="font-bold text-blue-900 mb-2 text-base">Lactobacillus Reuteri 3 bilhões</h5>
                    <a 
                      href="https://amzn.to/4cqL2NZ" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full sm:w-auto px-5 py-3 mt-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors text-sm"
                    >
                      🔘 Saúde intestinal e bem-estar geral
                    </a>
                  </div>
                </div>

                <div className="bg-blue-100 p-4 rounded-xl border border-blue-200">
                  <p className="text-blue-900 font-medium text-base">
                    💡 <span className="font-bold">Dica importante:</span><br/>
                    Utilize apenas um por vez e observe como seu corpo responde.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}

      {/* Modal Produtos Naturais */}
      {selectedCard === 'produtos' && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl flex flex-col my-8">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold text-green-800 flex items-center gap-2">
                <Leaf className="w-6 h-6" />
                PRODUTOS NATURAIS
              </h2>
              <button 
                onClick={() => setSelectedCard(null)}
                className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6 text-gray-700 text-sm leading-relaxed">
              
              <section className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                <h3 className="font-bold text-lg text-blue-900 mb-2 flex items-center gap-2">
                  💊 Suplementos Naturais – Energia, Imunidade e Recuperação
                </h3>
                <p className="mb-2 text-blue-800">
                  Se você vive cansado, sem energia ou com a imunidade baixa, seu corpo pode estar precisando de nutrientes essenciais.
                </p>
                <p className="mb-2 text-blue-800">
                  Recupere sua disposição e fortaleça seu organismo de dentro para fora.
                </p>
                <p className="mb-4 font-medium text-blue-900">
                  ⚠️ Não espere os sintomas piorarem.
                </p>
                <a 
                  href="https://amzn.to/4tJbWaT" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
                >
                  🔘 Quero recuperar minha energia agora
                </a>
              </section>

              <section className="bg-green-50 p-5 rounded-xl border border-green-100">
                <h3 className="font-bold text-lg text-green-900 mb-2 flex items-center gap-2">
                  🥗 Alimentos Naturais – Mude sua Alimentação Hoje
                </h3>
                <p className="mb-2 text-green-800">
                  O que você come hoje define sua saúde amanhã.
                </p>
                <p className="mb-2 text-green-800">
                  Se você sente inchaço, cansaço ou falta de disposição, pode estar na sua alimentação.
                </p>
                <p className="mb-4 font-medium text-green-900">
                  Comece agora a trocar o que te prejudica por alimentos que realmente nutrem.
                </p>
                <a 
                  href="https://amzn.to/4scg8yz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors"
                >
                  🔘 Quero me alimentar melhor
                </a>
              </section>

              <section className="bg-amber-50 p-5 rounded-xl border border-amber-100">
                <h3 className="font-bold text-lg text-amber-900 mb-2 flex items-center gap-2">
                  🌱 Sementes Funcionais – Limpeza e Equilíbrio do Corpo
                </h3>
                <p className="mb-2 text-amber-800">
                  Seu intestino pode estar sobrecarregado… e isso afeta TUDO: energia, humor e até emagrecimento.
                </p>
                <p className="mb-2 text-amber-800">
                  Essas sementes ajudam na limpeza, digestão e funcionamento do organismo.
                </p>
                <p className="mb-4 font-medium text-amber-900">
                  💡 Pequena mudança, grande resultado.
                </p>
                <a 
                  href="https://amzn.to/4toLMtG" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-700 transition-colors"
                >
                  🔘 Quero melhorar meu intestino
                </a>
              </section>

              <section className="bg-emerald-50 p-5 rounded-xl border border-emerald-100">
                <h3 className="font-bold text-lg text-emerald-900 mb-2 flex items-center gap-2">
                  🌿 Orgânicos – Reduza Toxinas Agora
                </h3>
                <p className="mb-2 text-emerald-800">
                  Você pode estar consumindo toxinas sem perceber todos os dias.
                </p>
                <p className="mb-2 text-emerald-800">
                  Produtos orgânicos ajudam a reduzir essa carga e cuidar do seu corpo de forma mais pura.
                </p>
                <p className="mb-4 font-medium text-emerald-900">
                  👉 Menos química. Mais vida.
                </p>
                <a 
                  href="https://amzn.to/4c0MFlb" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  🔘 Quero uma vida mais limpa
                </a>
              </section>

              <section className="bg-orange-50 p-5 rounded-xl border border-orange-100">
                <h3 className="font-bold text-lg text-orange-900 mb-2 flex items-center gap-2">
                  🔥 Emagrecimento Natural – Ative seu Corpo
                </h3>
                <p className="mb-2 text-orange-800">
                  Se você está tentando emagrecer e não vê resultado, o problema pode estar no seu metabolismo.
                </p>
                <p className="mb-2 text-orange-800">
                  Esses produtos ajudam a acelerar o processo de forma natural.
                </p>
                <p className="mb-4 font-medium text-orange-900">
                  ⚠️ Não é milagre — é apoio para quem decide agir.
                </p>
                <a 
                  href="https://amzn.to/4ckle6Z" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-colors"
                >
                  🔘 Quero começar a emagrecer
                </a>
              </section>

              <section className="bg-rose-50 p-5 rounded-xl border border-rose-100">
                <h3 className="font-bold text-lg text-rose-900 mb-2 flex items-center gap-2">
                  🚫🍬 Sem Açúcar – Controle Vontade e Ansiedade
                </h3>
                <p className="mb-2 text-rose-800">
                  O açúcar pode estar sabotando sua saúde sem você perceber.
                </p>
                <p className="mb-2 text-rose-800">
                  Reduzir o consumo ajuda no controle da ansiedade, peso e energia.
                </p>
                <p className="mb-4 font-medium text-rose-900">
                  👉 Não é sobre cortar tudo, é sobre fazer escolhas melhores.
                </p>
                <a 
                  href="https://amzn.to/4s9yd08" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-700 transition-colors"
                >
                  🔘 Quero reduzir o açúcar
                </a>
              </section>

            </div>
          </div>
        </div>
      )}

      {/* Modal Livros Recomendados */}
      {selectedCard === 'livros' && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl flex flex-col my-8">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold text-blue-800 flex items-center gap-2">
                <Book className="w-6 h-6" />
                LIVROS RECOMENDADOS
              </h2>
              <button 
                onClick={() => setSelectedCard(null)}
                className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6 text-gray-700 text-sm leading-relaxed">
              
              <section className="bg-indigo-50 p-5 rounded-xl border border-indigo-100">
                <h3 className="font-bold text-lg text-indigo-900 mb-2 flex items-center gap-2">
                  🧠 Transforme sua Mente e seus Hábitos
                </h3>
                <p className="font-semibold text-indigo-800 mb-2">O Poder do Hábito – Charles Duhigg</p>
                <p className="mb-2 text-indigo-800">
                  Se você sente que tenta mudar e não consegue manter… o problema não é você, são seus hábitos.
                </p>
                <p className="mb-4 font-medium text-indigo-900">
                  Aprenda como reprogramar sua mente e criar uma rotina que realmente funciona.
                </p>
                <a 
                  href="https://chk.eduzz.com/1274645?a=42166919" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors"
                >
                  🔘 Quero mudar meus hábitos agora
                </a>
              </section>

              <section className="bg-orange-50 p-5 rounded-xl border border-orange-100">
                <h3 className="font-bold text-lg text-orange-900 mb-2 flex items-center gap-2">
                  🔥 Emagreça com Saúde de Forma Natural
                </h3>
                <p className="font-semibold text-orange-800 mb-2">Emagrecer com Saúde e Bem-Estar</p>
                <p className="mb-2 text-orange-800">
                  Cansado de tentar emagrecer e não ver resultado?
                </p>
                <p className="mb-4 font-medium text-orange-900">
                  Descubra um caminho simples, natural e sustentável para perder peso sem sofrimento.
                </p>
                <a 
                  href="https://chk.eduzz.com/983019?a=42166919" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-colors"
                >
                  🔘 Quero começar a emagrecer hoje
                </a>
              </section>

              <section className="bg-green-50 p-5 rounded-xl border border-green-100">
                <h3 className="font-bold text-lg text-green-900 mb-2 flex items-center gap-2">
                  🌱 O Poder dos Alimentos Vivos
                </h3>
                <p className="font-semibold text-green-800 mb-2">Brotos e Germinados – O Revolucionário Mundo dos Alimentos Vivos</p>
                <p className="mb-2 text-green-800">
                  Você pode estar deixando de consumir os alimentos mais poderosos que existem.
                </p>
                <p className="mb-4 font-medium text-green-900">
                  Aprenda como ativar nutrientes e transformar sua saúde com algo simples e acessível.
                </p>
                <a 
                  href="https://go.hotmart.com/H91969639H" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors"
                >
                  🔘 Quero melhorar minha alimentação
                </a>
              </section>

              <section className="bg-emerald-50 p-5 rounded-xl border border-emerald-100">
                <h3 className="font-bold text-lg text-emerald-900 mb-2 flex items-center gap-2">
                  🥗 Receitas Naturais que Curam o Corpo
                </h3>
                <p className="font-semibold text-emerald-800 mb-2">Saúde Nua e Crua: Receitas</p>
                <p className="mb-2 text-emerald-800">
                  Alimentos vivos que nutrem, desinflamam e restauram seu organismo.
                </p>
                <p className="mb-4 font-medium text-emerald-900">
                  Ideal para quem quer sair do básico e entrar em um nível mais avançado de saúde.
                </p>
                <a 
                  href="https://go.hotmart.com/S91971440A" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  🔘 Quero aprender receitas saudáveis
                </a>
              </section>

              <section className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                <h3 className="font-bold text-lg text-blue-900 mb-2 flex items-center gap-2">
                  💊 Guia Completo de Saúde e Suplementação
                </h3>
                <p className="font-semibold text-blue-800 mb-2">Apostila Ame Saúde + E-book Suplementos Poderosos</p>
                <p className="mb-2 text-blue-800">
                  Um material completo para quem quer entender de verdade como cuidar do corpo e usar suplementos com inteligência.
                </p>
                <p className="mb-4 font-medium text-blue-900">
                  👉 Tudo organizado em um passo a passo simples.
                </p>
                <a 
                  href="https://chk.eduzz.com/G92EXPXKWE" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
                >
                  🔘 Quero acesso completo
                </a>
              </section>

              <section className="bg-purple-50 p-5 rounded-xl border border-purple-100">
                <h3 className="font-bold text-lg text-purple-900 mb-2 flex items-center gap-2">
                  📚 Ver todos os livros recomendados
                </h3>
                <p className="mb-4 font-medium text-purple-900">
                  Conteúdos selecionados para acelerar sua transformação física e mental.
                </p>
                <a 
                  href="https://amzn.to/4bMllbr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-colors"
                >
                  🔘 Explorar livros agora
                </a>
              </section>

            </div>
          </div>
        </div>
      )}

      {/* Modal Cursos Completos */}
      {selectedCard === 'cursos' && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl flex flex-col my-8">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold text-purple-800 flex items-center gap-2">
                <GraduationCap className="w-6 h-6" />
                CURSOS COMPLETOS – TRANSFORMAÇÃO REAL
              </h2>
              <button 
                onClick={() => setSelectedCard(null)}
                className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6 text-gray-700 text-sm leading-relaxed">
              
              <section className="bg-orange-50 p-5 rounded-xl border border-orange-100">
                <h3 className="font-bold text-lg text-orange-900 mb-2 flex items-center gap-2">
                  🔥 Detox Profundo para Restaurar seu Corpo
                </h3>
                <p className="font-semibold text-orange-800 mb-2">Detox Plus – Restaurando a Máquina</p>
                <p className="mb-2 text-orange-800">
                  Seu corpo pode estar sobrecarregado, inflamado e travado… e você nem percebe.
                </p>
                <p className="mb-2 text-orange-800">
                  Esse método foi criado para limpar, desintoxicar e reativar seu organismo de dentro para fora.
                </p>
                <p className="mb-4 font-medium text-orange-900">
                  ⚠️ Se você sente cansaço, inchaço ou falta de energia, isso pode ser o que está faltando.
                </p>
                <a 
                  href="https://chk.eduzz.com/40Q32P8J0B" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-colors"
                >
                  🔘 Quero desintoxicar meu corpo agora
                </a>
              </section>

              <section className="bg-purple-50 p-5 rounded-xl border border-purple-100">
                <h3 className="font-bold text-lg text-purple-900 mb-2 flex items-center gap-2">
                  🧬 Método Completo de Restauração da Saúde
                </h3>
                <p className="font-semibold text-purple-800 mb-2">Curso Restaurando a Vida + Consulta Online</p>
                <p className="mb-2 text-purple-800">
                  Não é só informação… é acompanhamento + direcionamento.
                </p>
                <p className="mb-2 text-purple-800">
                  Ideal para quem precisa de um plano mais profundo e personalizado para restaurar a saúde.
                </p>
                <p className="mb-4 font-medium text-purple-900">
                  👉 Para quem quer resultado de verdade, não só tentar.
                </p>
                <a 
                  href="https://chk.eduzz.com/E9OO52AV9B" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-colors"
                >
                  🔘 Quero acompanhamento completo
                </a>
              </section>

              <section className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                <h3 className="font-bold text-lg text-blue-900 mb-2 flex items-center gap-2">
                  📅 Transforme sua Rotina em 21 Dias
                </h3>
                <p className="font-semibold text-blue-800 mb-2">Desafio Rotina Saudável – 21 Dias</p>
                <p className="mb-2 text-blue-800">
                  Se 7 dias já fazem diferença… imagine 21.
                </p>
                <p className="mb-2 text-blue-800">
                  Um passo a passo completo para mudar seus hábitos, melhorar sua alimentação e recuperar sua energia.
                </p>
                <p className="mb-4 font-medium text-blue-900">
                  💡 Perfeito para quem quer sair do básico e entrar no nível avançado.
                </p>
                <a 
                  href="https://chk.eduzz.com/R9JJND489X" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
                >
                  🔘 Quero transformar minha rotina
                </a>
              </section>

              <section className="bg-emerald-50 p-5 rounded-xl border border-emerald-100">
                <h3 className="font-bold text-lg text-emerald-900 mb-2 flex items-center gap-2">
                  💪 Treinos Online para Corpo Ativo e Saudável
                </h3>
                <p className="font-semibold text-emerald-800 mb-2">Jheyke Treinos Online</p>
                <p className="mb-2 text-emerald-800">
                  Sem desculpas, sem complicação.
                </p>
                <p className="mb-2 text-emerald-800">
                  Treinos práticos para fazer em casa e ativar seu corpo, melhorar sua disposição e acelerar resultados.
                </p>
                <p className="mb-4 font-medium text-emerald-900">
                  👉 Ideal para quem quer sair do sedentarismo e ganhar mais energia.
                </p>
                <a 
                  href="https://chk.eduzz.com/1264386?a=42166919" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  🔘 Quero começar a treinar agora
                </a>
              </section>

            </div>
          </div>
        </div>
      )}

      {/* Modal Política de Privacidade */}
      {selectedCard === 'privacidade' && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl flex flex-col my-8">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                🔒 Política de Privacidade
              </h2>
              <button 
                onClick={() => setSelectedCard(null)}
                className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4 text-gray-700 text-sm leading-relaxed">
              <p className="text-xs text-gray-500 mb-4">Última atualização: 03/04/2026</p>
              
              <p>
                Esta Política de Privacidade descreve como as informações são coletadas, utilizadas e protegidas em nossos aplicativos, sites e serviços digitais.
              </p>
              <p>
                Ao utilizar nossos serviços, você concorda com os termos desta política.
              </p>

              <h3 className="font-bold text-gray-900 mt-6 flex items-center gap-2">📌 1. Coleta de Informações</h3>
              <p>Podemos coletar informações fornecidas diretamente pelo usuário, como:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Nome ou identificação</li>
                <li>Dados inseridos manualmente (ex: informações de uso, preferências, progresso)</li>
                <li>Informações básicas de navegação</li>
              </ul>
              <p className="mt-2">Também podemos coletar dados automaticamente, como:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Tipo de dispositivo</li>
                <li>Sistema operacional</li>
                <li>Interações dentro do aplicativo ou site</li>
              </ul>

              <h3 className="font-bold text-gray-900 mt-6 flex items-center gap-2">📌 2. Uso das Informações</h3>
              <p>As informações coletadas são utilizadas para:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Melhorar a experiência do usuário</li>
                <li>Personalizar conteúdos e funcionalidades</li>
                <li>Exibir dados de progresso e desempenho</li>
                <li>Aperfeiçoar nossos serviços</li>
              </ul>

              <h3 className="font-bold text-gray-900 mt-6 flex items-center gap-2">📌 3. Armazenamento e Segurança</h3>
              <p>As informações podem ser armazenadas:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Localmente no dispositivo do usuário</li>
                <li>Em servidores seguros, quando aplicável</li>
              </ul>
              <p className="mt-2">Adotamos medidas de segurança para proteger os dados, porém não garantimos segurança absoluta.</p>

              <h3 className="font-bold text-gray-900 mt-6 flex items-center gap-2">📌 4. Compartilhamento de Informações</h3>
              <p>Não vendemos dados pessoais.</p>
              <p>As informações poderão ser compartilhadas apenas quando necessário para:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Cumprimento de obrigações legais</li>
                <li>Integração com serviços externos (quando utilizados pelo usuário)</li>
              </ul>

              <h3 className="font-bold text-gray-900 mt-6 flex items-center gap-2">📌 5. Links Externos</h3>
              <p>Nossos serviços podem conter links para sites de terceiros.</p>
              <p>Não nos responsabilizamos pelas políticas de privacidade ou conteúdos desses sites. Recomendamos que o usuário revise as políticas externas.</p>

              <h3 className="font-bold text-gray-900 mt-6 flex items-center gap-2">📌 6. Uso de Cookies e Tecnologias</h3>
              <p>Podemos utilizar cookies ou tecnologias semelhantes para:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Melhorar a navegação</li>
                <li>Analisar uso dos serviços</li>
                <li>Personalizar experiência</li>
              </ul>
              <p className="mt-2">O usuário pode gerenciar essas permissões no próprio dispositivo ou navegador.</p>

              <h3 className="font-bold text-gray-900 mt-6 flex items-center gap-2">📌 7. Responsabilidade do Usuário</h3>
              <p>O usuário é responsável pelas informações que insere nos serviços.</p>
              <p>Recomendamos não compartilhar dados sensíveis desnecessariamente.</p>

              <h3 className="font-bold text-gray-900 mt-6 flex items-center gap-2">📌 8. Finalidade Educativa (quando aplicável)</h3>
              <p>Alguns conteúdos podem ter caráter educativo e informativo.</p>
              <p>Eles não substituem orientação profissional, diagnóstico ou tratamento específico.</p>

              <h3 className="font-bold text-gray-900 mt-6 flex items-center gap-2">📌 9. Alterações nesta Política</h3>
              <p>Esta Política de Privacidade pode ser atualizada a qualquer momento.</p>
              <p>Recomendamos revisá-la periodicamente.</p>

              <h3 className="font-bold text-gray-900 mt-6 flex items-center gap-2">📌 10. Consentimento</h3>
              <p>Ao utilizar nossos serviços, o usuário declara estar ciente e de acordo com esta Política de Privacidade.</p>

              <h3 className="font-bold text-gray-900 mt-6 flex items-center gap-2">📌 11. Contato</h3>
              <p>Em caso de dúvidas, entre em contato:</p>
              <p className="font-medium text-blue-600">📧 aks2.goods@gmail.com</p>
            </div>
          </div>
        </div>
      )}

      {/* Modal Termos de Uso */}
      {selectedCard === 'termos' && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl flex flex-col my-8">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                ⚖️ Termos de Uso e Responsabilidade
              </h2>
              <button 
                onClick={() => setSelectedCard(null)}
                className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4 text-gray-700 text-sm leading-relaxed">
              <p className="text-xs text-gray-500 mb-4">Última atualização: 03/04/2026</p>
              
              <p>
                Ao acessar e utilizar nossos aplicativos, sites ou serviços digitais, você concorda com os presentes Termos de Uso e Responsabilidade. Caso não concorde, recomendamos não utilizar os serviços.
              </p>

              <h3 className="font-bold text-gray-900 mt-6 flex items-center gap-2">📌 1. Objeto</h3>
              <p>
                Este serviço tem como finalidade fornecer conteúdos, ferramentas e informações de caráter educativo, informativo e orientativo.
              </p>

              <h3 className="font-bold text-gray-900 mt-6 flex items-center gap-2">👤 2. Uso do Serviço</h3>
              <p>O usuário se compromete a:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Utilizar o serviço de forma ética e responsável</li>
                <li>Não utilizar o conteúdo para fins ilegais</li>
                <li>Não tentar violar a segurança ou funcionamento da plataforma</li>
              </ul>
              <p className="mt-2">O uso é pessoal, individual e intransferível.</p>

              <h3 className="font-bold text-gray-900 mt-6 flex items-center gap-2">⚠️ 3. Aviso de Responsabilidade</h3>
              <p>O conteúdo disponibilizado:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Não substitui orientação profissional</li>
                <li>Não constitui diagnóstico, tratamento ou prescrição</li>
                <li>Não garante resultados específicos</li>
              </ul>
              <p className="mt-2 font-medium">O usuário é o único responsável pelas decisões tomadas com base nas informações fornecidas.</p>

              <h3 className="font-bold text-gray-900 mt-6 flex items-center gap-2">🧠 4. Responsabilidade do Usuário</h3>
              <p>Ao utilizar este serviço, o usuário declara que:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Está ciente de suas condições físicas, emocionais e de saúde</li>
                <li>Aplicará as orientações por sua própria conta</li>
                <li>Respeitará seus limites pessoais</li>
              </ul>
              <p className="mt-2">Os resultados podem variar de pessoa para pessoa.</p>

              <h3 className="font-bold text-gray-900 mt-6 flex items-center gap-2">🔗 5. Links Externos e Afiliados</h3>
              <p>O serviço pode conter links para produtos, serviços e conteúdos de terceiros.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Não nos responsabilizamos por esses conteúdos</li>
                <li>Compras realizadas são de responsabilidade do usuário com o fornecedor</li>
                <li>Podemos receber comissões por indicações (links afiliados), sem custo adicional ao usuário</li>
              </ul>

              <h3 className="font-bold text-gray-900 mt-6 flex items-center gap-2">💰 6. Monetização</h3>
              <p>O serviço pode conter recomendações de produtos, cursos e materiais pagos.</p>
              <p>Essas recomendações têm caráter informativo e não constituem obrigação de compra.</p>

              <h3 className="font-bold text-gray-900 mt-6 flex items-center gap-2">🔒 7. Propriedade Intelectual</h3>
              <p>Todo o conteúdo disponibilizado é protegido por direitos autorais.</p>
              <p>É proibido:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Copiar, reproduzir ou distribuir sem autorização</li>
                <li>Utilizar o conteúdo para fins comerciais sem permissão</li>
              </ul>

              <h3 className="font-bold text-gray-900 mt-6 flex items-center gap-2">📱 8. Disponibilidade</h3>
              <p>O serviço pode sofrer:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Interrupções</li>
                <li>Atualizações</li>
                <li>Alterações</li>
              </ul>
              <p className="mt-2">Não garantimos funcionamento contínuo ou livre de erros.</p>

              <h3 className="font-bold text-gray-900 mt-6 flex items-center gap-2">🛡️ 9. Limitação de Responsabilidade</h3>
              <p>Em nenhuma hipótese seremos responsáveis por:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Decisões tomadas pelo usuário</li>
                <li>Danos diretos ou indiretos</li>
                <li>Resultados não alcançados</li>
              </ul>

              <h3 className="font-bold text-gray-900 mt-6 flex items-center gap-2">🔄 10. Alterações dos Termos</h3>
              <p>Os termos podem ser atualizados a qualquer momento.</p>
              <p>O uso contínuo após alterações implica na aceitação dos novos termos.</p>

              <h3 className="font-bold text-gray-900 mt-6 flex items-center gap-2">📩 11. Contato</h3>
              <p>Para dúvidas ou suporte:</p>
              <p className="font-medium text-blue-600">📧 aks2.goods@gmail.com</p>

              <h3 className="font-bold text-gray-900 mt-6 flex items-center gap-2">⚖️ 12. Legislação</h3>
              <p>Este Termo será regido pelas leis da República Federativa do Brasil.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
