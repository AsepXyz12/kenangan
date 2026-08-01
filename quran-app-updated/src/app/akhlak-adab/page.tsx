import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Roundel from "@/components/Roundel";

export const metadata = { title: "Akhlak & Adab — Mushaf" };

type Adab = {
  nomor: number;
  judul: string;
  poin: string[];
  dalilArab?: string;
  dalilArti?: string;
};

const ADAB: Adab[] = [
  {
    nomor: 1,
    judul: "Adab Makan dan Minum",
    poin: [
      "Membaca basmalah sebelum makan, dan jika lupa membacanya di awal, dianjurkan membaca 'Bismillahi awwalahu wa akhirahu' saat teringat.",
      "Makan dan minum menggunakan tangan kanan.",
      "Mengambil makanan yang terdekat terlebih dahulu, tidak rakus meraih dari sisi lain piring bersama.",
      "Tidak makan atau minum sambil berdiri kecuali ada uzur, sebagaimana anjuran duduk saat makan dan minum.",
      "Tidak mencela makanan yang tidak disukai, cukup ditinggalkan tanpa dikomentari buruk.",
      "Mengakhiri dengan hamdalah (memuji Allah) setelah selesai makan.",
    ],
    dalilArab: "يَا غُلاَمُ سَمِّ اللَّهَ، وَكُلْ بِيَمِينِكَ، وَكُلْ مِمَّا يَلِيكَ",
    dalilArti:
      "\"Wahai anak, ucapkanlah bismillah, makanlah dengan tangan kananmu, dan makanlah yang terdekat denganmu.\" (HR. Bukhari, Muslim)",
  },
  {
    nomor: 2,
    judul: "Adab kepada Kedua Orang Tua",
    poin: [
      "Berbicara dengan lemah lembut, tidak membentak atau mengucapkan kata 'ah' sekalipun saat mereka sudah tua dan merepotkan.",
      "Mendahulukan ketaatan kepada orang tua dalam perkara yang tidak melanggar syariat, di atas kepentingan pribadi.",
      "Mendoakan keduanya, baik masih hidup maupun sudah wafat, sebagai bentuk bakti yang tidak terputus.",
      "Berbuat baik kepada teman dan kerabat orang tua, bahkan setelah mereka tiada.",
      "Menyambung silaturahmi kepada keluarga dari pihak ibu maupun ayah.",
    ],
    dalilArab:
      "وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا",
    dalilArti:
      "\"Tuhanmu telah memerintahkan agar kamu tidak menyembah selain Dia, dan hendaklah berbuat baik kepada kedua orang tua.\" (QS. Al-Isra: 23)",
  },
  {
    nomor: 3,
    judul: "Adab kepada Guru dan Menuntut Ilmu",
    poin: [
      "Memuliakan dan menghormati guru, karena ilmu diperoleh salah satunya lewat keberkahan menghormati orang yang mengajarkannya.",
      "Duduk dengan sopan saat menyimak pelajaran, tidak memotong pembicaraan guru.",
      "Bertanya dengan cara yang baik ketika belum paham, tidak malu bertanya demi ilmu.",
      "Mengamalkan ilmu yang telah didapat, karena ilmu tanpa amal kurang bermanfaat.",
      "Rendah hati dan tidak menyombongkan ilmu yang dimiliki di hadapan orang lain.",
    ],
    dalilArab: "وَقُلْ رَبِّ زِدْنِي عِلْمًا",
    dalilArti: "\"Dan katakanlah: Ya Tuhanku, tambahkanlah ilmu kepadaku.\" (QS. Taha: 114)",
  },
  {
    nomor: 4,
    judul: "Adab Bertamu dan Menerima Tamu",
    poin: [
      "Meminta izin sebelum masuk rumah orang lain, mengetuk atau memberi salam maksimal tiga kali sebelum memutuskan pulang jika tidak dijawab.",
      "Tidak mengintip ke dalam rumah sebelum diizinkan masuk.",
      "Bertamu tidak lebih dari tiga hari tanpa keperluan mendesak, agar tidak memberatkan tuan rumah.",
      "Bagi tuan rumah, memuliakan tamu adalah bagian dari kesempurnaan iman, termasuk menjamunya dengan yang terbaik sesuai kemampuan.",
      "Mengucapkan salam ketika masuk dan keluar rumah.",
    ],
    dalilArab: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيُكْرِمْ ضَيْفَهُ",
    dalilArti:
      "\"Barang siapa beriman kepada Allah dan hari akhir, hendaklah ia memuliakan tamunya.\" (HR. Bukhari, Muslim)",
  },
  {
    nomor: 5,
    judul: "Adab Bertetangga",
    poin: [
      "Berbuat baik kepada tetangga, karena Malaikat Jibril terus berpesan kepada Nabi ﷺ tentang hak tetangga hingga beliau mengira tetangga akan diberi hak waris.",
      "Tidak menyakiti tetangga baik dengan lisan, perbuatan, maupun gangguan lain seperti suara bising atau bau yang mengganggu.",
      "Berbagi makanan atau membantu tetangga yang kesulitan sebatas kemampuan.",
      "Menjenguk tetangga yang sakit dan turut berbelasungkawa saat tertimpa musibah.",
    ],
    dalilArab: "مَا زَالَ جِبْرِيلُ يُوصِينِي بِالْجَارِ حَتَّى ظَنَنْتُ أَنَّهُ سَيُوَرِّثُهُ",
    dalilArti:
      "\"Jibril terus-menerus berpesan kepadaku tentang tetangga, sampai aku mengira ia akan mendapat warisan.\" (HR. Bukhari, Muslim)",
  },
  {
    nomor: 6,
    judul: "Adab Berbicara dan Bergaul",
    poin: [
      "Berkata jujur dan menghindari dusta dalam segala keadaan, sekalipun bercanda.",
      "Diam atau berkata yang baik jika tidak mampu berkata baik, sebagai tanda kesempurnaan iman.",
      "Tidak menggunjing (ghibah), mengadu domba (namimah), atau menyebar aib orang lain.",
      "Tidak memotong pembicaraan orang lain dan mendengarkan dengan penuh perhatian saat diajak bicara.",
      "Menepati janji dan tidak mengingkarinya tanpa alasan yang dibenarkan syariat.",
    ],
    dalilArab: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
    dalilArti:
      "\"Barang siapa beriman kepada Allah dan hari akhir, hendaklah ia berkata baik atau diam.\" (HR. Bukhari, Muslim)",
  },
  {
    nomor: 7,
    judul: "Adab di Jalan",
    poin: [
      "Menundukkan pandangan dan menjaga kesopanan saat berjalan di tempat umum.",
      "Menyingkirkan gangguan (duri, batu, sampah) dari jalan yang dilalui orang banyak, karena termasuk cabang keimanan.",
      "Mengucapkan salam kepada orang yang dikenal maupun yang belum dikenal sesama muslim.",
      "Memberi jalan dan membantu orang yang membutuhkan, seperti orang tua atau penyandang disabilitas.",
      "Tidak berjalan dengan sombong atau membuat keributan yang mengganggu orang lain.",
    ],
  },
  {
    nomor: 8,
    judul: "Adab Tidur dan Bangun Tidur",
    poin: [
      "Berwudhu sebelum tidur dan membaca doa tidur serta ayat kursi atau tiga surat terakhir Al-Qur'an.",
      "Tidur menghadap ke kanan, mengikuti kebiasaan Nabi ﷺ.",
      "Mengibaskan tempat tidur tiga kali sebelum berbaring untuk memastikan tidak ada gangguan.",
      "Membaca doa saat bangun tidur sebagai wujud syukur kepada Allah atas nyawa yang dikembalikan.",
      "Segera bangun untuk sholat Subuh, tidak menunda-nunda hingga lupa waktu.",
    ],
  },
];

