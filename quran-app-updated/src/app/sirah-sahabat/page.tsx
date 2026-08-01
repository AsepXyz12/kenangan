import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Roundel from "@/components/Roundel";

export const metadata = { title: "Sirah Sahabat — 10 Sahabat Dijamin Surga — Mushaf" };

type Sahabat = {
  nomor: number;
  nama: string;
  gelar?: string;
  kisah: string;
  wafat: string;
};

const SEPULUH: Sahabat[] = [
  {
    nomor: 1,
    nama: "Abu Bakar ash-Shiddiq",
    gelar: "Ash-Shiddiq (yang selalu membenarkan)",
    kisah:
      "Sahabat pertama dari kalangan laki-laki dewasa yang masuk Islam, dan satu-satunya yang menemani Nabi ﷺ hijrah serta bersembunyi di Gua Tsur. Ia mendapat gelar Ash-Shiddiq karena tanpa ragu membenarkan peristiwa Isra Mi'raj ketika banyak orang meragukannya. Dikenal sangat dermawan, menginfakkan hampir seluruh hartanya untuk perjuangan Islam, dan diangkat menjadi khalifah pertama sepeninggal Nabi ﷺ. Pada masa kekhalifahannya, ia memadamkan pemberontakan kaum murtad (Perang Riddah) dan memulai pengumpulan mushaf Al-Qur'an.",
    wafat: "13 H / 634 M, di Madinah",
  },
  {
    nomor: 2,
    nama: "Umar bin Khattab",
    gelar: "Al-Faruq (pembeda antara yang haq dan batil)",
    kisah:
      "Sebelum masuk Islam, Umar dikenal sebagai penentang keras dakwah Nabi ﷺ, namun setelah hidayah datang kepadanya, ia menjadi salah satu pembela Islam paling gigih hingga keislamannya membuat kaum muslimin berani beribadah terang-terangan di Ka'bah. Sebagai khalifah kedua, wilayah Islam meluas pesat hingga membebaskan Yerusalem, Syam, Mesir, dan Persia. Ia dikenal sangat tegas dalam menegakkan keadilan, sederhana dalam hidup meski memimpin wilayah yang luas, dan wafat syahid ditikam saat mengimami sholat Subuh.",
    wafat: "23 H / 644 M, di Madinah",
  },
  {
    nomor: 3,
    nama: "Utsman bin Affan",
    gelar: "Dzun Nurain (pemilik dua cahaya)",
    kisah:
      "Mendapat gelar Dzun Nurain karena menikahi dua putri Nabi ﷺ secara berturut-turut, Ruqayyah kemudian Ummu Kultsum. Dikenal sangat pemalu dan dermawan, ia berulang kali membiayai kebutuhan besar kaum muslimin dari hartanya sendiri, termasuk membeli sumur untuk kepentingan umum di Madinah. Sebagai khalifah ketiga, kontribusi terbesarnya adalah membakukan satu standar mushaf Al-Qur'an (mushaf Utsmani) yang digandakan ke berbagai wilayah untuk menyatukan bacaan umat Islam. Ia wafat syahid dibunuh pemberontak saat sedang membaca Al-Qur'an di rumahnya.",
    wafat: "35 H / 656 M, di Madinah",
  },
  {
    nomor: 4,
    nama: "Ali bin Abi Thalib",
    gelar: "Karramallahu Wajhah, menantu Nabi ﷺ",
    kisah:
      "Sepupu sekaligus menantu Nabi ﷺ (suami Fatimah az-Zahra), dan termasuk anak-anak pertama yang memeluk Islam. Ia menggantikan posisi tidur Nabi ﷺ saat malam hijrah untuk mengelabui para pengepung Quraisy, sebuah keberanian besar yang membuktikan kesetiaannya. Dikenal cerdas, pemberani di medan perang, dan menjadi rujukan penting dalam ilmu fiqih serta tafsir di kalangan sahabat. Sebagai khalifah keempat, ia menghadapi masa penuh gejolak internal termasuk Perang Jamal dan Perang Shiffin, dan akhirnya wafat syahid dibunuh oleh kelompok Khawarij.",
    wafat: "40 H / 661 M, di Kufah",
  },
  {
    nomor: 5,
    nama: "Thalhah bin Ubaidillah",
    gelar: "Thalhah al-Khair (Thalhah si kebaikan)",
    kisah:
      "Masuk Islam di masa-masa awal melalui ajakan Abu Bakar. Ia dikenal sangat berani, khususnya pada Perang Uhud ketika melindungi Nabi ﷺ dengan tubuhnya sendiri dari serangan musuh hingga tangannya lumpuh karena luka. Nabi ﷺ pernah bersabda bahwa siapa yang ingin melihat seorang syahid yang masih berjalan di muka bumi, hendaklah melihat Thalhah. Ia dikenal dermawan dan sangat mencintai perjuangan Islam.",
    wafat: "36 H / 656 M, gugur dalam Perang Jamal",
  },
  {
    nomor: 6,
    nama: "Zubair bin Awwam",
    gelar: "Hawari Rasulullah (pembela setia Rasulullah)",
    kisah:
      "Sepupu Nabi ﷺ dari pihak bibinya, Shafiyyah, dan termasuk golongan pertama yang masuk Islam di usia sangat muda. Ia dijuluki Hawariyy (pembela setia) karena kesiapannya membela Nabi ﷺ kapan pun dibutuhkan, termasuk pernah menghunus pedang sendirian ketika mendengar kabar keliru bahwa Nabi ﷺ ditawan. Ikut serta dalam hampir seluruh peperangan besar bersama Nabi ﷺ dengan keberanian yang menonjol.",
    wafat: "36 H / 656 M, dalam masa Perang Jamal",
  },
  {
    nomor: 7,
    nama: "Abdurrahman bin Auf",
    gelar: "Saudagar dermawan dari kalangan Muhajirin",
    kisah:
      "Salah satu sahabat paling awal masuk Islam dan seorang pedagang ulung yang hartanya berkembang pesat setelah hijrah ke Madinah, hingga menjadi salah satu sahabat terkaya. Meski kaya raya, ia dikenal sangat dermawan, berulang kali menyumbangkan sebagian besar hartanya, termasuk pernah mewakafkan ratusan unta bermuatan barang dagangan sekaligus untuk kepentingan umat Islam di Madinah.",
    wafat: "32 H / 652 M, di Madinah",
  },
  {
    nomor: 8,
    nama: "Sa'ad bin Abi Waqqash",
    gelar: "Pemanah pertama dalam Islam, paman Nabi ﷺ dari pihak ibu",
    kisah:
      "Dikenal sebagai orang pertama yang melepaskan anak panah untuk membela Islam dan doanya yang mustajab karena kejujurannya dalam mencari nafkah. Nabi ﷺ pernah mendoakannya secara khusus agar setiap doanya dikabulkan Allah. Ia memimpin pasukan muslimin dalam penaklukan Persia pada masa kekhalifahan Umar bin Khattab, termasuk kemenangan besar di Pertempuran Qadisiyyah.",
    wafat: "55 H / 675 M, di Madinah",
  },
  {
    nomor: 9,
    nama: "Sa'id bin Zaid",
    gelar: "Sahabat yang orang tuanya juga mencari kebenaran tauhid",
    kisah:
      "Masuk Islam di masa-masa awal bersama istrinya, Fatimah binti Khattab (adik Umar bin Khattab), bahkan ikut berperan dalam proses hidayah Umar memeluk Islam. Ayahnya, Zaid bin Amr, dikenal sebagai salah satu orang yang telah mencari ajaran tauhid murni sejak sebelum kenabian Muhammad ﷺ. Sa'id ikut serta dalam hampir seluruh peperangan penting bersama Nabi ﷺ kecuali Perang Badar karena sedang menjalankan tugas lain atas perintah Nabi ﷺ.",
    wafat: "51 H / 671 M, di dekat Madinah",
  },
  {
    nomor: 10,
    nama: "Abu Ubaidah bin Jarrah",
    gelar: "Aminul Ummah (kepercayaan umat)",
    kisah:
      "Diberi gelar Aminul Ummah (kepercayaan umat) langsung oleh Nabi ﷺ karena sifat amanahnya yang luar biasa dalam memimpin dan menjaga kepercayaan orang banyak. Ia memimpin pasukan muslimin dalam penaklukan wilayah Syam pada masa kekhalifahan Umar bin Khattab, dan dikenal sangat rendah hati meski menjadi salah satu panglima paling dipercaya.",
    wafat: "18 H / 639 M, wafat karena wabah tha'un di Syam",
  },
];

