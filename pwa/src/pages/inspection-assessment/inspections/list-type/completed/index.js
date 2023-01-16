import React from 'react';

import {
    Wrapper
} from './styles';
import colors from '../../../../../styles/colors';
import {InfoCard, InfoCardAlertInfo, InfoCardItem} from '../../../../../components/atoms';
import { inject, observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';

const CompletedInspections = ({ HomeInspectionStore }) => {

    const { inspections, homePath } = HomeInspectionStore;
    const history = useHistory();

    return (
        <>
            {inspections['completed'].count > 0 ? (
                inspections['completed'].list.map((item, index) => {
                    return (
                        <Wrapper key={`${item.id}-${index}`}>
                            <InfoCard
                                title={item.name}
                                borderColor={colors.greenAux}
                                subHeaderBold={`ID #${item.id}`}
                                showFooterAction
                                footerActionLabel="Ver detalhes"
                                footerAction={() => {
                                    history.push(`${homePath}/inspection/${item.id}`);
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
                    Nenuma inspeção finalizada foi encontrada.
                </>
            )}

        </>
    );
};

export default inject('HomeInspectionStore')(observer(CompletedInspections));

