import React, { Suspense, Component, useState, useEffect, useRef } from 'react';
// import { useHotkeys } from 'react-hotkeys-hook'
import './css/options.css';

import { IOptionsSection, IOptionsSections, IOptionsSectionChamp, IOptionsSectionsChamp, IOptionsButton, IOptionsButtonChamp, ISelectedChamps } from '../imports/interfaces';
import { EButtonImages, EEMessages, ETooltip } from '../imports/typings';
import { getChampionFromId } from '../imports/utils';

import closeIcon from '../assets/icons/close.svg';
import { useTranslation } from 'react-i18next';

const Options: React.FC<{
    optionsDisabled: boolean,
    optionsProps: IOptionsSections,
    optionsChampProps: IOptionsSectionsChamp,
    selectedChamps: ISelectedChamps
    updateSelectedChampions: (champId: number) => void
}> = ({ optionsDisabled, optionsProps, optionsChampProps, selectedChamps, updateSelectedChampions }) => {
    const [expanded, setExpanded] = useState<boolean>(false);
    const [expandedSection, setExpandedSection] = useState<number>(-1);

    const toggleExpanded = (sectionId: number, set: boolean) => {
        setExpanded(set);
        setExpandedSection(sectionId);
    }
    const updateSelected = (champId: number) => {
        updateSelectedChampions(champId);
    }
    const closeSections = () => {
        // TODO: closeSections being called once per section every 'esc' keybind, so four times instead of just once from parent Options.
        setExpanded(false);
        setExpandedSection(-1);
    }

    const sectionsFilter = optionsProps.sections.filter(section => (section.active === true));
    const sectionsChampFilter = optionsChampProps.sections.filter(sectionChamp => (sectionChamp.active === true));

    return (
        <div className={`options-container ${optionsDisabled ? 'options-disabled' : null}`}>
            <Suspense fallback={<div>Loading Component....</div>}>
                {React.Children.toArray(
                    sectionsFilter.map(section => {
                        if (expanded) {
                            if (section.id === expandedSection) { return <OptionsSection sectionProps={section} toggleExpanded={toggleExpanded} closeSections={closeSections} expandedSection={expandedSection}></OptionsSection> }
                        } else {
                            return <OptionsSection sectionProps={section} toggleExpanded={toggleExpanded} closeSections={closeSections} expandedSection={expandedSection}></OptionsSection>
                        }
                    })
                )}

                {React.Children.toArray(
                    sectionsChampFilter.map(sectionChamp => {
                        if (expanded) {
                            if (sectionChamp.id === expandedSection) { return <OptionsSectionChamp sectionChampProps={sectionChamp} selectedChamps={selectedChamps} expandedSection={expandedSection} toggleExpanded={toggleExpanded} closeSections={closeSections} updateSelectedChampions={updateSelected}></OptionsSectionChamp> }
                        } else {
                            return <OptionsSectionChamp sectionChampProps={sectionChamp} selectedChamps={selectedChamps} expandedSection={expandedSection} toggleExpanded={toggleExpanded} closeSections={closeSections} updateSelectedChampions={() => (null)}></OptionsSectionChamp>
                        }
                    })
                )}
            </Suspense>
        </div>
    )
}

const OptionsSection: React.FC<{
    sectionProps: IOptionsSection,
    expandedSection: number,
    closeSections: () => void,
    toggleExpanded: (sectionId: number, set: boolean) => void
}> = ({ sectionProps, expandedSection, toggleExpanded, closeSections }) => {
    const FSelected = (buttonId: number) => {
        const filteredButtons = sectionProps.buttons.map((button) => {
            return { id: button.id, active: button.active, selected: ((button.id === buttonId) ? true : false), type: button.type, images: button.images, right: button.right, content: button.content };
        });

        // setButtons(filteredButtons);
        sectionProps.buttons = filteredButtons;
    }

    const buttonsFilter = sectionProps.buttons.filter(button => (
        ((sectionProps.id === expandedSection) === true) || (button.selected === true)
    ));

    return (
        <div className='options-section'>
            {/* <span className={`${expanded ? "section-label" : "section-label-disable"} noselect`}>{sectionProps.name}</span> */}
            
            {React.Children.toArray(
                buttonsFilter.map((props) => (
                    <OptionsButton buttonProps={props} expandedSection={expandedSection} sectionId={sectionProps.id} toggleExpanded={toggleExpanded} toggleSelected={FSelected}></OptionsButton>
                ))
            )}

            <div className={`${(sectionProps.id === expandedSection) ? 'titlebar-button titlebar-button-edge-both section-close' : 'image-null'} ${ETooltip.TOOLTIP}`} onClick={closeSections}>
                <img src={closeIcon} alt="close" />
                <span className={`${ETooltip.RIGHT}`}>{EEMessages.ESC}</span>
            </div>
        </div>
    )
}