const AKHLAK_TERPUJI = [
  { nama: "Jujur (Shidq)", ket: "Berkata dan bertindak sesuai kebenaran, menjadi salah satu jalan menuju surga dan sifat wajib para nabi." },
  { nama: "Amanah", ket: "Menjaga kepercayaan yang diberikan orang lain, baik berupa harta, rahasia, maupun tanggung jawab." },
  { nama: "Sabar", ket: "Menahan diri dari keluh kesah saat menghadapi ujian, godaan maksiat, maupun dalam menjalankan ketaatan." },
  { nama: "Dermawan", ket: "Ringan tangan membantu sesama dengan harta, tenaga, maupun ilmu tanpa mengharap balasan dari manusia." },
  { nama: "Tawadhu (Rendah Hati)", ket: "Tidak merasa lebih baik dari orang lain, menerima nasihat, dan menghormati siapa pun tanpa memandang status." },
  { nama: "Pemaaf", ket: "Memaafkan kesalahan orang lain dan tidak menyimpan dendam, sebagaimana teladan Nabi ﷺ kepada orang yang pernah menyakitinya." },
];

const AKHLAK_TERCELA = [
  { nama: "Sombong (Takabbur)", ket: "Merasa lebih tinggi dari orang lain dan menolak kebenaran karena gengsi — sifat pertama yang membuat Iblis diusir dari rahmat Allah." },
  { nama: "Dengki (Hasad)", ket: "Tidak suka melihat orang lain mendapat nikmat dan berharap nikmat itu hilang darinya." },
  { nama: "Ghibah", ket: "Membicarakan keburukan orang lain yang tidak hadir, meski yang dibicarakan itu benar adanya." },
  { nama: "Dusta", ket: "Berkata tidak sesuai kenyataan, termasuk salah satu tanda kemunafikan jika dilakukan berulang." },
  { nama: "Kikir (Bakhil)", ket: "Enggan berbagi harta di jalan kebaikan padahal mampu, karena terlalu cinta dunia." },
  { nama: "Riya", ket: "Beramal dengan niat dilihat dan dipuji manusia, bukan murni karena Allah — disebut sebagai 'syirik kecil' oleh Nabi ﷺ." },
];

