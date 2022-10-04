import React, { createContext, useState } from "react";

import { ISummonerAccount, ISummonerAccounts } from "../imports/interfaces";
import { EGroupBy, EModes, ERegions, ERoles } from "../imports/typings";
import { useInit } from '../imports/initializers';

// JSON imports
import * as KR from '../data/players/lck.json';

interface ISpectatorContext {
    regionFilter: ERegions[];
    modeFilter: EModes[];
    roleFilter: ERoles[];
    groupBy: EGroupBy;
    accountsLoaded: boolean;
    allAccounts: ISummonerAccount[];
    updateFilter: (update: string, newFilter: any[], reset: boolean) => void;
    updateGroup: (newGroup: EGroupBy) => void;
}

export const SpectatorContext = createContext<ISpectatorContext>({
    regionFilter: [],
    modeFilter: [],
    roleFilter: [],
    groupBy: EGroupBy.ROLE,
    accountsLoaded: false,
    allAccounts: [],
    updateFilter: () => null,
    updateGroup: () => null,
})

const SpectatorProvider: React.FC<{ initPlayers: boolean, children: React.ReactNode }> = ({ initPlayers, children }) => {
    const [regionFilter, setRegionFilter] = useState<ERegions[]>([ERegions.KR]);
    const [modeFilter, setModeFilter] = useState<EModes[]>([]);
    const [roleFilter, setRoleFilter] = useState<ERoles[]>([]);
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

    const updateFilter = (update: string, newFilter: any[], reset: boolean = false): void => {
        switch (update) {
            case "region": setRegionFilter(reset ? [] : newFilter as ERegions[]); break;
            case "mode": setModeFilter(reset ? [] : newFilter as EModes[]); break;
            case "role": setRoleFilter(reset ? [] : newFilter as ERoles[]); break;
        }
    }
    const updateGroup = (newGroup: EGroupBy): void => {
        setGroupBy(newGroup);
    }

    return (
        <SpectatorContext.Provider value={{
            regionFilter,
            modeFilter,
            roleFilter,
            groupBy,
            accountsLoaded,
            allAccounts,
            updateFilter,
            updateGroup
        }}>
            {children}
        </SpectatorContext.Provider>
    )
}

export default SpectatorProvider;