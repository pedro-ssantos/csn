import React, { useEffect, useState } from 'react';
import { lighten, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import apiService from './../../../services/apiService';
import { Helmet } from 'react-helmet';
import LogDialog from './../../../components/LogDialog';
import TableForm from './../../../components/TableForm';
import './style.scss';

const BorderLinearProgress = withStyles({
  root: {
    height: 10,
  },
  bar: {
    borderRadius: 20,
  },
})(LinearProgress);


export default function FormPage() {

  const [formType, setFormType] = useState();
  const [title, setTitle] = useState();
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [logRows, setLogRows] = useState([]);
  const [logDialogOpened, setLogDialogOpened] = React.useState();

  const logDialogHandleOpen = async() => {
    try {
      const res = await apiService.request(
        'get',
        'formLog/5d926c8b5744e645d10dcc1d',
      );
      setLogRows(res.data);
      setLogDialogOpened(true);
    } catch (error) {
      alert('Erro ao buscar histórico de mudanças');
    }
  };

  const logDialogHandleClose = () => {
    setLogDialogOpened(false);
  };

  useEffect(() => {

    const period = findGetParameter('period')
    const type = findGetParameter('type')
    // console.log('period', period)
    // console.log('type', type)

    switch (type) {
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

    async function getForm() {
      let where = []
      if (period != null){
        where.push('period='+period)
      }
      if (type != null){
        where.push('type='+type)
      }
      try {
        const resForm = await apiService.request(
          'get',
          'form' + '?'+where.join('&'),
        );
        const formDb = resForm.data;
        setColumns(['Nome', 'Período', 'Preenchimento']);
        setRows(formDb.map(form => {
          return [form.id, form.nome, form.period,
          <BorderLinearProgress
          variant="determinate"
          color={form.percCompleted >= 60 ? "primary" : "secondary"}
          value={form.percCompleted}
        />]
        }));
      } catch (error) {
        alert('Formulário desconhecido');
      }
    }
    getForm();
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
      <h1>Formulários</h1>
      <h3>{title}</h3>
      <TableForm columns={columns} rows={rows} logDialogHandleOpen={logDialogHandleOpen} />
      <LogDialog open={logDialogOpened} rows={logRows} logDialogHandleOpen={logDialogHandleOpen} logDialogHandleClose={logDialogHandleClose} />
    </div>
  );
}
