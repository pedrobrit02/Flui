import React from 'react';
import { createRoot } from 'react-dom/client';
import ProjectCard from './card.jsx';
import './supabaseClient.js'; // Import if needed for side effects

const projectData = {
  title: 'Conecta Ibirité',
  intro:
    'Rede inteligente para conectar estudantes às vagas de trabalho em Ibirité, usando IA para melhorar o matching e fortalecer a economia local.',
  sections: [
    {
      heading: 'Objetivo Geral',
      text: 'Identificar as habilidades técnicas e comportamentais prioritárias em Ibirité, garantindo o foco na capacitação para o setor de Comércio, que apresenta o maior saldo positivo de empregos. A plataforma digital consolida um fluxo de comunicação ágil entre empresas e estudantes.',
    },
    {
      heading: 'Missão',
      text: 'Conectar estudantes às oportunidades de trabalho em Ibirité, reduzindo assimetrias de informação e fortalecendo a economia local através da retenção de talentos.',
    },
    {
      heading: 'Inovação com IA',
      items: [
        'Motor de padronização semântica via LLM para extrair taxonomia de competências',
        'Interface de busca em linguagem natural para recrutadores',
        'Matching automático baseado em similaridade de tags',
        'Normalização de hard skills e soft skills',
      ],
    },
    {
      heading: 'Metodologia',
      items: [
        'Conexão Institucional com CDL e Prefeitura',
        'Diagnóstico via formulários eletrônicos',
        'Divulgação para 295 novas empresas registradas',
        'Análise de dados do mercado local',
        'Plataforma digital de matching',
      ],
    },
    {
      heading: 'Resultados Esperados',
      items: [
        'Mapeamento detalhado do mercado local',
        'Aumento da empregabilidade discente',
        'Redução de custos de recrutamento',
        'Alinhamento entre ensino e mercado',
        'Retenção de talentos e renda em Ibirité',
      ],
    },
    {
      heading: 'Parceiros',
      text: 'IFMG Campus Ibirité, Câmara de Dirigentes Lojistas (CDL), Prefeitura Municipal de Ibirité',
    },
  ],
};

const container = document.getElementById('project-card-root');
const root = createRoot(container);

root.render(<ProjectCard {...projectData} />);
