export interface MealPlan {
  morning?: string;
  breakfast: string;
  lunch: string;
  afternoon: string;
  dinner: string;
  focus: string;
}

export interface DayData {
  day: number;
  title: string;
  verse: string;
  focus: string;
  tip: string;
  exercise: string;
  goal: string;
  mealPlan: MealPlan;
}

export const challengeData: DayData[] = [
  {
    day: 1,
    title: "Dia 1 - O Despertar",
    verse: '"Amado, oro para que você tenha boa saúde e tudo lhe corra bem, assim como vai bem a sua alma." (3 João 1:2)',
    focus: "Hidratação e Movimento Leve",
    tip: "Beba um copo de água assim que acordar para despertar seu metabolismo.",
    exercise: "15 minutos de caminhada leve ou alongamento matinal.",
    goal: "Beber pelo menos 2 litros de água ao longo do dia.",
    mealPlan: {
      morning: "Água com limão",
      breakfast: "Suco verde (couve + maçã + limão + gengibre)\n1 colher de chia",
      lunch: "Arroz integral\nFeijão\nSalada crua variada\nFígado acebolado (pequena porção)",
      afternoon: "Fruta",
      dinner: "Sopa de legumes leve",
      focus: "iniciar limpeza + reposição de ferro e B12"
    }
  },
  {
    day: 2,
    title: "Dia 2 - Nutrição da Alma e do Corpo",
    verse: '"Portanto, quer comais quer bebais, ou façais outra qualquer coisa, fazei tudo para glória de Deus." (1 Coríntios 10:31)',
    focus: "Alimentação Consciente",
    tip: "Inclua pelo menos uma porção de vegetais no almoço e no jantar.",
    exercise: "20 minutos de caminhada em ritmo moderado.",
    goal: "Evitar açúcar adicionado e doces hoje.",
    mealPlan: {
      breakfast: "Aveia com banana e canela",
      lunch: "Arroz integral\nLentilha\nSalada\nFrango grelhado",
      afternoon: "Castanhas",
      dinner: "Legumes + salada",
      focus: "saciedade e controle"
    }
  },
  {
    day: 3,
    title: "Dia 3 - Descanso e Recuperação",
    verse: '"Em paz me deito e logo pego no sono, porque, Senhor, só tu me fazes repousar seguro." (Salmos 4:8)',
    focus: "Qualidade do Sono",
    tip: "Desligue as telas (celular, TV) 1 hora antes de dormir.",
    exercise: "10 minutos de alongamento relaxante antes de deitar.",
    goal: "Dormir entre 7 e 8 horas esta noite.",
    mealPlan: {
      breakfast: "Smoothie (banana + aveia + leite vegetal)",
      lunch: "Batata doce\nSalada\nMoela cozida (rica em ferro e colágeno)",
      afternoon: "Fruta",
      dinner: "Creme de abóbora",
      focus: "reconstrução do organismo"
    }
  },
  {
    day: 4,
    title: "Dia 4 - Força e Resiliência",
    verse: '"Tudo posso naquele que me fortalece." (Filipenses 4:13)',
    focus: "Fortalecimento",
    tip: "Aumente a ingestão de proteínas magras nas suas refeições.",
    exercise: "15 minutos de exercícios com o peso do corpo (agachamentos, flexões na parede, prancha).",
    goal: "Fazer o exercício proposto sem pausas longas, respeitando seu limite.",
    mealPlan: {
      breakfast: "Frutas + linhaça",
      lunch: "Arroz integral\nLegumes\nPeixe grelhado",
      afternoon: "Chá + fruta",
      dinner: "Sopa leve",
      focus: "leveza digestiva"
    }
  },
  {
    day: 5,
    title: "Dia 5 - Mente Clara",
    verse: '"Não andem ansiosos por coisa alguma, mas em tudo, pela oração e súplicas, e com ação de graças, apresentem seus pedidos a Deus." (Filipenses 4:6)',
    focus: "Saúde Mental e Oração",
    tip: "Tire 10 minutos do seu dia para meditar ou orar em silêncio, longe de distrações.",
    exercise: "20 minutos de caminhada ao ar livre, observando a natureza.",
    goal: "Escrever 3 coisas pelas quais você é grato hoje.",
    mealPlan: {
      breakfast: "Tapioca com ovos",
      lunch: "Arroz integral\nFeijão\nSalada\nCarne bovina magra",
      afternoon: "Fruta",
      dinner: "Salada + proteína leve",
      focus: "energia e fortalecimento muscular"
    }
  },
  {
    day: 6,
    title: "Dia 6 - Energia e Alegria",
    verse: '"Alegrem-se sempre no Senhor. Novamente direi: Alegrem-se!" (Filipenses 4:4)',
    focus: "Movimento com Alegria",
    tip: "Coloque uma música que você gosta e dance, ou faça uma faxina animada na casa.",
    exercise: "20 minutos de atividade aeróbica (dança, corrida leve, pular corda ou bicicleta).",
    goal: "Suar um pouco e sorrir durante a atividade.",
    mealPlan: {
      breakfast: "Suco com gengibre + cúrcuma",
      lunch: "Quinoa\nLegumes\nFrango ou peixe",
      afternoon: "Chá calmante",
      dinner: "Sopa leve",
      focus: "reduzir inflamação"
    }
  },
  {
    day: 7,
    title: "Dia 7 - Celebração e Continuidade",
    verse: '"Estou plenamente certo de que aquele que começou boa obra em vós há de completá-la até ao Dia de Cristo Jesus." (Filipenses 1:6)',
    focus: "Reflexão e Planejamento",
    tip: "Planeje suas refeições e treinos para a próxima semana para manter o hábito.",
    exercise: "30 minutos de atividade livre, escolhendo algo que você goste (caminhada, dança, alongamento, etc.) ao longo da semana.\n\nCom o passar dos dias, aumente gradualmente o tempo até atingir 1 hora de atividade diária.\n\nApós alcançar esse tempo, mantenha essa rotina de forma contínua, mesmo ao reiniciar o desafio.\n\nE quando se sentir mais confiante, inclua a musculação para fortalecer o corpo e acelerar seus resultados.\n\n💡 Constância primeiro, intensidade depois.",
    goal: "Completar o desafio e registrar seu progresso final na aba de medidas.",
    mealPlan: {
      breakfast: "Frutas + aveia",
      lunch: "Prato completo natural\nFígado ou carne (pequena porção)",
      afternoon: "Castanhas",
      dinner: "Refeição leve",
      focus: "fechar ciclo com equilíbrio"
    }
  }
];
