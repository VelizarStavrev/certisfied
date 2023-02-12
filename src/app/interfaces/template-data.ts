import { FieldList } from "./field-list";

export interface TemplateData {
    id: string,
    name: string, 
    created?: number, 
    edited?: number, 
    notes: string,
    fields: FieldList,
    orientation: string
}