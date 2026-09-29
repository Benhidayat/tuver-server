// import type { LocalType } from "../modules/verify/verify.types.js";

// export const id = {
//     noUrl: "Tidak ada URL yang ditemukan dalam pesan",
//     ipWarning:
//         "Peringatan: Pesan ini berisi tautan yang menggunakan alamat IP, bukan nama domain. Organisasi resmi jarang mengirim tautan seperti ini. Berhati-hatilah.",
//     domainVerified: (institution: string) =>
//         `Pesan ini berisi alamat situs resmi ${institution}`,
//     noDomainNoAlias:
//         "domain ini tidak dapat diverifikasi sebagai domain resmi",
//     noDomainAliasFound: (institution: string) =>
//         `Peringatan: Pesan ini tampaknya menyamar sebagai ${institution}. Domain yang terdapat dalam pesan ini tidak dapat diverifikasi sebagai alamat situs resmi ${institution}.`,
//     nestedUrlWarning: 
//         "Peringatan: Tautan ini berisi URL lain di dalam parameternya. Meskipun hal ini dapat digunakan untuk pengalihan (redirect) yang sah, pelaku penipuan juga sering memanfaatkannya untuk menyembunyikan tujuan akhir tautan. Berhati-hatilah sebelum membukanya.",
// };

export const id = {
    nothingToVerify: "Tidak ditemukan URL atau nomor telepon dalam pesan",
    ipWarning:
        "Peringatan: Pesan ini berisi URL yg menggunakan alamat IP. Hindari tautan ini.",
    domainNotVerified:
        "Domain ini tidak dapat diverifikasi sebagai domain resmi institusi keuangan",
    domainNotOfficial: (institution: string) =>
        `Peringatan: Pesan ini berisi URL yang bukan merupakan domain resmi ${institution}. Hindari mengungjungi tautan dalam pesan ini.`,
    phoneNotVerified: "Pesan ini berisi Nomor telepon yang tidak dapat diverifikasi sebagai nomor telepon resmi institusi keuangan.",
    phoneNotOfficial: (institution: string) =>
        `Peringatan: Pesan ini berisi nomor telepon yg bukan merupakan nomor telepon resmi ${institution}. Hindari menghubungi nomor telepon`,
    allVerified: (institution: string) => 
        `Semua tautan dan nomor telepon di dalam pesan ini telah diverifikasi sebagai milik resmi ${institution}`,
    nestedUrlWarning:
        "Peringatan: Tautan ini berisi URL lain dalam parameternya, yang dapat menyembunyikan tujuan akhir tautan. Hindari tautan ini.",
};