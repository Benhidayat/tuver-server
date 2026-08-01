// import type { LocalType } from "../modules/verify/verify.types.js";

export const id = {
    noUrl: "Tidak ada URL yang ditemukan dalam pesan",
    ipWarning:
        "Peringatan: Pesan ini berisi tautan yang menggunakan alamat IP, bukan nama domain. Organisasi resmi jarang mengirim tautan seperti ini. Berhati-hatilah.",
    domainVerified: (bank: string) =>
        `Domain ini adalah domain resmi milik ${bank}`,
    domainNotVerified:
        "domain ini tidak dapat diverifikasi sebagai domain resmi",
    nestedUrlWarning: 
        "Peringatan: Tautan ini berisi URL lain di dalam parameternya. Meskipun hal ini dapat digunakan untuk pengalihan (redirect) yang sah, pelaku penipuan juga sering memanfaatkannya untuk menyembunyikan tujuan akhir tautan. Berhati-hatilah sebelum membukanya.",
};