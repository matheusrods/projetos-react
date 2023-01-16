import { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getCriticismOptions } from '../../../../services/endpoints/actions';

const useRiskRatingCriticism = ({ ClassificationStore, UserStore }) => {

    const history = useHistory();

    const { idObservation } = useParams();

    const {
        setNewRegisterData,
        criticism: criticismStore,
        reset
    } = ClassificationStore;
    const { user } = UserStore;
    const { isEditing = false } = history.location.state ?? {};

    const [criticality, setCriticality] = useState(
        criticismStore?.criticality ?? 1
    );
    const [criticism, setCriticism] = useState([]);
    const [modalInfoVisible, setModalInfoVisible] = useState(false);
    const [modalExitPage, setModalExitPage] = useState({ visible: false, path: null });
    const [loading, setLoading] = useState(false);


    const fetchCriticism = useCallback(async () => {
        setLoading(true);

        const { criticismOptions } = await getCriticismOptions({
            onlyActive: true,
            clientId: user.clientId,
            appId: 3
        });

        setCriticism(criticismOptions);
        setLoading(false);
    }, [user]);

    const handleNextAction = () => {
        const level = criticism.find((item) =>
            item.values.includes(criticality)
        );

        setNewRegisterData({
            criticism: {
                level,
                criticality
            }
        });

        isEditing ? history.goBack() : history.push('improvement-actions');
    };

    useEffect(() => fetchCriticism(), [fetchCriticism]);

    return {
        loading,
        history,
        isEditing,
        criticality,
        setCriticality,
        criticism,
        handleNextAction,
        modalInfoVisible,
        setModalInfoVisible,
        modalExitPage,
        setModalExitPage,
        idObservation,
        reset
    };
};

export default useRiskRatingCriticism;
