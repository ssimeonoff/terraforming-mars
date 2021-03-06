import { IProjectCard } from "../IProjectCard";
import { Tags } from "../Tags";
import { CardType } from '../CardType';
import { Player } from "../../Player";
import { CardName } from '../../CardName';
import { Game } from '../../Game';
import { Resources } from '../../Resources';

export class ImpactorSwarm implements IProjectCard {
    public cost: number = 11;
    public tags: Array<Tags> = [Tags.SPACE];
    public name: CardName = CardName.IMPACTOR_SWARM;
    public cardType: CardType = CardType.EVENT;

    public canPlay(player: Player): boolean {
        return player.getTagCount(Tags.JOVIAN) >= 2;
    }

    public play(player: Player, game: Game) {
        game.addResourceDecreaseInterrupt(player, Resources.PLANTS, 2);
        player.heat += 12;
        return undefined;
    }
}
