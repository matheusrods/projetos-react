import React, { Fragment, useState } from 'react';
import { Redirect, useHistory } from 'react-router';
import { inject, observer } from 'mobx-react';
import { NextButton, WhiteHeaderBack } from '../../../../../components/atoms';
import {
    Container,
    ContainerTitles,
    H2,
    H1,
    ContainerMethodology5w,
    ContainerMethodology2h,
    Title,
    ContainerQuestion,
    Icon,
    ContainerInput,
    QuestionLabel,
    QuestionAnswer,
    ContainerAnswer,
    ContainerMore,
    ContainerContent
} from './styles';
import * as Icons from 'react-icons/fi';
import { ModalComplex } from '../../../../../components/molecules';
import { FaExclamationTriangle } from 'react-icons/fa';

const AuditResponsibleDealt5W2H = ({ Auditing }) => {
    const history = useHistory();

    const {
        unConformityRequirement = null,
        dealInEditing,
        addResponseInMethodology5W2H,
        updateResponseInMethodology
    } = Auditing;

    const [modalAlertVisible, setModalAlertVisible] = useState(false);

    const handleSubmit = () => {
        const { response: { methodology5W2H } } = dealInEditing;

        let hasEmptyQuestion = false;

        methodology5W2H.forEach((response) => {
            if (hasEmptyQuestion) {
                return;
            }

            for (const key in response.questions5W) {
                if (response.questions5W[key] === '') {
                    hasEmptyQuestion = true;
                }
            }

            for (const key in response.questions2H) {
                if (response.questions2H[key] === '') {
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

    const renderIcon = (iconName, props = {}) => {
        try {
            const iconConverted = `Fi${iconName}`;

            return Icons[iconConverted](props);
        } catch (error) {
            return Icons['FiCheck'](props);
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
                        <H1>5W2H</H1>
                    </ContainerTitles>
                    {dealInEditing?.response?.methodology5W2H?.map((response, indexQuestion) => (
                        <Fragment key={indexQuestion}>
                            <ContainerMethodology5w>
                                <Title>5W</Title>
                                <ContainerInput>
                                    <ContainerQuestion>
                                        <Icon>{renderIcon('Search')}</Icon>
                                        <QuestionLabel>O que? (What)</QuestionLabel>
                                    </ContainerQuestion>
                                    <ContainerAnswer>
                                        <QuestionAnswer
                                            type={'text'}
                                            placeholder={'Escreva aqui'}
                                            defaultValue={response?.questions5W?.what}
                                            onChange={({ target: { value } }) =>
                                                updateResponseInMethodology(
                                                    'methodology5W2H',
                                                    indexQuestion,
                                                    'questions5W',
                                                    'what',
                                                    value
                                                )
                                            }
                                        />
                                    </ContainerAnswer>
                                </ContainerInput>
                                <ContainerInput>
                                    <ContainerQuestion>
                                        <Icon>{renderIcon('HelpCircle')}</Icon>
                                        <QuestionLabel>Por quê? (Why)</QuestionLabel>
                                    </ContainerQuestion>
                                    <ContainerAnswer>
                                        <QuestionAnswer
                                            type={'text'}
                                            placeholder={'Escreva aqui'}
                                            defaultValue={response?.questions5W?.why}
                                            onChange={({ target: { value } }) =>
                                                updateResponseInMethodology(
                                                    'methodology5W2H',
                                                    indexQuestion,
                                                    'questions5W',
                                                    'why',
                                                    value
                                                )
                                            }
                                        />
                                    </ContainerAnswer>
                                </ContainerInput>
                                <ContainerInput>
                                    <ContainerQuestion>
                                        <Icon>{renderIcon('MapPin')}</Icon>
                                        <QuestionLabel>Onde? (Where)</QuestionLabel>
                                    </ContainerQuestion>
                                    <ContainerAnswer>
                                        <QuestionAnswer
                                            type={'text'}
                                            placeholder={'Escreva aqui'}
                                            defaultValue={response?.questions5W?.where}
                                            onChange={({ target: { value } }) =>
                                                updateResponseInMethodology(
                                                    'methodology5W2H',
                                                    indexQuestion,
                                                    'questions5W',
                                                    'where',
                                                    value
                                                )
                                            }
                                        />
                                    </ContainerAnswer>
                                </ContainerInput>
                                <ContainerInput>
                                    <ContainerQuestion>
                                        <Icon>{renderIcon('Clock')}</Icon>
                                        <QuestionLabel>Quando? (When)</QuestionLabel>
                                    </ContainerQuestion>
                                    <ContainerAnswer>
                                        <QuestionAnswer
                                            type={'text'}
                                            placeholder={'Escreva aqui'}
                                            defaultValue={response?.questions5W?.when}
                                            onChange={({ target: { value } }) =>
                                                updateResponseInMethodology(
                                                    'methodology5W2H',
                                                    indexQuestion,
                                                    'questions5W',
                                                    'when',
                                                    value
                                                )
                                            }
                                        />
                                    </ContainerAnswer>
                                </ContainerInput>
                                <ContainerInput>
                                    <ContainerQuestion>
                                        <Icon>{renderIcon('Users')}</Icon>
                                        <QuestionLabel>Quem? (Who)</QuestionLabel>
                                    </ContainerQuestion>
                                    <ContainerAnswer>
                                        <QuestionAnswer
                                            type={'text'}
                                            placeholder={'Escreva aqui'}
                                            defaultValue={response?.questions5W?.who}
                                            onChange={({ target: { value } }) =>
                                                updateResponseInMethodology(
                                                    'methodology5W2H',
                                                    indexQuestion,
                                                    'questions5W',
                                                    'who',
                                                    value
                                                )
                                            }
                                        />
                                    </ContainerAnswer>
                                </ContainerInput>
                            </ContainerMethodology5w>
                            <ContainerMethodology2h>
                                <Title>2H</Title>
                                <ContainerInput>
                                    <ContainerQuestion>
                                        <Icon>{renderIcon('Tool')}</Icon>
                                        <QuestionLabel>Como? (How)</QuestionLabel>
                                    </ContainerQuestion>
                                    <ContainerAnswer>
                                        <QuestionAnswer
                                            type={'text'}
                                            placeholder={'Escreva aqui'}
                                            defaultValue={response?.questions2H?.how}
                                            onChange={({ target: { value } }) =>
                                                updateResponseInMethodology(
                                                    'methodology5W2H',
                                                    indexQuestion,
                                                    'questions2H',
                                                    'how',
                                                    value
                                                )
                                            }
                                        />
                                    </ContainerAnswer>
                                </ContainerInput>
                                <ContainerInput>
                                    <ContainerQuestion>
                                        <Icon>{renderIcon('DollarSign')}</Icon>
                                        <QuestionLabel>Quanto? (How much)</QuestionLabel>
                                    </ContainerQuestion>
                                    <ContainerAnswer>
                                        <QuestionAnswer
                                            type={'text'}
                                            placeholder={'Escreva aqui'}
                                            defaultValue={response?.questions2H?.howMuch}
                                            onChange={({ target: { value } }) =>
                                                updateResponseInMethodology(
                                                    'methodology5W2H',
                                                    indexQuestion,
                                                    'questions2H',
                                                    'howMuch',
                                                    value
                                                )
                                            }
                                        />
                                    </ContainerAnswer>
                                </ContainerInput>
                            </ContainerMethodology2h>
                        </Fragment>
                    ))}
                    <ContainerMore onClick={addResponseInMethodology5W2H}>
                        <Icon>{renderIcon('Plus')}</Icon>
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

export default inject('Auditing')(observer(AuditResponsibleDealt5W2H));
