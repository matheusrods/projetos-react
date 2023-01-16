import React, { Fragment, useState, useRef } from 'react';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import { FaHome, FaExclamationCircle } from 'react-icons/fa';
import { FiAlertCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useHistory, Redirect } from 'react-router-dom';
import {
    CompanyHeader,
    NextButton,
    SingleNextButton,
    AddButton
} from '../../../../../../../components/atoms';
import {
    CompletionSuccess,
    LoadingContainer,
    ModalComplex
} from '../../../../../../../components/molecules';
import {
    Container,
    Content,
    Title,
    ContainerSignature,
    Image,
    Name,
    Date,
    ContainerSuccess,
    ContainerNotFound,
    ContainerIconNotFound,
    TextNotFound,
    ContainerSignaturesModal,
    TextSignaturesModal,
    InputSignatures
} from './styles';
import { sendSignatures } from '../../../../../../../services/endpoints/audit/profile-auditor/end-of-audit/signatures';
import { Header } from '../../../../../../../components/organisms';

function AuditSignatures({ AuditProfileAuditorStore }) {
    const history = useHistory();

    const { signaturesAudit, resetSignatures, programmingInEditing: programming = null } = AuditProfileAuditorStore;

    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const [completed, setCompleted] = useState(false);
    const [alertModalVisible, setAlertModalVisible] = useState(false);
    const [exitModalVisible, setExitModalVisible] = useState(false);
    const [signaturesModalVisible, setSignaturesModalVisible] = useState(false);
    const [numberOfSignatures, setNumberOfSignatures] = useState(''); //history.location.state?.numberOfSignatures ??

    const refInputSignatures = useRef(null);

    const handleSubmit = async () => {
        try {
            if (!signaturesAudit.length) {
                setAlertModalVisible(false);
                toast.error('Nenhuma assinatura coletada!');
                return
            }

            const plainArray = signaturesAudit.slice();

            const signatures = [];

            plainArray.forEach((item) => {
                const data = JSON.stringify(item);

                signatures.push(JSON.parse(data));
            });

            const formattedData = {
                codigo_auditoria_programacao: programming.id,
                assinaturas: signatures
            };

            setLoadingSubmit(true);

            const response = await sendSignatures(formattedData);

            if (response) {
                setLoadingSubmit(false);
                setCompleted(true);
            }
        } catch (error) {
            setLoadingSubmit(false);
        }
    };

    if (!programming) {
        return <Redirect to={'/audit/profile-auditor'} />
    } else if (completed) {
        return (
            <Fragment>
                <Header hiddenMobile={true} />
                <ContainerSuccess>
                    <Content>
                        <CompletionSuccess
                            title={'Enviado! Auditoria finalizada com sucesso!'}
                            description={'Você será redirecionado para a tela inicial'}
                            redirectTime={5000}
                            fullscreen={completed}
                            redirectTo={() => history.push('/audit/profile-auditor')}
                        />
                    </Content>
                    <SingleNextButton
                        positionRelative={true}
                        onNext={() => history.push('/audit/profile-auditor')}
                        nextLabel={'Ir para início'}
                        icon={<FaHome />}
                    />
                </ContainerSuccess>
            </Fragment>
        );
    } else {
        if (loadingSubmit) {
            return (
                <Fragment>
                    <Header hiddenMobile={true} />
                    <Container>
                        <LoadingContainer text={'Enviando assinaturas...'} />
                    </Container>
                </Fragment>
            );
        }

        return (
            <Fragment>
                <Header hiddenMobile={true} />
                <Container>
                    <CompanyHeader
                        positionRelative={true}
                        onClose={() => history.goBack()}
                        typeAction={'Auditoria em andamento'}
                    />
                    <Content>
                        <Title>Assinatura Digital dos auditados</Title>
                        {!signaturesAudit.length ?
                            <ContainerNotFound>
                                <ContainerIconNotFound>
                                    <FaExclamationCircle></FaExclamationCircle>
                                </ContainerIconNotFound>
                                <TextNotFound>
                                    Nenhuma assinatura coletada.
                                </TextNotFound>
                            </ContainerNotFound>
                            :
                            signaturesAudit.map((signatures, index) => {
                                return (
                                    <ContainerSignature key={index}>
                                        <Image src={signatures.assinatura} />
                                        <Name>{signatures.nome}</Name>
                                    </ContainerSignature>
                                );
                            })
                        }
                        <Date>Data: {moment().format('DD/MM/YYYY')}</Date>
                    </Content>
                    <AddButton
                        bottom={68}
                        position={'absolute'}
                        onClick={() => setSignaturesModalVisible(true)}
                    />
                    <NextButton
                        positionRelative={true}
                        nextLabel='Finalizar'
                        onBack={() => setExitModalVisible(true)}
                        onNext={() => setAlertModalVisible(true)}
                        nextDisabled={loadingSubmit}
                        loading={loadingSubmit}
                    />
                </Container>
                <ModalComplex
                    nameModal={'alert-modal'}
                    visible={alertModalVisible}
                    onConfirm={() => handleSubmit()}
                    onCancel={() => setAlertModalVisible(false)}
                    title={'Concluir essa auditoria?'}
                    description={'Ao prosseguir essa auditoria será finalizada.'}
                    confirmButtonLabel={'Finalizar'}
                    cancelButtonLabel={'Cancelar'}
                    icon={<FiAlertCircle color={'#00B247'} />}
                ></ModalComplex>
                <ModalComplex
                    nameModal={'alert-modal'}
                    visible={exitModalVisible}
                    onConfirm={() => {
                        history.goBack();
                        resetSignatures();
                    }}
                    onCancel={() => setExitModalVisible(false)}
                    title={'Tem certeza que deseja voltar?'}
                    description={'Ao voltar todas as assinaturas serão perdidas.'}
                    confirmButtonLabel={'Estou ciente'}
                    cancelButtonLabel={'Cancelar'}
                    icon={<FiAlertCircle />}
                />
                <ModalComplex
                    nameModal={'signatures-modal'}
                    visible={signaturesModalVisible}
                    onCancel={() => setSignaturesModalVisible(false)}
                    onConfirm={() => {
                        if (numberOfSignatures > 0) {
                            history.push({
                                pathname: '/audit/profile-auditor/start-audit/signatures',
                                state: {
                                    numberOfSignatures: numberOfSignatures
                                }
                            });

                            return;
                        }

                        refInputSignatures.current.focus();
                    }}
                    confirmButtonLabel={'Salvar'}
                    cancelButtonLabel={'Cancelar'}
                >
                    <ContainerSignaturesModal>
                        <TextSignaturesModal>
                            Quantas assinaturas deseja coletar?
                        </TextSignaturesModal>
                        <InputSignatures
                            ref={refInputSignatures}
                            type={'number'}
                            name={`title-annotation`}
                            defaultValue={numberOfSignatures}
                            onChange={({ target: { value } }) => setNumberOfSignatures(value)}
                            placeholder={'Quantidade de assinaturas'}
                        />
                    </ContainerSignaturesModal>
                </ModalComplex>
            </Fragment>
        );
    }
}

export default inject('AuditProfileAuditorStore')(observer(AuditSignatures));
