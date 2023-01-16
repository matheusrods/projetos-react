import moment from 'moment';

import { questionarios } from '../self-evaluation/seeds';
import { confirm, status, turmas } from '../trainings/seeds';

export const examTypes = ['treinamentos', 'competencias'];

export const competencias = [
    {
        codigo: 1,
        nome: 'Atendimento',
        status: status[1].codigo,
        respostas: [],
        data_inclusao: moment(),
        data_alteracao: moment(),
        questionario: questionarios[1],
        nota: 0,
        nota_minima: 2,
        realizado: false,
        tipo: examTypes[0]
    }
];

export const treinamentos = [
    {
        codigo: 2,
        turma: turmas[0],
        status: status[1].codigo,
        nota: 0,
        nota_minima: 2,
        confirmado: confirm[1].codigo,
        avaliacao: [
            { 1: 4 },
            { 2: 5 },
            { 3: 5 },
            { 4: 0 },
            { 5: 'O treinamento poderia ser melhor!' }
        ],
        motivo: undefined,
        comprovar: false,
        validade: moment().add(7, 'days'),
        realizado: false,
        comprovantes: [],
        respostas: [],
        questionario: questionarios[1],
        tentativas: 0,
        data_inclusao: moment(),
        data_alteracao: moment(),
        tipo: examTypes[0]
    },
    {
        codigo: 3,
        turma: turmas[0],
        status: status[1].codigo,
        nota: 0,
        nota_minima: 2,
        confirmado: confirm[1].codigo,
        avaliacao: [
            { 1: 4 },
            { 2: 5 },
            { 3: 5 },
            { 4: 0 },
            { 5: 'O treinamento poderia ser melhor!' }
        ],
        motivo: undefined,
        comprovar: false,
        validade: moment().add(7, 'days'),
        realizado: false,
        comprovantes: [],
        respostas: [],
        questionario: questionarios[2],
        tentativas: 0,
        data_inclusao: moment(),
        data_alteracao: moment(),
        tipo: examTypes[0]
    }
];

export const result = [...treinamentos, ...competencias];
