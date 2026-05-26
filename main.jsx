import './supabase.js'; 
import './Style.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import ProjectCard from './card.jsx';
import PeopleApp from './PeopleApp.jsx';

// ==========================================
// 1. CARROSSEL DE SERVIÇOS
// ==========================================
function ServicesCarousel() {
  const [services, setServices] = React.useState([]);

  React.useEffect(() => {
    async function loadServices() {
      try {
        const data = await window.api.getServices();
        setServices(Array.isArray(data) ? data : []);
        
        // A mágica: Inicializa o carrossel só depois que os dados estiverem na tela
        setTimeout(() => {
          if (window.initCarousel) window.initCarousel();
        }, 300); 
      } catch (err) {
        console.error("Erro ao carregar serviços:", err);
      }
    }
    if (window.api) loadServices();
  }, []);

  if (services.length === 0) {
    return <p style={{ padding: "24px", color: "var(--muted)" }}>Carregando tecnologias do laboratório...</p>;
  }

  return (
    <div className="cards">
      {services.map((service) => (
        <article key={service.id} className="card card--image">
          <label className="card-toggle">
            <input type="checkbox" className="card-toggle__input" />
            <img src={window.getImageUrl(service.image_path)} alt={service.title} className="card__image" />
            <div className="card__overlay">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          </label>
        </article>
      ))}
    </div>
  );
}

// ==========================================
// 2. SEÇÃO DE PROJETOS
// ==========================================
function ProjectsSection() {
  const [projects, setProjects] = React.useState([]);

  React.useEffect(() => {
    async function loadProjects() {
      try {
        const data = await window.api.getProjects();
        setProjects(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erro ao carregar projetos:", err);
      }
    }
    if (window.api) loadProjects();
  }, []);

  return (
    <div className="projects" aria-label="Projetos do FLUI">
      <h3 className="projects__title">Projetos em desenvolvimento</h3>
      <div className="projects__grid">
        {projects.map((proj) => (
          <ProjectCard key={proj.id} title={proj.title} intro={proj.body?.intro || proj.subtitle} sections={[]} />
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 3. INICIALIZAÇÃO
// ==========================================
const init = () => {
  if (!window.api) return;

  const servicesElement = document.getElementById("services-carousel-root");
  if (servicesElement) ReactDOM.createRoot(servicesElement).render(<ServicesCarousel />);

  const projectsElement = document.getElementById("projects-root");
  if (projectsElement) ReactDOM.createRoot(projectsElement).render(<ProjectsSection />);

  const docentesElement = document.getElementById("docentes-root");
  if (docentesElement) ReactDOM.createRoot(docentesElement).render(<PeopleApp type="docente" />);

  const alunosElement = document.getElementById("alunos-root");
  if (alunosElement) ReactDOM.createRoot(alunosElement).render(<PeopleApp type="bolsista" />);
};

// Garante que o React carregue quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}