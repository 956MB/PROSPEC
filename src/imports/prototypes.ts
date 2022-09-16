import { ISummonerAccount } from "./interfaces";
import { EChampions, EModes, ERegions, ERoles } from "./typings";
import random from 'random'

// NOTE: Prototypes:

declare global {
    interface Array<T> {
        filterRegions(regions: ERegions[]): Array<T>;
        filterModes(modes: EModes[]): Array<T>;
        filterRoles(roles: ERoles[]): Array<T>;
        filterChampions(champions: EChampions[]): Array<T>;
        filterUniquePlayers(min?: number, max?: number): Array<T>;
        filterRandomize(): Array<T>;
    }
}
if (!Array.prototype.filterRegions) {
    Array.prototype.filterRegions = function (this: ISummonerAccount[], regions: ERegions[]): ISummonerAccount[] {
        return this.filter((player) => (regions.length >= 1) ? regions.includes(player.region as ERegions) : this);
    }
}
if (!Array.prototype.filterModes) {
    Array.prototype.filterModes = function (this: ISummonerAccount[], modes: EModes[]): ISummonerAccount[] {
        return this;
        // return this.filter((player) => (modes.length >= 1) ? modes.includes(player. as EModes) : this);
    }
}
if (!Array.prototype.filterRoles) {
    Array.prototype.filterRoles = function (this: ISummonerAccount[], roles: ERoles[]): ISummonerAccount[] {
        if (this.length <= 0) { return this; }
        return this.filter((player) => (roles.length >= 1) ? roles.includes(player.role as ERoles) : this);
    }
}
if (!Array.prototype.filterChampions) {
    Array.prototype.filterChampions = function (this: ISummonerAccount[], champions: EChampions[]): ISummonerAccount[] {
        return this;
        // return this.filter((player) => (champions.length >= 1) ? champions.includes(player. as ERoles) : this);
    }
}
if (!Array.prototype.filterUniquePlayers) {
    Array.prototype.filterUniquePlayers = function (this: ISummonerAccount[], min: number, max: number): ISummonerAccount[] {
        const unique = [...new Map(this.map(item => [item.playerName, item])).values()];
        return unique.slice(min, max);
    }
}
if (!Array.prototype.filterRandomize) {
    Array.prototype.filterRandomize = function (this: ISummonerAccount[]): ISummonerAccount[] {
        return this.sort(() => 0.5 - random.float())
    }
}