const OptionsSectionChamp: React.FC<{
    sectionChampProps: IOptionsSectionChamp,
    selectedChamps: ISelectedChamps,
    expandedSection: number,
    toggleExpanded: (sectionId: number, set: boolean) => void,
    closeSections: () => void,
    updateSelectedChampions: (champId: number) => void
}> = ({ sectionChampProps, selectedChamps, expandedSection, toggleExpanded, closeSections, updateSelectedChampions }) => {
    const FSelected = (buttonId: number, champId: number) => {
        const filteredButtons = sectionChampProps.buttons.map((button) => {
            return { id: button.id, active: button.active, selected: ((button.id === buttonId) ? true : false), type: button.type, champ: button.champ, images: button.images, right: button.right };
        });
        
        sectionChampProps.buttons = filteredButtons;
        updateSelectedChampions(champId);
    }
    const glowList = selectedChamps.champs.map(champ => {
        const glow = getChampionFromId(champ)?.color;
        return `0 0 15px 0 rgba(${!glow ? '255, 255, 255' : glow}, 0.09)`
    });

    let useButtons;
    if ((sectionChampProps.id === expandedSection)) {
        useButtons = React.Children.toArray(
            sectionChampProps.buttons
            .sort((a, b) => {
                let aS = getChampionFromId(a.champ)?.name!;
                let bS = getChampionFromId(b.champ)?.name!;
                return aS.localeCompare(bS)
            })
            .map((props) => (
                <OptionsButtonChamp
                    champSelected={selectedChamps.champs.includes(props.champ)}
                    buttonChampProps={props}
                    expandedSection={expandedSection}
                    sectionId={sectionChampProps.id}
                    champGlows={glowList}
                    toggleExpanded={() => (null)}
                    toggleSelected={FSelected}
                ></OptionsButtonChamp>
            ))
        )
    } else {
        let selected = selectedChamps.champs
            .sort((a, b) => {
                let aS = getChampionFromId(a)?.name!;
                let bS = getChampionFromId(b)?.name!;
                return aS.localeCompare(bS)
            })
            .map((champ, i) => (`dragontail/tiles/${getChampionFromId(champ)?.name}_0.jpg`));

        useButtons = React.Children.toArray(
            <OptionsButtonChamp
                champSelected={false}
                buttonChampProps={{ id: 0, active: true, type: EButtonImages.CHAMP, champ: -1, images: selected, right: "icons/plus.svg" }}
                expandedSection={expandedSection}
                sectionId={sectionChampProps.id}
                champGlows={glowList}
                toggleExpanded={toggleExpanded}
                toggleSelected={() => (null)}
            ></OptionsButtonChamp>
        )
    }

    return (
        <div className={`options-section-champ ${(sectionChampProps.id === expandedSection) ? 'section-expanded ' : null}`}>
            {/* <span className={`${expanded ? "section-label" : "section-label-disable"} noselect`}>{sectionChampProps.name}</span> */}

            <div className='options-champ-scroll'>
                {useButtons}
            </div>

            <div className={`${(sectionChampProps.id === expandedSection) ? 'titlebar-button titlebar-button-edge-both section-close' : 'image-null'} ${ETooltip.TOOLTIP}`} onClick={closeSections}>
                <img src={closeIcon} alt="close" />
                <span className={`${ETooltip.RIGHT}`}>{EEMessages.ESC}</span>
            </div>
        </div>
    )
}

const OptionsButton: React.FC<{
    buttonProps: IOptionsButton,
    expandedSection: number,
    sectionId: number,
    toggleExpanded: (sectionId: number, set: boolean) => void
    toggleSelected: (buttonId: number) => void
}> = ({ buttonProps, expandedSection, sectionId, toggleExpanded, toggleSelected }) => {
    const { t } = useTranslation('common');
    const FExpanded = () => {
        if (buttonProps.active) {
            if (sectionId === expandedSection) {
                toggleSelected(buttonProps.id);
                toggleExpanded(-1, false);
            } else {
                toggleExpanded(sectionId, true);
            }
        }
    }

    return (
        <div className={(buttonProps.selected && (sectionId === expandedSection)) ? "options-button-selected" : (!buttonProps.active ? "options-button-disabled" : "options-button")} onClick={() => { FExpanded() }}>
            {React.Children.toArray(
                buttonProps.images.map((image, i) => (
                    <img
                    src={`src/assets/${image}`}
                    className={`${buttonProps.type} ${(i === 0 && buttonProps.type === EButtonImages.CHAMP) ? 'champ-edge-left' : null} ${(i === buttonProps.images.length - 1 && buttonProps.type === EButtonImages.CHAMP) ? 'champ-edge-right' : null} noselect`} />
                ))
            )}
            <span className='button-content noselect'>{t(buttonProps.content)}</span>
            {<img src={`src/assets/${buttonProps.right}`} className={buttonProps.right === "" ? "image-null" : "image-right"} />}
        </div>
    )
}

const OptionsButtonChamp: React.FC<{
    buttonChampProps: IOptionsButtonChamp,
    champSelected: boolean,
    expandedSection: number,
    sectionId: number,
    champGlows: string[],
    toggleExpanded: (sectionId: number, set: boolean) => void
    toggleSelected: (buttonId: number, champId: number) => void
}> = ({ buttonChampProps, champSelected, expandedSection, sectionId, champGlows, toggleExpanded, toggleSelected }) => {
    const FExpanded = () => {
        if (buttonChampProps.active) {
            if (sectionId === expandedSection) {
                toggleSelected(buttonChampProps.id, buttonChampProps.champ);
            } else {
                toggleExpanded(sectionId, true);
            }
        }
    }

    return (
        <div className={(sectionId === expandedSection) ? (champSelected ? "options-button-champ-selected" : "options-button-champ") : "options-button-champ-normal"} onClick={() => { FExpanded() }}>

            {React.Children.toArray(
                buttonChampProps.images.map((image, i) => (
                    <img
                    src={`src/assets/${image}`}
                    className={`${buttonChampProps.type} ${(i === 0 && buttonChampProps.type === EButtonImages.CHAMP) ? 'champ-edge-left' : null} ${(i === buttonChampProps.images.length - 1 && buttonChampProps.type === EButtonImages.CHAMP) ? 'champ-edge-right' : null} noselect`}
                    style={{ boxShadow: !(sectionId === expandedSection) ? `${champGlows[i]}` : undefined }}/>
                ))
            )}

            {<img
                src={`src/assets/${buttonChampProps.right}`}
                className={!(sectionId === expandedSection) && buttonChampProps.right != "" ? "image-right" : "image-null"}
            />}
        </div>
    )
}

export {
    Options
}