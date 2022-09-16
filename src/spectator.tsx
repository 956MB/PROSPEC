import { exec } from 'child_process';
// import { appDir, join } from '@tauri-apps/api/path';
// import { convertFileSrc } from '@tauri-apps/api/tauri';
import { replaceVars } from './imports/utils';
import { fs } from '@tauri-apps/api';
import { ISpectatorResult } from './imports/interfaces';
// const appDirPath = await appDir();
// const filePath = await join(appDirPath, 'assets/logos/drx.png');
// const assetUrl = convertFileSrc(filePath);

// fs.BaseDirectory.Resource = local project directory, not AppData folder that build is in

export async function execSpectateWin(region: string, encryptionKey: string, gameId: string): Promise<ISpectatorResult> {
    const TEMPLATE = await fs.readTextFile('bats/win.txt', { dir: fs.BaseDirectory.Resource });
    const TEMPLATE_EDIT = replaceVars(TEMPLATE, {'${1}': region, '${2}': encryptionKey, '${3}': gameId, '${4}': region});
    // console.log(TEMPLATE_EDIT);
    const matchFile = `bats/match-${region}-${encryptionKey}-${gameId}.bat`;

    await fs.writeTextFile(matchFile, TEMPLATE_EDIT, { dir: fs.BaseDirectory.Resource });
    
    // const _ = exec(matchFile, (execErr) => {
    //     if (execErr) {
    //         console.log("ProSpec [SPECTATOR ERROR]!");
    //         return { status: false, file: ''};
    //     }
    // });
    
    console.log("ProSpec [SPECTATOR SUCCESS]!"); // gets printed to console AFTER LoL spectator closed... t-resting
    return { status: true, file: matchFile };
}