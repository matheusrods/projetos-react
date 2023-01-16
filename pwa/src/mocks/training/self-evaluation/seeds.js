import moment from 'moment';
import _ from 'lodash';

export const competencias = [
    { codigo: 1, nome: 'Atendimento' },
    { codigo: 2, nome: 'Gestāo' },
    { codigo: 3, nome: 'Relacionamento' },
    { codigo: 4, nome: 'Análise de eficácia Treinamento Excel' }
];

export const questionarios = [
    {
        codigo: 1,
        codigo_competencia: 1,
        nome: 'Atendimento',
        questoes: [
            {
                codigo: 1,
                pergunta:
                    'Capacidade de se expressar de forma clara, precisa e objetiva',
                tipo: 'PICK',
                respostas: [
                    { codigo: 1, nome: 'Sim' },
                    { codigo: 0, nome: 'Não' },
                    { codigo: 3, nome: 'Não se aplica' }
                ],
                dica: 'Lorem ipsum dolor sit amet'
            },
            {
                codigo: 2,
                pergunta:
                    'Habilidade para ouvir, processar e compreender o contexto da mensagem',
                tipo: 'RADIO',
                respostas: [
                    { codigo: 1, nome: 'Não tenho conhecimento' },
                    { codigo: 2, nome: 'Básico' },
                    { codigo: 3, nome: 'Intermediário' },
                    { codigo: 4, nome: 'Expert' }
                ],
                dica: undefined
            },
            {
                codigo: 3,
                pergunta:
                    'Argumentar com coerencia, usando feedback de forma adequada, facilitando interação entre as partes',
                tipo: 'SLIDER',
                respostas: [
                    { codigo: 0, nome: 0 },
                    { codigo: 1, nome: 1 },
                    { codigo: 2, nome: 2 },
                    { codigo: 3, nome: 3 },
                    { codigo: 4, nome: 4 },
                    { codigo: 5, nome: 5 }
                ],
                dica: 'Lorem ipsum dolor sit amet'
            }
        ],
        data_inclusao: moment(),
        data_alteracao: moment()
    },
    {
        codigo: 2,
        codigo_competencia: 2,
        nome: 'Gestāo',
        questoes: [
            {
                codigo: 1,
                pergunta:
                    'Capacidade de se expressar de forma clara, precisa e objetiva',
                tipo: 'PICK',
                respostas: [
                    { codigo: 1, nome: 'Sim' },
                    { codigo: 0, nome: 'Não' },
                    { codigo: 3, nome: 'Não se aplica' }
                ],
                dica: 'Lorem ipsum dolor sit amet'
            },
            {
                codigo: 2,
                pergunta:
                    'Habilidade para ouvir, processar e compreender o contexto da mensagem',
                tipo: 'RADIO',
                respostas: [
                    { codigo: 1, nome: 'Não tenho conhecimento' },
                    { codigo: 2, nome: 'Básico' },
                    { codigo: 3, nome: 'Intermediário' },
                    { codigo: 4, nome: 'Expert' }
                ],
                dica: undefined
            },
            {
                codigo: 3,
                pergunta:
                    'Argumentar com coerencia, usando feedback de forma adequada, facilitando interação entre as partes',
                tipo: 'SLIDER',
                respostas: 5,
                dica: 'Lorem ipsum dolor sit amet'
            }
        ],
        data_inclusao: moment(),
        data_alteracao: moment()
    },
    {
        codigo: 3,
        codigo_competencia: 4,
        nome: 'Análise de eficácia Treinamento Excel',
        questoes: [
            {
                codigo: 1,
                pergunta:
                    'Com relação às células A3, D3, E3 e N3, qual é a única afirmação verdadeira?',
                tipo: 'RADIO',
                respostas: [
                    {
                        codigo: 1,
                        nome: 'Todas as células estão próximas umas das outras'
                    },
                    {
                        codigo: 2,
                        nome: 'Todas as células fazem parte da mesma linha'
                    },
                    {
                        codigo: 3,
                        nome: 'Todas as células fazem parte da mesma coluna'
                    },
                    {
                        codigo: 4,
                        nome: 'Todas as nomenclaturas representam a mesma célula'
                    }
                ],
                dica: undefined,
                resposta: 1
            },
            {
                codigo: 2,
                pergunta:
                    'Qual é a utilidade da ferramenta Pincel de formatação?',
                tipo: 'RADIO',
                respostas: [
                    {
                        codigo: 1,
                        nome: 'Aplicar cor de preenchimento à uma célula ou intervalo selecionado'
                    },
                    {
                        codigo: 2,
                        nome: 'Realizar a cópia de uma planilha para outra pasta de trabalho'
                    },
                    {
                        codigo: 3,
                        nome: 'Copiar o conteúdo de texto de uma célula ou intervalo e aplicá-lo em outra célula ou intervalo'
                    },
                    {
                        codigo: 4,
                        nome: 'Copiar a formatação de uma célula ou intervalo e aplicá-la em outra célula ou intervalo'
                    }
                ],
                dica: undefined,
                resposta: 1
            },
            {
                codigo: 3,
                pergunta:
                    'Qual destas opções pode salvar como tipo de arquivos de Excel? ',
                tipo: 'RADIO',
                respostas: [
                    {
                        codigo: 1,
                        nome: 'XML, XLSX, TXT'
                    },
                    {
                        codigo: 2,
                        nome: 'XLS, PDF, CSV'
                    },
                    {
                        codigo: 3,
                        nome: 'XLSX, DOC, HTM'
                    }
                ],
                resposta: 2,
                dica: undefined
            }
        ]
    }
];

export const avaliacoes = [
    {
        codigo: 1,
        nome: 'Atendimento',
        status: 'PENDENTE',
        respostas: [],
        data_inclusao: moment(),
        data_alteracao: moment(),
        questionario: questionarios[0]
    },
    {
        codigo: 2,
        nome: 'Gestāo',
        status: 'PENDENTE',
        respostas: [],
        data_inclusao: moment(),
        data_alteracao: moment(),
        questionario: questionarios[1]
    },
    {
        codigo: 3,
        nome: 'Relacionamento',
        status: 'AVALIADO',
        respostas: [],
        data_inclusao: moment(),
        data_alteracao: moment(),
        questionario: questionarios[2]
    }
];

export const filters = avaliacoes.reduce(
    (acc, cur) => {
        acc.competencias = [
            ...acc.competencias,
            { name: cur.nome, id: cur.codigo }
        ];

        acc.status = _.uniqBy(
            [...acc.status, { name: cur.status, id: cur.status }],
            'id'
        );

        return acc;
    },
    { competencias: [], status: [] }
);
