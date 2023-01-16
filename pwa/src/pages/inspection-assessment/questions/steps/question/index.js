import React, {useCallback, useEffect, useState} from 'react';
import { inject, observer } from 'mobx-react';

import {
    Container,
    ButtonsWrapper
} from './styles';
import { useLocation } from 'react-router-dom';
import {Commentary, Photos} from '../../../../../components/organisms';
import {Loading, RoundButton} from "../../../../../components/atoms";
import colors from "../../../../../styles/colors";
import {FaCamera, FaExclamationTriangle, FaPen} from 'react-icons/fa';
import TypeConfirm from "./type-confirm";
import TypeConformity from "./type-conformity";
import TypeGrade from "./type-grade";
import {ModalComplex} from "../../../../../components/molecules";
import TypeAspect from "./type-aspect";

const QuestionInspection = ({ InspectionQuestionsStore }) => {
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [pictures, setPictures] = useState([]);
    const [signatures, setSignatures] = useState([]);
    const [openModalPhotos, setOpenModalPhotos] = useState(false);
    const [openModalCommentary, setModalCommentary] = useState(false);
    const [answer, setAnswer] = useState({});
    const [commentary, setCommentary] = useState('');
    const [modalAlert, setModalAlert] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const {
        setLabelNextStep,
        setNextAction,
        setStep,
        getQuestionsByForm,
        selectedForm,
        setTitle,
        inspection,
        questions,
        setCurrentQuestion,
        currentQuestion,
        saveAnswer,
        uploadImage,
        setCurrentQuestionIndex,
        currentQuestionIndex,
    } = InspectionQuestionsStore;

    const loadQuestions = useCallback(async () => {
        setLoading(true);
        await getQuestionsByForm(selectedForm);
        setLoading(false);
    }, [getQuestionsByForm]);


    const renderQuestion = (questionType) => {

        switch (questionType) {
            case '3':
                return <TypeConformity
                    title={currentQuestion.title}
                    question={currentQuestion.question}
                    info={currentQuestion.knowMore}
                    answer={answer}
                    setAnswer={setAnswer}
                    order={currentQuestionIndex + 1}
                />
            case '1':
                return <TypeConfirm
                    title={currentQuestion.title}
                    question={currentQuestion.question}
                    answer={answer}
                    setAnswer={setAnswer}
                    order={currentQuestionIndex + 1}
                    info={currentQuestion.knowMore}
                />
            case '2':
                return <TypeGrade
                    title={currentQuestion.title}
                    question={currentQuestion.question}
                    answer={answer}
                    setAnswer={setAnswer}
                    order={currentQuestionIndex + 1}
                    info={currentQuestion.knowMore}
                    range={{
                        min: 0,
                        max: currentQuestion.grade,
                    }}
                />

            case '4':
                return <TypeAspect
                    title={currentQuestion.title}
                    question={currentQuestion.question}
                    answer={answer}
                    setAnswer={setAnswer}
                    order={currentQuestionIndex + 1}
                    info={currentQuestion.knowMore}
                    type={currentQuestion.aspectId}
                    description={currentQuestion.aspectDescription}
                    range={{
                        min: 0,
                        max: currentQuestion.grade,
                    }}
                />
            default:
                return null;
        }
    }

    const handleNextQuestion = () => {
        if(currentQuestion){
            if(currentQuestion.commentRequired === "1" && !commentary) {
                setModalMessage('É necessário preencher o comentário para continuar.');
                setNextAction(() => setModalAlert(true));
                return;
            }
            if(currentQuestion.fileRequired === "1" && pictures.length === 0) {
                setModalMessage('É necessário inserir ao menos 1 foto para continuar.');
                setNextAction(() => setModalAlert(true));
                return;
            }
            setNextAction(() => handleSaveAnswer());
        }else{
            setNextAction(() => {});
        }

    }

    const handleSaveAnswer = async () => {
        setLoading(true);
        const dataAnswer = {
            "codigo_inspecao": inspection.id,
            "codigo_form_inspecao": currentQuestion.formId,
            "codigo_questao": currentQuestion.id,
            "comentario": commentary,
            "ordem": currentQuestion.order,
            "codigo_vinculo_questao": currentQuestion.linkQuestionId ?? null
        };
        const data = await saveAnswer({
            ...dataAnswer,
            ...answer
        });

        if(pictures.length > 0) {
            for(const picture of pictures) {
                await uploadImage({
                    "codigo_form_resposta": data.id,
                    "foto": picture
                });
            }
        }

        if(questions.length === currentQuestionIndex + 1) {
            setStep('result');
        }else{
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setCurrentQuestion(questions[currentQuestionIndex + 1]);
            setLoading(false);
        }
    }

    useEffect(() => {
        setLabelNextStep('Avançar');
        setTitle(inspection.typeName);
    }, [setLabelNextStep, setTitle, inspection]);

    useEffect(() => {
        loadQuestions();
    }, [loadQuestions]);

    useEffect(() => {
        if(questions.length > 0) {
            setCurrentQuestion(questions[0]);
            setCurrentQuestionIndex(0);
        }
    }, [questions, setCurrentQuestion]);

    useEffect(() => {
        setCommentary('');
        setPictures([]);
        setAnswer({});
        if(questions.length === currentQuestionIndex + 1) {
            setLabelNextStep('Finalizar');
        }
    }, [currentQuestionIndex, setLabelNextStep, questions]);

    useEffect(() => {
        handleNextQuestion();
    }, [answer, commentary, pictures]);


    return (
        <Container key={location.key}>
            {loading ?
                <Loading />
                :
                <>
                    {renderQuestion(currentQuestion.type)}

                    {openModalCommentary &&
                        <Commentary
                            signatures={signatures}
                            setSignatures={setSignatures}
                            subHeaderLabel="Inspeção em andamento"
                            finishButtonLabel={'Adicionar comentário'}
                            commentary={commentary}
                            setCommentary={setCommentary}
                            onClose={() => setModalCommentary(false)}
                            onSave={() => setModalCommentary(false)}
                        />
                    }


                    {openModalPhotos &&
                        <Photos
                            subHeaderLabel="Inspeção em andamento"
                            title="Fotos da inspeção"
                            description="Adicione fotos que ilustrem as conformidades ou não conformidades."
                            pictures={pictures}
                            setPictures={setPictures}
                            onClose={() => setOpenModalPhotos(false)}
                        />
                    }

                    <ButtonsWrapper>
                        <RoundButton
                            onClick={() => setModalCommentary(true)}
                            position={'relative'}
                            icon={<FaPen size={21} color={"#fff"}/>}
                        />

                        <RoundButton
                            onClick={() => setOpenModalPhotos(true)}
                            position={'relative'}
                            backgroundColor={colors.subText}
                            icon={<FaCamera size={21} color={"#fff"}/>}
                        />
                    </ButtonsWrapper>

                    <ModalComplex
                        title={'Atenção'}
                        description={modalMessage}
                        nameModal={'exit-page'}
                        visible={modalAlert}
                        onCancel={() => setModalAlert(false)}
                        onConfirm={() => setModalAlert(false)}
                        icon={<FaExclamationTriangle size={40} color={'#FF5C69'} />}
                        confirmButtonLabel={'Ok'}
                        uniqueFooterButton={true}
                    />
                </>
            }

        </Container>
    );
};

export default inject('HomeInspectionStore', 'InspectionQuestionsStore')(observer(QuestionInspection));
