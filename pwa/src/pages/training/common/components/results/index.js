import React from 'react';
import { FaHome } from 'react-icons/fa';

import { ConfirmCancelFooter } from '../../../../../components/organisms';
import ResultAnswers from './answers';
import {
    Container,
    Title,
    Caption,
    Card,
    CardTitle,
    CardBold,
    CardCaption,
    IconCheck,
    IconTimes
} from './styles';
import useResults from './useResults';

const TrainingResults = ({ result, onClose, onReset }) => {
    const { score, pr, approved } = useResults(result);

    return (
        <Container>
            <Title>{result.questionario.nome}</Title>

            <Caption>
                Com base nas informações preenchidas, o seu resultado foi:
            </Caption>

            <Card>
                {approved ? <IconCheck /> : <IconTimes />}

                <CardTitle>Resultado da prova</CardTitle>

                <CardBold>
                    {`${Math.round(
                        (score / result.questionario.questoes.length) * 100
                    )}%`}
                </CardBold>

                <CardCaption approved={approved}>
                    {approved
                        ? 'Parabéns, você atingiu o resultado.'
                        : `Desculpe, você não atingiu  o resultado mínimo.
                        Você ainda tem ${
                            result.turma.treinamento.max_tentativas -
                            result.tentativas
                        }/${result.turma.treinamento.max_tentativas} chance(s).
                        ${
                            !!(
                                result.turma.treinamento.max_tentativas -
                                result.tentativas
                            ) && 'Tente novamente'
                        }`}
                </CardCaption>
            </Card>

            {approved && <ResultAnswers pr={pr} />}

            <ConfirmCancelFooter
                fixed={true}
                confirmButtonLabel={
                    approved ? 'Ir para o início' : 'Tentar novamente'
                }
                cancelButtonLabel={'Voltar ao início'}
                hideCancelButton={approved}
                confirmButtonIcon={approved && <FaHome />}
                onConfirm={() => (approved ? onClose() : onReset())}
                onCancel={() => onClose()}
                confirmButtonType="button"
                inline={approved}
            />
        </Container>
    );
};

export default TrainingResults;
