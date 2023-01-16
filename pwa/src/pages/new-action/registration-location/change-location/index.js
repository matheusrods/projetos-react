import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import {
    ButtonMultiSelect,
    ConfirmCancelFooter,
    Header
} from '../../../../components/organisms';
import { WhiteHeader } from '../../../../components/atoms';
import { LoadingContainer } from '../../../../components/molecules';
import { Container, Content } from './styles';
import { getClientsByUserId } from '../../../../services/endpoints/users';
import { inject, observer } from 'mobx-react';
import { toast } from 'react-toastify';

const NewActionChangeLocation = ({
    NewActionStore: { registrationLocation, setNewActionData },
    UserStore: { user },
    PermissionStore: { hasPermission }
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
        setLoading(true);

        let { clients = [] } = await getClientsByUserId(user?.id);

        let units = [];

        if (company?.id && clients.length) {
            let selectedCompany = {};

            clients = clients.map((item) =>
                item.id === company.id
                    ? (selectedCompany = { ...item, selected: true })
                    : item
            );

            if (location?.id) {
                units = selectedCompany?.units?.map((item) =>
                    item.id === location.id ? { ...item, selected: true } : item
                );

                if (Array.isArray(units) && units.length > 0) {
                    const unit = units.find((i) => i.selected);

                    if (unit?.businessUnits && unit.businessUnits.length > 0) {
                        setBusinessUnits([
                            ...unit.businessUnits.map((item) =>
                                businessUnit?.id && item.id === businessUnit.id
                                    ? { ...item, selected: true }
                                    : item
                            )
                        ]);
                    }

                    if (
                        unit?.opcos
                        && unit.opcos.length > 0
                        && businessUnit?.id
                    ) {
                        const opcosData = unit.opcos.filter(item => item.businessUnitId === businessUnit.id);

                        setOpcos([
                            ...opcosData.map((item) =>
                                opco?.id && item.id === opco.id
                                    ? { ...item, selected: true }
                                    : item
                            )
                        ]);
                    }
                }
            } else {
                units = selectedCompany?.units;
            }

            setLocations(units);
        }

        setCompanies(clients);
        setLoading(false);
    }, [
        company?.id,
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

    return hasPermission(1) ? (
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
                            disabled={!locations || locations.length === 0}
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
                            disabled={
                                Array.isArray(businessUnits) &&
                                businessUnits.length === 0
                            }
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
                            disabled={
                                (
                                    Array.isArray(opcos)
                                    && opcos.length === 0
                                ) || !(businessUnits.find(item => item.selected))
                            }
                        />
                    </Content>
                )}
                <ConfirmCancelFooter
                    confirmButtonLabel={'Confirmar'}
                    confirmButtonIcon={<FaCheck />}
                    confirmButtonDisabled={
                        !canConfirm ||
                        !Array.isArray(locations)
                        || (
                            Array.isArray(locations)
                            && locations.filter((i) => i.selected).length === 0)
                    }
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

                        setNewActionData({
                            registrationLocation: {
                                company: companies.find(
                                    (item) => item.selected
                                ),
                                location: locations.find(
                                    (item) => item.selected
                                ),
                                opco: opcos.find((item) => item.selected),
                                businessUnit: businessUnits.find(
                                    (item) => item.selected
                                ),
                            }
                        });

                        history.goBack();
                    }}
                    onCancel={() => history.goBack()}
                />
            </Container>
        </Fragment>
    ) : (
        <Redirect to={'/action-plan'} />
    );
};

export default inject(
    'NewActionStore',
    'UserStore',
    'PermissionStore'
)(observer(NewActionChangeLocation));
