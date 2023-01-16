import React from 'react';
import { Photo } from '../../../../../../components/atoms';

import { Title } from '../../../../common';
import TrainingRating from './rating';
import { ProofContainer, ProofRow } from './styles';

const WithRating = ({ details }) => {
    return (
        <>
            {!!details.comprovantes.length && (
                <ProofContainer>
                    <Title>Certificados</Title>

                    <ProofRow>
                        {details.comprovantes.map((item, index) => (
                            <Photo
                                src={item}
                                key={index}
                                showOptions={true}
                                onClickOptions={() => null}
                                style={{ marginRight: 16 }}
                            />
                        ))}
                    </ProofRow>
                </ProofContainer>
            )}

            <Title>Avaliação de reação</Title>

            {details.turma.treinamento.perguntas.map((pergunta) => (
                <TrainingRating
                    key={pergunta.codigo}
                    {...pergunta}
                    value={details.avaliacao[pergunta.codigo]}
                    onChange={() => null}
                />
            ))}
        </>
    );
};

export default WithRating;
