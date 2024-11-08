import type * as GameConfig from 'src/game/gameConfig/GameConfig';
import { Modifier } from 'src/game/mods/Modifier';
import { isDefined, pickOneFromPickProbability } from 'src/shared/utils/utils';
import { combat, game, notifications, player } from 'src/game/game';
import type * as GameSerialization from 'src/game/serialization';
import { createObjectListElement, type AssignableObject, getNextRankObject, createAssignableObject, getRankNumeral, getRankBaseName, createObjectInfoElements, unlockObject, selectObjectByName } from 'src/game/utils/objectUtils';
import { EventEmitter } from 'src/shared/utils/EventEmitter';
import { ROMAN_NUMERALS } from 'src/shared/utils/constants';
import { assertDefined } from 'src/shared/utils/assert';
import { ProgressElement } from 'src/shared/customElements/ProgressElement';
import { ENVIRONMENT } from '../../../../config';

interface Artifact extends AssignableObject {
    baseName: string;
    data: GameConfig.Artifact;
    rankList: Artifact[];
}

export class Artifacts {
    readonly page: HTMLElement;
    private onArtifactFound = new EventEmitter<Artifact>();
    private artifactList: Artifact[];
    private elementMap = new Map<string, HTMLElement>();
    constructor(data: GameConfig.Artifacts) {
        this.page = document.createElement('div');
        this.page.classList.add('p-artifacts');
        this.page.insertAdjacentHTML('beforeend', '<div class="g-toolbar" data-artifacts-counter><span>Artifacts: <var data-cur>0</var>/<var data-max></var></span></div>');
        this.page.insertAdjacentHTML('beforeend', '<div class="g-title">Artifact List</div>');
        this.page.insertAdjacentHTML('beforeend', '<ul class="artifact-list g-scroll-list-v" data-artifact-list></ul>');
        this.page.insertAdjacentHTML('beforeend', '<div data-item-info></div>');

        this.artifactList = data.artifactList.map(data => {
            const baseName = getRankBaseName(data.name);
            if (!this.elementMap.has(baseName)) {
                const element = createObjectListElement(data);
                element.addEventListener('click', this.selectArtifactByName.bind(this, data.name));
                this.elementMap.set(baseName, element);
            }
            return { data, ...createAssignableObject(data), rankList: [] };
        });
        this.page.querySelectorStrict('[data-artifact-list]').append(...this.elementMap.values());
        this.artifactList.filter(x => x.unlocked).forEach(x => unlockObject(x, this.elementMap));

        const firstArtifact = this.artifactList.find(x => x.unlocked);
        if (firstArtifact) {
            this.selectArtifactByName(firstArtifact.name);
        }

        this.updateArtifactsCounter();

        combat.events.enemyDeath.listen(() => {
            this.tryUnlockArtifact();
        });

        player.stats.maxArtifacts.addListener('change', this.updateArtifactsCounter.bind(this));

        this.onArtifactFound.listen(artifact => {
            const rankItems = this.artifactList.filter(x => x.unlocked && x.baseName === artifact.baseName);
            const rankItem = rankItems.sort((a, b) => ROMAN_NUMERALS.indexOf(getRankNumeral(b.name) ?? 'I') - ROMAN_NUMERALS.indexOf(getRankNumeral(a.name) ?? 'I'))[0];
            assertDefined(rankItem);
            if (rankItem.maxExp && rankItem.exp < rankItem.maxExp) {
                rankItem.exp++;
                this.updateArtifactInfo();
                if (rankItem.exp >= rankItem.maxExp) {
                    this.tryUnlockNextArtifactRank(artifact);
                }
            }
        });

        if (ENVIRONMENT === 'development') {
            window.addEventListener('Dev:AddArtifact', e => {
                const artifact = this.artifactList.find(x => x.baseName.toLowerCase() === e.detail.toLowerCase());
                if (artifact) {
                    unlockObject(artifact, this.elementMap);
                    this.onArtifactFound.invoke(artifact);
                    console.log(`You unlocked: ${artifact.name}`);
                } else {
                    console.log('no artifact available');
                }
            }, { signal: game.abortSignal });
            window.addEventListener('Dev:IncreaseArtifactRank', e => {
                const artifact = this.artifactList.find(x => x.baseName.toLowerCase() === e.detail.toLowerCase());
                if (!artifact) {
                    console.log(`${e.detail} does not exist`);
                    return;
                }
                this.onArtifactFound.invoke(artifact);
            }, { signal: game.abortSignal });
        }
    }

    get selectedArtifact() {
        return this.artifactList.find(x => x.selected);
    }

    get artifactCount() {
        return this.artifactList.filter(x => x.assigned).length;
    }

    private updateArtifactsCounter() {
        const element = this.page.querySelectorStrict('[data-artifacts-counter]');
        element.querySelectorStrict('[data-cur]').textContent = this.artifactCount.toFixed();
        element.querySelectorStrict('[data-max]').textContent = player.stats.maxArtifacts.value.toFixed();
    }

