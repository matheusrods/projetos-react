import UserStore from "../user";
class NewAudit {

    observer = UserStore.user;

    //API
    area = [];
    process = [];
    locale = [];
    bus = [];
    opco = [];
    requirements = [];
    //
    selectedRequirementsId = [];

    setAreas = (options) => {
        this.area = options;
    };

    setProcesses = (options) => {
        this.process = options;
    };

    setLocale = (options) => {
        this.locale = options;
    };

    setBus = (options) => {
        this.bus = options;
    };

    setOpco = (options) => {
        this.opco = options;
    };

    setRequirements = (options) => {
        this.requirements = options;
    };

    setRequirementsSelected = (selectedIds) => {
        this.selectedRequirementsId = selectedIds;
    };

    getSelectedAreas = () => {
        const result = this.area.filter(
            (area) => area.selected === true
        );

        return result;
    };
    
    getSelectedProcesses = () => {
        const result = this.process.filter(
            (process) => process.selected === true
        );

        return result;
    };

    getSelectedLocaleName = () => {
        const result = this.locale.find((locale) => locale.selected === true);
        return result?.name;
    };

    getSelectedBusName = () => {
        const result = this.bus.find((bus) => bus.selected === true);
        return result?.name;
    };

    getSelectedOpcoName = () => {
        const result = this.opco.find((op) => op.selected === true);
        return result?.name;
    };

    getSelectedBusId = () => {
        const result = this.bus.find((bus) => bus.selected === true);
        return result?.id;
    };

    getSelectedOpcoId = () => {
        const result = this.opco.find((op) => op.selected === true);
        return result?.id;
    };

    getSelectedRequirements = () => {
        const norms = this.requirements;
        let selectedNorms = [];

        for (let norm of norms) {
            let validRequirements = [];
            for (let requirement of norm.titles) {
                const result = requirement.requirements.filter((item) =>
                    this.selectedRequirementsId.includes(item.id)
                );
                
                if (result.length === 0) {
                    continue;
                }
                
                requirement.requirements = result;
                validRequirements.push(requirement);
            }
            if (validRequirements.length === 0) {
                continue;
            }
            norm.requirements = validRequirements;
            selectedNorms.push(norm);
        }

        return selectedNorms;
    };

    getFormattedAudit = () => {
        let formattedData = [];

        const processes = this.getSelectedProcesses();
        const areas = this.getSelectedAreas();
        const requirements = this.selectedRequirementsId;

        areas.forEach((area) => {
            let requirementsByArea = [];
            const selectedaAreaProcesses = processes.filter((process) => process.processAreaId === area.id && process.selected);
            
            selectedaAreaProcesses.forEach((process) => {
                for (let theme of process.themes) {
                    for (let title of theme.titles) {
                        title.requirements.forEach((requirement) => {
                            requirementsByArea.push(requirement.id);
                        });
                    }
                }
            });

            const intersectedRequirements = requirementsByArea.filter(x => requirements.includes(x));

            let result = {
                "tipo": 0,
                "codigo_area": area.id,
                "codigo_unidade": this.observer.clientId,
                "codigo_cliente_bu": !this.getSelectedBusId() ? '' : this.getSelectedBusId(),
                "codigo_cliente_opco": !this.getSelectedOpcoId() ? '' : this.getSelectedOpcoId(),
                "processos_auditaveis": selectedaAreaProcesses.map((process) => { return { "codigo_processo": process.id } }),
                "requisitos_auditaveis": intersectedRequirements.map((requirement) => { return { "codigo_auditoria_tema_requisito": requirement } })
            }

            formattedData.push(result);
        })

        return formattedData;
    }

    //Private
    clone = (obj) => Object.assign({}, obj);

    //Private
    renameKey = (object, key, newKey) => {
        const clonedObj = this.clone(object);

        const targetKey = clonedObj[key];

        delete clonedObj[key];

        clonedObj[newKey] = targetKey;
        return clonedObj;
    };

    reset = () => {
        this.observer = UserStore.user;
        this.area = [];
        this.process = [];
        this.locale = [];
        this.bus = [];
        this.requirements = [];
        this.selectedRequirementsId = [];
    };
}

export default new NewAudit();
