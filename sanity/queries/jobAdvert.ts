import type { JobAdvert } from "@/sanity/types"
import { client } from "@/sanity/lib/client"

/**
 * Henter ut alle slugs som er tilknyttet stillingsannonser fra sanity
 * @returns En liste med alle slugs
 */
export async function getAllJobAdvertSlugs(): Promise<ReadonlyArray<Pick<JobAdvert, "slug">>> {
    return client.fetch('*[_type == "job_advert"]{slug}')
}

/**
 * Henter ut de neste stillingsannonsene fra sanity, sortert etter søknadsfrist
 * @param limit Maks antall stillingsannonser som skal hentes ut
 * @returns En liste med de neste stillingsannonsene
 */
export async function getNextJobAdverts(limit = 4): Promise<ReadonlyArray<JobAdvert>> {
    return client.fetch(
        `*[_type == "job_advert" && (deadline > now() || deadline == null)] | order(deadline asc)[0...$limit]`,
        {
            limit,
        },
    )
}

/**
 * Henter ut en spesifikk stillingsannonse fra sanity basert på slug
 * @param slug Slug til stillingsannonsen
 * @returns JobAdvert Stillingsannonsen med den spesifikke slugen, eller null om den ikke finnes
 */
export async function getJobAdvertBySlug(slug: string): Promise<Readonly<JobAdvert> | null> {
    return client.fetch('*[_type == "job_advert" && slug.current == $slug][0]', { slug })
}
