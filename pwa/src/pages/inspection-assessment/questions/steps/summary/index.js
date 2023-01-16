import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';

import {
    Container, Label,
    Title, WrapperLabel,
    Value, Wrapper
} from './styles';
import { useLocation } from 'react-router-dom';
import {InlineLabelValue, ShapeCard} from "../../../../../components/atoms";
import colors from "../../../../../styles/colors";
import {AiOutlinePercentage} from "react-icons/all";

const SummaryInspection = ({ InspectionQuestionsStore }) => {
    const location = useLocation();

    const {
        setLabelNextStep,
        setNextAction,
        setStep,
        inspection,
        getInspectionById,
        setTitle
    } = InspectionQuestionsStore;

    useEffect(() => {
        setTitle('Resumo das inspeções');
    }, [setTitle]);

    useEffect(() => {
        setLabelNextStep('Coletar Assinaturas');
        setNextAction(() => setStep('signatures'));

    }, [setLabelNextStep, setNextAction, setStep]);

    useEffect(() => {
        getInspectionById(inspection.id);
    }, [getInspectionById, inspection.id]);

    useEffect(() => {
        console.log(inspection);

    }, []);

    return (
        <Container key={location.key}>
            <Title>Total da verificação</Title>
            <Wrapper>
                <ShapeCard>
                    <WrapperLabel>
                        <Label>
                            <AiOutlinePercentage color={colors.blue2} size={20} />
                            Atendimento
                        </Label>
                        <Value>
                            {inspection.resultTotal}<AiOutlinePercentage color={colors.blue2} size={30} />
                        </Value>

                    </WrapperLabel>
                </ShapeCard>
            </Wrapper>

            {inspection.forms.map((form, index) => (
                <Wrapper>
                    <ShapeCard key={index}>
                        <InlineLabelValue
                            label={form.name}
                            value={form.result}
                        />

                        <InlineLabelValue
                            label={form.type === '4' ? 'Avaliador' : 'Responsável'}
                            value={inspection.responsibleName}
                        />
                        <InlineLabelValue
                            label="Parecer"
                            value={form.sightDescription}
                        />
                        {(form.type === '3' || form.type === '1' || form.type === '2') && (
                            <>
                                <InlineLabelValue
                                    label="Atendimento"
                                    value={`${form.attendance}%`}
                                />

                            </>
                        )}
                        {form.type === '4' && (
                            <>
                                <InlineLabelValue
                                    label={'Data da avaliação'}
                                    value={form.updateDate}
                                />
                                <InlineLabelValue
                                    label={'Aspectos azuis'}
                                    value={`Nível ${form.aspectBlue}`}
                                    valueColor={colors.icons}
                                />
                                <InlineLabelValue
                                    label={'Aspectos vermelhos'}
                                    value={`Nível ${form.aspectRed}`}
                                    valueColor={colors.icons}
                                />
                            </>
                        )}
                    </ShapeCard>
                </Wrapper>

            ))}


            {/*<ShapeCard>*/}
            {/*    <InlineLabelValue*/}
            {/*        label={'Inspeção'}*/}
            {/*        value={inspection.name}*/}
            {/*    />*/}
            {/*    <InlineLabelValue*/}
            {/*        label={'Responsável'}*/}
            {/*        value={inspection.responsibleName}*/}
            {/*    />*/}
            {/*    <InlineLabelValue*/}
            {/*        label={'Parecer'}*/}
            {/*        value={form.sightDescription}*/}
            {/*    />*/}
            {/*    <InlineLabelValue*/}
            {/*        label={'Atendimento'}*/}
            {/*        value={`${form.attendance}%`}*/}
            {/*        valueColor={colors.orange2}*/}
            {/*    />*/}
            {/*</ShapeCard>*/}
        </Container>
    );
};

export default inject('HomeInspectionStore', 'InspectionQuestionsStore')(observer(SummaryInspection));
