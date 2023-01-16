import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';

import {
    Container,
    Body
} from './styles';
import {Loading, WhiteHeader} from '../../../components/atoms';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import BottomNavigationButton from '../../../components/atoms/bottom-navigation-button';
import IndexQuestionInspection from './steps/index';
import QuestionInspection from './steps/question';
import FormQuestionInspection from "./steps/form";
import ResultInspection from "./steps/result";
import SignaturesInspection from "./steps/signatures";
import ImprovementActions from "./steps/improvement-actions";
import FinishQuestionInspection from "./steps/finish";
import SummaryInspection from "./steps/summary";

const QuestionsInspection = ({ HomeInspectionStore, InspectionQuestionsStore }) => {
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const location = useLocation();
    const history = useHistory();

    const {
        homePath,
    } = HomeInspectionStore;

    const {
        getInspectionById,
        title,
        labelNextStep,
        backStep,
        backAction,
        step,
        setStep,
        nextAction,
        nextDisabled,
    } = InspectionQuestionsStore;

    const loadInspection = async () => {
        setLoading(true);
        await getInspectionById(params.id);
        setLoading(false);
    }

    const switchStep = (step) => {
        switch (step) {
            case 'index':
                return <IndexQuestionInspection />;
            case 'form':
                return <FormQuestionInspection />;
            case 'question':
                return <QuestionInspection />;
            case 'result':
                return <ResultInspection />;
            case 'summary':
                return <SummaryInspection />;
            case 'signatures':
                return <SignaturesInspection />;
            case 'actions':
                return <ImprovementActions />;
            case 'finish':
                return <FinishQuestionInspection />;
            default:
                return <IndexQuestionInspection />;
        }
    }

    useEffect(() => {
        setStep('index');
        loadInspection();
    }, []);

    return (
        <Container key={location.key}>
            {loading ?
                <Loading /> :
                <>
                    <WhiteHeader
                        title={title}
                        onClose={() => history.push(homePath)}
                    />
                    <Body>
                        {switchStep(step)}
                    </Body>
                    {step !== 'finish' &&
                        <BottomNavigationButton
                            nextLabel={labelNextStep}
                            onNext={() => nextAction()}
                            onBack={() => backAction()}
                            showBack={backStep !== null}
                            positionRelative={true}
                            nextDisabled={nextDisabled}
                        />
                    }

                </>
            }
        </Container>
    );
};

export default inject('HomeInspectionStore', 'InspectionQuestionsStore')(observer(QuestionsInspection));
