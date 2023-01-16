import React, { Fragment, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { isNull } from "lodash";
import { FaExclamationTriangle } from "react-icons/fa";
import { Redirect, useHistory } from "react-router-dom";
import { CompanyHeader, NextButton } from "../../../components/atoms";
import { LoadingContainer, ModalComplex } from "../../../components/molecules";
import { Header } from "../../../components/organisms";
import { getClientsByUserIdAndClientId } from "../../../services/endpoints/users";
import {
    Container,
    Content,
    PageInfo,
    PageTitle,
    PageDescription,
    PageLabel,
    StyledLink,
    ChangeLocationLink,
} from "./styles";

const NewActionRegistrationLocation = ({
    NewActionStore: { setNewActionData, registrationLocation, observer, reset },
    UserStore: { user },
    PermissionStore: { hasPermission },
}) => {
    const {
        location = null,
        company = null,
        opco = null,
        businessUnit = null
    } = registrationLocation;

    const history = useHistory();

    const [modalExitVisible, setModalExitVisible] = useState(false);
    const [loading, setLoading] = useState(true);

    if (!observer) history.push("type");

    useEffect(() => {
        const getData = async () => {
            if (user.clientId) {
                setLoading(true);

                const { clients } = await getClientsByUserIdAndClientId({
                    userId: user.id,
                    clientId: user.clientId,
                });

                if (clients?.length > 0 && clients[0]?.units?.length > 0 && isNull(company) && isNull(location)) {
                    setNewActionData({
                        registrationLocation: {
                            company: clients[0],
                            location: clients[0].units[0],
                        },
                    });
                }

                setLoading(false);
            }
        };

        getData();
    }, [company, location, setNewActionData, user.clientId, user.id]);

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
                        <>
                            <PageInfo>
                                <PageTitle>Local do registro</PageTitle>
                                <PageDescription>
                                    Caso essa observação tenha sido realizada em
                                    outra área (diferente da sua), altere a
                                    localidade
                                </PageDescription>
                            </PageInfo>
                            <PageLabel>
                                <span>EMPRESA</span>
                                <span>{company?.name ?? 'Nenhuma empresa selecionada.'}</span>
                            </PageLabel>
                            <PageLabel>
                                <span>UNIDADE</span>
                                <span>{location?.name ?? 'Nenhuma unidade selecionada.'}</span>
                            </PageLabel>
                            <PageLabel>
                                <span>BUSINESS UNIT</span>
                                <span>{businessUnit?.name ?? 'Nenhuma business unit selecionada.'}</span>
                            </PageLabel>
                            <PageLabel>
                                <span>OPCO</span>
                                <span>{opco?.name ?? 'Nenhum opco selecionado.'}</span>
                            </PageLabel>
                            <ChangeLocationLink>
                                <StyledLink
                                    to={
                                        "/new-action/registration-location/change-location"
                                    }
                                >
                                    Alterar localidade
                                </StyledLink>
                            </ChangeLocationLink>
                        </>
                    )}
                </Content>
                <NextButton
                    positionRelative={true}
                    onBack={() => history.goBack()}
                    onNext={() => history.push("record-source")}
                    nextDisabled={!(location && company)}
                    nextLabel={"Avançar"}
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

export default inject(
    "NewActionStore",
    "UserStore",
    "PermissionStore"
)(observer(NewActionRegistrationLocation));
