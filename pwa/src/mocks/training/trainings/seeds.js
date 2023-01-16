import moment from 'moment';

export const perguntas = [
    {
        codigo: 1,
        tipo: 'star',
        titulo: 'Minha classificação geral para o treinamento/programa'
    },
    {
        codigo: 2,
        tipo: 'star',
        titulo: 'Quanto à contribuição do treinamento/programa para a melhoria do meu desempenho no trabalho'
    },
    {
        codigo: 3,
        tipo: 'star',
        titulo: 'Quanto à organização/estrutura do treinamento (processo de registro, cancelamento, convite, avaliação, sala, acomodação, material):'
    },
    {
        codigo: 4,
        tipo: 'star',
        titulo: 'Minha avaliação sobre o instrutor'
    },
    {
        codigo: 5,
        tipo: 'textArea',
        titulo: 'Descreva a sua avaliação'
    }
];

const treinamento = {
    id: { chave: 'Id açāo', valor: '12902' },
    nome: { chave: 'Nome', valor: 'Formação básica NR10' },
    tipo: { chave: 'Tipo', valor: 'presencial' },
    competencia: { chave: 'Competêcia', valor: 'técnica' },
    certificado: { chave: 'Certificado', valor: 'Sim' },
    reacao: { chave: 'Reaçāo', valor: 'Sim' },
    retencao: { chave: 'Retençāo', valor: 'Sim' },
    nota_minima: { chave: 'Nota mínima', valor: '5' },
    periodicidade: { chave: 'Periodicidade', valor: '12' },
    obrigatoriedade: { chave: 'Obrigatoriedade', valor: 'Sim' },
    motivo: {
        chave: 'Motivo',
        valor: 'Orci ultrices tellus pretium rhoncus. Eleifend vel, quis nisl donec aliquet bibendum tempus etiam phasellus. Neque feugiat sit venenatis nunc. Sagittis morbi enim convallis nunc, orci varius tincidunt. A egestas aenean fermentum cursus.'
    },
    necessario: {
        chave: 'Necessário',
        valor: 'Orci ultrices tellus pretium rhoncus. Eleifend vel, quis nisl donec aliquet bibendum tempus etiam phasellus. Neque feugiat sit venenatis nunc. Sagittis morbi enim convallis nunc, orci varius tincidunt. A egestas aenean fermentum cursus.'
    },
    perguntas,
    max_tentativas: 2
};

export const treinamentos = [
    {
        codigo: 1,
        ...treinamento,
        nota_minima: { chave: 'Nota mínima', valor: '2' }
    },
    {
        codigo: 2,
        ...treinamento,
        id: { chave: 'Id açāo', valor: '12903' },
        nome: { chave: 'Nome', valor: 'Trabalho em altura' },
        nota_minima: { chave: 'Nota mínima', valor: '7' }
    },
    {
        codigo: 3,
        ...treinamento,
        id: { chave: 'Id açāo', valor: '10102' },
        nome: { chave: 'Nome', valor: 'Game EHS' },
        nota_minima: { chave: 'Nota mínima', valor: '5' }
    },
    {
        codigo: 4,
        ...treinamento,
        id: { chave: 'Id açāo', valor: '14404' },
        nome: { chave: 'Nome', valor: 'ZHC' },
        nota_minima: { chave: 'Nota mínima', valor: '8' }
    },
    {
        codigo: 5,
        ...treinamento,
        id: { chave: 'Id açāo', valor: '12905' },
        nome: { chave: 'Nome', valor: 'Formação básica NY6' },
        nota_minima: { chave: 'Nota mínima', valor: '8' }
    },
    {
        codigo: 6,
        ...treinamento,
        id: { chave: 'Id açāo', valor: '12906' },
        nome: { chave: 'Nome', valor: 'Formação Vingadores' },
        nota_minima: { chave: 'Nota mínima', valor: '8' }
    },
    {
        codigo: 7,
        ...treinamento,
        id: { chave: 'Id açāo', valor: '12907' },
        nome: { chave: 'Nome', valor: 'Formação Liga da Justica' },
        nota_minima: { chave: 'Nota mínima', valor: '8' }
    }
];

const turma = {
    instrutor: { chave: 'Instrutor', valor: 'Fernando Luiz Santiago' },
    local: {
        chave: 'Local',
        valor: 'Av. dos Trabalhadores, 179 - Angra dos Reis, RJ'
    },
    data: {
        chave: 'Data',
        valor: moment(`2022-01-20`).add(1, 'M')
    },
    maximo_participantes: 20,
    participantes: [1, 2, 3]
};

