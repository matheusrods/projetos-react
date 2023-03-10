import React, { Fragment, useEffect, useRef, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { FaHome } from 'react-icons/fa';

import {
    Body,
    Container,
    Wrapper,
    Title,
    Paragraph,
    InputWrapper,
    InfoTitle,
    InfoParagraph,
    Line,
    WrapperInfo
} from './styles';
import {
    ModalComplex,
    ModalComplexPage
} from '../../../components/molecules';
import {
    Input,
    Loading,
    NextButton,
    WhiteHeaderBack,
    BottomNavigationButton,
    IconMessageFull
} from '../../../components/atoms';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { ButtonMultiSelectList } from "../../../components/organisms";
import { Form } from '@unform/web';
import { FiAlertCircle } from 'react-icons/fi';
import colors from '../../../styles/colors';

const FormInspection = ({ HomeInspectionStore, InspectionScheduleStore }) => {
    const [loading, setLoading] = useState(true);
    const {homePath} = HomeInspectionStore;
    const {
        getAreaInspecaoList,
        getTipoInspecaoList,
        getFormList,
        getOpCoList,
        getBuList,
        getResponsavelList,
        insertForm
    } = InspectionScheduleStore;
    const history = useHistory();
    const location = useLocation();
    const params = useParams();
    const formRef = useRef(null);
    const [alertModalVisible, setAlertModalVisible] = useState(false);
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const [disabledFormList, setDisabledFormList] = useState(true);
    const [saved, setSaved] = useState(false);
    const [inspection, setInspection] = useState();


    const [listTipoInspecao, setListTipoInspecao] = useState([]);
    const [listAreaInspecao, setListAreaInspecao] = useState([]);
    const [listFormInspecao, setListFormInspecao] = useState([]);
    const [listOpCo, setListOpCo] = useState([]);
    const [listBu, setListBu] = useState([]);
    const [listResponsavel, setListResponsavel] = useState([]);
    const [nomePlano, setNomePlano] = useState('');

    const pageTitle = () => {
        return params.id ? 'Editar programa????o de inspe????o' : 'Programa????o de Inspe????o';
    }

    const checkIfHasSelected = (list) => {
        const selected = list.filter(item => item.selected === true);
        return selected.length > 0;
    };

    const getSelectedItemFromList = (list) => {
        const selected = list.filter(item => item.selected === true);
        return selected.length > 0 ? selected : [];
    };

    const getSelectedItemFromListByKey = (list, key) => {
        const selected = list.filter(item => item.selected === true);
        return selected.length > 0 ? selected[0][key] : '';
    };

    const getSelectedItemArrayToSend = (list) => {
        const selected = list.filter(item => item.selected === true);
        return selected.length > 0 ? selected.map(item => { return {codigo: item.id} }) : [];
    };

    const saveForm = async () => {
        const data = {
            id: params.id,
            tipo: getSelectedItemFromListByKey(listTipoInspecao,'id'),
            opco: getSelectedItemFromListByKey(listOpCo,'id'),
            bu: getSelectedItemFromListByKey(listBu,'id'),
            responsavel: getSelectedItemFromListByKey(listResponsavel,'id'),
            nomePlano: nomePlano,
            forms: getSelectedItemArrayToSend(listFormInspecao),
            areas: getSelectedItemArrayToSend(listAreaInspecao)
        };
        const dataReturn = await insertForm(data);
        if(dataReturn.id !== undefined){
            setShowModalConfirm(false);
            setInspection(dataReturn.id);
            setSaved(true);
        }
    };

    const handleSubmit = () => {
        let isValid = false;
        if(
            checkIfHasSelected(listTipoInspecao)
            && checkIfHasSelected(listAreaInspecao)
            && checkIfHasSelected(listFormInspecao)
            && checkIfHasSelected(listOpCo)
            && checkIfHasSelected(listBu)
            && checkIfHasSelected(listResponsavel)
            && nomePlano !== ''
        ) {
            isValid = true;
        }
            if(isValid) {
                setShowModalConfirm(true);
            } else {
                setAlertModalVisible(true);
            }
    };

    const loadData = async () => {
        try {
            setLoading(true);
            const dataListArea = await getAreaInspecaoList();
            setListAreaInspecao(dataListArea);
            const dataListTipo = await getTipoInspecaoList();
            setListTipoInspecao(dataListTipo);
            const dataListOpCo = await getOpCoList();
            setListOpCo(dataListOpCo);
            const dataListBu = await getBuList();
            setListBu(dataListBu);
            const dataListResponsavel = await getResponsavelList();
            setListResponsavel(dataListResponsavel);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    const loadForms = async (type) => {
        try {
            setLoading(true);
            const dataListForm = await getFormList(type);
            setListFormInspecao(dataListForm);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        setDisabledFormList(true);
        const selected = listTipoInspecao.filter(item => item.selected === true);
        if(selected.length > 0){
            setDisabledFormList(false);
            loadForms(selected[0].id);
        }
    }, [listTipoInspecao]);

    return (
        <Fragment key={location.key}>
            <WhiteHeaderBack
                fixed={true}
                title={pageTitle()}
                onBack={() => history.push(homePath)}
            />
            <>
                {loading ?
                    <Loading /> :
                    <Container>
                        <Body>
                            {params.id !== undefined && !saved &&
                                <Wrapper>
                                    <Title>Editar Plano de Inspe????o</Title>
                                    <Paragraph>Edite as informa????es do processo a ser inspecionado.</Paragraph>
                                </Wrapper>
                            }
                            {params.id === undefined && !saved &&
                                <Wrapper>
                                    <Title>Novo Plano de Inspe????o</Title>
                                    <Paragraph>Insira as informa????es do processo a ser inspecionado.</Paragraph>
                                </Wrapper>
                            }
                            {!saved && (
                                <Form
                                    id={"form"}
                                    ref={formRef}
                                    initialData={[]}
                                >
                                    <InputWrapper>
                                        <ButtonMultiSelectList
                                            name="type"
                                            fieldName="Tipo de inspe????o"
                                            pageTitle="Selecionar tipo de inspe????o"
                                            category="checkbox"
                                            fieldsFilter={["name"]}
                                            single={true}
                                            items={listTipoInspecao}
                                            onSave={(items) => setListTipoInspecao([...items])}
                                            showSelectedInTag={false}
                                        />
                                    </InputWrapper>

                                    <InputWrapper>
                                        <ButtonMultiSelectList
                                            name="area"
                                            fieldName="Tipo/??rea de Inspe????o"
                                            pageTitle="Selecionar tipo/??rea de inspe????o"
                                            category="checkbox"
                                            fieldsFilter={["name"]}
                                            single={false}
                                            items={listAreaInspecao}
                                            onSave={(items) => setListAreaInspecao([...items])}
                                            showSelectedInTag={false}
                                        />
                                    </InputWrapper>
                                    <InputWrapper>
                                        <ButtonMultiSelectList
                                            name="form"
                                            fieldName="Formul??rio de inspe????o"
                                            pageTitle="Selecionar formul??rio de inspe????o"
                                            category="checkbox"
                                            disabled={disabledFormList}
                                            fieldsFilter={["name"]}
                                            single={false}
                                            items={listFormInspecao}
                                            onSave={(items) => setListFormInspecao([...items])}
                                            showSelectedInTag={false}
                                        />
                                    </InputWrapper>

                                    <InputWrapper>
                                        <Input
                                            name="name"
                                            label="Nome do Plano de Inspe????o"
                                            placeholder="D?? um nome ao Plano de Inspe????o"
                                            value={nomePlano}
                                            onChange={(e) => setNomePlano(e.target.value)}
                                        />
                                    </InputWrapper>

                                    <InputWrapper>
                                        <ButtonMultiSelectList
                                            name="opco"
                                            fieldName="OpCo"
                                            pageTitle="Selecionar OpCo"
                                            category="checkbox"
                                            fieldsFilter={["name"]}
                                            single={true}
                                            items={listOpCo}
                                            onSave={(items) => setListOpCo([...items])}
                                            showSelectedInTag={false}
                                        />
                                    </InputWrapper>
                                    <InputWrapper>
                                        <ButtonMultiSelectList
                                            name="business"
                                            fieldName="Business Unit"
                                            pageTitle="Selecionar Business Unit"
                                            category="checkbox"
                                            fieldsFilter={["name"]}
                                            single={true}
                                            items={listBu}
                                            onSave={(items) => setListBu([...items])}
                                            showSelectedInTag={false}
                                        />
                                    </InputWrapper>

                                    <InputWrapper>
                                        <ButtonMultiSelectList
                                            name="responsible"
                                            fieldName="Respons??vel"
                                            pageTitle="Selecionar Respons??vel"
                                            category="user"
                                            fieldsFilter={["name"]}
                                            single={true}
                                            items={listResponsavel}
                                            onSave={(items) => setListResponsavel([...items])}
                                            showSelectedInTag={false}
                                        />
                                    </InputWrapper>
                                </Form>
                            )}
                            {saved && (
                             <IconMessageFull label='Programa????o de inspe????o finalizada com sucesso!' />
                            )}
                        </Body>

                        {!saved && (
                            <NextButton
                                positionRelative={true}
                                onBack={() => history.push(homePath)}
                                onNext={() => handleSubmit()}
                                nextDisabled={loading}
                                nextLabel="Finalizar Programa????o"
                            />
                        )}

                        {saved && (
                            <BottomNavigationButton
                                positionRelative={true}
                                onBack={() => history.push(homePath)}
                                onNext={() => history.push(`${homePath}/inspection/${inspection}/form`)}
                                nextDisabled={loading}
                                nextLabel="Iniciar Inspe????o"
                                backIcon={<FaHome color={colors.auditOrange} />}
                            />
                        )}


                    </Container>
                }

            </>
            <ModalComplex
                nameModal={'alert-modal'}
                visible={alertModalVisible}
                onConfirm={() => setAlertModalVisible(false)}
                title={'Preencha os campos!'}
                description={`Todos os campos s??o obrigat??rios!`}
                confirmButtonLabel={'Ok'}
                icon={<FiAlertCircle />}
                uniqueFooterButton={true}
                onCancel={() => setAlertModalVisible(false)}
            />

            <ModalComplexPage
                nameModal={'confirm-modal'}
                visible={showModalConfirm}
                onConfirm={() => saveForm()}
                confirmButtonLabel={'Confirmar'}
                cancelButtonLabel={'Cancelar'}
                onCancel={() => setShowModalConfirm(false)}
            >
                <WrapperInfo>
                    <InfoTitle>TIPO DE INSPE????O</InfoTitle>
                    {getSelectedItemFromList(listTipoInspecao).map((item, index) => (
                        <InfoParagraph key={index}>{item.name}</InfoParagraph>
                    ))}
                </WrapperInfo>
                <Line />

                <WrapperInfo>
                    <InfoTitle>VALIDADE DA INSPE????O</InfoTitle>
                    <InfoParagraph>-</InfoParagraph>
                </WrapperInfo>
                <Line />
                <WrapperInfo>
                    <InfoTitle>TIPO/??REA DE INSPE????O</InfoTitle>
                    {getSelectedItemFromList(listAreaInspecao).map((item, index) => (
                        <InfoParagraph key={index}>{item.name}</InfoParagraph>
                    ))}
                </WrapperInfo>
                <Line />
                <WrapperInfo>
                    <InfoTitle>FORMUL??RIO DE INSPE????O</InfoTitle>
                    {getSelectedItemFromList(listFormInspecao).map((item, index) => (
                        <InfoParagraph key={index}>{item.name}</InfoParagraph>
                    ))}
                </WrapperInfo>

                <Line />
                <WrapperInfo>
                    <InfoTitle>NOME DO PLANO DE INSPE????O</InfoTitle>
                    <InfoParagraph>{nomePlano}</InfoParagraph>
                </WrapperInfo>
                <Line />
                <WrapperInfo>
                    <InfoTitle>OPCO</InfoTitle>
                    {getSelectedItemFromList(listOpCo).map((item, index) => (
                        <InfoParagraph key={index}>{item.name}</InfoParagraph>
                    ))}
                </WrapperInfo>

                <Line />
                <WrapperInfo>
                    <InfoTitle>BUSINESS UNIT</InfoTitle>
                    {getSelectedItemFromList(listBu).map((item, index) => (
                        <InfoParagraph key={index}>{item.name}</InfoParagraph>
                    ))}
                </WrapperInfo>

                <Line />
                <WrapperInfo>
                    <InfoTitle>RESPONS??VEL</InfoTitle>
                    {getSelectedItemFromList(listResponsavel).map((item, index) => (
                        <InfoParagraph key={index}>{item.name}</InfoParagraph>
                    ))}
                </WrapperInfo>

            </ModalComplexPage>
        </Fragment>
    );
};

export default inject('HomeInspectionStore','InspectionScheduleStore')(observer(FormInspection));
