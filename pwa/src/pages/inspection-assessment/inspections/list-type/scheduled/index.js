import React, {useEffect, useState} from 'react';

import {
    Wrapper
} from './styles';
import colors from '../../../../../styles/colors';
import {Accordion, InfoCard, InfoCardItem, Loading} from '../../../../../components/atoms';
import { inject, observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';

const ScheduledInspections = ({ HomeInspectionStore }) => {

    const { inspections, homePath, cancelInspection, getInspections } = HomeInspectionStore;
    const [inspectionsList, setInspectionsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const groupBy = (list, keyGetter) => {
        const map = new Map();
        list.list.forEach((item) => {
            const key = keyGetter(item);
            const collection = map.get(key);
            if (!collection) {
                map.set(key, [item]);
            } else {
                collection.push(item);
            }
        });
        return map;
    };

    const handleCancelInspection = async (inspectionId) => {
        setLoading(true);
        await cancelInspection(inspectionId);
        setLoading(false);
        history.go(0);
    }

    useEffect(() => {
        setInspectionsList(groupBy(inspections.scheduled, (item) => item.typeId));
    }, [inspections]);


    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                [...inspectionsList.values()].length > 0 ? (
                    [...inspectionsList.values()].map((itens, index) => {
                        return (
                            <Wrapper key={`wrapper-${index}`}>
                                <Accordion
                                    label={itens[0].typeName}
                                    backgroundColor='transparent'
                                    labelColor={colors.gray4}
                                >
                                    {itens.map((item, iindex) => {
                                        return (
                                            <Wrapper key={`${item.id}-${iindex}`}>
                                                <InfoCard
                                                    actions={[
                                                        {
                                                            label: 'Cancelar inspeção',
                                                            onClick: () => handleCancelInspection(item.id),
                                                        }
                                                    ]}
                                                    title={item.name}
                                                    borderColor={colors.auditOrange}
                                                    subHeaderBold={`ID #${item.id}`}
                                                    showFooterAction
                                                    footerActionLabel="Iniciar Inspeção"
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
                                    })}
                                </Accordion>
                            </Wrapper>
                        );
                    })
                ) : (
                    <>Nenhuma inspeção programada</>
                )

            )}
        </>
    );
};

export default inject('HomeInspectionStore')(observer(ScheduledInspections));

