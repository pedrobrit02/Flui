import React, { useState, useEffect } from 'react';

function PeopleList({ members, onOpen }) {
  if (!members || members.length === 0) {
    return <p style={{ padding: '24px', color: 'var(--muted)' }}>Carregando equipe...</p>;
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
          img: window.getImageUrl(person.image_path),
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
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpen(base); }}
          >
            <div className={base.img ? 'avatar avatar--photo' : 'avatar'} aria-hidden="true">
              {base.img ? (
                <img src={base.img} alt={`Foto de ${base.name}`} width="76" height="76" loading="lazy" />
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
      <div className="projectCardModal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="projectCard__close" onClick={onClose}>Fechar</button>
        
        <h4>{person.name}</h4>
        <p style={{ color: 'var(--purple)', fontWeight: '600', marginBottom: '20px' }}>{person.role}</p>

        <div className="projectCard__section">
          <h5>Resumo</h5>
          <p>{person.curriculum}</p>
        </div>

        {/* Mapeamento dinâmico dos campos extras do seu JSONB */}
        {details && Object.keys(details).map((key) => (
          <div key={key} className="projectCard__section">
            <h5>{key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}</h5>
            {Array.isArray(details[key]) ? (
              <ul>
                {details[key].map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            ) : (
              <p>{details[key]}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PeopleApp({ type }) {
  const [members, setMembers] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    async function loadTeam() {
      try {
        const data = await window.api.getTeam(type);
        setMembers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erro ao carregar equipe:", err);
      }
    }
    loadTeam();
  }, [type]);

  return (
    <>
      <PeopleList members={members} onOpen={setSelected} />
      <PersonModal person={selected} onClose={() => setSelected(null)} />
    </>
  );
}