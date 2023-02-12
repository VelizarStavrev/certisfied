import { Property } from "./property"

export interface Field {
    id: number,
    template_id: string,
    type: string,
    properties: { 
        [key: string]: Property 
    },
}
