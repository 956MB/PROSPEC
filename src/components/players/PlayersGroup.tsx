import { useTranslation } from "react-i18next";
import React, { useState, useContext } from "react";

import { IPlayerGroupInfo, IPlayers, useInit } from "../../interfaces";
import Card from "../cards/Card";
import { EGroupBy, ETooltip } from "../../typings";
import { SettingsContext } from "../../context/SettingsContext";
import { getGroupInfoFromKey } from "../../utils";

const PlayersGroup: React.FC<{
    players: IPlayers,
    groupPos: string,
    groupKey: string,
    globalTime: number,
    menuOpen: number,
    fHandleMenuOpen: (set: number) => void
}> = ({ players, groupPos, groupKey, globalTime, menuOpen, fHandleMenuOpen }) => {
    const { t } = useTranslation('common');
    const { showUnavailable } = useContext(SettingsContext);

    const [groupCollapsed, setGroupCollapsed] = useState(false);
    const [groupInfo, setGroupInfo] = useState({} as IPlayerGroupInfo);

    useInit(() => {
        const info = getGroupInfoFromKey(groupKey);
        setGroupInfo(info);
    });

    return (
        <div className={`pros-group ${groupPos} ${groupCollapsed ? 'group-collapsed' : null}`}>
            {groupInfo.type === EGroupBy.NONE ? null :
                <div className='group-sidebar' onClick={() => setGroupCollapsed(!groupCollapsed)}>
                    <div className='group-divider divider-left'></div>
                    {groupInfo.type === "icon"
                        ?
                        <div className={`group-info`}>
                            <img src={`src/assets/${groupInfo.image}`} alt="group-image" className={`group-image-icon`} />
                            {/* <span className={`${ETooltip.RIGHT} right-far`}>{groupInfo.text}</span> */}
                        </div>
                        :
                        <span className={`group-divider-text`}>{groupInfo.text}</span>
                    }
                    <div className='group-divider divider-right'></div>
                </div>
            }

            <div className={`pros-grid ${groupCollapsed ? 'pros-hidden' : null}`}>
                {React.Children.toArray(
                    players.map(player => {
                        return (!showUnavailable && !player.active) ? null :
                            <Card
                                playerProps={player}
                                globalTime={globalTime}
                                menuOpen={menuOpen == player.id}
                                fHandleMenuOpen={fHandleMenuOpen}></Card>
                    })
                )}
            </div>
        </div>
    )

}

export {
    PlayersGroup
}