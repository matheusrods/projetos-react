import React from 'react';

import styles, { Container } from './styles';
import { WizardQuestions, WizardSummary, WizardSuccess } from './components';
import useWizard from './useWizard';
import { Loading } from '../../../../../components/atoms';

const WizardForm = ({ questionario, onSubmit, pending, success, reset }) => {
    const wizard = useWizard(questionario.questoes, reset);

    return (
        <Container>
            {success && <WizardSuccess />}

            {pending && (
                <Loading
                    label={
                        wizard.answers
                            ? 'Gerando resultado...'
                            : 'Carregando questões'
                    }
                    caption={pending && 'Por favor, aguarde.'}
                    color={styles.loading}
                />
            )}

            {!pending && !success && (
                <>
                    {wizard.answers && (!wizard.finish || wizard.edit) && (
                        <WizardQuestions
                            questionario={questionario}
                            step={wizard.step}
                            answers={wizard.answers}
                            setanswers={wizard.setanswers}
                            handleNext={wizard.handleNext}
                            handleBack={wizard.handleBack}
                            nextLabel={wizard.nextLabel}
                        />
                    )}

                    {wizard.answers && wizard.finish && !wizard.edit && (
                        <WizardSummary
                            answers={wizard.answers}
                            questoes={questionario.questoes}
                            nome={questionario.nome}
                            handleEdit={wizard.handleEdit}
                            onSubmit={onSubmit}
                            onReset={wizard.onReset}
                        />
                    )}
                </>
            )}
        </Container>
    );
};

export default WizardForm;
