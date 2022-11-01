import { useTranslation } from "react-i18next";
import React, { useState, useContext } from "react";

const PlayersSection: React.FC<{
    extraClass?: string,
    sectionTitle: string,
    sectionPlayers: number,
    sectionEmptyMessage: string
}> = ({ extraClass, sectionTitle, sectionPlayers, sectionEmptyMessage }) => {
    const { t } = useTranslation('common');

    return (
        <div className={`players-section ${extraClass}`}>
            <div className={`players-section-title-container`}>
                <span className={`players-section-title noselect`}>{t(sectionTitle)}</span>

                { sectionPlayers > 0 ?
                    <div className={`players-section-badge`}>
                        <span className={`noselect`}>{sectionPlayers}</span>
                    </div>
                : null}
            </div>

            <div className='hor-divider'></div>

            { sectionPlayers <= 0 ? <span className={`players-section-empty noselect`}>{t(sectionEmptyMessage)}</span> : null}
        </div>
    )
}

export default PlayersSection;