export const turmas = [
    {
        codigo: 1,
        ...turma,
        treinamento: treinamentos[0]
    },
    {
        codigo: 2,
        ...turma,
        instrutor: { chave: 'Instrutor', valor: 'Mano Djow' },
        data: {
            chave: 'Data',
            valor: moment(`2022-01-21`).add(1, 'M')
        },
        treinamento: treinamentos[0]
    },
    {
        codigo: 3,
        ...turma,
        instrutor: { chave: 'Instrutor', valor: 'Bruce Wayne' },
        data: {
            chave: 'Data',
            valor: moment(`2022-01-22`).add(1, 'M')
        },
        treinamento: treinamentos[1]
    },
    {
        codigo: 4,
        ...turma,
        instrutor: { chave: 'Instrutor', valor: 'Bruce Wayne' },
        data: { chave: 'Data', valor: moment(`2021-12-22`) },
        treinamento: treinamentos[1]
    },
    {
        codigo: 5,
        ...turma,
        instrutor: { chave: 'Instrutor', valor: 'Tony Stark' },
        data: {
            chave: 'Data',
            valor: moment(`2022-01-25`).add(1, 'M')
        },
        treinamento: treinamentos[5]
    },
    {
        codigo: 6,
        ...turma,
        instrutor: { chave: 'Instrutor', valor: 'Tony Stark' },
        data: {
            chave: 'Data',
            valor: moment(`2022-01-26`).add(1, 'M')
        },
        treinamento: treinamentos[5]
    },
    {
        codigo: 7,
        ...turma,
        instrutor: { chave: 'Instrutor', valor: 'Clark Kent' },
        data: {
            chave: 'Data',
            valor: moment(`2022-01-26`).add(1, 'M')
        },
        treinamento: treinamentos[6]
    },
    {
        codigo: 8,
        ...turma,
        instrutor: { chave: 'Instrutor', valor: 'Clark Kent' },
        data: {
            chave: 'Data',
            valor: moment(`2022-01-20`)
        },
        treinamento: treinamentos[6]
    }
];

export const status = [
    { codigo: 1, label: 'Disponíveis' },
    { codigo: 2, label: 'Pendentes' },
    { codigo: 3, label: 'Realizados' },
    { codigo: 4, label: 'Cancelados' }
];

export const confirm = [
    { codigo: 1, label: 'AGUARDANDO' },
    { codigo: 2, label: 'CONFIRMADO' },
    { codigo: 3, label: 'NEGADO' }
];

export const colaborador = {
    treinamentos: [
        {
            codigo: 1,
            turma: turmas[0],
            status: status[1].codigo,
            nota: 0,
            confirmado: confirm[1].codigo,
            avaliacao: undefined,
            motivo: undefined,
            comprovar: false,
            comprovantes: []
        },
        {
            codigo: 2,
            turma: turmas[1],
            status: status[1].codigo,
            nota: 0,
            confirmado: confirm[0].codigo,
            avaliacao: undefined,
            motivo: undefined,
            comprovar: false,
            comprovantes: []
        },
        {
            codigo: 3,
            turma: turmas[2],
            status: status[2].codigo,
            nota: 3,
            confirmado: confirm[1].codigo,
            avaliacao: undefined,
            motivo: undefined,
            comprovar: false,
            comprovantes: []
        },
        {
            codigo: 4,
            turma: turmas[3],
            status: status[2].codigo,
            nota: 9,
            confirmado: confirm[1].codigo,
            avaliacao: undefined,
            motivo: undefined,
            comprovar: false,
            comprovantes: []
        },
        {
            codigo: 5,
            turma: turmas[4],
            status: status[3].codigo,
            nota: 0,
            confirmado: confirm[2].codigo,
            avaliacao: undefined,
            motivo: undefined,
            comprovar: false,
            comprovantes: []
        },
        {
            codigo: 6,
            turma: turmas[7],
            status: status[1].codigo,
            nota: 0,
            confirmado: confirm[1].codigo,
            avaliacao: undefined,
            motivo: undefined,
            comprovar: true,
            comprovantes: []
        }
    ]
};

export const disponiveis = [
    {
        status: status[0].codigo,
        nome: turmas[4].treinamento.nome.valor,
        turmas: [turmas[4], turmas[5]]
    },
    {
        status: status[0].codigo,
        nome: turmas[6].treinamento.nome.valor,
        turmas: [turmas[6]]
    }
];

export const result = [...colaborador.treinamentos, ...disponiveis];
