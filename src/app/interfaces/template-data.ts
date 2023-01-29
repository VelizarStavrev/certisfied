export interface TemplateData {
    id?: string,
    name: string, 
    created?: number, 
    edited?: number, 
    notes: string,
    fields: any[],
    orientation: string
}