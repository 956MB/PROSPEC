import { IAppReleaseChange, IAppReleaseChanges, IBackground, IBackgroundInfo, IChampion, ILanguageResource, ILanguageResources, IPlayer, IPlayerGroupInfo, IPlayerGroups, IPlayers, IRegion, ISettingsItem, ISettingsItems, ISettingsItemValueBool, ISettingsItemValueLanguage, ISettingsItemValueSelection, ISettingsItemValueSelections, ISettingsItemValueSelector, ISettingsPage, ISettingsPageLanguage, ISettingsSection, ISettingsSectionEntries, ISettingsSectionEntry, ISettingsSectionEntryChange, ISidebarButton, ISummonerAccount } from "./interfaces";
import { ETeams, ETeamNames, EChampions, ERegions, EButtonImages, EModes, ERoles, EGroupBy, ELanguages, EChangeType } from "./typings";
import { readDir, BaseDirectory } from '@tauri-apps/api/fs';
import random from 'random'

// const { t } = useTranslation('common');

export function unull() {
    return () => null
}

export function ending(sec: number, _true: string): string | null {
    return sec >= 1800 ? _true : null
}

function escapeRegExp(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
function removeExtension(file: string): IBackgroundInfo {
    const re = /\.[^/.]+$/;
    const ext = file.split('.').pop();
    return { name: file.replace(re, ""), ext: ext! };
}

export function secondsToTime(secs: number): string {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

export function replaceVars(str: string, rep: { [key: string]: string }) {
    let ret = str;
    for (let x in rep) {
        ret = ret.replace(new RegExp(escapeRegExp(x), 'g'), rep[x]);
    }
    return ret;
};

export function replaceIssueTag(text: string): string {
    const pattern = /#\d+/g;
    const found = text.match(pattern);

    if (found && found.length >= 1) {
        const issue = found[0];
        // TODO: Eventually change link to ProSpec repo
        const rep = text.replace(pattern, `<a title=https://github.com/desktop/desktop/issues/${issue.substring(1)} href=https://github.com/desktop/desktop/issues/${issue.substring(1)} target="_blank" rel="noopener noreferrer">${issue}</a>`);
        return rep;
    }
    return text;
}

export async function checkCutout(champ: string): Promise<string> {
    return "loading";
    const cutouts = await readDir(`assets/dragontail/cutouts/`, { dir: BaseDirectory.Resource, recursive: true });

    for (const entry of cutouts) {
        if (entry.name === `${champ}.png`) { return "cutouts"; }
    }
    return "loading";
}

export async function checkLiveBackground(champ: string): Promise<IBackgroundInfo> {
    const bgInfo = removeExtension(champ);
    const live = await readDir(`assets/dragontail/live/`, { dir: BaseDirectory.Resource, recursive: true });
    for (const entry of live) {
        if (entry.name === `${bgInfo.name}.webm`) { return {name: bgInfo.name, ext: '.webm'}; }
    }
    return {name: bgInfo.name, ext: bgInfo.ext};
}

export function cutUnderscore(str: string): string {
    return str.split("_")[0];
}

export function formPlayerImage(team: string, player: string): string {
    const retImage = `${team.toUpperCase()}_${player}_2022`;
    return retImage;
}

function ifShort(short: string, long: string, isShort: boolean): string {
    return isShort == true ? short : long;
}

export function ifLiveBackground(background: string): boolean {
    return background.includes(".mp4") || background.includes(".webm");
}

export function firstLastClass(index: number, len: number, first: string, last: string): string {
    return `${index == 0 ? first : ""} ${index == len-1 ? last : ""}`
}

export function sortLanguages(langs: ILanguageResources): ILanguageResources {
    const first = ["br_BA", "en_UK", "en_US"];
    langs.sort((a, b) => a.text.localeCompare(b.text));
    first.forEach((lang) => {
        langs.sort((x, y) =>  x.lang == lang ? -1 : y.lang == lang ? 1 : 0 );
    })

    return langs;
}

// NOTE: Gets

const LANGS = [ "English, US", "English, UK", "Svenska", "Suomi", "한국어", "日本語", "Braille" ];
export function getLanguageStatic(lang: number): string {
    return LANGS.at(lang)!;
}

export function getEntryIndexClass(idx: number, length: number): string {
    if (idx == 0) { return "entry-first"; }
    if (idx == length-1) { return "entry-last"; }
    return "";
}

export function getGroupInfoFromKey(key: any): IPlayerGroupInfo {
    if ((key as string) === EGroupBy.NONE) {
        return { type: EGroupBy.NONE, image: "", text: ""};
    }
    if (Object.values(ERoles).includes(key as ERoles)) {
        return { type: "icon", image: `icons/${key as string}.png`, text: key as string};
    }

    const keys = Object.keys(ETeams).filter(k => typeof ETeams[k as any] === "number");
    const values = keys.map(k => ETeams[k as any].toString());
    if (values.includes(key as string)) {
        switch(key) {
            case ETeams.DRX.toString(): return { type: "logo", image: `logos/drx.png`, text: ETeamNames.DRX_SHORT};
            case ETeams.DK.toString(): return { type: "logo", image: `logos/dk.png`, text: ETeamNames.DK_SHORT};
            case ETeams.BRO.toString(): return { type: "logo", image: `logos/bro.png`, text: ETeamNames.BRO_SHORT};
            case ETeams.GEN.toString(): return { type: "logo", image: `logos/gen.png`, text: ETeamNames.GEN_SHORT};
            case ETeams.HLE.toString(): return { type: "logo", image: `logos/hle.png`, text: ETeamNames.HLE_SHORT};
            case ETeams.KT.toString(): return { type: "logo", image: `logos/kt.png`, text: ETeamNames.KT_SHORT};
            case ETeams.KDF.toString(): return { type: "logo", image: `logos/kdf.png`, text: ETeamNames.KDF_SHORT};
            case ETeams.LSB.toString(): return { type: "logo", image: `logos/lsb.png`, text: ETeamNames.LSB_SHORT};
            case ETeams.NS.toString(): return { type: "logo", image: `logos/ns.png`, text: ETeamNames.NS_SHORT};
            case ETeams.T1.toString(): return { type: "logo", image: `logos/t1.png`, text: ETeamNames.T1_SHORT};
        }
    }

    return { type: EGroupBy.NONE, image: "", text: ""};
}

export function getChampionFromId(champion: number): IChampion | undefined {
    switch (champion) {
        case EChampions.AATROX: return { name: "Aatrox", color: "247, 71, 69" }
        case EChampions.AHRI: return { name: "Ahri", color: "68, 77, 205" }
        case EChampions.AKALI: return { name: "Akali", color: "45, 119, 87" }
        case EChampions.AKSHAN: return { name: "Akshan", color: "255, 217, 111" }
        case EChampions.ALISTAR: return { name: "Alistar", color: "83, 57, 134" }
        case EChampions.AMUMU: return { name: "Amumu", color: "132, 227, 118" }
        case EChampions.ANIVIA: return { name: "Anivia", color: "22, 141, 197" }
        case EChampions.ANNIE: return { name: "Annie", color: "255, 166, 0" }
        case EChampions.APHELIOS: return { name: "Aphelios", color: "152, 215, 239" }
        case EChampions.ASHE: return { name: "Ashe", color: "32, 51, 253" }
        case EChampions.AURELIONSOL: return { name: "AurelionSol", color: "32, 51, 253" }
        case EChampions.AZIR: return { name: "Azir", color: "255, 166, 0" }
        case EChampions.BARD: return { name: "Bard", color: "255, 166, 0" }
        case EChampions.BELVETH: return { name: "Belveth", color: "102, 109, 201" }
        case EChampions.BLITZCRANK: return { name: "Blitzcrank", color: "255, 166, 0" }
        case EChampions.BRAND: return { name: "Brand", color: "255, 166, 0" }
        case EChampions.BRAUM: return { name: "Braum", color: "24, 178, 218" }
        case EChampions.CAITLYN: return { name: "Caitlyn", color: "24, 178, 218" }
        case EChampions.CAMILLE: return { name: "Camille", color: "251, 248, 246" }
        case EChampions.CASSIOPEIA: return { name: "Cassiopeia", color: "242, 187, 118" }
        case EChampions.CHOGATH: return { name: "Chogath", color: "128, 17, 47" }
        case EChampions.CORKI: return { name: "Corki", color: "255, 166, 0" }
        case EChampions.DARIUS: return { name: "Darius", color: "177, 5, 15" }
        case EChampions.DIANA: return { name: "Diana", color: "231, 233, 247" }
        case EChampions.DRAVEN: return { name: "Draven", color: "239, 182, 156" }
        case EChampions.DRMUNDO: return { name: "DrMundo", color: "155, 75, 208" }
        case EChampions.EKKO: return { name: "Ekko", color: "138, 220, 209" }
        case EChampions.ELISE: return { name: "Elise", color: "177, 5, 15" }
        case EChampions.EVELYNN: return { name: "Evelynn", color: "245, 64, 196" }
        case EChampions.EZREAL: return { name: "Ezreal", color: "249, 217, 141" }
        case EChampions.FIDDLESTICKS: return { name: "Fiddlesticks", color: "255, 166, 0" }
        case EChampions.FIORA: return { name: "Fiora", color: "204, 40, 95" }
        case EChampions.FIZZ: return { name: "Fizz", color: "117, 208, 227" }
        case EChampions.GALIO: return { name: "Galio", color: "251, 248, 244" }
        case EChampions.GANGPLANK: return { name: "Gangplank", color: "255, 210, 127" }
        case EChampions.GAREN: return { name: "Garen", color: "43, 79, 221" }
        case EChampions.GNAR: return { name: "Gnar", color: "211, 88, 50" }
        case EChampions.GRAGAS: return { name: "Gragas", color: "211, 60, 22" }
        case EChampions.GRAVES: return { name: "Graves", color: "177, 5, 15" }
        case EChampions.GWEN: return { name: "Gwen", color: "0, 213, 255" }
        case EChampions.HECARIM: return { name: "Hecarim", color: "0, 255, 216" }
        case EChampions.HEIMERDINGER: return { name: "Heimerdinger", color: "255, 166, 0" }
        case EChampions.ILLAOI: return { name: "Illaoi", color: "251, 251, 246" }
        case EChampions.IRELIA: return { name: "Irelia", color: "157, 123, 255" }
        case EChampions.IVERN: return { name: "Ivern", color: "187, 208, 10" }
        case EChampions.JANNA: return { name: "Janna", color: "234, 249, 249" }
        case EChampions.JARVANIV: return { name: "JarvanIV", color: "230, 170, 59" }
        case EChampions.JAX: return { name: "Jax", color: "118, 34, 186" }
        case EChampions.JAYCE: return { name: "Jayce", color: "189, 29, 15" }
        case EChampions.JHIN: return { name: "Jhin", color: "241, 251, 254" }
        case EChampions.JINX: return { name: "Jinx", color: "187, 12, 173" }
        case EChampions.KAISA: return { name: "Kaisa", color: "135, 66, 184" }
        case EChampions.KALISTA: return { name: "Kalista", color: "0, 194, 219" }
        case EChampions.KARMA: return { name: "Karma", color: "69, 205, 151" }
        case EChampions.KARTHUS: return { name: "Karthus", color: "201, 250, 255" }
        case EChampions.KASSADIN: return { name: "Kassadin", color: "118, 34, 186" }
        case EChampions.KATARINA: return { name: "Katarina", color: "177, 5, 15" }
        case EChampions.KAYLE: return { name: "Kayle", color: "255, 166, 0" }
        case EChampions.KAYN: return { name: "Kayn", color: "184, 51, 51" }
        case EChampions.KENNEN: return { name: "Kennen", color: "243, 97, 255" }
        case EChampions.KHAZIX: return { name: "Khazix", color: "117, 12, 178" }
        case EChampions.KINDRED: return { name: "Kindred", color: "3, 139, 235" }
        case EChampions.KLED: return { name: "Kled", color: "255, 166, 0" }
        case EChampions.KOGMAW: return { name: "KogMaw", color: "255, 219, 208" }
        case EChampions.LEBLANC: return { name: "Leblanc", color: "135, 66, 184" }
        case EChampions.LEESIN: return { name: "LeeSin", color: "177, 5, 15" }
        case EChampions.LEONA: return { name: "Leona", color: "255, 166, 0" }
        case EChampions.LILLIA: return { name: "Lillia", color: "243, 97, 255" }
        case EChampions.LISSANDRA: return { name: "Lissandra", color: "3, 139, 235" }
        case EChampions.LUCIAN: return { name: "Lucian", color: "255, 240, 234" }
        case EChampions.LULU: return { name: "Lulu", color: "243, 97, 255" }
        case EChampions.LUX: return { name: "Lux", color: "255, 166, 0" }
        case EChampions.MALPHITE: return { name: "Malphite", color: "255, 118, 110" }
        case EChampions.MALZAHAR: return { name: "Malzahar", color: "117, 12, 178" }
        case EChampions.MAOKAI: return { name: "Maokai", color: "61, 180, 153" }
        case EChampions.MASTERYI: return { name: "MasterYi", color: "239, 255, 106" }
        case EChampions.MISSFORTUNE: return { name: "MissFortune", color: "211, 60, 22" }
        case EChampions.WUKONG: return { name: "MonkeyKing", color: "177, 5, 15" }
        case EChampions.MORDEKAISER: return { name: "Mordekaiser", color: "0, 255, 136" }
        case EChampions.MORGANA: return { name: "Morgana", color: "187, 12, 173" }
        case EChampions.NAMI: return { name: "Nami", color: "0, 182, 133" }
        case EChampions.NASUS: return { name: "Nasus", color: "117, 12, 178" }
        case EChampions.NAUTILUS: return { name: "Nautilus", color: "211, 60, 22" }
        case EChampions.NEEKO: return { name: "Neeko", color: "187, 12, 173" }
        case EChampions.NIDALEE: return { name: "Nidalee", color: "255, 166, 0" }
        case EChampions.NILAH: return { name: "Nilah", color: "195, 174, 255" }
        case EChampions.NOCTURNE: return { name: "Nocturne", color: "132, 0, 255" }
        case EChampions.NUNU: return { name: "Nunu", color: "0, 192, 255" }
        case EChampions.OLAF: return { name: "Olaf", color: "255, 166, 0" }
        case EChampions.ORIANNA: return { name: "Orianna", color: "237, 225, 255" }
        case EChampions.ORNN: return { name: "Ornn", color: "177, 5, 15" }
        case EChampions.PANTHEON: return { name: "Pantheon", color: "255, 252, 238" }
        case EChampions.POPPY: return { name: "Poppy", color: "255, 0, 98" }
        case EChampions.PYKE: return { name: "Pyke", color: "0, 255, 221" }
        case EChampions.QIYANA: return { name: "Qiyana", color: "250, 89, 12" }
        case EChampions.QUINN: return { name: "Quinn", color: "189, 119, 162" }
        case EChampions.RAKAN: return { name: "Rakan", color: "189, 119, 162" }
        case EChampions.RAMMUS: return { name: "Rammus", color: "255, 166, 0" }
        case EChampions.REKSAI: return { name: "RekSai", color: "0, 195, 235" }
        case EChampions.RELL: return { name: "Rell", color: "255, 166, 0" }
        case EChampions.RENATAGLASC: return { name: "Renata", color: "200, 30, 128" }
        case EChampions.RENEKTON: return { name: "Renekton", color: "201, 106, 24" }
        case EChampions.RENGAR: return { name: "Rengar", color: "157, 172, 168" }
        case EChampions.RIVEN: return { name: "Riven", color: "208, 247, 233" }
        case EChampions.RUMBLE: return { name: "Rumble", color: "200, 48, 14" }
        case EChampions.RYZE: return { name: "Ryze", color: "132, 101, 255" }
        case EChampions.SAMIRA: return { name: "Samira", color: "255, 201, 132" }
        case EChampions.SEJUANI: return { name: "Sejuani", color: "8, 116, 231" }
        case EChampions.SENNA: return { name: "Senna", color: "57, 223, 106" }
        case EChampions.SERAPHINE: return { name: "Seraphine", color: "243, 97, 255" }
        case EChampions.SETT: return { name: "Sett", color: "255, 93, 119" }
        case EChampions.SHACO: return { name: "Shaco", color: "177, 5, 15" }
        case EChampions.SHEN: return { name: "Shen", color: "102, 109, 201" }
        case EChampions.SHYVANA: return { name: "Shyvana", color: "177, 5, 15" }
        case EChampions.SINGED: return { name: "Singed", color: "92, 247, 85" }
        case EChampions.SION: return { name: "Sion", color: "177, 5, 15" }
        case EChampions.SIVIR: return { name: "Sivir", color: "255, 166, 0" }
        case EChampions.SKARNER: return { name: "Skarner", color: "134, 115, 255" }
        case EChampions.SONA: return { name: "Sona", color: "0, 195, 255" }
        case EChampions.SORAKA: return { name: "Soraka", color: "134, 115, 255" }
        case EChampions.SWAIN: return { name: "Swain", color: "255, 0, 0" }
        case EChampions.SYLAS: return { name: "Sylas", color: "132, 101, 255" }
        case EChampions.SYNDRA: return { name: "Syndra", color: "201, 66, 238" }
        case EChampions.TAHMKENCH: return { name: "TahmKench", color: "157, 172, 168" }
        case EChampions.TALIYAH: return { name: "Taliyah", color: "211, 60, 22" }
        case EChampions.TALON: return { name: "Talon", color: "110, 50, 125" }
        case EChampions.TARIC: return { name: "Taric", color: "134, 115, 255" }
        case EChampions.TEEMO: return { name: "Teemo", color: "255, 166, 0" }
        case EChampions.THRESH: return { name: "Thresh", color: "0, 255, 115" }
        case EChampions.TRISTANA: return { name: "Tristana", color: "134, 115, 255" }
        case EChampions.TRUNDLE: return { name: "Trundle", color: "173, 17, 127" }
        case EChampions.TRYNDAMERE: return { name: "Tryndamere", color: "78, 226, 172" }
        case EChampions.TWISTEDFATE: return { name: "TwistedFate", color: "82, 58, 87" }
        case EChampions.TWITCH: return { name: "Twitch", color: "92, 247, 85" }
        case EChampions.UDYR: return { name: "Udyr", color: "255, 166, 0" }
        case EChampions.URGOT: return { name: "Urgot", color: "0, 255, 115" }
        case EChampions.VARUS: return { name: "Varus", color: "222, 0, 84" }
        case EChampions.VAYNE: return { name: "Vayne", color: "255, 0, 212" }
        case EChampions.VEIGAR: return { name: "Veigar", color: "30, 0, 255" }
        case EChampions.VELKOZ: return { name: "Velkoz", color: "187, 12, 173" }
        case EChampions.VEX: return { name: "Vex", color: "0, 195, 255" }
        case EChampions.VI: return { name: "Vi", color: "230, 40, 104" }
        case EChampions.VIEGO: return { name: "Viego", color: "196, 253, 255" }
        case EChampions.VIKTOR: return { name: "Viktor", color: "255, 166, 0" }
        case EChampions.VLADIMIR: return { name: "Vladimir", color: "211, 60, 22" }
        case EChampions.VOLIBEAR: return { name: "Volibear", color: "7, 106, 255" }
        case EChampions.WARWICK: return { name: "Warwick", color: "92, 247, 85" }
        case EChampions.XAYAH: return { name: "Xayah", color: "177, 5, 15" }
        case EChampions.XERATH: return { name: "Xerath", color: "7, 106, 255" }
        case EChampions.XINZHAO: return { name: "XinZhao", color: "47, 51, 255" }
        case EChampions.YASUO: return { name: "Yasuo", color: "50, 142, 255" }
        case EChampions.YONE: return { name: "Yone", color: "177, 5, 15" }
        case EChampions.YORICK: return { name: "Yorick", color: "112, 228, 216" }
        case EChampions.YUUMI: return { name: "Yuumi", color: "202, 6, 137" }
        case EChampions.ZAC: return { name: "Zac", color: "0, 255, 115" }
        case EChampions.ZED: return { name: "Zed", color: "211, 60, 22" }
        case EChampions.ZERI: return { name: "Zeri", color: "142, 247, 85" }
        case EChampions.ZIGGS: return { name: "Ziggs", color: "255, 166, 0" }
        case EChampions.ZILEAN: return { name: "Zilean", color: "94, 223, 255" }
        case EChampions.ZOE: return { name: "Zoe", color: "255, 94, 106" }
        case EChampions.ZYRA: return { name: "Zyra", color: "211, 60, 22" }
        default: return undefined
    }
}

export function getTeamFromString(team: string): number {
    switch (team) {
        case "DRX": return ETeams.DRX;
        case "DK": return ETeams.DK;
        case "BRO": return ETeams.BRO;
        case "GEN": return ETeams.GEN;
        case "HLE": return ETeams.HLE;
        case "KT": return ETeams.KT;
        case "KDF": return ETeams.KDF;
        case "LSB": return ETeams.LSB;
        case "NS": return ETeams.NS;
        case "T1": return ETeams.T1;
        default: return -1;
    }
}

export function getTeamFromNumber(team: number, short: boolean): string {
    switch (team) {
        case ETeams.DRX: return ifShort(ETeamNames.DRX_SHORT, ETeamNames.DRX_LONG, short);
        case ETeams.DK: return ifShort(ETeamNames.DK_SHORT, ETeamNames.DK_LONG, short);
        case ETeams.BRO: return ifShort(ETeamNames.BRO_SHORT, ETeamNames.BRO_LONG, short);
        case ETeams.GEN: return ifShort(ETeamNames.GEN_SHORT, ETeamNames.GEN_LONG, short);
        case ETeams.HLE: return ifShort(ETeamNames.HLE_SHORT, ETeamNames.HLE_LONG, short);
        case ETeams.KT: return ifShort(ETeamNames.KT_SHORT, ETeamNames.KT_LONG, short);
        case ETeams.KDF: return ifShort(ETeamNames.KDF_SHORT, ETeamNames.KDF_LONG, short);
        case ETeams.LSB: return ifShort(ETeamNames.LSB_SHORT, ETeamNames.LSB_LONG, short);
        case ETeams.NS: return ifShort(ETeamNames.NS_SHORT, ETeamNames.NS_LONG, short);
        case ETeams.T1: return ifShort(ETeamNames.T1_SHORT, ETeamNames.T1_LONG, short);
        default: return "";
    }
}

export function getRegion(regionE: string): IRegion {
    switch (regionE) {
        case ERegions.NA: return { use: "NA1", display: "NA" };
        case ERegions.EUW: return { use: "EUW1", display: "EUW" };
        case ERegions.EUN: return { use: "EUN1", display: "EUN" };
        case ERegions.OCE: return { use: "OC1", display: "OCE" };
        case ERegions.KR: return { use: "KR", display: "KR" };
        case ERegions.JP: return { use: "JP1", display: "JP" };
        case ERegions.BR: return { use: "BR1", display: "BR" };
        case ERegions.RU: return { use: "RU", display: "RU" };
        default: return { use: "", display: "World" };
    }
}

export function whichStream(stream: string): string {
    return stream.includes("twitch") ? 'Twitch' : 'Afreeca';
}

export const groupByKey = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
    arr.reduce((groups, item) => {
        (groups[key(item)] ||= []).push(item);
        return groups;
    }, {} as Record<K, T[]>);

export function sortByKey(record: Record<string, IPlayer[]>, sortArr: string[]): IPlayerGroups {
    const result = Object.keys(record).map((key) => {
        return { key: key, players: record[key as keyof typeof record] as IPlayers };
    });
    
    const sorted = result.sort((a, b) => sortArr.indexOf(a.key) - sortArr.indexOf(b.key));
    return sorted as IPlayerGroups;
}

export function mapEnum(enumerable: any, type: string, fn: Function): any[] {
    // get all the members of the enum
    let enumMembers: any[] = Object.keys(enumerable).map(key => enumerable[key]);
    // we are only interested in the numeric identifiers as these represent the values
    let enumValues: any[] = enumMembers.filter(v => typeof v === type);
    // now map through the enum values
    return enumValues.map((m, i) => fn(m, i));
}

export function mapEnumKeys(enumerable: any): string[] {
    let enumMembers: string[] = Object.keys(enumerable).map(key => enumerable[key]);
    return enumMembers;
}

export function sliceMap(map: any[], min: number, max: number): any[] {
    return map.slice(min, max);
}

export function included(list: string[], check: string): boolean {
    return list.includes(check);
}

export function regionType(region: string): string { return (region === ERegions.WORLD) ? EButtonImages.WORLD : EButtonImages.FLAG; }
export function regionFolder(region: string): string { return (region === ERegions.WORLD) ? 'icons' : 'flags'; }
export function regionFile(region: string): string { return (region === ERegions.WORLD) ? '.svg' : '.png'; }
export function modeType(mode: string): string { return (mode === EModes.ALL) ? EButtonImages.ICON : EButtonImages.NONE; }
export function modeImage(mode: string): string { return (mode === EModes.ALL) ? 'icons/any.svg' : ''; }
export function roleType(role: string): string { return (role === ERoles.ANY) ? EButtonImages.ICON : EButtonImages.ROLE; }
export function roleFile(role: string): string { return (role === ERoles.ANY) ? '.svg' : '.png'; }


// NOTE: TRANSLATION:

export function oMode(mode: string): string { return `modes.${mode}` }
export function oRole(role: string): string { return `roles.${role}` }
export function oRegion(region: string): string { return `regions.${region}` }
export function sTitle(page: string): string { return `settings.pages.${page}.title` }
export function sItemTitle(page: string, item: string): string { return `settings.pages.${page}.items.${item}.title` }
export function sItemDescription(page: string, item: string): string { return `settings.pages.${page}.items.${item}.description` }
export function pAbout(item: string): string { return `settings.pages.about.${item}` }

// NOTE: Form interfaces:

export function FormSettingsPage(index: number, type: string, title: string, items?: ISettingsItems): ISettingsPage {
    return { index: index, type: type, title: sTitle(title), items: items ? items : [] }
}
export function FormSettingsPageLang(index: number, type: string, title: string, selected: number, items?: ISettingsItems): ISettingsPageLanguage {
    return { index: index, type: type, title: sTitle(title), selected: selected, items: items ? items : [] }
}
export function SettingsItemSpacer(): ISettingsItem { return { itemValue: { type: "spacer", value: false } }; }
export function SettingsItemBoolean(section: string, key: string, value: boolean, children?: ISettingsItems, secondaryAction?: () => void): ISettingsItem {
    return {
        title: sItemTitle(section, key),
        description: sItemDescription(section, key),
        itemValue: { type: 'boolean', value: value, key: key } as ISettingsItemValueBool,
        childValues: children,
        secondaryAction: secondaryAction
    }
}
export function ItemValueSelection(index: number, section: string, value: string, ignoreTranslation: boolean): ISettingsItemValueSelection {
    return { index: index, text: ignoreTranslation ? value : sItemTitle(section, value) };
}
export function SettingsItemSelector(section: string, key: string, value: number, selections: string[], ignoreTranslation: boolean = false): ISettingsItem {
    return {
        title: sItemTitle(section, key), itemValue: {
            type: 'selector', key: key, value: value, options: selections.map((value, i) => { return ItemValueSelection(i, section, value, ignoreTranslation) }) as ISettingsItemValueSelections
        } as ISettingsItemValueSelector
    }
}
export function SettingsItemLanguage(value: number, text: string, lang: string): ISettingsItem {
    return {
        itemValue: { type: "lang", value: value, text: text, lang: lang as string } as ISettingsItemValueLanguage
    }
}
export function FormSettingsSection(type: string, title: string, entries?: ISettingsSectionEntries, initOpen?: boolean): ISettingsSection {
    return { type: type, title: title, initOpen: initOpen ? initOpen : false, entries: entries ? entries : [] }
}
export function SectionEntryCredit(name: string, link: string): ISettingsSectionEntry {
    return { name: name, link: link }
}
export function SettingsEntryChange(version: string, date: string, changes?: IAppReleaseChanges): ISettingsSectionEntry {
    return { version: version, date: date, changes: changes ? changes : [] } as ISettingsSectionEntry;
}
export function SettingsEntryRelease(type: EChangeType, change: string, issues?: string[]): IAppReleaseChange {
    return { type: type, change: change, issues: issues ? issues : [] } as IAppReleaseChange;
}

export function FormSidebarButton(title: string, icon: string, page: string, action: () => void): ISidebarButton {
    return { title: title, icon: icon, page: page, action: action };
}

// NOTE: RANDOM:

export function randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomKDA(): string {
    return `${randomNumber(0, 10)}/${randomNumber(0, 10)}/${randomNumber(0, 10)}`;
}

export function randomEnum<T extends object>(useEnum: T, filter: EChampions[]): T[keyof T] {
    const enumValues = Object.keys(useEnum)
        .map(n => Number.parseInt(n))
        // .filter(n => (filter.length >= 1) ? filter.includes(n) : false)
        .filter(n => !Number.isNaN(n)) as unknown as T[keyof T][]
    const randomIndex = Math.floor(Math.random() * enumValues.length)
    const randomEnumValue = enumValues[randomIndex]
    return randomEnumValue;
}

export function randomActive(): boolean {
    const notRandomNumbers = [1, 1, 2, 2, 3, 3, 4];
    const idx = Math.floor(Math.random() * notRandomNumbers.length);
    return (notRandomNumbers[idx] != 4);
}

export async function getRandomBackground(override?: IBackground): Promise<IBackground> {
    if (!override) {
        const dir = randomNumber(0, 1) == 0 ? "splash" : "random";
        const bgs = await readDir(`assets/dragontail/${dir}/`, { dir: BaseDirectory.Resource, recursive: true });
        let entry = bgs.at(randomNumber(0, bgs.length - 1))?.name;
        const checkBG = await checkLiveBackground(entry!);
        const ifLive = checkBG.ext === '.webm';
    
        console.log(`DEBUG: Random background selected [\"${checkBG.name}\", live: ${ifLive}]`);
    
        let bgType = ifLive ? "live" : dir;
        let bgName = checkBG.name;
        let bgExt = checkBG.ext;

        return { type: bgType, name: bgName, ext: bgExt }
    }

    return { type: override.type, name: override.name, ext: override.ext }
}