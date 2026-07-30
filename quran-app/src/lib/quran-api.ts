const BASE_URL = "https://equran.id/api/v2";

export type SurahAudio = Record<string, string>;

export type SurahListItem = {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  deskripsi: string;
  audioFull: SurahAudio;
};

export type Ayat = {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio: SurahAudio;
};

export type SurahDetail = SurahListItem & {
  ayat: Ayat[];
  suratSelanjutnya: false | { nomor: number; nama: string; namaLatin: string; jumlahAyat: number };
  suratSebelumnya: false | { nomor: number; nama: string; namaLatin: string; jumlahAyat: number };
};

type ApiEnvelope<T> = {
  code: number;
  message: string;
  data: T;
};

async function fetchApi<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    next: { revalidate: 60 * 60 * 24 * 30 },
  });
  if (!res.ok) {
    throw new Error(`Gagal mengambil data Al-Qur'an (${res.status}) dari ${path}`);
  }
  const json: ApiEnvelope<T> = await res.json();
  return json.data;
}

export async function getSurahList(): Promise<SurahListItem[]> {
  return fetchApi<SurahListItem[]>("/surat");
}

export async function getSurahDetail(nomor: number): Promise<SurahDetail> {
  return fetchApi<SurahDetail>(`/surat/${nomor}`);
}

export const TIDAK_ADA_BASMALAH = new Set([1, 9]);
