import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SidebarButton from "./SidebarButton";
import '../css/settings.css';

import { ISidebarButtons } from "../../imports/interfaces";
import { FormSidebarButton } from "../../imports/utils";

import { searchIcon, trophyIcon, playersIcon, historyIcon, settingsIcon } from "../../imports/icons";

const Sidebar: React.FC<{
    fNavigatePage: (page: string) => void
}> = ({ fNavigatePage }) => {
    const { t } = useTranslation('common');
    const [pagesButtons] = useState<ISidebarButtons>([
        FormSidebarButton("sidebar.live", searchIcon, "/", () => fNavigatePage("/")),
        FormSidebarButton("sidebar.cq", trophyIcon, "/champsqueue", () => fNavigatePage("/champsqueue")),
        FormSidebarButton("sidebar.players", playersIcon, "/players", () => fNavigatePage("/players")),
        FormSidebarButton("sidebar.history", historyIcon, "/history", () => fNavigatePage("/favorites")),
    ])
    const [lowerButtons] = useState<ISidebarButtons>([
        FormSidebarButton("sidebar.settings", settingsIcon, "/settings", () => fNavigatePage("/settings"))
    ])

    return (
        <div className={`settings-sidebar`} >
            <div className={`sidebar-group pages-group`}>
                {React.Children.toArray(
                    pagesButtons.map((button) => (
                        <SidebarButton
                            extraClass={`borders-bottom`}
                            buttonProps={button} />
                    ))
                )}
            </div>

            <div className={`sidebar-group`}>
                {React.Children.toArray(
                    lowerButtons.map((button) => (
                        <SidebarButton
                            extraClass="borders-top"
                            buttonProps={button} />
                    ))
                )}
            </div>
        </div>
    )
}

export default Sidebar;