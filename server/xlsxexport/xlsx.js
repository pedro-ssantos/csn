const xlsx = require('node-xlsx');
const fs = require('fs');

//apip/form/curso?period=2019&type=curso&fields=all
// http://127.0.0.1:3000/api/form/export?period=2019&type=curso&fields=all

module.exports.exportXlsx = forms => {
  // console.log(forms[0]['form']);


  //Cabeçalho da planilha

  const cursoDataHeader = [
    'Código do Curso e-MEC',
    'Nome Curso',
    'Nível acadêmico',
    'Grau acadêmico',
    'Atributo de ingresso',
    'Modalidade de ensino',
    'Curso com aluno vinculado',
    'Situação de funcionamento',
    'Tipo de oferta',
    'Curso teve aluno vinculado em 2019',
  ];

  const vagasDataHeader = [
    'Código do curso e-MEC',
    'Turno',
    'Prazo mínimo integralização',
    'Vagas novas oferecidas',
    'Vagas remanescentes oferecidas',
    'Vagas oferecidas de programas especiais',
    'Inscritos Vagas novas oferecidas',
    'Inscritos Vagas remanescentes oferecidas',
    'Inscritos Vagas oferecidas de programas especiais',
  ];

  const acessibilidadeDataheader = [
    'Código do curso e-MEC',
    'Curso garante condições de ensino-aprendizagem para pessoas com deficiência',
    'Material em braille',
    'Recursos de informática acessível',
    'Material pedagógico tátil',
    'Tradutor e intérprete de língua brasileira de sinais',
    'Material didático em língua brasileira de sinais',
    'Material didático em formato impresso acessível',
    'Material em áudio',
    'Material em formato impresso em caractere ampliado',
    'Recursos de acessibilidade à comunicação',
    'Guia intérprete',
    'Inserção da disciplina de língua brasileira de sinais no curso',
    'Material didático digital acessível',
  ];

  const laboratoriosDataheader = ['Código do curso e-MEC', 'Nome'];

  // Preparação das dados.

  // Informações do curso.
  let infoCursos = forms.map(form => {
    let cursoInfo = [];


    cursoInfo.push(form['form']['codigoeMec']);
    cursoInfo.push(form['form']['nome']);
    cursoInfo.push(form['form']['nivelAcademico']);
    cursoInfo.push(form['form']['grauAcademico']);
    cursoInfo.push(form['form']['atributoIngresso']);
    cursoInfo.push(form['form']['modalidadeEnsino']);
    cursoInfo.push(form['form']['alunoVinculado']);
    cursoInfo.push(form['form']['situacaoFuncionamento']);
    cursoInfo.push(form['form']['tipoOferta']);
    cursoInfo.push(form['form']['teveAlunoVinculado']);

    return cursoInfo;
  }, []);


  // Informações de Vagas

  let infoVagas = forms.map(form => {
    const turnos = Object.entries(form['form']['vagas']);
    
    let infoTurnos = turnos.map((turno) => {
      infoTurno = [];


      if (!turno[1]['status']) return null;

      infoTurno.push(form['form']['codigoeMec']);
      infoTurno.push(turno[0]);
      infoTurno.push(turno[1]['prazoMinimoIntregralizacao']);
      infoTurno.push(turno[1]['vagasNovas']);
      infoTurno.push(turno[1]['vagasRemanecentes']);
      infoTurno.push(turno[1]['vagasProgramasEspeciais']);
      infoTurno.push(turno[1]['inscritosVagasNovas']);
      infoTurno.push(turno[1]['inscritosVagasRemanecentes']);
      infoTurno.push(turno[1]['inscritosVagasProgramasEspeciais']);

      // console.log(infoTurno);
      return infoTurno;

    }, []);

    return infoTurnos;
  });

  let vagas = infoVagas.flat().filter(element => element != null)

  // Informações de Acessibilidade

  let infoAcessibility = forms.map(form => {
    let info = [];

    // console.log(form['form']['accessibilityResources']);

    if (form['form']['accessibilityResources']['possui'] && form['form']['accessibilityResources']['possui'] !== 'não'){

      info.push(form['form']['codigoeMec']);
      info.push(form['form']['accessibilityResources']['possui']);
      info.push(form['form']['accessibilityResources']['braile']);
      info.push(form['form']['accessibilityResources']['informaticaAcessivel']);
      info.push(form['form']['accessibilityResources']['materialTatil']);
      info.push(form['form']['accessibilityResources']['tradutorSinais']);
      info.push(form['form']['accessibilityResources']['materialSinais']);
      info.push(form['form']['accessibilityResources']['materialImpressoAcessivel']);
      info.push(form['form']['accessibilityResources']['materialAudio']);
      info.push(form['form']['accessibilityResources']['materialCaractereAmpliado']);
      info.push(form['form']['accessibilityResources']['recursoAcessComunicacao']);
      info.push(form['form']['accessibilityResources']['guiaInterprete']);
      info.push(form['form']['accessibilityResources']['insercaoDisciplinaSinais']);
      info.push(form['form']['accessibilityResources']['materialDigitalAcessivel']);
    }
    return info;
  }, []);



  // Informaçoes de Laboratório
  let infoLabs = forms.map(form => {
    return form['form']['laboratorios'].map(lab =>[ form['form']['codigoeMec'], lab]);
  }, []).flat();

  //console.log(infoLabs.flat());

  //Dados de test
  
  var buffer = xlsx.build([
    { name: 'Cursos', data: [cursoDataHeader, ...infoCursos] },
    { name: 'Vagas', data: [vagasDataHeader, ...vagas]},
    { name: 'Acessibilidade', data: [acessibilidadeDataheader, ...infoAcessibility] },
    { name: 'Laboratórios', data: [laboratoriosDataheader, ...infoLabs] },
  ]); // Returns a buffer

  
  fs.writeFile('test.xlsx', buffer, err => {
    if (err) throw err;
    console.log('Finalizado...');
  });
};

// module.export = exportXlsx;
// Cabeçalho das tabelas
