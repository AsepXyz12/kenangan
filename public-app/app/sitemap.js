const BASE_URL = "https://kenangan.vercel.app";

export default function sitemap() {
  return [
    {
      url: BASE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/kelas`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/kelas/guru`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/alumni`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
