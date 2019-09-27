import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import './style.scss';
import apiService from './../../../services/apiService';

export default function FormPage() {

  const [formType, setFormType] = useState();
  const [title, setTitle] = useState();

  useEffect(() => {
    switch (findGetParameter('type')) {
      case 'curso':
        setFormType('curso');
        setTitle('Cursos');
        break;
      case 'discente':
        setFormType('discente');
        setTitle('Discente');
        break;
      case 'docente':
        setFormType('docente');
        setTitle('Docentes');
        break;
      default:
        alert('Não foi possível identificar o tipo do formulário desejado');
        break;
    }

    async function getForm(formType) {
      console.log('getForm', formType)
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
    getForm(findGetParameter('type'));
  }, []);

  const findGetParameter = (parameterName) => {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
  }

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
      <h3>{title}</h3>
    </div>
  );
}
