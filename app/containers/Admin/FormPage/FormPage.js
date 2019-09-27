import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import './style.scss';
import apiService from './../../../services/apiService';

export default function FormPage() {
  useEffect(() => {
    async function getForm() {
      try {
        const formPermissionId = window.location.pathname.split('/')[2];
        const resFormPermission = await apiService.request(
          'get',
          'formPermission/' + formPermissionId,
        );
        const resForm = await apiService.request(
          'get',
          'form/' + resFormPermission.data.formId,
        );
        const formDb = resForm.data;
        let formDefaultNew = JSON.parse(JSON.stringify(formDefault));
        formDefaultNew.nome = formDb.nome;
        setFormValues(formDefaultNew);
      } catch (error) {
        alert('Formulário desconhecido');
      }
    }
    // getForm();
  }, []);

  return (
    <div className="page">
      <Helmet>
        <title>Admin</title>
        <meta
          name="description"
          content="Forms"
        />
      </Helmet>
      <h1>Admin - Formulários</h1>
      <h3>Cursos</h3>
    </div>
  );
}
