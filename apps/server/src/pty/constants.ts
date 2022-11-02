import * as os from 'os';

const IS_WIN = os.platform() === 'win32';

const SHELL = IS_WIN ? 'powershell.exe' : 'bash';

export { IS_WIN, SHELL };