export default function SirahSahabatPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto w-full px-5 md:px-8 py-12">
        <div className="mb-10">
          <p className="text-xs tracking-[0.25em] uppercase text-[var(--gold)] mb-2">
            Teladan Umat
          </p>
          <h1 className="font-display text-3xl md:text-4xl text-[var(--ink)] mb-4">
            Sirah Sahabat
          </h1>
          <p className="text-[var(--ink-soft)] leading-relaxed">
            Al-'Asyarah al-Mubasysyarun bil-Jannah — sepuluh sahabat yang
            secara khusus dikabarkan Nabi Muhammad ﷺ akan masuk surga semasa
            mereka masih hidup di dunia (HR. Abu Dawud, At-Tirmidzi).
            Kehidupan mereka menjadi teladan pengorbanan dan kesetiaan dalam
            memperjuangkan Islam.
          </p>
        </div>

        <div className="space-y-6">
          {SEPULUH.map((s) => (
            <div
              key={s.nomor}
              className="rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/40 p-6 md:p-7"
            >
              <div className="flex items-start gap-3 mb-3">
                <Roundel number={s.nomor} variant="maroon" size={40} />
                <div className="flex-1">
                  <h2 className="font-display text-xl text-[var(--ink)]">
                    {s.nama}
                    <span className="text-[var(--gold)]"> radhiyallahu &#39;anhu</span>
                  </h2>
                  {s.gelar && (
                    <p className="text-xs text-[var(--teal-deep)] mt-1">{s.gelar}</p>
                  )}
                </div>
              </div>
              <p className="text-sm text-[var(--ink)] leading-relaxed mb-3">{s.kisah}</p>
              <p className="text-xs text-[var(--ink-soft)] italic">Wafat: {s.wafat}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/40 p-6">
          <p className="text-sm text-[var(--ink-soft)] leading-relaxed">
            Selain sepuluh sahabat di atas, masih banyak sahabat dan
            sahabiyah mulia lain yang berjasa besar bagi Islam, seperti
            Bilal bin Rabah, Khalid bin Walid, Zaid bin Haritsah, Salman
            Al-Farisi, Aisyah binti Abu Bakar, dan Fatimah az-Zahra — sebagian
            kisah mereka dapat ditemukan di halaman{" "}
            <a href="/sirah-nabawiyah" className="underline decoration-[var(--gold)] underline-offset-4">
              Sirah Nabawiyah
            </a>{" "}
            dan{" "}
            <a href="/wanita-dalam-islam" className="underline decoration-[var(--gold)] underline-offset-4">
              Wanita dalam Islam
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
