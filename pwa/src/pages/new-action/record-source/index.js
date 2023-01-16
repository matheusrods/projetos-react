import { inject, observer } from "mobx-react";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { Redirect, useHistory } from "react-router-dom";
import { CompanyHeader, NextButton } from "../../../components/atoms";
import {
    RadioButtonGroup,
    LoadingContainer,
    ModalComplex,
} from "../../../components/molecules";
import { Header } from "../../../components/organisms";
import { getOriginsByClientId } from "../../../services/endpoints/origins";

import {
    Container,
    Content,
    PageInfo,
    PageTitle,
    PageDescription,
} from "./styles";

const NewActionRecordSource = ({
    NewActionStore: {
        type,
        registrationLocation,
        setNewActionData,
        reset,
        recordSource: storeRecordSource,
        resetDynamicFields,
    },
    PermissionStore: { hasPermission },
}) => {
    const history = useHistory();

    if(!registrationLocation.company?.id || !registrationLocation.location?.id) {
        history.push('type');
    }

    const [modalExitVisible, setModalExitVisible] = useState(false);
    const [recordSource, setRecordSource] = useState(storeRecordSource.id);
    const [recordSourceOptions, setRecordSourceOptions] = useState([]);
    const [loading, setLoading] = useState(true);

    const getData = useCallback(async () => {
        setLoading(true);

        let { origins = [] } = await getOriginsByClientId(
            registrationLocation.location?.id
        );

        origins = origins.map((item) => ({
            id: item.id,
            label: item.name,
        }));

        setRecordSourceOptions(origins);

        setLoading(false);
    }, [registrationLocation.location?.id]);

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
                <Content>
                    {loading ? (
                        <LoadingContainer />
                    ) : (
                        <Fragment>
                            <PageInfo>
                                <PageTitle>Origem do registro</PageTitle>
                                <PageDescription>
                                    Selecione o sistema de origem ou
                                    identificação do desvio para o qual será
                                    registrada a nova ação
                                </PageDescription>
                            </PageInfo>
                            <RadioButtonGroup
                                options={recordSourceOptions}
                                selected={recordSource}
                                onSelect={(reference) =>
                                    setRecordSource(
                                        reference === recordSource
                                            ? null
                                            : reference
                                    )
                                }
                            />
                        </Fragment>
                    )}
                </Content>
                <NextButton
                    positionRelative={true}
                    onBack={() => history.goBack()}
                    onNext={() => {
                        if (storeRecordSource?.id && recordSource !== storeRecordSource.id) {
                            resetDynamicFields();
                        }

                        setNewActionData({
                            recordSource: recordSourceOptions.find(
                                (item) => item.id === recordSource
                            ),
                        });

                        history.push(
                            type === 1 ? "improvement-action-form" : "various"
                        );
                    }}
                    nextLabel={"Avançar"}
                    nextDisabled={!recordSource || loading}
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
};

export default inject("NewActionStore", "PermissionStore")(observer(NewActionRecordSource));
