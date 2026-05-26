import React, { useState, useEffect } from 'react';

function PeopleList({ members, onOpen }) {
  if (!members || members.length === 0) {
    return <p style={{ padding: '24px' }}>Nenhum membro encontrado.</p>;
  }

  return (
    <div className="peopleGrid" role="list">
      {members.map((member) => {
        const person = member.people;
        if (!person) return null;

        const base = {
          id: person.id,
          name: person.full_name,
          initials: (person.full_name || '')
            .split(' ')
            .slice(0, 2)
            .map((s) => s[0])
            .join(''),
          // Prevenção de erro caso image_path venha vazio
          img: person.image_path && window.getImageUrl ? window.getImageUrl(person.image_path) : null,
          role: person.role,
          curriculum: person.summary || '',
          details: person.details || {},
        };

        return (
          <article
            key={base.id}
            className="person"
            tabIndex="0"
            role="listitem"
            onClick={() => onOpen(base)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') onOpen(base);
            }}
          >
            <div
              className={base.img ? 'avatar avatar--photo' : 'avatar'}
              aria-hidden="true"
            >
              {base.img ? (
                <img
                  src={base.img}
                  alt={`Foto de ${base.name}`}
                  width="76"
                  height="76"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <span>{base.initials}</span>
              )}
            </div>
            <h3 className="person__name">{base.name}</h3>
          </article>
        );
      })}
    </div>
  );
}

function PersonModal({ person, onClose }) {
  if (!person) return null;

  const { details } = person;

  return (
    <div className="projectCardOverlay" onClick={onClose}>
      <div
        className="projectCardModal profileModal"
        role="dialog"
        aria-modal="true"
        aria-label={`${person.name} — Currículo`}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="projectCard__close" onClick={onClose}>
          Fechar
        </button>

        {/* Restaurando o cabeçalho bonitão com foto e resumo */}
        <div className="profileHeader">
          <div className="profileAvatar">
            {person.img ? (
              <img src={person.img} alt={person.name} width="96" height="96" />
            ) : (
              <span>{person.initials}</span>
            )}
          </div>
          <div className="profileMeta">
            <h4>{person.name}</h4>
            {person.role && <p className="person__role">{person.role}</p>}
            {person.curriculum && <p className="profileSummary">{person.curriculum}</p>}
          </div>
        </div>

        {/* Listando todas as seções dinamicamente se elas existirem no banco */}
        {details.about && (
          <div className="projectCard__section profileSection">
            <h5>Sobre este perfil</h5>
            <p>{details.about}</p>
          </div>
        )}

        {details.experience && (
          <div className="projectCard__section profileSection">
            <h5>Experiência e projetos</h5>
            <p>{details.experience}</p>
          </div>
        )}

        {details.competencies && details.competencies.length > 0 && (
          <div className="projectCard__section profileSection">
            <h5>Competências</h5>
            <div className="skillGrid">
              {details.competencies.map((skill) => (
                <span key={skill} className="profileBadge">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {details.expanded_tech_skills && details.expanded_tech_skills.length > 0 && (
          <div className="projectCard__section profileSection">
            <h5>Tecnologias Expandidas</h5>
            <div className="skillGrid">
              {details.expanded_tech_skills.map((skill) => (
                <span key={skill} className="profileBadge">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {details.education && details.education.length > 0 && (
          <div className="projectCard__section profileSection">
            <h5>Formação</h5>
            <ul>{details.education.map((edu) => <li key={edu}>{edu}</li>)}</ul>
          </div>
        )}

        {details.certifications && details.certifications.length > 0 && (
          <div className="projectCard__section profileSection">
            <h5>Certificações</h5>
            <ul>{details.certifications.map((cert) => <li key={cert}>{cert}</li>)}</ul>
          </div>
        )}

        {details.languages && details.languages.length > 0 && (
          <div className="projectCard__section profileSection">
            <h5>Idiomas</h5>
            <ul>{details.languages.map((lang) => <li key={lang}>{lang}</li>)}</ul>
          </div>
        )}

        {details.recognitions && details.recognitions.length > 0 && (
          <div className="projectCard__section profileSection">
            <h5>Reconhecimentos</h5>
            <ul>{details.recognitions.map((rec) => <li key={rec}>{rec}</li>)}</ul>
          </div>
        )}

        {details.events && details.events.length > 0 && (
          <div className="projectCard__section profileSection">
            <h5>Eventos</h5>
            <ul>{details.events.map((ev) => <li key={ev}>{ev}</li>)}</ul>
          </div>
        )}
      </div>
    </div>
  );
}

// Aceitando 'group' e 'type' para garantir que funcione não importa como o main.jsx chame
export default function PeopleApp({ group, type }) {
  const [members, setMembers] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    async function loadTeam() {
      // Usa group ou type (o que estiver preenchido no main.jsx)
      const filtro = group || type;
      if (window.api && window.api.getTeam && filtro) {
        try {
          const data = await window.api.getTeam(filtro);
          setMembers(data || []);
        } catch (err) {
          console.error(`Erro ao carregar equipe ${filtro}:`, err);
          setMembers([]);
        }
      }
    }
    loadTeam();
  }, [group, type]);

  return (
    <>
      <PeopleList members={members} onOpen={setSelected} />
      <PersonModal person={selected} onClose={() => setSelected(null)} />
    </>
  );
}