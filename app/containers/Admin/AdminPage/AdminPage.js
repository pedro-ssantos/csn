import React from 'react';
import { Helmet } from 'react-helmet';

export default function AdminPage() {
  return (
    <div className="page">
      <Helmet>
        <title>Admin</title>
        <meta
          name="description"
          content="Admin"
        />
      </Helmet>
      <h1>Admin</h1>
      <ul>
        <li><a href="/admin/form?type=curso">Cursos</a></li>
        <li><a href="/admin/form?type=discente">Discentes</a></li>
        <li><a href="/admin/form?type=docente">Docentes</a></li>
      </ul>
    </div>
  );
}