    private selectArtifactByName(name: string) {
        const artifact = selectObjectByName(name, this.artifactList, this.elementMap);
        this.showArtifact(artifact);
    }

    private assignArtifact(artifact: Artifact) {
        artifact.assigned = true;
        player.modDB.add(`Artifact/${artifact.data.name}`, Modifier.extractStatModifierList(...Modifier.modListFromTexts(artifact.data.modList)));
        this.updateArtifactsCounter();

        const element = this.elementMap.get(artifact.baseName);
        assertDefined(element);
        element.setAttribute('data-tag', 'valid');
        element.textContent = artifact.name;
    }

    private unassignArtifact(artifact: Artifact) {
        artifact.assigned = false;
        player.modDB.removeBySource(`Artifact/${artifact.data.name}`);
        this.updateArtifactsCounter();

        const element = this.elementMap.get(artifact.baseName);
        assertDefined(element);
        element.removeAttribute('data-tag');
        element.textContent = this.artifactList.findStrict(x => x.baseName === artifact.baseName).name;
    }

    private showArtifact(artifact: Artifact) {
        const element = this.page.querySelector('[data-item-info]');
        element?.replaceChildren();
        if (!artifact) {
            return;
        }

        const rankList = this.artifactList.filter(x => x.baseName === artifact.baseName);
        const itemInfoElements = createObjectInfoElements({
            obj: artifact,
            modList: artifact.data.modList,
            rankList,
            onRankChange: (item) => this.showArtifact(item as Artifact)
        });
        this.page.querySelector('[data-item-info]')?.replaceWith(itemInfoElements.element) ?? this.page.appendChild(itemInfoElements.element);

        const button = document.createElement('button');
        const updateButton = () => {
            let disabled = true;
            if (artifact.assigned || this.artifactList.filter(x => x.baseName === artifact.baseName).some(x => x.assigned)) {
                disabled = false;
            } else if (this.artifactCount < player.stats.maxArtifacts.value) {
                disabled = false;
            }
            button.textContent = artifact.assigned ? 'Unassign' : 'Assign';
            button.toggleAttribute('disabled', disabled);
            button.setAttribute('data-tag', !artifact.assigned ? 'valid' : 'invalid');
        };
        button.addEventListener('click', () => {
            if (artifact.assigned) {
                this.unassignArtifact(artifact);
            } else {
                const assignedArtifact = this.artifactList.find(x => x.assigned && x.baseName === artifact.baseName);
                if (assignedArtifact) {
                    this.unassignArtifact(assignedArtifact);
                }
                this.assignArtifact(artifact);
            }
            updateButton();
        });
        updateButton();
        itemInfoElements.contentElement.appendChild(button);
    }

    private updateArtifactInfo() {
        const selectedArtifact = this.selectedArtifact;
        if (!selectedArtifact) {
            return;
        }
        const expbar = this.page.querySelector<ProgressElement>(`[data-item-info] ${ProgressElement.name}`);
        if (expbar) {
            expbar.value = selectedArtifact.exp / selectedArtifact.maxExp;
        }
    }

    private tryUnlockArtifact() {
        const candidates = this.artifactList.filter(x => x.probability && (getRankNumeral(x.name) ?? 'I') === 'I');
        candidates.forEach(x => x.probability = Math.ceil((x.data.probability || 0) / player.stats.explorationMultiplier.value));
        const artifact = pickOneFromPickProbability(candidates);
        if (!artifact) {
            return;
        }
        if (!artifact.unlocked) {
            unlockObject(artifact, this.elementMap);
            notifications.addNotification({
                title: `New Artifact: ${artifact.name}`,
                elementId: artifact.id
            });
        }
        this.onArtifactFound.invoke(artifact);
    }

    private tryUnlockNextArtifactRank(artifact: Artifact) {
        const nextArtifact = getNextRankObject(artifact);
        if (!nextArtifact) {
            return;
        }
        unlockObject(nextArtifact, this.elementMap);
        notifications.addNotification({
            title: `New Artifact Rank: ${nextArtifact.name}`,
        });
    }

    serialize(): GameSerialization.Treasury['artifacts'] {
        return {
            artifactNameList: this.artifactList.filter(x => x.unlocked).map(x => ({ id: x.data.id, assigned: x.assigned, expFac: x.exp / x.maxExp }))
        };
    }

    deserialize(save: DeepPartial<GameSerialization.Treasury['artifacts']>) {
        for (const data of save?.artifactNameList?.filter(isDefined) || []) {
            const artifact = this.artifactList.find(x => x.data.id === data.id);
            if (!artifact) {
                continue;
            }
            artifact.exp = artifact.maxExp * (data.expFac ?? 0);
            unlockObject(artifact, this.elementMap);
            if (data.assigned) {
                this.assignArtifact(artifact);
                if (!this.selectedArtifact) {
                    this.selectArtifactByName(artifact.data.name);
                }
            }
        }

        const artifact = this.artifactList.find(x => x.assigned || x.selected || x.unlocked);
        if (artifact) {
            this.selectArtifactByName(artifact.name);
        }
    }
}