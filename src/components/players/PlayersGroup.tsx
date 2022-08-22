import { useTranslation } from "react-i18next";
import React, { useState } from "react";

import { IPlayers } from "../../interfaces";
import Card from "../cards/Card";

const PlayersGroup: React.FC<{
    players: IPlayers,
    groupPos: string,
    useText: string,
    useImage: string,
    globalTime: number,
    menuOpen: number,
    fHandleMenuOpen: (set: number) => void
}> = ({ players, groupPos, useText, useImage, globalTime, menuOpen, fHandleMenuOpen }) => {
    const { t } = useTranslation('common');
    const [groupCollapsed, setGroupCollapsed] = useState(false);

    return (
        <div className={`pros-group ${groupPos} ${groupCollapsed ? 'group-collapsed' : null}`}>
            <div className='group-sidebar' onClick={() => setGroupCollapsed(!groupCollapsed)}>
                <img src={useImage} alt="group-image" className='group-image' />
                {/* <span className={`group-divider-text`}>{t(`roles.${useText}`)}</span> */}
                <div className='group-divider'></div>
            </div>

            <div className={`pros-grid ${groupCollapsed ? 'pros-hidden' : null}`}>
                {React.Children.toArray(
                    players.map(player => {
                        return <Card
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