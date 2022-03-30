import httpRequest from "../../httpRequest";
import { RCInfo } from '../../interfaces';

interface ACStatus {
    ACmode: string;
    tempShift: string;
    fanMode: string;
    shuttersMode: string;
}

const getACStatus = async (IP: string, UUID: string): Promise<ACStatus> => {

    let RCInfo: RCInfo = JSON.parse(await httpRequest(IP, `/data/${UUID}`));
    return {
        ACmode: RCInfo.Status[0],
        tempShift: RCInfo.Status[1],
        fanMode: RCInfo.Status[2],
        shuttersMode: RCInfo.Status[3]
    };
}

export default getACStatus;
