import { RemoteController } from "./interfaces";
declare const getSavedRemoteControllers: (IP: string) => Promise<RemoteController[]>;
export default getSavedRemoteControllers;
