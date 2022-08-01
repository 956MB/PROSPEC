// import { replaceVars } from './utils';
// import { fs } from '@tauri-apps/api';
import { EModes, ERegions, ERoles } from './typings';
import { ISummonerAccount, ISummonerAccounts, IJSONPlayers, IJSONPlayer, IJSONAccount } from './interfaces';

// JSON imports
import * as KR from './data/players/lck.json';

class ProSpec {
    public searchRegions = [ERegions.KR];
    public searchModes = [EModes.RANKED_SOLODUO];
    public searchRoles = [ERoles.ANY];

    accountsLoaded: boolean;
    allAccounts: ISummonerAccounts = [];

    constructor(refreshInit: boolean) {
        this.accountsLoaded = false;
        // if (!this.accountsLoaded) {
        //     this.loadPlayers();
        // }
        console.log(`Constructor called with refreshInit=${refreshInit}`);
    }

    // Load players from json
    private loadPlayers() {
        for (const p in KR.players) {
            let player = KR.players[p];
            for (const a in player.accounts) {
                let account = player.accounts[a];
                let playerAccountI: ISummonerAccount = {accountName: account.name, playerName: player.player, team: player.team, summonerId: account.id, summonerPuuid: account.puuid, region: account.region, role: player.role, stream: player.stream}

                this.allAccounts.push(playerAccountI);
            }
        }

        this.accountsLoaded = true;
        // console.log(this.allAccounts.length);
        // console.log(this.allAccounts[3]);
    }

    // API:
}

export default ProSpec;