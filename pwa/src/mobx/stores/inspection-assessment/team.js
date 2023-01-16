import { makeAutoObservable } from 'mobx';
import {
    getMyTeamInspections,
    getMyTeamListInspections,
    getMyTeamPendingListInspections,
    getMyTeamUserListInspections
} from '../../../services/endpoints/inspection/team-inspections';
import UserStore from '../user';

class TeamInspectionStore {

    myTeam = [];

    constructor() {
        makeAutoObservable(this, {});
    }

    getMyTeam = async () => {
        this.myTeam = await getMyTeamInspections();
        const list = await getMyTeamListInspections();
        this.myTeam.forEach(item => {
            item.list = list.filter(listItem => listItem.responsibleId === item.id);
        });
        return this.myTeam;
    }

    countStatus = (list, status) => {
        return list.filter(item => item.status === status).length;
    }

    getListByUser = async (userId) => {
        const list = await getMyTeamUserListInspections(userId);
        return list;
    }

    getAllList = async () => {
        const list = await getMyTeamListInspections();
        return list;
    }
    getAllPendingList = async () => {
        const list = await getMyTeamPendingListInspections(UserStore.clientId);
        return list;
    }

    getAllPendingListByUser = async (userId) => {
        const list = await getMyTeamPendingListInspections(UserStore.clientId);
        return list.filter(item => item.responsibleId === userId);
    }
}

export default new TeamInspectionStore();
