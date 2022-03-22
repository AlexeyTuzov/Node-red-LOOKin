import httpRequest from "../../httpRequest";
import { RCInfo } from '../../interfaces';

const getPowerStatus = async (IP: string, UUID: string): Promise<boolean> => {

    let RCInfo: RCInfo = JSON.parse(await httpRequest(IP, `/data/${UUID}`));
    return !!(+RCInfo.Status[0]);
}

export default getPowerStatus;
