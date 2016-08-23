import {Plane} from '../../plane/plane';
import {DataAbstract} from '../data/abstract';
import {NodeAbstract} from '../graphs/nodes/abstract';
import {GraphLayoutAbstract} from '../graphs/layouts/abstract';
/**
 * Abstract Graph Class
 * Holding the corresponding data and the plane
 * Each Graph only holds ONE TYPE OF DATA
 * Currently there are no plans for mixing them up!
 * @author Peter Hasitschka
 */
export abstract class GraphAbstract {

    /**
     * The data of a specific type (learner, resource, ...) for this plane
     */
    protected data: DataAbstract[];
    protected dataGetterMethod;

    protected nodetype: any;
    protected layout: any;
    protected nodes: NodeAbstract[];


    constructor(protected plane: Plane) {
        this.nodes = [];
    }

    /**
     * Init method for loading data and creating the layout and nodes
     */
    public init(): void {
        this.loadData(data => { this.afterLoad(data) });
    }


    /**
        * Called as callback after data was loaded asynchronously
        * Nodes get created and stored in array
        * Afterwards layout gets calculated by the defined layout class
        * @param data - Array of data objects
        */
    protected afterLoad(data: DataAbstract[]): void {
        this.data = data;

        data.forEach(function(data: DataAbstract, index: number) {
            let n = new this.nodetype(0, 0);
            this.plane.getGraphScene().getThreeScene().add(n);
            this.nodes.push(n);
        }.bind(this));
        this.plane.getGraphScene().render();

        let layout = new this.layout(this.plane);
        layout.calculatePositions(this.nodes, () => { this.plane.getGraphScene().render() });
    }


    /**
     * Loading data with the defined getter method
     * @param after_load Callback to perform after loading was completed
     */
    protected loadData(after_load): void {
        this.dataGetterMethod().then(rs => {
            after_load(rs);
        });
    }
}