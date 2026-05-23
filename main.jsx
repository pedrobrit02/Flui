import React from 'react';
import { createRoot } from 'react-dom/client';
import PeopleApp from './PeopleApp.jsx';

function mount(id, group) {
  const el = document.getElementById(id);
  if (!el) return;
  const root = createRoot(el);
  root.render(<PeopleApp group={group} />);
}

mount('docentes-root', 'docentes');
mount('alunos-root', 'alunos');
