import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SidebarButton from "./SidebarButton";
import '../../css/settings.css';

import { ISidebarButtons } from "../../../imports/interfaces";
import { FormSidebarButton } from "../../../imports/utils";

import gearIcon from '../../../assets/icons/gear.svg';
import historyIcon from '../../../assets/icons/clock.arrow.circlepath.svg';
import trophyIcon from '../../../assets/icons/trophy.svg';
import playersIcon from '../../../assets/icons/person.svg';
import searchIcon from '../../../assets/icons/search.large.svg';

const SettingsSidebar: React.FC<{
    fNavigatePage: (page: string) => void
}> = ({ fNavigatePage }) => {
    const { t } = useTranslation('common');
    const [pagesButtons, setPagesButtons] = useState<ISidebarButtons>([
        FormSidebarButton("sidebar.live", searchIcon, "/", () => fNavigatePage("/")),
        FormSidebarButton("sidebar.history", historyIcon, "/history", () => fNavigatePage("/favorites")),
        FormSidebarButton("sidebar.players", playersIcon, "/players", () => fNavigatePage("/players")),
        FormSidebarButton("sidebar.cq", trophyIcon, "/champsqueue", () => fNavigatePage("/champsqueue")),
    ])
    const [lowerButtons, setLowerButtons] = useState<ISidebarButtons>([
        FormSidebarButton("sidebar.settings", gearIcon, "/settings", () => fNavigatePage("/settings"))
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

export default SettingsSidebar;