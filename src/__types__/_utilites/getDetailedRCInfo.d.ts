import { RemoteController } from "./interfaces";
interface RCitem {
    Type: string;
    UUID: string;
    Updated: number;
}
declare const getDetailedRCInfo: (data: RCitem[], IP: string) => Promise<RemoteController[]>;
export default getDetailedRCInfo;
