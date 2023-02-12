import { Property } from "./property";

export interface FieldDataCurrent {
    id: number,
    template_id: string,
    type: string,
    properties: Property[],
}
