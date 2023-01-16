import React, {useEffect, useState} from 'react';
import { inject, observer } from 'mobx-react';
import infoIcon from '../../../../../../assets/images/icons/info-icon.svg';

import {
    Container,
    Title,
    Question,
    QuestionWrapper,
    IconImage,
    InfoTitle,
    InfoTitleWrapper,
    InfoBodyWrapper,
    Button,
    ButtonsContainer,
    CheckButtonContainer
} from './styles';
import {useLocation} from "react-router-dom";
import {ModalComplexPage} from "../../../../../../components/molecules";
import CheckBoxItem from "../../../../../../components/atoms/checkbox";


const TypeConfirm = ({
    title,
    question,
    order = 1,
    info,
    answer,
    setAnswer
}) => {
    const location = useLocation();
    const [value, setValue] = useState(1);
    const [valueNa, setValueNa] = useState(false);
    const [showModalInfo, setShowModalInfo] = useState(false);


    useEffect(() => {
        if(value !== undefined && value !== null) {
            setValueNa(false);
        }
        setAnswer({
            ...answer,
            resposta: value,
            nao_aplica: valueNa ? 1 : 0
        });
    }, [value]);

    useEffect(() => {
        if(valueNa){
            setValue(null);
        }

        setAnswer({
            ...answer,
            resposta: value,
            nao_aplica: valueNa ? 1 : 0
        });
    }, [valueNa]);
    return (
        <Container key={location.key}>
            <Title>{title}</Title>
            <QuestionWrapper>
                <Question>{order}. {question}</Question>
                {info && (
                    <IconImage
                        src={infoIcon}
                        onClick={() => setShowModalInfo(true)}
                    />
                )}
            </QuestionWrapper>
            <ButtonsContainer>
                <Button selected={value === 1} onClick={() => setValue(1)} >Sim</Button>
                <Button selected={value === 0}  onClick={() => setValue(0)}>Não</Button>
            </ButtonsContainer>

            <CheckButtonContainer>
                <CheckBoxItem
                    label="N/A"
                    selected={valueNa}
                    onSelect={() => {
                        setValueNa(!valueNa)
                    }}
                    backgroundColor={'transparent'}
                />
            </CheckButtonContainer>

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

export default TypeConfirm;
