import moment from 'moment';

export const resume = {
    avaliacoes: 2,
    treinamentos: 3,
    testes: 5
};

export const notifications = [
    {
        codigo: 1,
        lida: true,
        persistir: true,
        descricao:
            'Prezado Colaborador <br /> Você foi inscrito no <strong>Treinamento de NR35 no dia 12/02/2021 às 19:00,</strong> por favor confirme sua participação.',
        data_inclusao: moment(),
        data_alteracao: moment()
    },
    {
        codigo: 2,
        lida: false,
        persistir: true,
        descricao:
            'Prezado Colaborador <br /> Esta mensagem é um lembrete sobre seu <strong>Treinamento de NR35 no dia 12/02/2021 às 19:00.</strong>',
        data_inclusao: moment(),
        data_alteracao: moment()
    },
    {
        codigo: 3,
        lida: true,
        persistir: false,
        descricao:
            'Prezado Colaborador <br /> Esta mensagem é um lembrete sobre seu <strong>Treinamento de NR35 no dia 12/02/2021 às 19:00.</strong>',
        data_inclusao: moment(),
        data_alteracao: moment()
    }
];
