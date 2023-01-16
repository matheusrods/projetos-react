import React from 'react';
import { Tabs, TabPanel } from 'react-tabs';

import Accordion from '../../../../../components/atoms/accordion-audit';
import {
    StyledTab,
    StyledTabList
} from '../../../../../components/atoms/tabs/styles';
import { Container, TrainingCardInfo } from '../../../common';
import styles from './styles';

const EvaluationsTabs = ({ tabs, panels, onClick }) => {
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
        <Tabs>
            <StyledTabList color="transparent">
                {tabs.map(({ codigo, label }) => (
                    <StyledTab key={`tab_${codigo}`}>{label}</StyledTab>
                ))}
            </StyledTabList>

            {panels.map((panel, index) => (
                <TabPanel key={`panel_${index}`}>
                    <Container>
                        {Object.keys(panel).map((p, idx) => (
                            <Accordion
                                key={`accordion_${p}_${idx}`}
                                status={'exam'}
                                label={p.toUpperCase()}
                                quantity={panel[p].length || 1}
                                style={styles.accordion}
                            >
                                {panel[p].length ? (
                                    panel[p].map((turma, i) => (
                                        <TrainingCardInfo
                                            key={`${turma.codigo}_${i}`}
                                            onClick={() =>
                                                onClick(turma.questionario)
                                            }
                                            title={turma.questionario.nome}
                                            id={turma.codigo}
                                            borderColor={styles.borderColor}
                                            {...handleStatus(turma)}
                                        />
                                    ))
                                ) : (
                                    <TrainingCardInfo
                                        onClick={() => null}
                                        title={`Sem ${p} no momento.`}
                                        id={'turma.codigo'}
                                        borderColor={styles.borderColor}
                                    />
                                )}
                            </Accordion>
                        ))}
                    </Container>
                </TabPanel>
            ))}
        </Tabs>
    );
};

export default EvaluationsTabs;
