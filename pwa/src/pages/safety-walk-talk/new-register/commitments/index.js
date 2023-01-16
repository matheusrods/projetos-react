import React, { Fragment, useState } from 'react';
import { Form } from '@unform/web';
import { FaExclamationTriangle } from 'react-icons/fa';
import { observer, inject } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { Header } from '../../../../components/organisms';
import {
    CompanyHeader,
    NextButton,
    TextArea
} from '../../../../components/atoms';
import {
    Container,
    Content,
    PageInfo,
    PageTitle,
    PageDescription
} from './styles';
import _ from 'lodash';
import { ModalComplex } from '../../../../components/molecules';

const NewRegisterCommitments = ({ NewRegisterSWT }) => {
    const {
        commitments: commitmentsStore,
        setNewRegisterData,
        form
    } = NewRegisterSWT;

    const history = useHistory();

    const [commitments, setCommitments] = useState(commitmentsStore);
    const [modalExitPage, setModalExitPage] = useState(false);

    return (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <CompanyHeader
                    positionRelative={true}
                    typeAction={'EHS Walk & Talk'}
                    onClose={() => setModalExitPage(true)}
                />
                <Content>
                    <PageInfo>
                        <PageTitle>Compromissos</PageTitle>
                        <PageDescription>
                            Descreva os compromissos estabelecidos com as
                            pessoas, durante esse Walk & Talk
                        </PageDescription>
                    </PageInfo>
                    <Form>
                        <TextArea
                            label={'Compromissos'}
                            placeholder={'Descreva aqui os compromissos'}
                            name={'commitments'}
                            value={commitments}
                            onChange={(e) => setCommitments(e.target.value)}
                        />
                    </Form>
                </Content>
                <NextButton
                    positionRelative={true}
                    onBack={() =>
                        history.push(
                            `/safety-walk-talk/new-register/dynamic-form/${form.topics.length}`
                        )
                    }
                    onNext={() => {
                        setNewRegisterData({
                            commitments: commitments ?? '',
                            currentStep: '/safety-walk-talk/new-register/commitments'
                        });
                        history.push('improvement-actions');
                    }}
                    nextLabel={
                        _.isEmpty(commitments) || _.isNull(commitments)
                            ? 'Pular'
                            : 'Avançar'
                    }
                />
            </Container>
            <ModalComplex
                title={'Atenção'}
                description={'Ao sair, você perdera os dados dessa tela. Tentaremos salvar os passos anteriores até aqui. Tem certeza que deseja sair?'}
                nameModal={'exit-page'}
                visible={modalExitPage}
                onCancel={() => setModalExitPage(false)}
                onConfirm={() => history.push('/safety-walk-talk')}
                icon={<FaExclamationTriangle size={40} color={'#FF5C69'} />}
                confirmButtonLabel={'Sair'}
                cancelButtonLabel={'Cancelar'}
            />
        </Fragment>
    );
};

export default inject('NewRegisterSWT')(observer(NewRegisterCommitments));
