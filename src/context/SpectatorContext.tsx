import React, { createContext, useState } from "react";

import { ISummonerAccount, ISummonerAccounts, useInit } from "../interfaces";
import { EGroupBy, EModes, ERegions, ERoles } from "../typings";

// JSON imports
import * as KR from '../data/players/lck.json';

interface ISpectatorContext {
    regionFilter: ERegions[], modeFilter: EModes[], roleFilter: ERoles[], groupBy: EGroupBy, accountsLoaded: boolean, allAccounts: ISummonerAccount[]
}

export const SpectatorContext = createContext<ISpectatorContext>({
    regionFilter: [], modeFilter: [], roleFilter: [], groupBy: EGroupBy.ROLE, accountsLoaded: false, allAccounts: []
})

const SpectatorProvider: React.FC<{ initPlayers: boolean, children: React.ReactNode }> = ({ initPlayers, children }) => {
    const [regionFilter, setRegionFilter] = useState<ERegions[]>([ERegions.KR]);
    const [modeFilter, setModeFilter] = useState<EModes[]>([EModes.RANKED_SOLODUO]);
    const [roleFilter, setRoleFilter] = useState<ERoles[]>([ERoles.MIDDLE]);
    const [groupBy, setGroupBy] = useState<EGroupBy>(EGroupBy.ROLE);
    const [accountsLoaded, setAccountsLoaded] = useState<boolean>(false);
    const [allAccounts, setAllAccounts] = useState<ISummonerAccount[]>([]);

    useInit(() => {
        const loadPlayers = () => {
            if (!accountsLoaded) {
                for (const p in KR.players) {
                    let player = KR.players[p];
                    for (const a in player.accounts) {
                        let account = player.accounts[a];

                        if (account.id != undefined || account.puuid != undefined) {
                            let playerAccountI: ISummonerAccount = { accountName: account.name, playerName: player.player, team: player.team, summonerId: account.id, summonerPuuid: account.puuid, region: account.region, role: player.role, stream: player.stream }
                            setAllAccounts(prevAccounts => [...prevAccounts, playerAccountI]);
                        }
                    }
                }
    
                setAccountsLoaded(true);
            }
        }

        if (initPlayers) {
            loadPlayers();
        }
    });

    return (
        <SpectatorContext.Provider value={{
            regionFilter, modeFilter, roleFilter, groupBy, accountsLoaded, allAccounts
        }}>
            {children}
        </SpectatorContext.Provider>
    )
}

export default SpectatorProvider;