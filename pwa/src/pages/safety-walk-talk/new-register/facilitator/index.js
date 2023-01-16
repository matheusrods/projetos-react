import { inject, observer } from 'mobx-react';
import { FaExclamationTriangle } from 'react-icons/fa';
import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CompanyHeader, NextButton } from '../../../../components/atoms';
import {
    LoadingContainer,
    ModalComplex
} from '../../../../components/molecules';
import { ButtonMultiSelect, Header } from '../../../../components/organisms';
import { getEmployees } from '../../../../services/endpoints/users';
import {
    Container,
    Content,
    PageInfo,
    PageTitle,
    PageDescription
} from './styles';

const NewRegisterFacilitator = ({ NewRegisterSWT, UserStore: { user } }) => {
    const {
        getForm,
        facilitator,
        registrationLocation: { location },
        setNewRegisterData
    } = NewRegisterSWT;

    const history = useHistory();

    const [loading, setLoading] = useState(true);
    const [nextLoading, setNextLoading] = useState(false);
    const [facilitators, setFacilitators] = useState([]);
    const [modalExitPage, setModalExitPage] = useState(false);

    const { clientId } = user;

    useEffect(() => {
        const getData = async () => {
            const { employees } = await getEmployees({ internal: 1 });

            setFacilitators(employees);

            setLoading(false);
        };

        getData();
    }, []);

    return (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <CompanyHeader
                    positionRelative={true}
                    typeAction={'EHS Walk & Talk'}
                    onClose={() => setModalExitPage(true)}
                />
                {loading ? (
                    <LoadingContainer />
                ) : (
                    <Content>
                        <PageInfo>
                            <PageTitle>Informe facilitador</PageTitle>
                            <PageDescription>
                                Informe abaixo o facilitador que o acompanhou
                                durante o Walk&Talk (opcional)
                            </PageDescription>
                        </PageInfo>
                        <ButtonMultiSelect
                            pageTitle={'Dados do facilitador'}
                            fieldName={'Facilitador'}
                            category={'user'}
                            fieldsFilter={['name']}
                            labelSearchInput={'Facilitador'}
                            single={true}
                            items={facilitators}
                            selected={facilitator?.id}
                            onSave={(items) => {
                                setFacilitators([...items]);

                                const user = items.find(
                                    (item) => item.selected
                                );

                                if (user) {
                                    setNewRegisterData({
                                        facilitator: { ...user }
                                    });
                                } else {
                                    setNewRegisterData({ facilitator: {} });
                                }
                            }}
                        />
                    </Content>
                )}
                <NextButton
                    positionRelative={true}
                    onBack={() =>
                        history.push(
                            '/safety-walk-talk/new-register/other-participants'
                        )
                    }
                    nextDisabled={nextLoading || loading}
                    loading={nextLoading}
                    onNext={async () => {
                        setNextLoading(true);

                        const response = await getForm(clientId);

                        if (response) {
                            setNewRegisterData({
                                currentStep:
                                    '/safety-walk-talk/new-register/dynamic-form/1'
                            });
                            history.push('dynamic-form/1');
                        }

                        setNextLoading(false);
                    }}
                    nextLabel={facilitator?.id ? 'Avançar' : 'Pular'}
                />
            </Container>
            <ModalComplex
                title={'Atenção'}
                description={
                    'Ao sair, tentaremos salvar os passos anteriores até aqui. Tem certeza que deseja sair?'
                }
                nameModal={'exit-page'}
                visible={modalExitPage}
                onCancel={() => setModalExitPage(false)}
                onConfirm={() => history.push('/safety-walk-talk/')}
                icon={<FaExclamationTriangle size={40} color={'#FF5C69'} />}
                confirmButtonLabel={'Sair'}
                cancelButtonLabel={'Cancelar'}
            />
        </Fragment>
    );
};

export default inject('NewRegisterSWT', 'UserStore')(observer(NewRegisterFacilitator));
