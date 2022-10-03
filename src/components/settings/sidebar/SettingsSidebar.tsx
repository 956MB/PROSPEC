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
    fSettingsOpen: (page: string, open: boolean) => void
}> = ({ fSettingsOpen }) => {
    const { t } = useTranslation('common');
    const [pagesButtons, setPagesButtons] = useState<ISidebarButtons>([
        FormSidebarButton("sidebar.live", searchIcon, "/", () => fSettingsOpen("/", false)),
        FormSidebarButton("sidebar.history", historyIcon, "/history", () => fSettingsOpen("/favorites", false)),
        FormSidebarButton("sidebar.players", playersIcon, "/players", () => fSettingsOpen("/players", false)),
        FormSidebarButton("sidebar.cq", trophyIcon, "/champsqueue", () => fSettingsOpen("/champsqueue", false)),
    ])
    const [lowerButtons, setLowerButtons] = useState<ISidebarButtons>([
        FormSidebarButton("sidebar.settings", gearIcon, "/settings", () => fSettingsOpen("/settings", true))
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