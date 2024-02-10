import { ML_API_URL, ML_AUTH_TOKEN } from "$env/static/private";
import { fail } from "@sveltejs/kit";

interface ClipImageResponse {
  url: string;
  embedding: number[];
}
interface ClipTextResponse {
  text: string;
  embedding: number[];
}
interface ClipResponse {
  images: ClipImageResponse[];
  texts: ClipTextResponse[];
}

interface SimilarityResponse {
  id: number;
  postId: number;
  url: string;
  similarity: number;
}

export const load = async ({ parent }) => {
  const { posts } = await parent();
  return { posts: posts };
};

export const actions = {
  default: async ({ request, params, fetch, locals: { supabase } }) => {
    const data = await request.formData();
    const query = data.get("query");

    if (!query) {
      return fail(400, { error: "No query provided" });
    }

    if (!params.groupId) {
      return fail(400, { error: "No group id provided" });
    }

    const req = { texts: [query] };
    try {
      const response = await fetch(ML_API_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ML_AUTH_TOKEN}`,
        },
        method: "POST",
        body: JSON.stringify(req),
      });

      const res = (await response.json()) as ClipResponse;

      // console.log("Clip response", res);
      // console.log("Embedding", res.texts[0].embedding);

      const { data, error } = await supabase.rpc(
        "get_similar_images_in_group",
        {
          gid: params.groupId,
          modelName: "clip",
          threshold: 0.2,
          query: Array.from(res.texts[0].embedding),
          n: 20,
        }
      );

      if (error) {
        return fail(500, { error: error.message });
      }

      const result = data as SimilarityResponse[];

      // console.log("Similarity Response: ", result);

      return {
        success: true,
        similarImages: result,
      };
    } catch (e: any) {
      return fail(500, { error: e.message });
    }
  },
};
