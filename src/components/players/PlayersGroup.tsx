import { useTranslation } from "react-i18next";
import React, { useState, useContext } from "react";

import { IPlayerGroupInfo, IPlayers } from "../../imports/interfaces";
import Card from "../cards/Card";
import { EGroupBy, ETooltip } from "../../imports/typings";
import { SettingsContext } from "../../context/SettingsContext";
import { getGroupInfoFromKey } from "../../imports/utils";
import { useInit } from '../../imports/initializers';

import RenderIfVisible from 'react-render-if-visible'
const CARD_HEIGHT = 213;

const PlayersGroup: React.FC<{
    players: IPlayers,
    groupPos: string,
    groupKey: string,
    globalInterval: number,
    menuOpen: number,
    fHandleMenuOpen: (set: number) => void,
    fHandlePlayerFavorited: (name: string) => void
}> = ({ players, groupPos, groupKey, globalInterval, menuOpen, fHandleMenuOpen, fHandlePlayerFavorited }) => {
    const { t } = useTranslation('common');
    const { showUnavailable } = useContext(SettingsContext);

    const [groupCollapsed, setGroupCollapsed] = useState<boolean>(false);
    const [groupInfo, setGroupInfo] = useState<IPlayerGroupInfo>({} as IPlayerGroupInfo);

    useInit(() => {
        const info = getGroupInfoFromKey(groupKey);
        setGroupInfo(info);
    });

    return (
        <div className={`pros-group ${groupInfo.type === EGroupBy.NONE ? 'unsorted-group' : null} ${groupPos} ${groupCollapsed ? 'group-collapsed' : null}`}>
            {groupInfo.type === EGroupBy.NONE ? null :
                <div className='group-sidebar' onClick={() => setGroupCollapsed(!groupCollapsed)}>
                    <div className='hor-divider divider-left'></div>
                    {groupInfo.type === "icon"
                        ?
                        <div className={`group-info`}>
                            <img src={`src/assets/${groupInfo.image}`} alt="group-image" className={`group-image-icon`} />
                            {/* <span className={`${ETooltip.RIGHT} right-far`}>{groupInfo.text}</span> */}
                        </div>
                        :
                        <span className={`group-divider-text`}>{groupInfo.text}</span>
                    }
                    <div className='hor-divider divider-right'></div>
                </div>
            }

            <div className={`pros-grid ${groupCollapsed ? 'pros-hidden' : null}`}>
                {React.Children.toArray(
                    players.map(player => {
                        return (!showUnavailable && !player.active) ? null :
                            <RenderIfVisible defaultHeight={CARD_HEIGHT}>
                                <Card
                                    playerProps={player}
                                    globalInterval={globalInterval}
                                    menuOpen={menuOpen == player.id}
                                    fHandleMenuOpen={fHandleMenuOpen}
                                    fHandlePlayerFavorited={fHandlePlayerFavorited} />
                            </RenderIfVisible>
                    })
                )}
            </div>
        </div>
    )

}

export default PlayersGroup;