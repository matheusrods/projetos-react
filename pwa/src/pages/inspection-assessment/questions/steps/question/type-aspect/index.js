import React, {useEffect, useState} from 'react';
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
    Label,
    SubTitle, Line, WrapperTextArea, LabelTextArea
} from './styles';
import {useLocation} from "react-router-dom";
import {InputRange, TextAreaDefault} from "../../../../../../components/atoms";
import {ModalComplexPage} from "../../../../../../components/molecules";


const TypeAspect = ({
    title,
    type,
    description,
    question,
    order = 1,
    range,
    info,
    answer,
    setAnswer
}) => {
    const location = useLocation();
    const [value, setValue] = useState(0);
    const [ commentary, setCommentary ] = useState('');
    const [showModalInfo, setShowModalInfo] = useState(false);

    useEffect(() => {
        setAnswer({
            ...answer,
            nota: value,
            aspecto_vermelho: type === "1" ? 1 : 0,
            aspecto_azul: type === "0" ? 1 : 0,
            comentarios_observacoes: commentary
        });
    }, [value, commentary]);


    return (
        <Container key={location.key}>
            <Title type={type} >{description}</Title>
            <SubTitle>{title}</SubTitle>
            <Line />

            <QuestionWrapper>
                <Question>{order}. {question}</Question>
                {info && (
                    <IconImage
                        src={infoIcon}
                        onClick={() => setShowModalInfo(true)}
                    />
                )}
            </QuestionWrapper>


            <Label>Classifique o nível deste item</Label>

            <InputRange
                onChange={(value) => setValue(value)}
                start={range.min}
                end={range.max}
                currentValue={value}
                description={`Dê uma nota de ${range.min} a ${range.max} para este item`}
                margin={'20px 0 0 0'}
            />

            <WrapperTextArea>
                <LabelTextArea>comentários e observações</LabelTextArea>
                <TextAreaDefault
                    name={'observacoes'}
                    placeholder="Escreva aqui seus comentários e observações"
                    value={commentary}
                    onChange={({ target }) => setCommentary(target.value)}
                />
            </WrapperTextArea>

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

export default TypeAspect;
