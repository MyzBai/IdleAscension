import { type ModTemplate } from './types';
import { combatCtxModTemplateList } from './combatCtxModTemplates';
import { persistentPlayerModTemplateList, playerModTemplateList } from './playerModTemplates';
import { enemyModTemplateList } from './enemyModTemplates';

export type ModDescription = typeof modTemplateList[number]['desc'];

export const worldModTemplateList = [
    ...persistentPlayerModTemplateList,
    ...combatCtxModTemplateList
] as const satisfies readonly ModTemplate[];


export const modTemplateList = [
    ...playerModTemplateList,
    ...enemyModTemplateList,
    ...combatCtxModTemplateList,
];
