import React from 'react';

import {
    Wrapper
} from './styles';
import colors from '../../../../../styles/colors';
import {InfoCard, InfoCardAlertInfo, InfoCardItem} from '../../../../../components/atoms';
import { inject, observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';

const NextInspections = ({ HomeInspectionStore }) => {

    const { inspections, homePath } = HomeInspectionStore;
    const history = useHistory();

    return (
        <>
            {inspections['next'].count > 0 ? (
                inspections['next'].list.map((item, index) => {
                    return (
                        <Wrapper key={`${item.id}-${index}`}>
                            <InfoCard
                                title={item.name}
                                borderColor={colors.auditOrange}
                                subHeaderBold={`ID #${item.id}`}
                                showFooterAction
                                footerActionLabel="Iniciar inspeção"
                                footerAction={() => {
                                    history.push(`${homePath}/inspection/${item.id}/form`);
                                }}
                            >
                                <InfoCardItem
                                    labelBold="Validade"
                                    inlineValueLabel={item.validity}
                                />
                                <InfoCardItem
                                    labelBold="Formulário"
                                    multiLineValue={item.forms.map(form => `${form.name} - Periodicidade: ${form.frequency}`)}
                                />
                                <InfoCardItem
                                    labelBold="Área"
                                    multiLineValue={item.process.map(process => `${process.name}`)}
                                />
                                <InfoCardItem
                                    labelBold="Responsável"
                                    inlineValueLabel={item.responsibleName}
                                    borderBottom={false}
                                />
                                <InfoCardAlertInfo
                                    label="Vencerá em 2 dias"
                                    label={`Vencerá em ${item.diff} ${item.diff === 1 ? 'dia' : 'dias'}`}
                                    color={colors.auditOrange}
                                />
                            </InfoCard>
                        </Wrapper>
                    )
                })
            ) : (
                <>
                    Nenuma inspeção próxima ao vencimento.
                </>
            )}

        </>
    );
};

export default inject('HomeInspectionStore')(observer(NextInspections));

