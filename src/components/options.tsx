import React, { Suspense, Component, useState, useEffect, useRef } from 'react';
import { useHotkeys } from 'react-hotkeys-hook'
import './css/options.css';

import { IOptionsSection, IOptionsSections, IOptionsSectionChamp, IOptionsSectionsChamp, IOptionsButton, IOptionsButtonChamp, ISelectedChamps } from '../interfaces';
import { EButtonImages, EEMessages, ETooltip } from '../typings';
import { getChampionFromId } from '../utils';

import closeIcon from '../assets/icons/close.svg';

const Options: React.FC<{
    optionsProps: IOptionsSections,
    optionsChampProps: IOptionsSectionsChamp,
    selectedChamps: ISelectedChamps
    updateSelectedChampions: (champId: number) => void
}> = ({ optionsProps, optionsChampProps, selectedChamps, updateSelectedChampions }) => {
    const [expanded, setExpanded] = useState(false);
    const [expandedSection, setExpandedSection] = useState(-1);

    const toggleExpanded = (sectionId: number) => {
        setExpanded(!expanded);
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
        <div className={`options-container ${!optionsProps.active ? 'options-disabled' : null}`}>
            <Suspense fallback={<div>Loading Component....</div>}>
                {sectionsFilter.map(section => {
                    if (expanded) {
                        if (section.id === expandedSection) { return <OptionsSection key={section.id} sectionProps={section} toggleExpanded={toggleExpanded} closeSections={closeSections}></OptionsSection> }
                    } else {
                        return <OptionsSection key={section.id} sectionProps={section} toggleExpanded={toggleExpanded} closeSections={closeSections}></OptionsSection>
                    }
                })}

                {sectionsChampFilter.map(sectionChamp => {
                    if (expanded) {
                        if (sectionChamp.id === expandedSection) { return <OptionsSectionChamp key={sectionChamp.id} sectionChampProps={sectionChamp} selectedChamps={selectedChamps} toggleExpanded={toggleExpanded} closeSections={closeSections} updateSelectedChampions={updateSelected}></OptionsSectionChamp> }
                    } else {
                        return <OptionsSectionChamp key={sectionChamp.id} sectionChampProps={sectionChamp} selectedChamps={selectedChamps} toggleExpanded={toggleExpanded} closeSections={closeSections} updateSelectedChampions={() => (null)}></OptionsSectionChamp>
                    }
                })}
            </Suspense>
        </div>
    )
}

const OptionsSection: React.FC<{
    sectionProps: IOptionsSection,
    closeSections: () => void,
    toggleExpanded: (sectionId: number) => void
}> = ({ sectionProps, toggleExpanded, closeSections }) => {
    // const [buttons, setButtons] = useState<IOptionsButton[]>(sectionProps.buttons);
    const [expanded, setExpanded] = useState(sectionProps.expanded);

    const handleExpanded = (sectionId: number) => {
        setExpanded(!expanded);
        toggleExpanded(sectionId);
    }
    const handleSelected = (buttonId: number) => {
        const filteredButtons = sectionProps.buttons.map((button) => {
            return { id: button.id, active: button.active, selected: ((button.id === buttonId) ? true : false), type: button.type, images: button.images, right: button.right, content: button.content };
        });

        // setButtons(filteredButtons);
        sectionProps.buttons = filteredButtons;
    }
    useHotkeys('esc', () => {
        console.log("esc pressed");
        setExpanded(false);
        closeSections();
    });

    const buttonsFilter = sectionProps.buttons.filter(button => (
        (expanded === true) || (button.selected === true)
    ));

    return (
        <div className='options-section'>
            {/* <span className={`${expanded ? "section-label" : "section-label-disable"} noselect`}>{sectionProps.name}</span> */}
            
            {buttonsFilter.map((props, i) => (
                <OptionsButton key={i} buttonProps={props} sectionExpanded={expanded} sectionId={sectionProps.id} toggleExpanded={handleExpanded} toggleSelected={handleSelected}></OptionsButton>
            ))}

            <div className={`${expanded ? 'titlebar-button titlebar-button-edge-both section-close' : 'image-null'} ${ETooltip.TOOLTIP}`} onClick={() => handleExpanded(sectionProps.id)}>
                <img src={closeIcon} alt="close" />
                <span className={`${ETooltip.RIGHT}`}>{EEMessages.ESC}</span>
            </div>
        </div>
    )
}

