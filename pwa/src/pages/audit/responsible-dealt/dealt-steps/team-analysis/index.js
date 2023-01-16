import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { inject, observer } from 'mobx-react';
import { NextButton, WhiteHeaderBack } from '../../../../../components/atoms';

import { Container, Team, ContainerContent } from './styles';
import { ButtonMultiSelect } from '../../../../../components/organisms';
import { LoadingContainer, ModalComplex } from '../../../../../components/molecules';
import { FaExclamationTriangle } from 'react-icons/fa';
import { getEmployees } from '../../../../../services/endpoints/users';

const AuditResponsibleDealtTeamAnalysis = ({ Auditing }) => {
    const history = useHistory();

    const { unConformityRequirement = null, dealInEditing, setDealInEditing } = Auditing;

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalExitPage, setModalExitPage] = useState(false);

    const handleSubmit = () => {
        setDealInEditing({
            participants: users.filter(user => user.selected).map(user => user.id)
        });

        history.push('choose-methodology');
    };

    const onChangeUsersSelected = (items) => {
        setUsers([...items]);
    };

    const getData = useCallback(async () => {
        setLoading(true);

        if (!unConformityRequirement) {
            history.push('/audit/responsible-dealt');
            return;
        }

        const { employees = [] } = await getEmployees();

        setUsers(
            employees.map(employee => ({
                ...employee,
                selected: dealInEditing.participants.includes(employee.id)
            }))
        );

        setLoading(false);
    }, [dealInEditing.participants, history, unConformityRequirement]);

    useEffect(() => {
        getData();
    }, [getData]);

    return (
        <>
            <WhiteHeaderBack
                title={'Tratativa de NC/OM'}
                onBack={() => setModalExitPage(true)}
            />
            <Container>
                <ContainerContent>
                    {loading ? (
                        <LoadingContainer />
                    ) : (
                        <Team>
                            <ButtonMultiSelect
                                zIndex={130}
                                name={'team'}
                                fieldName={'Participantes da Análise da Causa'}
                                pageTitle={'Selecionar participantes'}
                                labelSearchInput={'Participantes da Análise da Causa'}
                                category={'checkbox'}
                                fieldsFilter={['name']}
                                single={false}
                                items={users}
                                onSave={onChangeUsersSelected}
                                showSelectedInTag={false}
                            />
                        </Team>
                    )}
                </ContainerContent>
                <NextButton
                    positionRelative={true}
                    nextDisabled={loading || users.filter(user => user.selected).length === 0}
                    onBack={() => setModalExitPage(true)}
                    onNext={handleSubmit}
                    nextLabel={'Avançar'}
                />
            </Container>
            <ModalComplex
                title={'Atenção'}
                description={'Tem certeza que deseja sair? Você irá perder tudo o que já preencheu.'}
                nameModal={'exit-page'}
                visible={modalExitPage}
                onCancel={() => setModalExitPage(false)}
                onConfirm={history.goBack}
                icon={<FaExclamationTriangle size={40} color={'#FF5C69'} />}
                confirmButtonLabel={'Sair'}
                cancelButtonLabel={'Cancelar'}
            />
        </>
    );
};

export default inject('Auditing')(observer(AuditResponsibleDealtTeamAnalysis));
