import { inject, observer } from 'mobx-react';
import React, { Fragment, useState } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { Redirect, useHistory } from 'react-router-dom';
import { CompanyHeader, NextButton } from '../../../components/atoms';
import { ModalComplex, RadioButtonGroup } from '../../../components/molecules';
import { Header } from '../../../components/organisms';
import {
    Container,
    Content,
    PageInfo,
    PageTitle,
    PageDescription
} from './styles';

const NewActionType = ({
    NewActionStore: { type: storeType, setNewActionData, reset },
    PermissionStore: { hasPermission }
}) => {
    const [type, setType] = useState(storeType);
    const [modalExitVisible, setModalExitVisible] = useState(false);

    const history = useHistory();

    return hasPermission(1) ? (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <CompanyHeader
                    positionRelative={true}
                    typeAction={'Registro de nova ação'}
                    onClose={() => setModalExitVisible(true)}
                />
                <Content>
                    <PageInfo>
                        <PageTitle>Nova ação</PageTitle>
                        <PageDescription>Escolha entre o cadastro de uma ação ou várias ações para a mesma origem</PageDescription>
                    </PageInfo>
                    <RadioButtonGroup
                        options={[
                            {
                                id: 1,
                                label: 'Uma ação apenas'
                            },
                            {
                                id: 2,
                                label: 'Várias ações'
                            }
                        ]}
                        selected={type}
                        onSelect={(reference) => setType(reference === type ? null : reference)}
                    />
                </Content>
                <NextButton
                    positionRelative={true}
                    onBack={() => setModalExitVisible(true)}
                    onNext={() => {
                        setNewActionData({ type: type });
                        history.push('observer');
                    }}
                    nextLabel={'Avançar'}
                    nextDisabled={!type}
                />
            </Container>
            <ModalComplex
                title={"Atenção"}
                description={"Ao sair, você perdera todos os dados preenchidos. Este ato não pode ser revertido. Tem certeza que deseja sair?"}
                nameModal={"exit-page"}
                visible={modalExitVisible}
                onCancel={() => setModalExitVisible(false)}
                onConfirm={() => {
                    reset();
                    history.push("/action-plan");
                }}
                icon={<FaExclamationTriangle size={40} color={"#FF5C69"} />}
                confirmButtonLabel={"Sair"}
                cancelButtonLabel={"Cancelar"}
            />
        </Fragment>
    ) : <Redirect to={'/action-plan'} />;
}

export default inject("NewActionStore", "PermissionStore")(observer(NewActionType));
