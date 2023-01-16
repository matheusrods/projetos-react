import React from 'react';
import { FaArrowRight, FaCamera, FaFile } from 'react-icons/fa';

import { Caption, Subtitle, Title } from '../styles';
import { Divisor, NextButton } from '../../../../../../../components/atoms';
import useProof from './useProof';
import {
    Container,
    TextButton,
    CancelButton,
    ButtonsContainer
} from './styles';
import { Label } from '../../../../../../../components/organisms/photos/list-photo/styles';
import { Photos } from '../../../../../../../components/organisms';

const TrainingProof = ({ details, onBack }) => {
    const {
        pictures,
        setPictures,
        openModalPhotos,
        setOpenModalPhotos,
        onSubmit
    } = useProof(details);

    return (
        <>
            <Container>
                <div>
                    <Subtitle>Comprovar comparecimento</Subtitle>

                    <Caption>Treinamento</Caption>
                    <Title>{details.turma.treinamento.nome.valor}</Title>

                    <Divisor margin={`16px 0`} />

                    <Caption>
                        Para finalizar, adicione foto ou anexo do comprovante de
                        participação do treinamento.
                    </Caption>
                </div>

                <ButtonsContainer>
                    <Label
                        htmlFor={'upload-photo'}
                        onClick={() => setOpenModalPhotos(true)}
                    >
                        <FaCamera />
                        Adicionar fotos
                    </Label>

                    <Label
                        htmlFor={'upload-photo'}
                        onClick={() => setOpenModalPhotos(true)}
                    >
                        <FaFile />
                        Adicionar documentos
                    </Label>
                </ButtonsContainer>

                <CancelButton onClick={onBack}>
                    <TextButton>Cancelar</TextButton>
                </CancelButton>

                {openModalPhotos && (
                    <Photos
                        subHeaderLabel="Inspeção em andamento"
                        title="Fotos da inspeção"
                        description="Adicione fotos que ilustrem as conformidades ou não conformidades."
                        pictures={pictures}
                        setPictures={setPictures}
                        onClose={() => setOpenModalPhotos(false)}
                    >
                        <NextButton
                            positionRelative={true}
                            onBack={() => setOpenModalPhotos(false)}
                            onNext={onSubmit}
                            icon={<FaArrowRight />}
                            nextLabel={'Avançar'}
                        />
                    </Photos>
                )}
            </Container>
        </>
    );
};

export default TrainingProof;
