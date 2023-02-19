import { FieldsInCertificate } from "./fields-in-certificate";

export interface CertificateData {
    name: string;
    notes: string;
    template_id: string;
    fields: FieldsInCertificate;
}
