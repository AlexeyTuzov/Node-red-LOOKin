import functionTypes from './functionTypes';

const getCorrespondingFunction = (command: string): string => {

    console.log(`getCorrespondingFunction(${command})`);
    if (command === 'speed_up' ||
        command === 'speed_down') return 'speed';
    if (command === 'mode_1' ||
        command === 'mode_2' ||
        command === 'mode_3' ||
        command === 'mode_4') return 'mode';
    if (command === 'swing_1' ||
        command === 'swing_2') return 'swing';
    if (command === 'arrow_up' ||
        command === 'arrow_down' ||
        command === 'arrow_left' ||
        command === 'arrow_right' ||
        command === 'select') return 'cursor';

    const possibleCommands: string[] = Object.keys(functionTypes);
    console.log(`possible commands: ${possibleCommands}`);
    if (possibleCommands.find(item => item === command)) {
        console.log(`filtered possible command: ${functionTypes[command]}`);
        return functionTypes[command];
    } else {
        return '';
    }
}

export default getCorrespondingFunction;
