export interface ILabelItem {
    id: number
    content: string
}

export class LabelItem implements ILabelItem {
    id: number;
    content: string;

    constructor(model?: ILabelItem) {
        this.id = model ? model.id : -1;
        this.content =  model ? model.content : "";
    }
}
