import React, { useState, useEffect } from 'react';
import infoIcon from '../../../../../../assets/images/icons/info-icon.svg';
import {
    Container,
    Title,
    QuestionContainer,
    Question,
    ButtonsContainer,
    Button,
    CheckButtonContainer,
    DevianceContainer,
    DevianceLabel,
    EvidencesContainer,
    EvidencesLabel,
    IconImage,
    InfoTitleWrapper,
    InfoTitle,
    InfoBodyWrapper,
    CheckButton
} from './styles';
import {useLocation} from "react-router-dom";
import { InputRangeLabel } from '../../../../../../components/atoms';
import { ModalComplexPage } from "../../../../../../components/molecules";
import colors from "../../../../../../styles/colors";
import { TextAreaDefault } from '../../../../../../components/atoms';

const TypeConformity = ({
    title,
    question,
    order = 1,
    info,
    setAnswer
}) => {

    const location = useLocation();
    const [ conform, setConform ] = useState(true);
    const [ deviance, setDeviance ] = useState('');
    const [ evidences, setEvidences ] = useState('');
    const [ doesNotApply, setDoesNotApply ] = useState(false);
    const [ criticality, setCriticality ] = useState(1);
    const [ showModalInfo, setShowModalInfo ] = useState(false);

    const criticismLevels = [
        {
            value: 1,
            label: 'Mínimo'
        },
        {
            value: 2,
            label: 'Médio'
        },
        {
            value: 3,
            label: 'Alto'
        },
        {
            value: 4,
            label: 'Muito alto'
        },
    ];

    useEffect(() => {
        setAnswer({
            conforme: conform ? 1 : 0,
            nao_aplica: doesNotApply ? 1 : 0,
            desvio: deviance,
            criticidade: criticality,
            evidencia_que_justifica: evidences
        });
    }, [
        conform,
        doesNotApply,
        deviance,
        criticality,
        evidences,
        setAnswer
    ]);

    return (
        <Container key={location.key}>
            <Title>{title}</Title>
            <QuestionContainer>
                <Question>
                    {order}. {question}
                </Question>
                {info && (
                    <IconImage
                        src={infoIcon}
                        onClick={() => setShowModalInfo(true)}
                    />
                )}
            </QuestionContainer>
                <ButtonsContainer>
                    <Button style={{
                        background: conform && !doesNotApply ? colors.greenLightButton : colors.gray2,
                    }}
                    doesNotApply={doesNotApply}
                    conform={conform}
                    onClick={() => {
                        setConform(true);
                        setDoesNotApply(false);
                        setEvidences('');
                    }}>
                        Conforme
                    </Button>
                    <Button style={{
                        background: conform || doesNotApply ? colors.gray2 : colors.greenLightButton,
                    }}
                    doesNotAppyl={doesNotApply}
                    conform={conform}
                    onClick={() => {
                        setConform(false);
                        setDoesNotApply(false);
                        setDeviance('');
                    }}>Não Conforme</Button>
                </ButtonsContainer>
                { conform &&
                    <CheckButtonContainer>
                        <CheckButton  name="nao-aplica" type="checkbox" checked={doesNotApply} onChange={() => setDoesNotApply(!doesNotApply)} /> Não se aplica
                    </CheckButtonContainer>
                }
                {
                    conform &&
                    <DevianceContainer>
                        <DevianceLabel>DESVIO</DevianceLabel>
                        <TextAreaDefault
                            name={'justification'}
                            placeholder="Descreva aqui o desvio"
                            value={deviance}
                            onChange={({ target }) => setDeviance(target.value)}
                        />
                    </DevianceContainer>
                }
                {
                    !conform &&
                    <InputRangeLabel
                        name="criticality"
                        onChange={(value) => {setCriticality(value)}}
                        domain={criticismLevels}
                        currentValue={criticality}
                        description={`Nível de criticidade`}
                        margin={'20px 0 0 0'}
                    />
                }
                {
                    !conform &&
                    <EvidencesContainer>
                        <EvidencesLabel>EVIDÊNCIAS QUE JUSTIFICAM SUA ESCOLHA</EvidencesLabel>
                        <TextAreaDefault
                            name={'justification'}
                            placeholder="Descreva aqui as evidências"
                            value={evidences}
                            onChange={({ target }) => setEvidences(target.value)}
                        />
                    </EvidencesContainer>
                }
                <ModalComplexPage
                    visible={showModalInfo}
                    nameModal={'signatures-modal'}
                    onCancel={() => setShowModalInfo(false)}
                    onConfirm={() => setShowModalInfo(false)}
                    confirmButtonLabel={'Fechar'}
                    uniqueFooterButton={true}
                >
                    <InfoTitleWrapper>
                        <IconImage src={infoIcon} />
                        <InfoTitle>Ajuda</InfoTitle>
                    </InfoTitleWrapper>
                    <InfoBodyWrapper>
                        {info}
                    </InfoBodyWrapper>
            </ModalComplexPage>
        </Container>
    );
};

export default TypeConformity;
