import React, { Fragment } from "react";
import { FaCheckDouble } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import {
    CompanyHeader,
    SingleNextButton,
} from "../../../../components/atoms";
import { Header } from "../../../../components/organisms";
import colors from "../../../../styles/colors";
import {
    Container,
    Content,
    PageInfo,
    PageTitle,
    PageDescription,
    QualityIndex,
    QualityIcon,
    QualityTitle,
    QualityValue,
    Wrapper,
    Label,
    Value,
    QualityWrapper,
} from "./styles";

const QualityAnalysisIndex = () => {
    const history = useHistory();
    const {
        content = false,
        result = false
    } = history.location.state ?? {};

    return (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <CompanyHeader
                    positionRelative={true}
                    typeAction={"Análise da Qualidade Walk & Talk"}
                    onClose={() => alert("Fechar")}
                />
                <Content>
                    <PageInfo>
                        <PageTitle>{content.title}</PageTitle>
                        <PageDescription>{content.subtitle}</PageDescription>
                    </PageInfo>
                    <QualityIndex>
                        <QualityWrapper>
                            <QualityIcon>
                                <FaCheckDouble size={26} color={colors.client} />
                            </QualityIcon>
                            <QualityTitle>Índice de Qualidade do Walk & Talk (IQ):</QualityTitle>
                            <QualityValue>{result.resultQualification}</QualityValue>
                        </QualityWrapper>
                        <Wrapper>
                            <div>
                                <Label>MÉDIA DA ÁREA</Label>
                                <Value>{result.averageArea ?? ''}%</Value>
                            </div>
                            <div>
                                <Label>MÉDIA DA EMPRESA</Label>
                                <Value>{result.averageClient ?? ''}%</Value>
                            </div>
                        </Wrapper>
                    </QualityIndex>
                </Content>
                <SingleNextButton
                    positionRelative={true}
                    onNext={() => {
                        history.push("/safety-walk-talk");
                    }}
                    nextLabel={"Ir para início"}
                />
            </Container>
        </Fragment>
    );
};

export default QualityAnalysisIndex;
