import { useTranslation } from "react-i18next";
import { EEMessages, ETooltip, ESettingsStates } from '../../typings';
import '../css/settings.css';

import gearIcon from '../../assets/icons/gear.svg';
import discordIcon from '../../assets/icons/discord.svg';

const SettingsSidebar: React.FC<{
    settingsOpen: boolean,
    FSettingsOpen: (set: boolean) => void
}> = ({ settingsOpen, FSettingsOpen }) => {
    const { t } = useTranslation('common');

    return (
        <div className={`settings-vertical-container`} >
            <div className={`vertical-button ${ETooltip.TOOLTIP}`} onClick={() => null} id={'discord-button'}>
                <img src={discordIcon} alt="discord" />
                <span className={`${ETooltip.RIGHT} right-far`}>{`Discord`}</span>
            </div>

            <div className={`vertical-button ${ETooltip.TOOLTIP}`} onClick={() => FSettingsOpen(true)}>
                <img src={gearIcon} alt="gear" />
                <span className={`${ETooltip.RIGHT} right-far`}>{`${t('settings.title')}`}</span>
            </div>
        </div>
    )
}

export default SettingsSidebar;