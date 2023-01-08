import { Properties } from "./properties"

export interface Field {
    id: number, 
    properties: Properties[], 
    template_id: string, 
    type: string
}
