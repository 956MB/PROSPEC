import React, { createContext, useState } from "react";

import { ISummoner, ISummoners, ISummonerAccount, ISummonerAccounts } from "../imports/interfaces";
import { EGroupBy, EModes, ERegions, ERoles } from "../imports/typings";
import { useInit } from '../imports/initializers';

// JSON imports
import * as KR from '../data/players/lck.json';
import {currentYearN, formPlayerImage, getFallbackPhoto, getTeamFromNumber} from "../imports/utils";

interface ISpectatorContext {
    regionFilter: ERegions[];
    modeFilter: EModes[];
    roleFilter: ERoles[];
    groupBy: EGroupBy;
    accountsLoaded: boolean;
    allSummoners: ISummoner[];
    updateFilter: (update: string, newFilter: any[], reset: boolean) => void;
    updateGroup: (newGroup: EGroupBy) => void;
}

export const SpectatorContext = createContext<ISpectatorContext>({
    regionFilter: [],
    modeFilter: [],
    roleFilter: [],
    groupBy: EGroupBy.NONE,
    accountsLoaded: false,
    allSummoners: [],
    updateFilter: () => null,
    updateGroup: () => null,
})

const SpectatorProvider: React.FC<{ initPlayers: boolean, children: React.ReactNode }> = ({ initPlayers, children }) => {
    const [regionFilter, setRegionFilter] = useState<ERegions[]>([ERegions.KR]);
    const [modeFilter, setModeFilter] = useState<EModes[]>([]);
    const [roleFilter, setRoleFilter] = useState<ERoles[]>([]);
    const [groupBy, setGroupBy] = useState<EGroupBy>(EGroupBy.NONE);
    const [accountsLoaded, setAccountsLoaded] = useState<boolean>(false);
    const [allSummoners, setAllSummoners] = useState<ISummoner[]>([]);

    useInit(() => {
        const loadPlayers = async () => {
            if (!accountsLoaded) {
                const year = currentYearN();
                for (const p in KR.players) {
                    let player = KR.players[p];

                    // checking if player has accounts to use, otherwise skip
                    if (player.accounts && player.accounts.length) {
                        let playerAccounts: ISummonerAccounts = []
                        for (const a in player.accounts) {
                            let account = player.accounts[a];
                            if (account.id != undefined && account.puuid != undefined && account.name != undefined) {
                                let newAccount: ISummonerAccount = {} as ISummonerAccount;
                                newAccount.summonerName = account.name;
                                newAccount.summonerId = account.id;
                                newAccount.summonerPuuid = account.puuid;
                                newAccount.region = account.region;
                                newAccount.profileIcon = account.profileIcon;
                                playerAccounts.push(newAccount);
                            }
                        }

                        let teamNum = getTeamFromNumber(player.team);
                        let playerAccountI: ISummoner = {
                            playerInfo: {
                                playerName: player.player as string,
                                playerImage: await getFallbackPhoto(`${teamNum.short}_${player.player}`, year),
                                team: teamNum,
                                role: player.role as string,
                                stream: player.stream as string
                            },
                            playerAccounts: playerAccounts,
                        }

                        setAllSummoners(prevAccounts => [...prevAccounts, playerAccountI]);
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
            allSummoners: allSummoners,
            updateFilter,
            updateGroup
        }}>
            {children}
        </SpectatorContext.Provider>
    )
}

export default SpectatorProvider;