// import type { LocalType } from "../modules/verify/verify.types.js";

export const id = {
    noUrl: "Tidak ada URL yang ditemukan dalam pesan",
    ipWarning:
        "Peringatan: Pesan ini berisi tautan yang menggunakan alamat IP, bukan nama domain. Organisasi resmi jarang mengirim tautan seperti ini. Berhati-hatilah.",
    domainVerified: (institution: string) =>
        `Pesan ini berisi alamat situs resmi ${institution}`,
    noDomainNoAlias:
        "domain ini tidak dapat diverifikasi sebagai domain resmi",
    noDomainAliasFound: (institution: string) =>
        `Peringatan: Pesan ini tampaknya menyamar sebagai ${institution}. Domain yang terdapat dalam pesan ini tidak dapat diverifikasi sebagai alamat situs resmi ${institution}.`,
    nestedUrlWarning: 
        "Peringatan: Tautan ini berisi URL lain di dalam parameternya. Meskipun hal ini dapat digunakan untuk pengalihan (redirect) yang sah, pelaku penipuan juga sering memanfaatkannya untuk menyembunyikan tujuan akhir tautan. Berhati-hatilah sebelum membukanya.",
};