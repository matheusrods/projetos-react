import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import {
    ButtonMultiSelect,
    ConfirmCancelFooter,
    Header
} from '../../../../../components/organisms';
import { WhiteHeader } from '../../../../../components/atoms';
import { LoadingContainer } from '../../../../../components/molecules';
import { Container, Content } from './styles';
import { getClientsByUserId } from '../../../../../services/endpoints/users';
import { inject, observer } from 'mobx-react';
import { isEmpty } from '../../../../../utils/helpers';
import { toast } from 'react-toastify';

const NewRegisterChangeLocation = ({
    NewRegisterSWT: { registrationLocation, setNewRegisterData },
    UserStore: { user }
}) => {
    const {
        location = null,
        company = null,
        opco = null,
        businessUnit = null
    } = registrationLocation;

    const history = useHistory();

    const [loading, setLoading] = useState(true);
    const [companies, setCompanies] = useState(null);
    const [locations, setLocations] = useState([]);
    const [businessUnits, setBusinessUnits] = useState([]);
    const [opcos, setOpcos] = useState([]);
    const [canConfirm, setCanConfirm] = useState(!!(location && company));

    const getData = useCallback(async () => {
        const handleInitialCompany = (clients) => {
            let selectedCompany = {};

            const clientsWithSelected = clients.map((item) =>
                item?.id === company?.id
                    ? (selectedCompany = { ...item, selected: true })
                    : item
            );

            return {
                selectedCompany,
                clientsWithSelected
            };
        };

        const handleInitialUnits = (selectedCompany) => {
            if (!location?.id) {
                const units = selectedCompany?.units;
                return units;
            }

            const units = selectedCompany?.units?.map((item) =>
                item?.id === location.id ? { ...item, selected: true } : item
            );

            return units;
        };

        const handleInitialBusinessUnits = (selectedUnit) => {
            const businessUnitWithSelected = selectedUnit?.businessUnits?.map(
                (item) =>
                    item?.id === businessUnit?.id
                        ? { ...item, selected: true }
                        : item
            );

            return businessUnitWithSelected;
        };

        const handleInitialOpcos = (selectedUnit) => {
            const opcosData = selectedUnit?.opcos && businessUnit?.id
                ? selectedUnit.opcos.filter(item => item.businessUnitId === businessUnit?.id)
                : [];

            const opcosWithSelected = opcosData.map((item) =>
                item?.id === opco?.id ? { ...item, selected: true } : item
            );

            return opcosWithSelected;
        };

        setLoading(true);

        const { clients = [] } = await getClientsByUserId(user?.id);
        const shouldAvoidMap = isEmpty(company) || isEmpty(clients);

        if (shouldAvoidMap) {
            setCompanies(clients);
            setLoading(false);

            return;
        }

        const { selectedCompany, clientsWithSelected } = handleInitialCompany(clients);

        const units = handleInitialUnits(selectedCompany);
        const selectedUnit = units?.find((item) => item?.selected);

        const businessWithSelected = handleInitialBusinessUnits(selectedUnit);
        const opcosWithSelected = handleInitialOpcos(selectedUnit);

        setOpcos(opcosWithSelected);
        setBusinessUnits(businessWithSelected);
        setLocations(units);
        setCompanies(clientsWithSelected);
        setLoading(false);
    }, [
        company,
        location?.id,
        user?.id,
        businessUnit?.id,
        opco?.id
    ]);

    useEffect(() => {
        if (!companies) {
            getData();
        }
    }, [getData, companies, canConfirm]);

    const handleSaveCompanies = (items) => {
        const selectedCompany = items.find((item) => item.selected);

        setCompanies([...items]);
        setLocations(selectedCompany?.units);
        setBusinessUnits([]);
        setOpcos([]);
        setCanConfirm(false);
    };

    const handleSaveLocations = (items) => {
        if (Array.isArray(items) && items.length > 0) {
            const oldUnit = locations.find((i) => i.selected);
            const unit = items.find((i) => i.selected);

            if (!oldUnit || oldUnit?.id !== unit?.id) {
                if (unit?.businessUnits && unit.businessUnits.length > 0) {
                    setBusinessUnits([...unit.businessUnits]);
                } else {
                    setBusinessUnits([]);
                }

                setOpcos([]);
            }
        }

        setLocations([...items]);
        setCanConfirm(true);
    };


    const handleSaveOpcos = (items) => {
        setOpcos([...items]);
    };

    const handleSaveBusinessUnits = (items) => {
        const itemSelected = items.find(item => item.selected);

        setBusinessUnits([...items]);

        if (itemSelected) {
            const location = locations.find((item) => item.selected);

            const opcosData = (location) ? location.opcos.filter(item => item.businessUnitId === itemSelected.id) : [];

            setOpcos([...opcosData]);
        } else {
            setOpcos([]);
        }
    };

    return (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <WhiteHeader
                    title={'Alterar localidade'}
                    onClose={() => history.goBack()}
                />
                {loading ? (
                    <LoadingContainer />
                ) : (
                    <Content>
                        <ButtonMultiSelect
                            name={'company'}
                            fieldName={'Empresa'}
                            pageTitle={'Selecionar empresa'}
                            labelSearchInput={'Empresa'}
                            category={'checkbox'}
                            fieldsFilter={['name']}
                            single={true}
                            items={companies ?? []}
                            onSave={handleSaveCompanies}
                            showSelectedInTag={false}
                        />
                        <ButtonMultiSelect
                            name={'location'}
                            fieldName={'Unidade'}
                            pageTitle={'Selecionar unidade'}
                            labelSearchInput={'Unidade'}
                            category={'checkbox'}
                            fieldsFilter={['name']}
                            single={true}
                            items={locations}
                            onSave={handleSaveLocations}
                            showSelectedInTag={false}
                            disabled={isEmpty(locations)}
                        />
                        <ButtonMultiSelect
                            name={'business-unit'}
                            fieldName={'Business unit'}
                            pageTitle={'Selecionar business unit'}
                            labelSearchInput={'Business unit'}
                            category={'checkbox'}
                            fieldsFilter={['name']}
                            single={true}
                            items={businessUnits}
                            onSave={handleSaveBusinessUnits}
                            showSelectedInTag={false}
                            disabled={isEmpty(businessUnits)}
                        />
                        <ButtonMultiSelect
                            name={'opco'}
                            fieldName={'OPCO'}
                            pageTitle={'Selecionar OPCO'}
                            labelSearchInput={'OPCO'}
                            category={'checkbox'}
                            fieldsFilter={['name']}
                            single={true}
                            items={opcos}
                            onSave={handleSaveOpcos}
                            showSelectedInTag={false}
                            disabled={isEmpty(opcos) || !(businessUnits.find(item => item.selected))}
                        />
                    </Content>
                )}
                <ConfirmCancelFooter
                    confirmButtonLabel={'Confirmar'}
                    confirmButtonIcon={<FaCheck />}
                    confirmButtonDisabled={!canConfirm}
                    cancelButtonLabel={'Cancelar'}
                    onConfirm={() => {
                        if (
                            (
                                opcos.find((item) => item.selected)
                                || businessUnits.find((item) => item.selected)
                            )
                            && !(
                                opcos.find((item) => item.selected)
                                && businessUnits.find((item) => item.selected)
                            )
                        ) {
                            toast.warning('Se for selecionado um dos campos BUSINESS UNIT ou OPCO o outro campo será obrigatório.');

                            return;
                        }

                        setNewRegisterData({
                            registrationLocation: {
                                company: companies?.find((i) => i.selected),
                                location: locations?.find((i) => i.selected),
                                opco: opcos?.find((i) => i.selected),
                                businessUnit: businessUnits?.find(
                                    (i) => i.selected
                                ),
                            }
                        });

                        history.goBack();
                    }}
                    onCancel={() => history.goBack()}
                />
            </Container>
        </Fragment>
    );
};

export default inject(
    'NewRegisterSWT',
    'UserStore'
)(observer(NewRegisterChangeLocation));
