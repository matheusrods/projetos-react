import React, { Fragment, useState } from 'react';
import { Redirect, useHistory } from 'react-router';
import { inject, observer } from 'mobx-react';
import {
    InputDefault,
    NextButton,
    WhiteHeaderBack
} from '../../../../../components/atoms';
import {
    Container,
    ContainerTitles,
    H2,
    H1,
    ContainerMethodology5pqs,
    Cause,
    ContainerQuestion,
    Icon,
    QuestionAnswer,
    ContainerAnswer,
    ContainerMore,
    Number,
    QuestionTitle,
    ContainerTitle,
    ContainerContent
} from './styles';
import { CardMethodologyAudit, ModalComplex, } from '../../../../../components/molecules';
import { FiAlertTriangle, FiPlus } from 'react-icons/fi';
import { FaExclamationTriangle } from 'react-icons/fa';

const AuditResponsibleDealt5PQS = ({ Auditing }) => {
    const history = useHistory();

    const {
        unConformityRequirement = null,
        dealInEditing,
        addResponseInMethodology5PQs,
        updateResponseInMethodology
    } = Auditing;

    const [modalAlertVisible, setModalAlertVisible] = useState(false);

    const handleSubmit = () => {
        const { response: { methodology5PQs } } = dealInEditing;

        let hasEmptyQuestion = false;

        methodology5PQs.forEach((response) => {
            if (hasEmptyQuestion) {
                return;
            }

            for (const key in response) {
                if (hasEmptyQuestion) {
                    return;
                }

                if (
                    (
                        typeof response[key] === 'string'
                        && response[key] === ''
                    ) || (
                        typeof response[key] === 'object'
                        && (response[key].why === '' || response[key].answer === '')
                    )
                ) {
                    hasEmptyQuestion = true;
                }
            }
        });

        if (hasEmptyQuestion) {
            setModalAlertVisible(true);
        } else {
            history.push('/audit/responsible-dealt/steps/investigation-cause');
        }
    };

    return unConformityRequirement ? (
        <Fragment>
            <WhiteHeaderBack
                title={'Tratativa de NC/OM'}
                onBack={history.goBack}
            />
            <Container>
                <ContainerContent>
                    <ContainerTitles>
                        <H2>Metodologia</H2>
                        <H1>5PQs</H1>
                    </ContainerTitles>
                    {dealInEditing?.response?.methodology5PQs?.map((question, indexQuestion) => (
                        <Fragment key={indexQuestion}>
                            <CardMethodologyAudit
                                icon={<FiAlertTriangle />}
                                fontColor={'#9B51E0'}
                                title={'PROBLEMA'}
                            >
                                <InputDefault
                                    placeholder={'Escreva o problema'}
                                    type={'text'}
                                    name={`problem${indexQuestion}`}
                                    onChange={({ target: { value } }) =>
                                        updateResponseInMethodology(
                                            'methodology5PQs',
                                            indexQuestion,
                                            null,
                                            'problem',
                                            value
                                        )
                                    }
                                    defaultValue={question.problem}
                                    width={'100%'}
                                    flexDirection={'column'}
                                />
                            </CardMethodologyAudit>
                            <ContainerMethodology5pqs>
                                <Cause>
                                    Causa válida {indexQuestion + 1}
                                </Cause>
                                <ContainerAnswer>
                                    <QuestionAnswer
                                        type={'text'}
                                        placeholder={'Escreva sua causa aqui'}
                                        defaultValue={question.cause}
                                        onChange={({ target: { value } }) =>
                                            updateResponseInMethodology(
                                                'methodology5PQs',
                                                indexQuestion,
                                                null,
                                                'cause',
                                                value
                                            )
                                        }
                                    />
                                </ContainerAnswer>
                                <ContainerQuestion>
                                    <ContainerTitle>
                                        <Number>1</Number>
                                        <QuestionTitle>Porquê</QuestionTitle>
                                    </ContainerTitle>
                                    <QuestionAnswer
                                        type={'text'}
                                        placeholder={'Escreva a sua pergunta aqui'}
                                        name={'question'}
                                        defaultValue={question.firstWhy.why}
                                        onChange={({ target: { value } }) =>
                                            updateResponseInMethodology(
                                                'methodology5PQs',
                                                indexQuestion,
                                                'firstWhy',
                                                'why',
                                                value
                                            )
                                        }
                                    />
                                    <InputDefault
                                        placeholder={'Escreva a resposta'}
                                        type={'text'}
                                        name={`answer${indexQuestion}1`}
                                        defaultValue={question.firstWhy.answer}
                                        onChange={({ target: { value } }) =>
                                            updateResponseInMethodology(
                                                'methodology5PQs',
                                                indexQuestion,
                                                'firstWhy',
                                                'answer',
                                                value
                                            )
                                        }
                                        width={'100%'}
                                        flexDirection={'column'}
                                    />
                                </ContainerQuestion>
                                <ContainerQuestion>
                                    <ContainerTitle>
                                        <Number>2</Number>
                                        <QuestionTitle>Porquê</QuestionTitle>
                                    </ContainerTitle>
                                    <QuestionAnswer
                                        type={'text'}
                                        placeholder={'Escreva a sua pergunta aqui'}
                                        name={'question'}
                                        defaultValue={question.secondWhy.why}
                                        onChange={({ target: { value } }) =>
                                            updateResponseInMethodology(
                                                'methodology5PQs',
                                                indexQuestion,
                                                'secondWhy',
                                                'why',
                                                value
                                            )
                                        }
                                    />
                                    <InputDefault
                                        placeholder={'Escreva a resposta'}
                                        type={'text'}
                                        name={`answer${indexQuestion}2`}
                                        defaultValue={question.secondWhy.answer}
                                        onChange={({ target: { value } }) =>
                                            updateResponseInMethodology(
                                                'methodology5PQs',
                                                indexQuestion,
                                                'secondWhy',
                                                'answer',
                                                value
                                            )
                                        }
                                        width={'100%'}
                                        flexDirection={'column'}
                                    />
                                </ContainerQuestion>
                                <ContainerQuestion>
                                    <ContainerTitle>
                                        <Number>3</Number>
                                        <QuestionTitle>Porquê</QuestionTitle>
                                    </ContainerTitle>
                                    <QuestionAnswer
                                        type={'text'}
                                        placeholder={'Escreva a sua pergunta aqui'}
                                        name={'question'}
                                        defaultValue={question.thirdWhy.why}
                                        onChange={({ target: { value } }) =>
                                            updateResponseInMethodology(
                                                'methodology5PQs',
                                                indexQuestion,
                                                'thirdWhy',
                                                'why',
                                                value
                                            )
                                        }
                                    />
                                    <InputDefault
                                        placeholder={'Escreva a resposta'}
                                        type={'text'}
                                        name={`answer${indexQuestion}3`}
                                        defaultValue={question.thirdWhy.answer}
                                        onChange={({ target: { value } }) =>
                                            updateResponseInMethodology(
                                                'methodology5PQs',
                                                indexQuestion,
                                                'thirdWhy',
                                                'answer',
                                                value
                                            )
                                        }
                                        width={'100%'}
                                        flexDirection={'column'}
                                    />
                                </ContainerQuestion>
                                <ContainerQuestion>
                                    <ContainerTitle>
                                        <Number>4</Number>
                                        <QuestionTitle>Porquê</QuestionTitle>
                                    </ContainerTitle>
                                    <QuestionAnswer
                                        type={'text'}
                                        placeholder={'Escreva a sua pergunta aqui'}
                                        name={'question'}
                                        defaultValue={question.fourthWhy.why}
                                        onChange={({ target: { value } }) =>
                                            updateResponseInMethodology(
                                                'methodology5PQs',
                                                indexQuestion,
                                                'fourthWhy',
                                                'why',
                                                value
                                            )
                                        }
                                    />
                                    <InputDefault
                                        placeholder={'Escreva a resposta'}
                                        type={'text'}
                                        name={`answer${indexQuestion}4`}
                                        defaultValue={question.fourthWhy.answer}
                                        onChange={({ target: { value } }) =>
                                            updateResponseInMethodology(
                                                'methodology5PQs',
                                                indexQuestion,
                                                'fourthWhy',
                                                'answer',
                                                value
                                            )
                                        }
                                        width={'100%'}
                                        flexDirection={'column'}
                                    />
                                </ContainerQuestion>
                                <ContainerQuestion>
                                    <ContainerTitle>
                                        <Number>5</Number>
                                        <QuestionTitle>Porquê</QuestionTitle>
                                    </ContainerTitle>
                                    <QuestionAnswer
                                        type={'text'}
                                        placeholder={'Escreva a sua pergunta aqui'}
                                        name={'question'}
                                        defaultValue={question.fifthWhy.why}
                                        onChange={({ target: { value } }) =>
                                            updateResponseInMethodology(
                                                'methodology5PQs',
                                                indexQuestion,
                                                'fifthWhy',
                                                'why',
                                                value
                                            )
                                        }
                                    />
                                    <InputDefault
                                        placeholder={'Escreva a resposta'}
                                        type={'text'}
                                        name={`answer${indexQuestion}5`}
                                        defaultValue={question.fifthWhy.answer}
                                        onChange={({ target: { value } }) =>
                                            updateResponseInMethodology(
                                                'methodology5PQs',
                                                indexQuestion,
                                                'fifthWhy',
                                                'answer',
                                                value
                                            )
                                        }
                                        width={'100%'}
                                        flexDirection={'column'}
                                    />
                                </ContainerQuestion>
                            </ContainerMethodology5pqs>
                        </Fragment>
                    ))}
                    <ContainerMore
                        onClick={addResponseInMethodology5PQs}
                    >
                        <Icon>
                            <FiPlus />
                        </Icon>
                        Adicionar itens
                    </ContainerMore>
                </ContainerContent>
                <NextButton
                    positionRelative={true}
                    onBack={history.goBack}
                    onNext={handleSubmit}
                    nextLabel={'Avançar'}
                />
            </Container>
            <ModalComplex
                title={"Atenção"}
                description={"É obrigatório responder todas as perguntas."}
                nameModal={"alert-page"}
                visible={modalAlertVisible}
                onCancel={() => setModalAlertVisible(false)}
                onConfirm={() => setModalAlertVisible(false)}
                icon={<FaExclamationTriangle size={40} color={"#FAA50A"} />}
                confirmButtonLabel={"Ok"}
                uniqueFooterButton
            />
        </Fragment>
    ) : <Redirect to={'/audit/responsible-dealt'} />;
};

export default inject('Auditing')(observer(AuditResponsibleDealt5PQS));
