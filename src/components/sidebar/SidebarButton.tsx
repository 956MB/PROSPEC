import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { ETooltip } from '../../imports/typings';
import '../css/sidebar.css';

import { ISidebarButton } from "../../imports/interfaces";
import {useInit} from "../../imports/initializers";

const SidebarButton: React.FC<{
    extraClass: string,
    buttonProps: ISidebarButton
}> = ({ extraClass, buttonProps }) => {
    const { t } = useTranslation('common');
    const location = useLocation();

    return (
        <div
            id={buttonProps.id}
            className={`sidebar-button ${location.pathname === buttonProps.page ? 'sidebar-button-active' : null} ${ETooltip.TOOLTIP} ${extraClass}`}
            onClick={buttonProps.action}
        >
            {buttonProps.id === "sb-live" ? <h1 className="notification-dot">.</h1> : null}
            <img src={buttonProps.icon} alt="icon" />
            <span className={`${location.pathname === buttonProps.page ? ETooltip.RIGHT : ETooltip.RIGHTDELAY} right-far noselect`}>{`${t(buttonProps.title)}`}</span>
        </div>
    )
}

export default SidebarButton;