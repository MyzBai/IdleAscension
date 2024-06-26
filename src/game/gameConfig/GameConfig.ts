export const GAME_CONFIG_VERSION = 'v0' as const;

export type Components = Required<GameConfig>['components'];
export type ComponentName = keyof Components;

export interface GameConfig {
    version: typeof GAME_CONFIG_VERSION;
    playerStartModList: PlayerStartModList;
    enemyBaseLifeList: EnemyBaseLifeList;
    enemyBaseCountList: EnemyBaseCountList;
    enemyList: Enemy[];
    ascension: Ascension;
    components?: {
        playerClasses?: PlayerClasses;
        skills?: Skills;
        weapon?: Weapon;
        artifacts?: Artifacts;
        achievements?: Achievements;
    };
}

export interface Requirements {
    curLevel?: Level;
    maxLevel?: Level;
    ascensionCount?: Level;
}

export interface Enemy {
    id: Id;
    name: Name;
    level?: Level;
    weight?: Weight;
    modList?: EnemyModList;
}

export interface Ascension {
    trial: AscensionTrial;
    ascensionInstanceList?: AscensionInstance[];
}
export type AscensionEnemy = Omit<Enemy, 'level'>;
export interface AscensionTrial {
    /**@TJS-type integer @TJS-minimum 1 @TJS-default 1 */
    enemyCount: number;
    enemyList: AscensionEnemy[];
}
export interface AscensionInstance {
    id: Id;
    modList: AscensionInstanceModList;
}

export interface Weapon {
    weaponTypeList?: WeaponType[];
    modLists: WeaponMod[][];
    crafting: {
        advReforgeRequirements?: Requirements;
        craftList: WeaponCraft[];
    };
}
export interface WeaponType {
    id: Id;
    name: WeaponTypeName;
}
export interface WeaponMod {
    id: Id;
    level: Level;
    weight: Weight;
    mod: PlayerMod;
    weaponTypes?: WeaponTypeName[];
}
export interface WeaponCraft {
    desc: WeaponCraftDescription;
    probability: Probability;
    startCount?: UnsignedInteger;
    successRates: { min: UnsignedInteger; max: UnsignedInteger; };
}

export interface Skills {
    attackSkills?: {
        attackSkillList: AttackSkill[];
    };
    auraSkills?: {
        requirements?: Requirements;
        auraSkillList: AuraSkill[];
        auraSkillSlotList: AuraSkillSlot[];
    };
    passiveSkills?: {
        insightCapacityEnhancerList: {
            name: Name;
            insight: UnsignedInteger;
            probabilities: Probability[];
            flavourText?: FlavourText;
        }[];
        passiveSkillList: PassiveSkill[];
    };
}
export interface AttackSkill {
    id: Id;
    name: Name;
    manaCost: UnsignedInteger;
    /**@TJS-default 1 @TJS-minimum 0.1 */
    attackSpeed: number;
    /**@TJS-default 100 */
    attackEffectiveness: UnsignedInteger;
    modList: PlayerModList;
    probability?: Probability;
    /**@description 1 exp gained per attack */
    exp?: Exp;
}
export interface AuraSkill {
    id: Id;
    name: Name;
    manaCost: UnsignedInteger;
    baseDuration: UnsignedInteger;
    modList: PlayerModList;
    probability?: Probability;
    exp?: UnsignedInteger;
}
export interface AuraSkillSlot {
    requirements?: Requirements;
}
export interface PassiveSkill {
    id: Id;
    name: Name;
    insight: UnsignedInteger;
    modList: PlayerModList;
    probability?: Probability;
    exp?: UnsignedInteger;
}

export interface Artifacts {
    requirements?: Requirements;
    artifactList: Artifact[];
}
export interface Artifact {
    id: Id;
    name: Name;
    modList: PlayerModList;
    probability?: Probability;
    exp?: UnsignedInteger;
}

export interface PlayerClasses {
    requirements?: Requirements;
    tokenProbability: Probability;
    startTokenCount?: UnsignedInteger;
    classList: {
        id: Id;
        name: Name;
        modList: PlayerModList;
        tokenCost: UnsignedInteger;
    }[];
}


export interface Achievements {
    achievementList: Achievement[];
}
export interface Achievement {
    description: AchievementDescription;
}

export const SchemaOverrideSymbolNames = [
    'PlayerMod',
    'PlayerStartMod',
    'AscensionMod',
    'EnemyMod',
    'WeaponCraftDescription',
    'AchievementDescription',
    'EnemyBaseLife',
    'EnemyBaseCount'
] as const satisfies readonly string[];
export type SchemaOverrideSymbolName = typeof SchemaOverrideSymbolNames[number];

export const WeaponTypeNames = ['One Handed Sword', 'Two Handed Axe', 'Wand', 'Staff'] as const satisfies readonly Name[];
export type WeaponTypeName = typeof WeaponTypeNames[number] extends undefined ? Name : typeof WeaponTypeNames[number];

/**
 * @TJS-type integer
 * @TJS-minimum 0
 */
type UnsignedInteger = number;

/**
 * @TJS-type integer
 * @TJS-minimum 0
 * @default 1
 */
type Level = number;

/**@$ref #/definitions/Id */
type Id = string;

/**
 * @TJS-type integer
 * @TJS-minimum 0
 * @TJS-default 100
 */
type Weight = number;

/**
 * @TJS-type integer
 * @TJS-minimum 1
 * @TJS-default 100
 * @TJS-description Percent = 1/Probability
 */
type Probability = number;

/**
 * @TJS-type integer
 * @TJS-minimum 1
 * @TJS-default 0
 */
type Exp = number;

/**@TJS-pattern ^[A-Za-z 0-9]{3,32}$*/
type Name = string;

/**@pattern ^[A-Za-z .,!?0-9]{3,128}$ */
type FlavourText = string;

/**
 * @TJS-type integer
 * @minimum 1
 * @maximum 9007199254740991
 */
type EnemyBaseLife = number;

/**
 * @description Enemy life for each level starting at level 1. This will determine the max level. Max Level == array.length + 1.
 * @items {"$ref": "#/definitions/EnemyBaseLife"}
*/
type EnemyBaseLifeList = EnemyBaseLife[];

/**
 * @TJS-type integer
 * @minimum 1
 * @maximum 9007199254740991
 */
type EnemyBaseCount = number;

/**
 * @description Number of enemies for each level starting at level 1
 * @items {"$ref": "#/definitions/EnemyBaseCount"}
 */
type EnemyBaseCountList = EnemyBaseCount[];

/**@$ref #/definitions/PlayerMod */
type PlayerMod = string;
/**@items {"$ref": "#/definitions/PlayerMod"} */
type PlayerModList = PlayerMod[];

/**@$ref #/definitions/PlayerStartMod */
type PlayerStartMod = string;
/**@items {"$ref": "#/definitions/PlayerStartMod"} */
type PlayerStartModList = PlayerStartMod[];

/**@$ref #/definitions/EnemyMod */
type EnemyMod = string;
/**@items {"$ref": "#/definitions/EnemyMod"}*/
type EnemyModList = EnemyMod[];

/**@$ref #/definitions/AchievementDescription */
type AchievementDescription = string;

/**@$ref #/definitions/WeaponCraftDescription */
type WeaponCraftDescription = string;

type AscensionMod = string;
/**
* @description these modifiers will be applied upon ascending
* @items {"$ref": "#/definitions/AscensionMod"}
*/
type AscensionInstanceModList = AscensionMod[];