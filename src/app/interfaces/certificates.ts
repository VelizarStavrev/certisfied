import { CertificateInCertificates } from "./certificate-in-certificates";

export interface Certificates {
    data: CertificateInCertificates[],
    message: string,
    status: boolean
}
