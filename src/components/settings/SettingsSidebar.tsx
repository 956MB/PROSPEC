import { useTranslation } from "react-i18next";
import { EEMessages, ETooltip, ESettingsStates } from '../../imports/typings';
import '../css/settings.css';

import gearIcon from '../../assets/icons/gear.svg';
import discordIcon from '../../assets/icons/discord.svg';

const SettingsSidebar: React.FC<{
    fSettingsOpen: (set?: boolean) => void
}> = ({ fSettingsOpen }) => {
    const { t } = useTranslation('common');

    return (
        <div className={`settings-sidebar`} >
            <div
                className={`vertical-button sidebar-settings-button ${ETooltip.TOOLTIP}`}
                id="settings-button"
                onClick={() => fSettingsOpen()}
            >
                <img src={gearIcon} alt="gear" />
                <span className={`${ETooltip.RIGHT} right-far`}>{`${t('settings.title')}`}</span>
            </div>
        </div>
    )
}

export default SettingsSidebar;