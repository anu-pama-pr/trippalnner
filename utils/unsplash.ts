import axios from "axios";

const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

export const fetchUnsplashPhotos = async (query: string, perPage = 1) => {
  try {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos`,
      {
        params: { query, per_page: perPage },
        headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
      }
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching Unsplash photos:", error);
    return [];
  }
};
