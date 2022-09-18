
import en_us from "./en_US/translation.json";
import en_uk from "./en_UK/translation.json";
import kr_kr from "./kr_KR/translation.json";
import fi_fi from "./fi_FI/translation.json";
import sv_se from "./sv_SV/translation.json";
import jp_ja from "./ja_JP/translation.json";
import br_ba from "./br_BA/translation.json";

import { readDir, BaseDirectory, readTextFile } from '@tauri-apps/api/fs';
import { Resource, ResourceKey, ResourceLanguage } from "i18next";

interface ILanguageResources extends Array<ILanguageResource>{}
interface ILanguageResource {
    lang: string;
    text: string;
}

async function importLanguagesResource(): Promise<Resource> {
    const locales = await readDir('locales/', { dir: BaseDirectory.Resource, recursive: true });
    let resources: Resource = {};

    for (const locale of locales) {
        if (locale.children) {
            const lang = locale.name;
            const common = locale.children[0];
            const contents = await readTextFile(`locales/${lang}/${common.name}`, { dir: BaseDirectory.Resource });
            const obj = JSON.parse(contents);
            resources[`${lang!}`] = { ["translation"]: obj as ResourceKey} as ResourceLanguage;
        }
    }

    return resources;
}

async function importLanguages(): Promise<ILanguageResources> {
    const locales = await readDir('locales/', { dir: BaseDirectory.Resource, recursive: true });
    let resources: ILanguageResources = [];

    for (const locale of locales) {
        if (locale.children) {
            const lang = locale.name;
            const common = locale.children[0];
            const contents = await readTextFile(`locales/${lang}/${common.name}`, { dir: BaseDirectory.Resource });
            const obj = JSON.parse(contents);
            const langText = obj["language"]["text"] as string;
            resources.push({lang: lang, text: langText} as ILanguageResource);
        }
    }

    return resources;
}

export {
    importLanguages,
    importLanguagesResource,
    en_us,
    en_uk,
    kr_kr,
    fi_fi,
    sv_se,
    jp_ja,
    br_ba
}
