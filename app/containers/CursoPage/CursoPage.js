import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import './style.scss';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import CustomizedSnackbars from './../../components/CustomizedSnackbars';
import CursoForm from './CursoForm';
import ButtonsGroup from './ButtonsGroup';
import useForm from './Hooks.js';

const formDefault = {
  nome: '',
  codigoeMec: '',
  nivelAcademico: '',
  grauAcademico: '',
  atributoIngresso: '',
  modalidadeEnsino: '',
  alunoVinculado: '',
  situacaoFuncionamento: '',
  tipoOferta: '',
  teveAlunoVinculado: '',
  vagas: {},
  recursosAcessibilidade: {},
  laboratorios: [],
};

const useStyles = makeStyles({
  buttonsSteps: {
    padding: '10px 0 10px',
  },
  buttonStep: {
    marginRight: '10px',
  },
});

export default function CursoPage() {
  const classes = useStyles();
  const {
    form,
    updateField,
    save,
    nextStep,
    prevStep,
    isLast,
    handleChangeVagas,
    handleChangeLaboratorio,
    handleChangeRecursosAcessibilidade,
    canSee,
    canEdit,
    step,
    stepMax,
    dialogErrors,
    dialogErrorsOpen,
    setDialogErrorsOpen,
  } = useForm(formDefault);

  const [snackbar, setSnackbar] = useState(false);
  const resourcesOptions = [
    {
      name: 'braile',
      label: 'Material em braille',
      instrucoes:
        'Material didático com características de fonte, corpo, número de caracteres, entrelinhas, espaços entre as palavras e as letras, cor do papel e da tinta, opacidade do papel e das ilustrações que viabilizem sua utilização com autonomia por parte da pessoa com baixa visão.',
    },
    {
      name: 'informaticaAcessivel',
      label: 'Recursos de informática acessível',
      instrucoes:
        'Recursos que permitam adaptações com a finalidade de possibilitar a interação, no computador, de alunos com diferentes graus de comprometimento motor e/ou de comunicação e linguagem, em processos de ensino e aprendizagem. Exemplos: tela sensível ao toque, ou ao sopro, detector de ruídos, programas especiais de computador, etc.',
    },
    {
      name: 'materialTatil',
      label: 'Material pedagógico tátil',
      instrucoes:
        'Recursos pedagógicos que permitem ou facilitam o aprendizado de pessoas com deficiencia visual.',
    },
    {
      name: 'tradutorSinais',
      label: 'Tradutor e intérprete de língua brasileira de sinais',
      instrucoes:
        'Profissional especializado em serviços de tradução/ interpretação, que possam intermediar informações, com qualidade e profissionalismo, entre surdos e ouvintes.',
    },
    {
      name: 'materialSinais',
      label: 'Material didático em língua brasileira de sinais',
      instrucoes:
        'Material didático elaborado em língua brasileira de sinais para o ensino de surdos.',
    },
    {
      name: 'materialImpressoAcessivel',
      label: 'Material didático em formato impresso acessível',
      instrucoes:
        'Material didático com características de fonte, corpo, número de caracteres, entrelinhas, espaços entre as palavras e as letras, cor do papel e da tinta, opacidade do papel e das ilustrações que viabilizem sua utilização com autonomia por parte da pessoa com baixa visão.',
    },
    {
      name: 'materialAudio',
      label: 'Material em áudio',
      instrucoes:
        'Materiais gravados com voz humana em diferentes mídias que amplia às pessoas cegas e com baixa visão as possibilidades de acesso a diversos conteúdos. Exemplo: áudio livro.',
    },
    {
      name: 'materialCaractereAmpliado',
      label: 'Material em formato impresso em caractere ampliado',
      instrucoes:
        'Material impresso em caracteres maiores que o usual a fim de possibilitar o acesso a pessoas com deficiências visuais.',
    },
    {
      name: 'recursoAcessComunicacao',
      label: 'Recursos de acessibilidade à comunicação',
      instrucoes:
        'Compreendem recursos que possibilitem a eliminação de barreiras na disponibilidade de comunicação, tanto de conteúdo quanto de apresentação da informação, possibilitando que o aluno tenha acesso à informação e ao conhecimento, independentemente de sua limitação. Exemplo: acervo bibliográfico em formato acessível ao estudante com deficiência (caracteres em Braille ou em formatos alternativos),  tais como lupas, prancha de comunicação, presença de intérprete de Libras, softwares de leitura, teclado virtual, dentre outros.',
    },
    {
      name: 'guiaInterprete',
      label: 'Guia intérprete',
      instrucoes:
        'Profissional que domina diversas formas de comunicação utilizadas pelas pessoas com surdocegueira, podendo fazer interpretação ou transliteração.',
    },
    {
      name: 'insercaoDisciplinaSinais',
      label: 'Inserção da disciplina de língua brasileira de sinais no curso',
      instrucoes:
        'Oferecimento da matéria língua brasileira de sinais pelo curso.',
    },
    {
      name: 'materialDigitalAcessivel',
      label: 'Material didático digital acessível',
      instrucoes:
        'Compreende o uso de computador com programas e aplicativos que auxiliem o aluno no acesso ao material didático, bem como ao acervo bibliográfico referente ao projeto pedagógico do curso, tais como aplicações que leiam textos e utilizem sintetizadores de voz para o acesso aos conteúdos didáticos, bem como softwares de leitura para pessoas com baixa visão, teclado virtual, dentre outros.',
    },
  ];

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar(false);
  };

  return (
    <div className="page">
      <Helmet>
        <title>Curso</title>
        <meta
          name="description"
          content="Curso page of React.js Boilerplate application"
        />
      </Helmet>
      <h1>Curso</h1>

      <CursoForm
        step={step}
        form={form}
        updateField={updateField}
        nextStep={nextStep}
        canSee={canSee}
        canEdit={canEdit}
        handleChangeVagas={handleChangeVagas}
        resourcesOptions={resourcesOptions}
        handleChangeRecursosAcessibilidade={handleChangeRecursosAcessibilidade}
        handleChangeLaboratorio={handleChangeLaboratorio}
      />

      <div className={classes.buttonsSteps}>
        <ButtonsGroup
          prevStep={prevStep}
          nextStep={nextStep}
          step={step}
          stepMax={stepMax}
          save={save}
          isLast={isLast}
        />
      </div>

      <CustomizedSnackbars
        open={snackbar}
        message={'Informações gravadas com sucesso!'}
        variant="success"
        handleClose={handleSnackbarClose}
      />

      <Dialog
        open={dialogErrorsOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={'md'}
      >
        <DialogTitle id="alert-dialog-title">
          Ops... encontramos os seguintes erros:
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogErrors.map(error => (
              <div>{error}</div>
            ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDialogErrorsOpen(false)}
            color="primary"
            autoFocus
          >
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
