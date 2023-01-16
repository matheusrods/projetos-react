import { inject, observer } from "mobx-react";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { Redirect, useHistory } from "react-router-dom";
import { CompanyHeader, NextButton } from "../../../components/atoms";
import {
    ModalActions,
    MultiSelectModal,
    LoadingContainer,
    ModalComplex,
} from "../../../components/molecules";
import { Header } from "../../../components/organisms";
import { getEmployees } from "../../../services/endpoints/users";
import {
    Container,
    Content,
    PageInfo,
    PageTitle,
    PageDescription,
    ObserverCard,
    ObserverAvatar,
    ObserverInfo,
    ObserverName,
    ChangeObserver,
} from "./styles";

const NewActionObserver = ({
    NewActionStore: { observer: storeObserver, setNewActionData, reset },
    PermissionStore: { hasPermission },
}) => {
    const history = useHistory();

    const [modalActionsVisible, setModalActionsVisible] = useState(false);
    const [modalObserversVisible, setModalObserversVisible] = useState(false);
    const [modalExternObserversVisible, setModalExternObserversVisible] = useState(false);
    const [modalExitVisible, setModalExitVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [observerOptions, setObserverOptions] = useState([]);
    const [externObserverOptions, setExternObserverOptions] = useState([]);
    const [observer, setObserver] = useState(storeObserver);

    const getData = useCallback(async () => {
        setLoading(true);

        const { employees } = await getEmployees({ internal: 1 });
        const { employees: employeesExtern } = await getEmployees({ internal: 0 });

        setExternObserverOptions(employeesExtern);
        setObserverOptions(employees);

        setLoading(false);
    }, []);

    const handleSave = (items) => {
        setObserverOptions([...items]);

        for (const user of items) {
            if (user.selected) {
                setObserver({ ...user });
            }
        }

        setModalActionsVisible(false);
    };

    const handleExternSave = (items) => {
        setExternObserverOptions([...items]);

        for (const user of items) {
            if (user.selected) {
                setObserver({ ...user });
            }
        }

        setModalActionsVisible(false);
    };

    useEffect(() => {
        getData();
    }, [getData]);

    return hasPermission(1) ? (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <CompanyHeader
                    positionRelative={true}
                    typeAction={"Registro de nova ação"}
                    onClose={() => setModalExitVisible(true)}
                />
                {loading ? (
                    <LoadingContainer />
                ) : (
                    <Content>
                        <PageInfo>
                            <PageTitle>Identificado por</PageTitle>
                            <PageDescription>
                                Caso esteja registrando em nome de outra pessoa,
                                informa abaixo os dados do usuário (nome, CPF,
                                e-mail)
                            </PageDescription>
                        </PageInfo>
                        <ObserverCard>
                            <ObserverAvatar>
                                {observer?.avatar ? (
                                    <img
                                        alt={"avatar"}
                                        src={observer.avatar}
                                    />
                                ) : observer?.name &&
                                  observer.name.length > 0 ? (
                                    observer.name[0]
                                ) : (
                                    "-"
                                )}
                            </ObserverAvatar>
                            <ObserverInfo>
                                <ObserverName>{observer.name}</ObserverName>
                            </ObserverInfo>
                        </ObserverCard>
                        <ChangeObserver
                            onClick={() => setModalActionsVisible(true)}
                        >
                            Alterar observador
                        </ChangeObserver>
                    </Content>
                )}
                <NextButton
                    positionRelative={true}
                    onBack={() => history.goBack()}
                    nextDisabled={loading}
                    onNext={() => {
                        setNewActionData({ observer: observer });
                        history.push("registration-location");
                    }}
                    nextLabel={"Avançar"}
                />
            </Container>
            <ModalActions
                title={"Identificado por"}
                nameModal={"modal-actions"}
                visible={modalActionsVisible}
                onClose={() => setModalActionsVisible(false)}
                options={[
                    {
                        label: "Colaborador interno",
                        onPress: () => {
                            setModalActionsVisible(false);
                            setModalObserversVisible(true);
                        },
                    },
                    {
                        label: "Usuário externo",
                        onPress: () => {
                            setModalActionsVisible(false);
                            setModalExternObserversVisible(true);
                        },
                    },
                ]}
            />
            <MultiSelectModal
                name={"observer"}
                visible={modalObserversVisible}
                pageTitle={"Identificado por"}
                category={"user"}
                onSave={handleSave}
                fieldsFilter={["name"]}
                single={true}
                items={observerOptions}
                onClose={() => setModalObserversVisible(false)}
                selected={observer.id}
            />
            <MultiSelectModal
                name={"extern-observer"}
                visible={modalExternObserversVisible}
                pageTitle={"Identificado por"}
                category={"user"}
                onSave={handleExternSave}
                fieldsFilter={["name"]}
                single={true}
                items={externObserverOptions}
                onClose={() => setModalExternObserversVisible(false)}
                selected={observer.id}
            />
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
};

export default inject("NewActionStore", "PermissionStore")(observer(NewActionObserver));
