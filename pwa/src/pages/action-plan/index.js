import { inject, observer } from "mobx-react";
import React, { useCallback, useEffect, useState } from "react";
import {
    FaBell,
    FaCalendarTimes,
    FaCaretRight,
    FaClone,
    FaExclamationTriangle,
    FaFilter,
    FaTimesCircle,
} from "react-icons/fa";
import { useHistory } from "react-router";
import { ActionCard, AddButton } from "../../components/atoms";
import { EmptyListContainer, NotPermissionListContainer } from "../../components/molecules";
import Header from "../../components/organisms/header";
import { getActions, getStatusOptions } from "../../services/endpoints/actions";
import { getOriginsByClientId } from "../../services/endpoints/origins";
import { getEmployees } from "../../services/endpoints/users";
import colors from "../../styles/colors";
import ModalFilter from "./modal-filter";
import {
    Container,
    SectionTitle,
    Flex,
    SmallCard,
    Strong,
    FilterActionsButton,
    SeeNow,
    LoadingContainer,
    LoadingIcon,
} from "./styles";

const ActionPlan = ({
    NewActionStore,
    UserStore: { clientId, userId },
    PermissionStore: { hasPermission, haveAtLeastOnePermission },
}) => {
    const history = useHistory();

    const [groupedActions, setGroupedActions] = useState([]);
    const [filterOptions, setFilterOptions] = useState({});
    const [pendencies, setPendencies] = useState([]);
    const [modalFilterOpen, setModalFilterOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ author: 3, dateType: 1 });

    // const [pullToRefresh, setPullToRefresh] = useState(false);

    const getData = useCallback(async () => {
        setLoading(true);

        const { actions = [], pendencies = [] } = await getActions({
            ...filters,
            statusId: filters.statusId?.value,
            orderBy: filters.orderBy?.value,
            originId: filters.originId?.value,
        });

        const { employees = [] } = await getEmployees();

        const { statusOptions: status } = await getStatusOptions({ onlyActive: true });

        let statusOptions = [];

        status.forEach((item) => {
            let obj = {
                label: item.name,
                value: item.id,
            };

            statusOptions.push(obj);
        });

        const { origins = [] } = await getOriginsByClientId(clientId);

        let originsOptions = [];

        origins.forEach((item) => {
            let obj = {
                label: item.name,
                value: item.id,
            };

            originsOptions.push(obj);
        });

        let groupedActions = {};
        let aux = [];

        actions.forEach((item) => {
            if (!aux[item.status.id]?.length) {
                aux[item.status.id] = [item];
            } else {
                aux[item.status.id] = [...aux[item.status.id], item];
            }

            groupedActions[item.status.description] = aux[item.status.id];
        });

        setFilterOptions({
            origins: originsOptions,
            status: statusOptions,
            responsibles: employees,
        });
        setGroupedActions(groupedActions);
        setPendencies(pendencies);

        setLoading(false);
    }, [clientId, filters]);

    useEffect(() => {
        getData();
    }, [getData]);

    // useEffect(() => {
    //     let _startY;

    //     const inbox = document.querySelector('#main-container');

    //     inbox.addEventListener('touchstart', e => {
    //         _startY = e.touches[0].pageY;
    //     }, { passive: true });
    //     inbox.addEventListener('touchmove', e => {
    //         const y = e.touches[0].pageY;
    //         // Activate custom pull-to-refresh effects when at the top of the container
    //         // and user is scrolling up.
    //         if (inbox.scrollTop === 0 && y > _startY&& !inbox.classList.contains('refreshing')) {
    //             console.log('pullToRefresh:', pullToRefresh);
    //             setPullToRefresh(true);

    //             setTimeout(() => {
    //                 setPullToRefresh(false);
    //             }, 5000)
    //             // refresh inbox.
    //         }
    //     }, { passive: true });
    // }, []);

    return (
        <>
            <Header />
            <Container
            // id={'main-container'} className={pullToRefresh ? 'refreshing' : ''}
            >
                {loading ? (
                    <LoadingContainer>
                        <LoadingIcon size={48} color={colors.client} />
                        <span>Carregando...</span>
                    </LoadingContainer>
                ) : (
                    <>
                        {haveAtLeastOnePermission([2, 3, 4]) && pendencies[1] > 0 &&
                            <SmallCard
                                color={colors.blueAux}
                                to={"/available-actions"}
                            >
                                <Flex>
                                    <FaBell size={16} />
                                    <div>
                                        <span>
                                            <Strong>
                                                {pendencies[1]}
                                            </Strong>{" "}
                                            novos registros disponíveis
                                        </span>
                                        <SeeNow>Ver agora</SeeNow>
                                    </div>
                                </Flex>
                                <FaCaretRight size={16} />
                            </SmallCard>
                        }
                        {hasPermission(11) && pendencies[2] > 0 &&
                            <SmallCard
                                color={colors.environmentDangerGreen}
                                to={"/postponed-actions"}
                            >
                                <Flex>
                                    <FaCalendarTimes size={16} />
                                    <div>
                                        <span>
                                            <Strong>
                                                {pendencies[2]}
                                            </Strong>{" "}
                                            solicitações de postergação
                                        </span>
                                        <SeeNow>Ver agora</SeeNow>
                                    </div>
                                </Flex>
                                <FaCaretRight size={16} />
                            </SmallCard>
                        }
                        {hasPermission(12) && pendencies[3] > 0 &&
                            <SmallCard
                                color={colors.mechanicalDangerBlue}
                                to={"/canceled-actions"}
                            >
                                <Flex>
                                    <FaTimesCircle size={16} />
                                    <div>
                                        <span>
                                            <Strong>
                                                {pendencies[3]}
                                            </Strong>{" "}
                                            solicitações de cancelamento
                                        </span>
                                        <SeeNow>Ver agora</SeeNow>
                                    </div>
                                </Flex>
                                <FaCaretRight size={16} />
                            </SmallCard>
                        }
                        {hasPermission(10) && pendencies[4] > 0 &&
                            <SmallCard
                                color={"#9D7CE4"}
                                to={"/action-plan/coverage-analysis"}
                            >
                                <Flex>
                                    <FaClone size={16} />
                                    <div>
                                        <span>
                                            <Strong>
                                                {pendencies[4]}
                                            </Strong>{" "}
                                            análises de abrangência
                                        </span>
                                        <SeeNow>Ver agora</SeeNow>
                                    </div>
                                </Flex>
                                <FaCaretRight size={16} />
                            </SmallCard>
                        }
                        {hasPermission(13) && pendencies[5] > 0 &&
                            <SmallCard
                                color={colors.orange2}
                                to={"/nearly-expired-actions"}
                            >
                                <Flex>
                                    <FaExclamationTriangle size={16} />
                                    <div>
                                        <span>
                                            <Strong>
                                                {pendencies[5]}
                                            </Strong>{" "}
                                            ações vencerão em breve
                                        </span>
                                        <SeeNow>Ver agora</SeeNow>
                                    </div>
                                </Flex>
                                <FaCaretRight size={16} />
                            </SmallCard>
                        }
                        {hasPermission(14) && pendencies[6] > 0 &&
                            <SmallCard
                                color={colors.redAux}
                                to={"/late-team-actions"}
                            >
                                <Flex>
                                    <FaExclamationTriangle size={16} />
                                    <div>
                                        <span>
                                            <Strong>
                                                {pendencies[6]}
                                            </Strong>{" "}
                                            ações de seu time atrasadas
                                        </span>
                                        <SeeNow>Ver agora</SeeNow>
                                    </div>
                                </Flex>
                                <FaCaretRight size={16} />
                            </SmallCard>
                        }
                        {hasPermission(15) ? Object.entries(groupedActions).map((group, index) => (
                            <div key={index}>
                                <SectionTitle>{group[0]}</SectionTitle>
                                {group[1].map((action) => (
                                    <ActionCard
                                        key={action.id}
                                        action={action}
                                        onClickDetails={(id) => {
                                            let url = '';

                                            switch (action.status.id) {
                                                case 1:
                                                case 2:
                                                case 3:
                                                case 4:
                                                case 6:
                                                case 7:
                                                case 8:
                                                    url = `/action/details/${id}`;
                                                    break;
                                                case 5:
                                                case 9:
                                                    if (
                                                        action?.responsibilityMatrix
                                                        && action.responsibilityMatrix.includes(userId)
                                                        && (
                                                            action.implementationAnalysisRequired === true
                                                            || action.efficiencyAnalysisRequired === true
                                                        )
                                                        && haveAtLeastOnePermission([8, 9])
                                                    ) {
                                                        url = `/waiting-analysis-actions/${id}/action-details`;
                                                    } else {
                                                        url = `/action/details/${id}`;
                                                    }
                                                    break;
                                                default:
                                                    url = `/action/details/${id}`;
                                                    break;
                                            }

                                            history.push(url);
                                        }}
                                    />
                                ))}
                            </div>
                        )) : <NotPermissionListContainer hasBackground />}
                        {Object.entries(groupedActions).length === 0 && hasPermission(15) && <EmptyListContainer hasBackground />}
                        {hasPermission(1) && (
                            <AddButton
                                onClick={() => {
                                    NewActionStore.reset();
                                    history.push("/new-action/type");
                                }}
                            />
                        )}
                        {hasPermission(15) && (
                            <FilterActionsButton
                                onClick={() => setModalFilterOpen(true)}
                            >
                                <FaFilter size={21} color={"#fff"} />
                            </FilterActionsButton>
                        )}
                    </>
                )}
            </Container>
            {modalFilterOpen && (
                <ModalFilter
                    onClose={() => setModalFilterOpen(false)}
                    onFilter={(f) => setFilters(f)}
                    filters={filters}
                    filterOptions={filterOptions}
                />
            )}
        </>
    );
};

export default inject("NewActionStore", "UserStore", "PermissionStore")(observer(ActionPlan));
