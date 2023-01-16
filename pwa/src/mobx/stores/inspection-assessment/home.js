import { makeAutoObservable } from 'mobx';
import { FaCalendarAlt, FaHome } from 'react-icons/fa';
import { FiShield, FiUsers } from 'react-icons/fi';
import ProfileStore from '../profile';
import UserStore from '../user';
import { getInspections, getPendingActionsInspections } from '../../../services/endpoints/inspection/inspections';
import {getInspectionById, updateInspection} from "../../../services/endpoints/inspection/inspection";
import {toast} from "react-toastify";

class HomeInspectionStore {
    inspection = {};
    inspectionsProfile = {
        gestor: 'GESTOR_INSPECOES_ASSESSMENT',
        inspector: 'INSPETOR_INSPECOES_ASSESSMENT',
    };

    inspections = {
        next: { count: 0, list: [] },
        pending: { count: 0, list: [] },
        scheduled: { count: 0, list: [] },
        canceled: { count: 0, list: [] },
        completed: { count: 0, list: [] },
        ongoing: { count: 0, list: [] },
    };
    homePath = '/inspection-assessment';
    inspectionsTitle = '';
    bottomTabsNavigation = [
        {
            slug: 'home',
            label: 'Início',
            icon: () => <FaHome  />,
            route: this.homePath,
            active: false,
        },
        {
            slug: 'schedule',
            label: 'Agenda',
            icon: () => <FaCalendarAlt  />,
            route: `${this.homePath}/inspections/scheduled-inspections`,
            active: false,
        },
        {
            slug: 'inspections',
            label: 'Inspeções',
            icon: () => <FiShield />,
            route: `${this.homePath}/inspections/completed-inspections`,
            active: false,
        },
    ];

    gestorTabs = {
        profile: {
            label: 'Meu perfil',
            component: null
        },
        team: {
            label: 'Equipe',
            icon: <FiUsers size={18} />,
            component: null
        }
    };

    inspectionsTypes = {
        'all-inspections' : {
            title: 'Inspeções',
            teamTitle: 'Inspeções da equipe',
        },
        'next-inspections' : {
            title: 'Inspeções próximas do vencimento',
            teamTitle: 'Inspeções da equipe próximas do vencimento',
        },
        'pending-inspections' : {
            title: 'Inspeções com pedências',
            teamTitle: 'Inspeções da equipe com pendêcias',
        },
        'scheduled-inspections' : {
            title: 'Inspeções programadas',
            teamTitle: 'Inspeções programadas',
        },
        'canceled-inspections' : {
            title: 'Inspeções canceladas',
            teamTitle: 'Inspeções canceladas',
        },
        'completed-inspections' : {
            title: 'Inspeções concluídas',
            teamTitle: 'Inspeções concluídas pela equipe',
        },
        'ongoing-inspections' : {
            title: 'Inspeções em andamento',
            teamTitle: 'Inspeções em andamento',
        },
    }

    constructor() {
        makeAutoObservable(this, {});
    }
    setActiveTab = (slug) => {
        this.bottomTabsNavigation.forEach(item => {
            item.active = item.slug === slug;
        });
    }
    getArrayInspectionProfiles = () => {
        return Object.values(this.inspectionsProfile);
    }
    isGestor = () => {
        return ProfileStore.hasProfile(this.inspectionsProfile.gestor);
    }
    getHomeCardTitle = () => {
        return `Inspeção - ${this.isGestor() ? 'Gestor' : 'Inspetor'}`;
    }
    getGestorTabs = () => {
        return Object.values(this.gestorTabs);
    }
    setGestorTabComponent = (slug, component) => {
        this.gestorTabs[slug].component = component;
    }
    clearTabComponents = () => {
        Object.values(this.gestorTabs).forEach(item => {
            item.component = null;
        });
    }
    setInspectionsTitle = (title) => {
        this.inspectionsTitle = title;
    }
    setInspectionsTitleBySlug = (slug, team = false) => {
        this.inspectionsTitle = team ? this.inspectionsTypes[slug].teamTitle : this.inspectionsTypes[slug].title;
    }

    resetInspections = () => {
        this.inspections = {
            next: { count: 0, list: [] },
            pending: { count: 0, list: [] },
            scheduled: { count: 0, list: [] },
            canceled: { count: 0, list: [] },
            completed: { count: 0, list: [] },
            ongoing: { count: 0, list: [] },
        };
    }

    getInspections = async () => {
        this.resetInspections();
        const data = await getInspections(UserStore.clientId);
        const pendingActions = await getPendingActionsInspections(UserStore.clientId);
        pendingActions.forEach(item => {
            this.inspections.pending.count++;
            this.inspections.pending.list.push(item);
        });
        this.pushInspectionCount(data);
        return this.inspections;
    }

    pushInspectionCount = (inspections) => {
        inspections.forEach(item => {
            switch (item.status) {
                case 1:
                    this.inspections.scheduled.count++;
                    this.inspections.scheduled.list.push(item);
                    break;
                case 2:
                    this.inspections.ongoing.count++;
                    this.inspections.ongoing.list.push(item);
                    break;
                case 3:
                    this.inspections.completed.count++;
                    this.inspections.completed.list.push(item);
                    if(item.diff > 0 && item.diff <= 30) {
                        this.inspections.next.count++;
                        this.inspections.next.list.push(item);
                    }
                    break;
                case 4:
                    this.inspections.canceled.count++;
                    this.inspections.canceled.list.push(item);
                    break;
                default:
                    break;
            }
        });
    }

    setInspections = (inspections) => {
        this.resetInspections();
        this.pushInspectionCount(inspections);
        return this.inspections;
    }
    setPendingActions = (pendingActions) => {
        this.resetInspections();
        pendingActions.forEach(item => {
            this.inspections.pending.count++;
            this.inspections.pending.list.push(item);
        });
    }
    getInspectionById = async (id) => {
        const data = await getInspectionById(UserStore.clientId, id);
        this.setInspection(data);
    }
    setInspection = (inspection) =>{
        this.inspection = inspection;
    }
    cancelInspection = async (id) => {
        const inspection = {
            codigo: id,
            codigo_status_inspecao: 4,
        };
        await updateInspection(inspection);
        toast.success('Inspeção cancelada com sucesso!');
    }
}

export default new HomeInspectionStore();
