import { IProjectCard } from "../IProjectCard";
import { IActionCard, IResourceCard } from '../ICard';
import { Tags } from "../Tags";
import { CardType } from "../CardType";
import { Player } from "../../Player";
import { ResourceType } from "../../ResourceType";
import { Game } from '../../Game';
import { SelectCard } from "../../inputs/SelectCard";
import { CardName } from '../../CardName';

export class StratosphericBirds implements IActionCard,IProjectCard, IResourceCard {
    public cost: number = 12;
    public tags: Array<Tags> = [Tags.VENUS, Tags.ANIMAL];
    public name: CardName = CardName.STRATOSPHERIC_BIRDS;
    public cardType: CardType = CardType.ACTIVE;
    public resourceType: ResourceType = ResourceType.ANIMAL;
    public resourceCount: number = 0;
    public canPlay(player: Player, game: Game): boolean {
        const cardsWithFloater = player.getCardsWithResources().filter(card => card.resourceType === ResourceType.FLOATER);
        if (cardsWithFloater.length === 0) return false;
        return game.getVenusScaleLevel() >= 12 - (2 * player.getRequirementsBonus(game, true));
    }
    public play(player: Player) {
       const cardsWithFloater = player.getCardsWithResources().filter(card => card.resourceType === ResourceType.FLOATER);
        if (cardsWithFloater.length === 1) {
            player.removeResourceFrom(cardsWithFloater[0], 1)
            return undefined;
        }
        return new SelectCard(
            "Select card to remove 1 floater from", 
            cardsWithFloater,
            (foundCards) => {
                player.removeResourceFrom(foundCards[0], 1)
                return undefined;
            }
        );
    }
    public canAct(): boolean {
        return true;
    }   
    public getVictoryPoints(): number {
        return this.resourceCount;
    }
    public action() {
        this.resourceCount++;
        return undefined;
    }
}