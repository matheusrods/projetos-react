import React from 'react';

import { Divisor } from '../../../../../../../components/atoms';
import { ConfirmCancelFooter } from '../../../../../../../components/organisms';
import { Content } from '../../../../styles';
import {
    Answer,
    Caption,
    Column,
    EditIcon,
    Item,
    Question,
    Row,
    SubTitle,
    Title
} from './styles';

const WizardSummary = ({
    answers,
    questoes,
    nome,
    handleEdit,
    onSubmit,
    onReset
}) => {
    return (
        <Content>
            <Title>Confira suas respostas</Title>

            <Caption>
                Revise as respostas e se certifique que está tudo certo antes de
                registrar a auto-avaliação.
            </Caption>

            <SubTitle>{nome}</SubTitle>

            {Object.keys(answers).map((key, idx) => (
                <Item key={`item_${idx}`}>
                    <Row>
                        <Column>
                            <Question>{questoes[idx].pergunta}</Question>
                            <Answer>
                                {
                                    questoes[idx].respostas?.find(
                                        ({ codigo }) =>
                                            codigo === answers[key].radioButton
                                    ).nome
                                }
                            </Answer>
                        </Column>

                        <EditIcon onClick={() => handleEdit(idx + 1)} />
                    </Row>

                    <Divisor />
                </Item>
            ))}

            <ConfirmCancelFooter
                fixed={true}
                confirmButtonLabel={'Confirmar respostas'}
                cancelButtonLabel={'Responder novamente'}
                onConfirm={() =>
                    onSubmit(
                        Object.values(answers).map(
                            ({ radioButton }) => radioButton
                        )
                    )
                }
                onCancel={onReset}
                confirmButtonType="button"
                inline={false}
            />
        </Content>
    );
};

export default WizardSummary;
