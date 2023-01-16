import { makeAutoObservable } from 'mobx';
import {
    getAreaInspecaoInspections,
    getFormInspections,
    getTipoInspecaoInspections,
    getOpCoInspections,
    getBuInspections,
    getResponsiblesInspections,
    insertFormInspections
} from '../../../services/endpoints/inspection/form';
import UserStore from '../user';

class InspectionScheduleStore {
    codigoArea = '1';
    cidigoEmpresa = 1;

    constructor() {
        makeAutoObservable(this, {});
    }

    insertForm = async (data) => {
        const saveData = {
            "codigo_tipo_inspecao": data.tipo,
            "codigo_cliente_opco": data.opco,
            "codigo_cliente_bu": data.bu,
            "nome_plano_inspecao": data.nomePlano,
            "codigo_responsavel": data.responsavel,
            "codigo_cliente": UserStore.clientId,
            "codigo_empresa": 1,
            "auditoria_processos": data.areas,
            "formularios": data.forms
        };
        const dataReturn = await insertFormInspections(saveData);
        return dataReturn;
    }

    getTipoInspecaoList = async () => {
        const data = await getTipoInspecaoInspections(UserStore.clientId, this.codigoArea);
        return data
    }

    getAreaInspecaoList = async () => {
        const data = await getAreaInspecaoInspections(UserStore.clientId, this.codigoArea);
        return data;
    }

    getFormList = async (type) => {
        const data = await getFormInspections(UserStore.clientId, type);
        return data;
    }

    getOpCoList = async () => {
        const data = await getOpCoInspections(UserStore.clientId, this.cidigoEmpresa);
        return data;
    }
    getBuList = async () => {
        const data = await getBuInspections(UserStore.clientId, this.cidigoEmpresa);
        return data;
    }
    getResponsavelList = async () => {
        const data = await getResponsiblesInspections();
        return data;
    }
}

export default new InspectionScheduleStore();
