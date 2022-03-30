import httpRequest from '../../httpRequest';
import {RCInfo} from '../../interfaces';

const getACCodeset = async (IP: string, UUID: string): Promise<string> => {

    let RCInfo: RCInfo = JSON.parse(await httpRequest(IP, `/data/${UUID}`));
    return RCInfo.Extra;

}

export default getACCodeset;