const OptionsSectionChamp: React.FC<{
    sectionChampProps: IOptionsSectionChamp,
    selectedChamps: ISelectedChamps,
    toggleExpanded: (sectionId: number) => void,
    closeSections: () => void,
    updateSelectedChampions: (champId: number) => void
}> = ({ sectionChampProps, selectedChamps, toggleExpanded, closeSections, updateSelectedChampions }) => {
    const [expanded, setExpanded] = useState(sectionChampProps.expanded);
    
    const handleExpanded = (sectionId: number) => {
        setExpanded(!expanded);
        toggleExpanded(sectionId);
    }
    const handleSelected = (buttonId: number, champId: number) => {
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

    useHotkeys('esc', () => {
        console.log("esc pressed");
        setExpanded(false);
        closeSections();
    });

    let useButtons;
    if (expanded) {
        useButtons = sectionChampProps.buttons
            .sort((a, b) => {
                let aS = getChampionFromId(a.champ)?.name!;
                let bS = getChampionFromId(b.champ)?.name!;
                return aS.localeCompare(bS)
            })
            .map((props, i) => (
                <OptionsButtonChamp
                    key={i}
                    champSelected={selectedChamps.champs.includes(props.champ)}
                    buttonChampProps={props}
                    sectionExpanded={expanded}
                    sectionId={sectionChampProps.id}
                    champGlows={glowList}
                    toggleExpanded={() => (null)}
                    toggleSelected={handleSelected}
                ></OptionsButtonChamp>
            ))
    } else {
        let selected = selectedChamps.champs
            .sort((a, b) => {
                let aS = getChampionFromId(a)?.name!;
                let bS = getChampionFromId(b)?.name!;
                return aS.localeCompare(bS)
            })
            .map((champ, i) => (`dragontail-12.13.1/tiles/${getChampionFromId(champ)?.name}_0.jpg`));

        useButtons = <OptionsButtonChamp
            key={0}
            champSelected={false}
            buttonChampProps={{ id: 0, active: true, type: EButtonImages.CHAMP, champ: -1, images: selected, right: "icons/plus.svg" }}
            sectionExpanded={expanded}
            sectionId={sectionChampProps.id}
            champGlows={glowList}
            toggleExpanded={handleExpanded}
            toggleSelected={() => (null)}
        ></OptionsButtonChamp>
    }

    return (
        <div className={`options-section-champ ${expanded ? 'section-expanded ' : null}`}>
            {/* <span className={`${expanded ? "section-label" : "section-label-disable"} noselect`}>{sectionChampProps.name}</span> */}

            <div className='options-champ-scroll'>
                {useButtons}
            </div>

            <div className={`${expanded ? 'titlebar-button titlebar-button-edge-both section-close' : 'image-null'} ${ETooltip.TOOLTIP}`} onClick={() => handleExpanded(sectionChampProps.id)}>
                <img src={closeIcon} alt="close" />
                <span className={`${ETooltip.RIGHT}`}>{EEMessages.ESC}</span>
            </div>
        </div>
    )
}

const OptionsButton: React.FC<{
    buttonProps: IOptionsButton,
    sectionExpanded: boolean,
    sectionId: number,
    toggleExpanded: (sectionId: number) => void
    toggleSelected: (buttonId: number) => void
}> = ({ buttonProps, sectionExpanded, sectionId, toggleExpanded, toggleSelected }) => {
    // const [selected, setSelected] = useState(buttonProps.selected);
    const handleExpanded = (sectionId: number) => {
        // setSelected(!selected);
        if (buttonProps.active) {
            if (sectionExpanded) {
                toggleSelected(buttonProps.id);
            }
            toggleExpanded(sectionId);
        }
    }

    // const buttonImages = buttonProps.images.filter(_ => ( buttonProps.active === true ));

    return (
        <div className={(buttonProps.selected && sectionExpanded) ? "options-button-selected" : (!buttonProps.active ? "options-button-disabled" : "options-button")} onClick={() => { handleExpanded(sectionId) }}>
            {buttonProps.images.slice(0, 3).map((image, i) => (
                <img
                key={i}
                src={`src/assets/${image}`}
                className={`${buttonProps.type} ${(i === 0 && buttonProps.type === EButtonImages.CHAMP) ? 'champ-edge-left' : null} ${(i === buttonProps.images.length - 1 && buttonProps.type === EButtonImages.CHAMP) ? 'champ-edge-right' : null} noselect`} />
            ))}
            <span className='button-content noselect'>{buttonProps.content}</span>
            {<img src={`src/assets/${buttonProps.right}`} className={buttonProps.right === "" ? "image-null" : "image-right"} />}
        </div>
    )
}

const OptionsButtonChamp: React.FC<{
    buttonChampProps: IOptionsButtonChamp,
    champSelected: boolean,
    sectionExpanded: boolean,
    sectionId: number,
    champGlows: string[],
    toggleExpanded: (sectionId: number) => void
    toggleSelected: (buttonId: number, champId: number) => void
}> = ({ buttonChampProps, champSelected, sectionExpanded, sectionId, champGlows, toggleExpanded, toggleSelected }) => {
    const handleExpanded = (sectionId: number) => {
        if (buttonChampProps.active) {
            if (sectionExpanded) {
                toggleSelected(buttonChampProps.id, buttonChampProps.champ);
            }
            toggleExpanded(sectionId);
        }
    }

    return (
        <div className={(sectionExpanded) ? (champSelected ? "options-button-champ-selected" : "options-button-champ") : "options-button-champ-normal"} onClick={() => { handleExpanded(sectionId) }}>

            {buttonChampProps.images.map((image, i) => (
                <img
                    key={i}
                    src={`src/assets/${image}`}
                    className={`${buttonChampProps.type} ${(i === 0 && buttonChampProps.type === EButtonImages.CHAMP) ? 'champ-edge-left' : null} ${(i === buttonChampProps.images.length - 1 && buttonChampProps.type === EButtonImages.CHAMP) ? 'champ-edge-right' : null} noselect`}
                    style={{ boxShadow: !sectionExpanded ? `${champGlows[i]}` : undefined }}
                />
            ))}

            {<img
                src={`src/assets/${buttonChampProps.right}`}
                className={!sectionExpanded && buttonChampProps.right != "" ? "image-right" : "image-null"}
            />}
        </div>
    )
}

export {
    Options
}