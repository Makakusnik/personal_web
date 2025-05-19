import type { StrapiResponse } from "../types/api";

export const strapiFetch = async <T>(
  address: string,
  requestInit?: RequestInit,
): Promise<StrapiResponse<T>> => {
  try {
    const responseRaw = await fetch(
      `${import.meta.env.STRAPI_API_HOSTNAME}${import.meta.env.STRAPI_API_PORT ? `:${import.meta.env.STRAPI_API_PORT}` : ""}${import.meta.env.STRAPI_API_PREFIX ? `/${import.meta.env.STRAPI_API_PREFIX}` : ""}${address}`,
      {
        ...requestInit,
        headers: {
          "Content-Type": "application/json",
          ...requestInit?.headers,
          Authorization: `bearer ${import.meta.env.STRAPI_API_KEY}`,
        },
      },
    );

    const data = await responseRaw.json();

    return data;
  } catch (error) {
    console.warn(error);
    throw new Error("strapiFetch function error!");
  }
};

/**
 * @param url Must start with a forward slash (e.g. "/uploads/image.jpg")
 */
export const buildStrapiImageUrl = (url: string) => {
  return `${import.meta.env.STRAPI_API_HOSTNAME}:${import.meta.env.STRAPI_API_PORT}${url}`;
};
