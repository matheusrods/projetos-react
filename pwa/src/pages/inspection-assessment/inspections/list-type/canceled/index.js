import React from 'react';

import {
    Wrapper
} from './styles';
import colors from '../../../../../styles/colors';
import {InfoCard, InfoCardAlertInfo, InfoCardItem} from '../../../../../components/atoms';
import { inject, observer } from 'mobx-react';

const CanceledInspections = ({ HomeInspectionStore }) => {

    const { inspections } = HomeInspectionStore;

    return (
        <>
            {inspections['canceled'].count > 0 ? (
                inspections['canceled'].list.map((item, index) => {
                    return (
                        <Wrapper key={`${item.id}-${index}`}>
                            <InfoCard
                                title={item.name}
                                borderColor={colors.redAux}
                                subHeaderBold={`ID #${item.id}`}
                                showFooterAction={false}
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
                                    label="Cancelada"
                                    color={colors.redAux}
                                />
                            </InfoCard>
                        </Wrapper>
                    )
                })
            ) : (
                <>
                    Nenuma inspeção cancelada foi encontrada.
                </>
            )}
        </>
    );
};

export default inject('HomeInspectionStore')(observer(CanceledInspections));

