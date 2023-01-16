import moment from 'moment';
import { useCallback } from 'react';

export const status = [
    { codigo: 1, label: 'Disponíveis' },
    { codigo: 2, label: 'Pendentes' },
    { codigo: 3, label: 'Realizados' },
    { codigo: 4, label: 'Cancelados' }
];

const useTrainingTabs = () => {
    const handlePendente = (treinamento) => {
        if (treinamento.confirmado === 1)
            return {
                status: 'Aguardando a sua confirmaçāo',
                ballStatus: 'CANCELADO'
            };

        const date = moment(treinamento.turma.data.valor);

        if (date.diff(moment(), 'minutes') > 0 && !treinamento.avaliacao)
            return {
                status: 'Aguardando o treinamento',
                ballStatus: 'PENDENTE'
            };

        if (date.diff(moment(), 'minutes') <= 0 && !treinamento.avaliacao)
            return {
                status: 'Aguardando os comprovantes / avaliaçāo',
                ballStatus: 'CANCELADO'
            };
    };

    const handleStatus = useCallback((treinamento) => {
        switch (treinamento.status) {
            case 2:
                return handlePendente(treinamento);
            case 3:
                return {
                    status: `Realizado em ${treinamento.turma.data.valor}`,
                    ballStatus: 'REALIZADO'
                };
            default:
                return null;
        }
    }, []);

    return { status, handleStatus };
};

export default useTrainingTabs;
