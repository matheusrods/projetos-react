import React, {useEffect, useState} from 'react';
import { inject, observer } from 'mobx-react';
import Chart from 'react-apexcharts'
import {
    Container,
    Title,
    Line,
    LabelWrapper,
    TitleLabel,
    Label,
    WrapperCenter
} from './styles';
import colors from "../../../../styles/colors";
import {Accordion, InlineLabelValue, ShapeCard} from "../../../../components/atoms";
import {BsDot} from "react-icons/all";


const DetailsInspection = ({ HomeInspectionStore }) => {
    const {
        inspection,
    } = HomeInspectionStore;
    const [unconformities, setUnconformities] = useState([]);
    const [unconformitiesGraphic, setUnconformitiesGraphic] = useState([]);
    const [serieChart, setSerieChart] = useState([0,0,0,0]);

    const [chart] = useState({
        options: {
            chart: {
                type: 'donut',
            },
            labels: ['Menor', 'Média', 'Alta', 'Maior'],
            colors: [colors.greenAux, colors.inspectionsProgress, colors.orange2, colors.redAux],

        },
    });

    const getAnswer = (item) => {
        switch (item.typeId){
            case 1:
                return 'Não';
            case 3:
                if(item.conform === 0){
                    switch (item.criticism) {
                        case 1:
                            return 'Menor'
                        case 2:
                            return 'Médio'
                        case 3:
                            return 'Alta'
                        case 4:
                            return 'Maior'
                        default:
                            return 'Não informado'
                    }
                }else{
                    return 'Não se aplica'
                }

            default:
                return 'Não informado';
        }
    }
    const getAnswerIcon = (item) => {
        if(item.typeId === 3 && item.conform === 0){
            switch (item.criticism) {
                case 1:
                    return <BsDot color={colors.greenAux} size={40}/>
                case 2:
                    return <BsDot color={colors.inspectionsProgress} size={40}/>
                case 3:
                    return <BsDot color={colors.orange2} size={40}/>
                case 4:
                    return <BsDot color={colors.redAux} size={40}/>
                default:
                    return null
            }
        }
        return null;
    }
    const getQuestionType = (item) => {
        switch (item.typeId){
            case 1:
                return 'Resposta';
            case 3:
                return 'Criticidade';
            default:
                return '-';
        }
    }
    useEffect(() => {
        let arrayUnconformities = [];
        let arrayUnconformitiesGraphic = [];
        inspection.forms.forEach(form => {
            form.answers.forEach(item => {
                switch (item.typeId) {
                    case 3:
                        if(item.conform === 0 || item.notApply === 1) {
                            arrayUnconformities.push(item);
                            if(item.conform === 0){
                                arrayUnconformitiesGraphic.push(item);
                            }
                        }
                        break;
                    case 1:
                        if(item.answer === 0){
                            arrayUnconformities.push(item);
                        }
                        break;
                    default:
                        break;
                }
            });
        });
        setUnconformities(arrayUnconformities);
        setUnconformitiesGraphic(arrayUnconformitiesGraphic);
    }, [inspection, setUnconformities, setUnconformitiesGraphic]);

    useEffect(() => {
        let serie = [0,0,0,0];
        for(const item of unconformitiesGraphic){
            serie[item.criticism - 1] += 1;
        }
        setSerieChart(serie);
    }, [unconformitiesGraphic, setSerieChart]);

    return (
        <Container>
            <LabelWrapper>
                <Title>
                    {inspection.name}
                </Title>
                <Line />
            </LabelWrapper>
            <LabelWrapper>
                <TitleLabel>Tipo da inspeção</TitleLabel>
                <Label>{inspection.typeName}</Label>
                <Line />
            </LabelWrapper>
            <LabelWrapper>
                <TitleLabel>Status</TitleLabel>
                <Label>{inspection.statusName}</Label>
                <Line />
            </LabelWrapper>
            <LabelWrapper>
                <TitleLabel>Responsável</TitleLabel>
                <Label>{inspection.responsibleName}</Label>
                <Line />
            </LabelWrapper>

            <LabelWrapper>
                <TitleLabel>Local da observação</TitleLabel>
                <Label>{inspection.local}</Label>
                <Line />
            </LabelWrapper>

            <LabelWrapper>
                <TitleLabel>Data da inspeção</TitleLabel>
                <Label>{inspection.updateDate}</Label>
                <Line />
            </LabelWrapper>
            <LabelWrapper>
                <TitleLabel>Nota da inspeção</TitleLabel>
                <Label>{inspection.resultTotal}</Label>
                <Line />
            </LabelWrapper>

            {unconformitiesGraphic.length > 0 && (
                <>
                    <LabelWrapper>
                        <TitleLabel>Criticidade</TitleLabel>
                    </LabelWrapper>
                    <WrapperCenter>
                        <Chart
                            options={chart.options}
                            series={serieChart}
                            type="donut"
                            width={380}
                        />
                    </WrapperCenter>
                </>
            )}

            {unconformities.length > 0 && (
                <>
                    <Accordion
                        label="Itens com intervenções"
                        backgroundColor='transparent'
                        labelColor={colors.gray6}
                    >
                        {unconformities.map((item, index) => (
                            <LabelWrapper
                                key={`${item.id}-${index}`}
                            >
                                <ShapeCard
                                    backgroundColor={colors.gray1}
                                >
                                    <LabelWrapper>
                                        <TitleLabel>{item.question}</TitleLabel>
                                        <Line />
                                    </LabelWrapper>
                                    <InlineLabelValue
                                        softLabel={getQuestionType(item)}
                                        value={getAnswer(item)}
                                        iconValue={getAnswerIcon(item)}
                                    />
                                </ShapeCard>
                            </LabelWrapper>
                        ))}

                    </Accordion>
                </>
            )}

        </Container>
    );
};

export default inject('HomeInspectionStore')(observer(DetailsInspection));
