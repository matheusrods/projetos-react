import React, {useEffect, useState} from 'react';
import infoIcon from '../../../../../../assets/images/icons/info-icon.svg';

import {
    Container,
    Title,
    Question,
    QuestionWrapper,
    IconImage,
    InfoTitle, InfoTitleWrapper, InfoBodyWrapper
} from './styles';
import {useLocation} from "react-router-dom";
import {InputRange} from "../../../../../../components/atoms";
import {ModalComplexPage} from "../../../../../../components/molecules";


const TypeGrade = ({
    title,
    question,
    order = 1,
    range,
    info,
    answer,
    setAnswer
}) => {
    const location = useLocation();
    const [value, setValue] = useState(0);
    const [showModalInfo, setShowModalInfo] = useState(false);

    useEffect(() => {
        setAnswer({
            ...answer,
            nota: value
        });
    }, [value]);
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

            <InputRange
                onChange={(value) => setValue(value)}
                start={range.min}
                end={range.max}
                currentValue={value}
                description={`Dê uma nota de ${range.min} a ${range.max} para este item`}
                margin={'20px 0 0 0'}
            />

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

export default TypeGrade;
