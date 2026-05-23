import React, { useState } from 'react';
import data from './peopleData';

function PeopleList({ group, onOpen }) {
  const list = data[group] || [];
  return (
    <div className="peopleGrid" role="list">
      {list.map((p) => (
        <article
          key={p.id}
          className="person"
          role="listitem"
          tabIndex="0"
          onClick={() => onOpen(p)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onOpen(p);
          }}
        >
          <div className={p.img ? 'avatar avatar--photo' : 'avatar'} aria-hidden="true">
            {p.img ? (
              <img src={p.img} alt={`Foto de ${p.name}`} width="76" height="76" loading="lazy" decoding="async" />
            ) : (
              <span>{p.initials}</span>
            )}
          </div>
          <h3 className="person__name">{p.name}</h3>
        </article>
      ))}
    </div>
  );
}

function PersonModal({ person, onClose }) {
  if (!person) return null;
  return (
    <div className="projectCardOverlay" onClick={onClose}>
      <div className="projectCardModal" role="dialog" aria-modal="true" aria-label={`${person.name} — Currículo`} onClick={(e)=>e.stopPropagation()}>
        <button type="button" className="projectCard__close" onClick={onClose}>Fechar</button>
        <h4>{person.name}</h4>
        <div className="projectCard__section">
          <h5>Currículo</h5>
          <p>{person.curriculum}</p>
        </div>
      </div>
    </div>
  );
}

export default function PeopleApp({ group }) {
  const [selected, setSelected] = useState(null);
  return (
    <>
      <PeopleList group={group} onOpen={setSelected} />
      <PersonModal person={selected} onClose={() => setSelected(null)} />
    </>
  );
}
