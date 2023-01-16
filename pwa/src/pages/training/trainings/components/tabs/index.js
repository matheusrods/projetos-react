import React from 'react';
import { Tabs, TabPanel } from 'react-tabs';
import Accordion from '../../../../../components/atoms/accordion-audit';

import {
    StyledTab,
    StyledTabList
} from '../../../../../components/atoms/tabs/styles';
import { Container, TrainingCardInfo } from '../../../common';
import styles from './styles';
import useTrainingTabs from './useTrainingTabs';

const TrainingTabs = ({ treinamentos, onClick }) => {
    const { status, handleStatus } = useTrainingTabs();

    return (
        <Tabs>
            <StyledTabList color="transparent">
                {status.map(({ codigo, label }) => (
                    <StyledTab key={`tab_${codigo}`}>{label}</StyledTab>
                ))}
            </StyledTabList>

            {status.map(({ codigo }) => (
                <TabPanel key={`panel_${codigo}`}>
                    <Container>
                        {treinamentos
                            .filter(({ status }) => status === codigo)
                            .map((t, index) => (
                                <div
                                    key={`card_${
                                        t?.codigo ?? `available_${index}`
                                    }`}
                                >
                                    {t.turma?.treinamento.nome.valor ? (
                                        <TrainingCardInfo
                                            onClick={() => onClick(t)}
                                            title={
                                                t.turma.treinamento.nome.valor
                                            }
                                            id={t.codigo}
                                            borderColor={styles.borderColor}
                                            {...handleStatus(t)}
                                        />
                                    ) : (
                                        <Accordion
                                            status={'done'}
                                            label={t.nome}
                                            quantity={t.turmas.length}
                                            style={styles.accordion}
                                        >
                                            {t.turmas.map((turma, idx) => (
                                                <TrainingCardInfo
                                                    key={`${turma.codigo}_${idx}`}
                                                    onClick={() =>
                                                        onClick({ ...t, turma })
                                                    }
                                                    title={`${turma.instrutor.valor} - ${turma.data.valor}`}
                                                    id={turma.codigo}
                                                    borderColor={
                                                        styles.borderColor
                                                    }
                                                    {...handleStatus(t)}
                                                />
                                            ))}
                                        </Accordion>
                                    )}
                                </div>
                            ))}
                    </Container>
                </TabPanel>
            ))}
        </Tabs>
    );
};

export default TrainingTabs;
