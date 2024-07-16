import Soldier from "./soldier";

export default class List{
    rows:{[key:string]:Soldier}
    constructor(private name:string, private headers:string[]){}
}