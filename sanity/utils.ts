import { client } from "@/sanity";
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";

const builder = imageUrlBuilder(client)

/**
 * Hjelpefunksjon for å hente ut en url for et bilde fra sanity
 * @param source Bildet fra sanity
 * @returns En bulider som kan brukes til å hente ut en url for bildet
 */
export function urlFor(source: SanityImageSource): ImageUrlBuilder {
    return builder.image(source)
}