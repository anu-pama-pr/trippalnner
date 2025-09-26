export const fetchPlacePhotos = async (placeName: string, count = 3) => {
  const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_KEY;
  if (!accessKey) throw new Error("Unsplash access key missing");

  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
    placeName
  )}&client_id=${accessKey}&per_page=${count}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch photos from Unsplash");

  const data = await res.json();
  return data.results.map((photo: any) => photo.urls.small);
};
