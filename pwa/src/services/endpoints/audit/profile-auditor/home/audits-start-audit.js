// import { api } from '../../api';
// import { transformResponse } from '../../transforms/observer';

const getAuditsForStartAudit = async () => {
    try {
        // const response = await api.get(
        //     `/observador/observacoes/?codigo_unidade=${clientId}&limit=${limit}&page=${page}&autor=${author}${additionalFilters}`
        // );

        const response = {
            data: [
                {
                    id: 1,
                    area: 'Produção',
                    supportArea: 'Planejamento',
                    product: 'Materiais/Produção',
                    auditor: 'Renato Saldanha',
                    location: 'Anhanguera',
                    date: '14/04/2021',
                    hour: '13h00 às  14h00',
                    status: 'done'
                },
                {
                    id: 2,
                    area: 'Àrea de Suporte',
                    supportArea: 'Vendas',
                    product: 'Back-office',
                    auditor: 'Amanda Silva',
                    location: 'Jundiaí ||',
                    date: '23/04/2021',
                    hour: '15h00 às  17h00',
                    status: 'pending',
                    // subStatus: 'pending',
                    // subStatusDesc: 'Pendente'
                },
                {
                    id: 3,
                    area: 'Àrea de Suporte',
                    supportArea: 'Vendas',
                    product: 'Vendas (Software Sales)',
                    auditor: 'Marcelo Ferreira',
                    location: 'Jundiaí ||',
                    date: '05/05/2021',
                    hour: '15h00 às  17h00',
                    status: 'pending',
                    // subStatus: 'done',
                    // subStatusDesc: 'Concluído'
                },
                {
                    id: 4,
                    area: 'Produção',
                    supportArea: 'Planejamento',
                    product: 'Materiais/Produção',
                    auditor: 'Adriano Rodrigues',
                    location: 'Guarulhos',
                    date: '01/02/2021',
                    hour: '08h00 às  11h00',
                    status: 'done'
                },
                {
                    id: 5,
                    area: 'Projeto',
                    supportArea: 'Vendas do Projeto',
                    product: 'Vendas (Software Sales)',
                    auditor: 'Adriano Rodrigues',
                    location: 'Guarulhos',
                    date: '01/02/2021',
                    hour: '08h00 às  11h00',
                    status: 'inProgress'
                },
                {
                    id: 6,
                    area: 'Projeto',
                    supportArea: 'Vendas do Projeto',
                    product: 'Vendas (Software Sales)',
                    auditor: 'Adriano Rodrigues',
                    location: 'Guarulhos',
                    date: '01/02/2021',
                    hour: '08h00 às  11h00',
                    status: 'nc'
                },
                {
                    id: 7,
                    area: 'Àrea de Suporte',
                    supportArea: 'Vendas do Projeto',
                    product: 'Materiais/Produção',
                    auditor: 'Adriano Rodrigues',
                    location: 'Guarulhos',
                    date: '01/02/2021',
                    hour: '08h00 às  11h00',
                    status: 'nc'
                },
                {
                    id: 8,
                    area: 'Produção',
                    supportArea: 'Planejamento',
                    product: 'Materiais/Produção',
                    auditor: 'Adriano Rodrigues',
                    location: 'Guarulhos',
                    date: '01/02/2021',
                    hour: '08h00 às  11h00',
                    status: 'contested',
                    subStatus: 'pending',
                    subStatusDesc: 'Pendente'
                },
                {
                    id: 9,
                    area: 'Produção',
                    supportArea: 'Controle e teste',
                    product: 'Materiais/Produção',
                    auditor: 'Adriano Rodrigues',
                    location: 'Guarulhos',
                    date: '01/02/2021',
                    hour: '08h00 às  11h00',
                    status: 'contested',
                    subStatus: 'done',
                    subStatusDesc: 'Concluído'
                },
                {
                    id: 10,
                    area: 'Produção',
                    supportArea: 'Fabricação',
                    product: 'Materiais/Produção',
                    auditor: 'Adriano Rodrigues',
                    location: 'Guarulhos',
                    date: '01/02/2021',
                    hour: '08h00 às  11h00',
                    status: 'contested',
                    subStatus: 'pending',
                    subStatusDesc: 'Pendente'
                }
            ],
            status: 200
        };

        const result = response.data;

        // if (status !== 200 && status !== 201) {
        //     throw new Error('Ocorreu um erro na requisição');
        // }

        return (result);
    } catch (error) {
        console.error(error);
        return false;
    }
};

export { getAuditsForStartAudit };
