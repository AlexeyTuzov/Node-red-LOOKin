interface ACStatus {
    ACmode: string;
    tempShift: string;
    fanMode: string;
    shuttersMode: string;
}
declare const getACStatus: (IP: string, UUID: string) => Promise<ACStatus>;
export default getACStatus;
