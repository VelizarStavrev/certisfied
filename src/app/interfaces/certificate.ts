import { FieldsInCertificate } from "./fields-in-certificate"
import { TemplateData } from "./template-data"

export interface Certificate {
    data: {
        id: string,
        name: string,
        created: number,
        edited: number,
        creator_id: string,
        notes: string,
        fields: FieldsInCertificate,
        template_id: string
    },
    message: string,
    status: boolean,
    template_data: TemplateData,
    url: string
}