export default function AkhlakAdabPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto w-full px-5 md:px-8 py-12">
        <div className="mb-10">
          <p className="text-xs tracking-[0.25em] uppercase text-[var(--gold)] mb-2">
            Perilaku Mulia
          </p>
          <h1 className="font-display text-3xl md:text-4xl text-[var(--ink)] mb-4">
            Akhlak &amp; Adab
          </h1>
          <p className="text-[var(--ink-soft)] leading-relaxed">
            Nabi Muhammad ﷺ bersabda bahwa beliau diutus untuk menyempurnakan
            akhlak yang mulia (HR. Ahmad, Al-Baihaqi). Halaman ini merangkum
            adab keseharian dan akhlak yang diajarkan Islam, agar iman dan
            ibadah tercermin nyata dalam perilaku sehari-hari.
          </p>
        </div>

        <div className="space-y-6 mb-14">
          {ADAB.map((a) => (
            <div
              key={a.nomor}
              className="rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/40 p-6 md:p-7"
            >
              <div className="flex items-center gap-3 mb-4">
                <Roundel number={a.nomor} variant="teal" size={38} />
                <h2 className="font-display text-lg text-[var(--ink)]">{a.judul}</h2>
              </div>
              <ul className="space-y-2 text-sm text-[var(--ink-soft)] mb-4">
                {a.poin.map((p, i) => (
                  <li key={i} className="leading-relaxed">
                    • {p}
                  </li>
                ))}
              </ul>
              {a.dalilArab && (
                <div className="border-t border-[var(--parchment-line)] pt-3 mt-3">
                  <p className="ayat-arabic text-lg text-[var(--ink)] mb-2" dir="rtl">
                    {a.dalilArab}
                  </p>
                  <p className="text-xs text-[var(--ink-soft)] italic">{a.dalilArti}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="font-display text-xl text-[var(--teal-deep)] mb-3">
              Akhlak Terpuji (Mahmudah)
            </h2>
            <div className="space-y-3">
              {AKHLAK_TERPUJI.map((a) => (
                <div
                  key={a.nama}
                  className="rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/40 p-4"
                >
                  <p className="text-sm font-semibold text-[var(--ink)] mb-1">{a.nama}</p>
                  <p className="text-xs text-[var(--ink-soft)] leading-relaxed">{a.ket}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-xl text-[var(--maroon)] mb-3">
              Akhlak Tercela (Madzmumah)
            </h2>
            <div className="space-y-3">
              {AKHLAK_TERCELA.map((a) => (
                <div
                  key={a.nama}
                  className="rounded-sm border border-[var(--parchment-line)] bg-[var(--parchment-deep)]/40 p-4"
                >
                  <p className="text-sm font-semibold text-[var(--ink)] mb-1">{a.nama}</p>
                  <p className="text-xs text-[var(--ink-soft)] leading-relaxed">{a.ket}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
