import React from 'react';
import _ from 'lodash';

import { DetailsContainer, Title } from './styles';
import {
    ActionId,
    ActionLabel
} from '../../../../../action-plan/coverage-analysis/detour-details/styles';
import { ConfirmCancelFooter } from '../../../../../../components/organisms';
import { TrainingWithRating } from '.';

const TrainingList = ({
    details,
    confirmButtonLabel,
    cancelButtonLabel,
    onConfirm,
    onCancel
}) => {
    return (
        <div>
            <Title>{details.turma.treinamento.nome.valor}</Title>

            <DetailsContainer marginBottom={details.status === 3 && '26px'}>
                {Object.values(
                    _.omit(details.turma.treinamento, [
                        'codigo',
                        'status',
                        'nome'
                    ])
                ).map(({ chave, valor }, idx) => {
                    switch (chave) {
                        case 'Id açāo':
                            return (
                                <ActionId key={`${chave}_${idx}`}>
                                    {chave}

                                    <span>#{valor}</span>
                                </ActionId>
                            );
                        default:
                            return (
                                <ActionLabel key={`${chave}_${idx}`}>
                                    <span>{chave}</span>

                                    <p>{valor}</p>
                                </ActionLabel>
                            );
                    }
                })}
            </DetailsContainer>

            {details.status === 3 && details.avaliacao && (
                <TrainingWithRating details={details} />
            )}

            <ConfirmCancelFooter
                fixed={true}
                hideCancelButton={!Boolean(cancelButtonLabel)}
                confirmButtonLabel={confirmButtonLabel}
                cancelButtonLabel={cancelButtonLabel}
                onConfirm={onConfirm}
                onCancel={onCancel}
                confirmButtonLoading={false}
                confirmButtonType="button"
            />
        </div>
    );
};

export default TrainingList;
