import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import { useHistory } from 'react-router';
import { flowResult } from 'mobx';
import { inject, observer } from 'mobx-react';
import {
    AddButton,
    ObserverCard,
    WhiteHeaderBack
} from '../../components/atoms';
import colors from '../../styles/colors';
import ModalFilter from './modal-filter';

import {
    Container,
    SectionTitle,
    FilterActionsButton,
    LoadingContainer,
    LoadingIcon
} from './styles';
import { EmptyListContainer } from '../../components/molecules';

const ObserverEHS = ({ NewRegisterObserver, HomeObserverStore, UserStore }) => {
    const history = useHistory();

    const { setCurrentRecord } = NewRegisterObserver;

    const [modalFilterOpen, setModalFilterOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        author: 'area',
        initialDate: null,
        finalDate: null
    });

    const [inProgress, setInProgress] = useState([]);
    const [awaitingAnalysis, setAwaitingAnalysis] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [canceled, setCanceled] = useState([]);

    const fetchObserverData = useCallback(
        async (options = {}) => {
            setLoading(true);

            if (Object.keys(options).length === 3) {
                setFilters(options);
            }

            const { author, initialDate, finalDate } = options;

            const flowResponse = await flowResult(
                HomeObserverStore.fetch(
                    UserStore.user.clientId,
                    20,
                    null,
                    author,
                    initialDate,
                    finalDate
                )
            );

            if (HomeObserverStore.state === 'done' && flowResponse) {
                setInProgress(HomeObserverStore.inProgress);
                setAwaitingAnalysis(HomeObserverStore.awaitingAnalysis);
                setCompleted(HomeObserverStore.completed);
                setCanceled(HomeObserverStore.canceled);
                setLoading(false);
            }
        },
        [HomeObserverStore, UserStore.user.clientId]
    );

    useEffect(() => fetchObserverData(), [fetchObserverData]);

    return (
        <Fragment>
            <WhiteHeaderBack
                title={'Observador EHS'}
                onBack={() => history.push('/want-to-see')}
            />
            <Container>
                {loading ? (
                    <LoadingContainer>
                        <LoadingIcon size={48} color={colors.client} />
                        <span>Carregando...</span>
                    </LoadingContainer>
                ) : (
                    <Fragment>
                        <SectionTitle>
                            Registros em andamento ({inProgress.length})
                        </SectionTitle>
                        {inProgress.length > 0 ? (
                            inProgress.map((observer, index) => (
                                <ObserverCard
                                    key={index}
                                    borderColor={colors.mechanicalDangerBlue}
                                    observer={observer}
                                    typeOfObserver={true}
                                    onClickNameCard={() =>
                                        history.push(
                                            `/observer-ehs/details/${observer.uuid}`
                                        )
                                    }
                                    onClickContinue={() => {
                                        const path = setCurrentRecord(
                                            observer.uuid
                                        );

                                        history.push(path);
                                    }}
                                />
                            ))
                        ) : (
                            <EmptyListContainer hasBackground />
                        )}
                        <SectionTitle>
                            Registros aguardando análise (
                            {awaitingAnalysis.length})
                        </SectionTitle>
                        {awaitingAnalysis?.length > 0 ? (
                            awaitingAnalysis.map((observer, index) => (
                                <ObserverCard
                                    key={index}
                                    continueButtonMessage="Classificar"
                                    borderColor={colors.mechanicalDangerBlue}
                                    observer={{
                                        ...observer,
                                        criticism: null
                                    }}
                                    onClickNameCard={() =>
                                        history.push(
                                            `/observer-ehs/details/${observer.id}`
                                        )
                                    }
                                    onClickContinue={() =>
                                        history.push(
                                            `/observer-ehs/risk-rating/${observer.id}`
                                        )
                                    }
                                />
                            ))
                        ) : (
                            <EmptyListContainer hasBackground />
                        )}
                        <SectionTitle>
                            Registros concluídos ({completed.length})
                        </SectionTitle>
                        {completed?.length > 0 ? (
                            completed.map((observer, index) => (
                                <ObserverCard
                                    key={index}
                                    continueButtonMessage="Ver Detalhes"
                                    borderColor={colors.mechanicalDangerBlue}
                                    observer={observer}
                                    onClickNameCard={() =>
                                        history.push(
                                            `/observer-ehs/details/${observer.id}`
                                        )
                                    }
                                    onClickContinue={() =>
                                        history.push(
                                            `/observer-ehs/details/${observer.id}`
                                        )
                                    }
                                />
                            ))
                        ) : (
                            <EmptyListContainer hasBackground />
                        )}
                        <SectionTitle>
                            Registros cancelados ({canceled.length})
                        </SectionTitle>
                        {canceled?.length > 0 ? (
                            canceled.map((observer, index) => (
                                <ObserverCard
                                    key={index}
                                    borderColor={colors.mechanicalDangerBlue}
                                    observer={observer}
                                    continueButtonMessage="Ver Detalhes"
                                    onClickNameCard={() =>
                                        history.push(
                                            `/observer-ehs/details/${observer.id}`
                                        )
                                    }
                                    onClickContinue={() =>
                                        history.push(
                                            `/observer-ehs/details/${observer.id}`
                                        )
                                    }
                                />
                            ))
                        ) : (
                            <EmptyListContainer hasBackground />
                        )}
                        <AddButton
                            onClick={() => {
                                const path = setCurrentRecord();

                                history.push(path);
                            }}
                        />
                        <FilterActionsButton
                            onClick={() => setModalFilterOpen(true)}
                        >
                            <FaFilter size={21} color={'#fff'} />
                        </FilterActionsButton>
                    </Fragment>
                )}
            </Container>
            {modalFilterOpen && (
                <ModalFilter
                    onClose={() => setModalFilterOpen(false)}
                    onFilter={fetchObserverData}
                    filters={filters}
                />
            )}
        </Fragment>
    );
};

export default inject(
    'NewRegisterObserver',
    'HomeObserverStore',
    'UserStore'
)(observer(ObserverEHS));
