import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { ETooltip } from '../../../imports/typings';
import '../../css/settings.css';

import { ISidebarButton } from "../../../imports/interfaces";

const SidebarButton: React.FC<{
    buttonProps: ISidebarButton
}> = ({ buttonProps }) => {
    const { t } = useTranslation('common');
    const location = useLocation();

    return (
        <div
            className={`sidebar-button ${location.pathname === buttonProps.page ? 'sidebar-button-active' : null} ${ETooltip.TOOLTIP} ${buttonProps.extraClasses}`}
            onClick={() => buttonProps.action(buttonProps.page as string)}
        >
            <img src={buttonProps.icon} alt="gear" />
            <span className={`${ETooltip.RIGHT} right-far noselect`}>{`${t(buttonProps.title)}`}</span>
        </div>
    )
}

export default SidebarButton;