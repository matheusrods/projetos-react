import React from 'react';

import {
    Wrapper
} from './styles';
import colors from '../../../../../styles/colors';
import { InfoCard, InfoCardItem } from '../../../../../components/atoms';
import { inject, observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';

const OngoingInspections = ({ HomeInspectionStore }) => {

    const { inspections, homePath } = HomeInspectionStore;
    const history = useHistory();

    return (
        <>
            {inspections['ongoing'].count > 0 ? (
                inspections['ongoing'].list.map((item, index) => {
                    return (
                        <Wrapper key={`${item.id}-${index}`}>
                            <InfoCard
                                title={item.name}
                                borderColor={colors.auditOrange}
                                subHeaderBold={`ID #${item.id}`}
                                showFooterAction
                                footerActionLabel="Continuar inspeção"
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
                            </InfoCard>
                        </Wrapper>
                    )
                })
            ) : (
                <>
                    Nenuma inspeção em andamento.
                </>
            )}

        </>
    );
};

export default inject('HomeInspectionStore')(observer(OngoingInspections));

