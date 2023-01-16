import React from 'react';
import { Tabs, TabPanel } from 'react-tabs';

import {
    StyledTab,
    StyledTabList
} from '../../../../../components/atoms/tabs/styles';
import { Container, TrainingCardInfo } from '../../../common';
import styles from './styles';

const EvaluationsTabs = ({ tabs, panels, onClick, tab, settab }) => {
    const handleStatus = (turma) => {
        switch (turma.status) {
            case 3:
                const approved = turma.nota >= turma.nota_minima;
                return {
                    status: `${approved ? 'Aprovado' : 'Reprovado'} - ${
                        turma.data_alteracao
                    }`,
                    ballStatus: approved ? 'REALIZADO' : 'PENDENTE'
                };
            default:
                return;
        }
    };

    return (
        <Tabs defaultIndex={tab} onSelect={(index) => settab(index)}>
            <StyledTabList color="transparent">
                {tabs.map(({ name, label }) => (
                    <StyledTab key={`tab_${name}`}>{label}</StyledTab>
                ))}
            </StyledTabList>

            {Object.values(panels).map((p, idx) => (
                <TabPanel key={`panel_${idx}`}>
                    <Container>
                        {p.map((turma, i) => (
                            <TrainingCardInfo
                                key={`${turma.codigo}_${i}`}
                                onClick={() => onClick(turma.questionario)}
                                title={turma.questionario.nome}
                                id={turma.codigo}
                                borderColor={styles.borderColor}
                                {...handleStatus(turma)}
                            />
                        ))}
                    </Container>
                </TabPanel>
            ))}
        </Tabs>
    );
};

export default EvaluationsTabs;
