import React, { useEffect, useState, useCallback } from 'react';
import moment from '../../../config/moment';
import { toast } from 'react-toastify';
import LoadingContainer from '../../../components/molecules/loading-container';
import { FaCheck } from 'react-icons/fa';
import { useHistory } from 'react-router';
import { getGraphicData } from '../../../services/endpoints/swt/goals/graphic';
import { WhiteHeaderBack } from '../../../components/atoms';
import { inject, observer } from 'mobx-react';
import {
    Container,
    Content,
    CardGoal,
    ContainerCheckIcon,
    GoalText,
    GoalNumber,
    CardGraphical,
    Graphic,
    ItemGraphic,
    BarEmpty,
    BarFilled,
    Month,
    Goal,
    Results,
    Footer,
    InfoContainer,
    Dot,
    Info,
    TitleGraphic
} from './styles';
import { isEmpty } from '../../../utils/helpers';

const parseMonth = (month) => Number(month) - 1;

const getHigherTotal = (graphicData, meta) => {
    if (isEmpty(graphicData) || isEmpty(meta)) {
        const message = 'Dados para cálculo da meta inválidos';
        toast.warn(message);
        throw new Error(message);
    }

    const higher = graphicData.reduce((acc, current) => {
        if (Number(current.total) > acc) {
            return current.total;
        }

        return acc;
    }, 0);

    if (higher) {
        return higher > Number(meta.valor) ? higher : Number(meta.valor);
    }

    const defaultValue = Number(meta.valor) * 2;

    return defaultValue;
};

const generateBarFilledScale = (higherTotal, value) => {
    if (Number.isNaN(higherTotal) || Number.isNaN(value)) {
        return 0;
    }

    const percentage = (parseInt(value) / parseInt(higherTotal)) * 100;

    return percentage > 100 ? 100 : percentage;
};

const generateMetaScale = (higherTotal, value) => {
    if (Number.isNaN(higherTotal) || Number.isNaN(value)) {
        return;
    }

    if (value >= higherTotal) {
        return 1;
    } else {
        const divisionValue = parseInt(80 * (value / higherTotal));

        return Math.round(80 - divisionValue);
    }
};

function Goals({ UserStore }) {
    const history = useHistory();
    const { clientId } = UserStore;
    const [graphicData, setGraphicData] = useState();
    const [loading, setLoading] = useState(true);
    const [currentMeta, setCurrentMeta] = useState();
    const [top, setTop] = useState(0);

    const isGoalDisabled = useCallback((graphicDataResponse) => {
        const statusCode = Number(graphicDataResponse?.status_meta?.status);

        if (statusCode === 2) {
            const message =
                graphicDataResponse?.msg ?? 'Área não possui meta cadastrada';
            toast.warn(message);
            throw new Error(message);
        }
    }, []);

    const fetchGraphicData = useCallback(async () => {
        try {
            if (isEmpty(clientId)) {
                const message = 'Identificação do cliente inexistente';
                toast.warn(message);
                throw new Error(message);
            }

            const graphicDataResponse = await getGraphicData(clientId);
            isGoalDisabled(graphicDataResponse);

            if (isEmpty(graphicDataResponse)) {
                const message = 'Serviço de Metas inoperante';
                toast.warn(message);
                throw new Error(message);
            }

            setGraphicData(graphicDataResponse);
            setCurrentMeta(graphicDataResponse?.dados_grafico?.[5]);
            setTop(
                getHigherTotal(
                    graphicDataResponse?.dados_grafico,
                    graphicDataResponse?.meta
                )
            );

            setLoading(false);
        } catch (error) {
            console.error(error);
            history.push('/safety-walk-talk');
        }
    }, [clientId, history, isGoalDisabled]);

    useEffect(() => fetchGraphicData(), [fetchGraphicData]);

    const shouldRenderCardGoal =
        Number(graphicData?.status_meta?.status) > 0 && currentMeta?.total;

    const HistoryMonths = ({ month, total }) => {
        return (
            <ItemGraphic>
                <BarEmpty>
                    <BarFilled height={generateBarFilledScale(top, total)} />
                </BarEmpty>
                <Month>
                    {moment().set('month', parseMonth(month)).format('MMM')}
                </Month>
            </ItemGraphic>
        );
    };

    return (
        <Container>
            <WhiteHeaderBack title={'Metas'} onBack={() => history.goBack()} />
            {loading ? (
                <LoadingContainer />
            ) : (
                <Content>
                    {shouldRenderCardGoal && (
                        <CardGoal>
                            <ContainerCheckIcon>
                                <FaCheck />
                            </ContainerCheckIcon>
                            <GoalText>{graphicData.status_meta.msg}</GoalText>
                            <GoalNumber>{`${currentMeta.total} / ${graphicData.meta.valor}`}</GoalNumber>
                        </CardGoal>
                    )}
                    <CardGraphical>
                        <TitleGraphic>Histórico</TitleGraphic>
                        <Results>
                            {graphicData.dados_grafico.map((item, index) => (
                                <span key={index}>{item.total}</span>
                            ))}
                        </Results>
                        <Graphic>
                            <Goal
                                top={generateMetaScale(
                                    top,
                                    Number(graphicData.meta.valor)
                                )}
                            >
                                <span>{graphicData.meta.valor}</span>
                            </Goal>
                            {graphicData.dados_grafico.map(
                                ({ mes, total }, index) => (
                                    <HistoryMonths
                                        key={index}
                                        month={mes}
                                        total={total}
                                    />
                                )
                            )}
                        </Graphic>
                        <Footer>
                            <InfoContainer>
                                <Dot color={'#97DC52'} />
                                <Info>Realizado</Info>
                            </InfoContainer>
                            <InfoContainer>
                                <Dot color={'#FAA50A'} />
                                <Info>Meta</Info>
                            </InfoContainer>
                        </Footer>
                    </CardGraphical>
                </Content>
            )}
        </Container>
    );
}

export default inject('UserStore')(observer(Goals));
