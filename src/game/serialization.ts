import type { EffectType } from './effects/Effects';
import type { SerializedModifier } from './mods/Modifier';
import type { GameStatCollection, PlayerStatCollection } from './statistics/stats';

export type UnsafeSerialization = DeepPartial<Serialization>;

export interface Serialization {
    meta: Meta;
    game?: Game;
    player?: Player;
    worlds?: Worlds;
    world?: World;
    statistics?: Statistics;
    effects?: Effects;
    notifications?: Notifications;
    //components
    guildHall?: GuildHall;
    weapon?: Weapon;
    skills?: Skills;
    treasury?: Treasury;
    elementHighlightIdList?: string[];
}

export interface Meta {
    gameConfigId: string;
    createdAt?: number;
    lastSavedAt?: number;
}

export interface Game {
    stats: Record<keyof GameStatCollection, Statistic>;
    resources: Record<string, Statistic>;
}

export interface Player {
    stats: Record<keyof PlayerStatCollection, Statistic>;
}

export interface World {
    combatCtx?: CombatContext;
}

export interface Worlds {
    combatCtx?: CombatContext;
}

export interface CombatContext {
    enemyCount: number;
    enemy?: EnemyInstance;
    enemyId?: string;
    active: boolean;
}

export interface Enemy {
    enemyInstance: EnemyInstance;
}

export interface EnemyInstance {
    lifeRatio: number;
    modList: Omit<SerializedModifier, 'text'>[];
}

export interface Statistics {
    groups: Record<string, StatisticGroup>;
}

export interface StatisticGroup {
    pageHeaderOpenState: boolean;
    sideHeaderOpenState: boolean;
}

export interface Statistic {
    value: number;
    sticky: boolean;
}

export interface Notifications {
    notificationList: {
        title: string;
        description?: string;
        time: number;
        elementId: string | null | undefined;
        seen: boolean;
    }[];
}

export interface Effects {
    effectList: Effect[];
}

export interface Effect {
    type: EffectType;
    timePct: number;
    effectivenessFactor?: number;
}

export interface GuildHall {
    level?: number;
    classId?: string;
}

export interface Weapon {
    level?: number;
    weaponTypeId?: string;
    modList: SerializedModifier[];
    crafting: WeaponCrafting;
}
export interface WeaponCrafting {
    modList?: SerializedModifier[];
}

export interface Skills {
    level?: number;
    exp?: number;
    meditating?: boolean;
    attackSkills?: {
        skillId: string;
        skillList: {
            id: string;
            expFac: number;
        }[];
    };
    auraSkills?: {
        skillSlotList: ({
            id: string;
            timePct: number;
        } | undefined)[];
        skillList: {
            id: string;
            expFac: number;
        }[];
    };
    passiveSkills?: {
        insightCapacityEnhancerList: { id: string; count: number; }[];
        passiveList: {
            id: string;
            allocated: boolean;
            expFac: number;
        }[];
    };
}

export interface Treasury {
    level?: number;
    exp?: number;
    expanding?: boolean;
    artifacts?: {
        artifactNameList: {
            id: string;
            assigned: boolean;
            expFac: number;
        }[];
    };
}