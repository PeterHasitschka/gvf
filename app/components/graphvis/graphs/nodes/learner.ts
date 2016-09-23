import {NodeSimple} from './simple';
import {GraphVisConfig} from '../../config';
import {DataAbstract} from "../../data/abstract";
import {InterGraphEventService, INTERGRAPH_EVENTS} from "../../../../services/intergraphevents.service";

/**
 * A Learner node, derived from @see{NodeSimple}
 * @author Peter Hasitschka
 */
export class NodeLearner extends NodeSimple {

    constructor(x:number, y:number, protected dataEntity:DataAbstract) {
        super(x, y, dataEntity);

        this.color = GraphVisConfig.nodes.learnernode.color;
        this.setColor(this.color);
    }


    public onIntersectStart():void {
        InterGraphEventService.getInstance().send(INTERGRAPH_EVENTS.LEARNER_NODE_HOVERED, this);
        super.onIntersectStart();
    }

    public onIntersectLeave():void {
        InterGraphEventService.getInstance().send(INTERGRAPH_EVENTS.LEARNER_NODE_LEFT, this);
        super.onIntersectLeave();
    }
}