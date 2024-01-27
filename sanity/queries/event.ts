import { client } from "@/sanity/lib/client"
import type { RootEvent } from "@/sanity/types"

/**
 * Henter ut alle slugs som er tilknyttet cards fra sanity
 * @returns En liste med alle slugs
 */
export async function getAllEventSlugs(): Promise<ReadonlyArray<Pick<RootEvent, "slug">>> {
    return client.fetch('*[_type == "event"]{slug}')
}

/**
 * Henter ut en specifikk event fra sanity basert på slug
 * @param slug Slug til eventen
 * @returns RootEvent Eventet med den spesifikke slugen, eller null om den ikke finnes
 */
export async function getEventBySlug(slug: string): Promise<Readonly<RootEvent> | null> {
    return client.fetch('*[_type == "event" && slug.current == $slug][0]{..., gallery->{slug}}', {
        slug,
    })
}

interface PastAndFutureEvents {
    past: ReadonlyArray<RootEvent>
    future: ReadonlyArray<RootEvent>
}

/**
 * Henter ut de neste og forrige eventene fra sanity.
 * @param limit Maks antall cards som skal hentes ut for framtidige og tidligere cards
 * @returns Et objekt som inneholder to lister, en med tidligere cards og en med framtidige cards
 */
export async function getPastAndFutureEvents(limit = 6): Promise<PastAndFutureEvents> {
    return client.fetch(
        `
        {
            "past": *[_type == "event" && start_time < now()] | order(start_time desc)[0...$limit]{..., gallery->{slug}},
            "future": *[_type == "event" && start_time >= now()] | order(start_time asc)[0...$limit]
        }
    `,
        { limit },
    )
}

/**
 * Henter ut de neste eventene fra sanity, sortert etter starttidspunkt.
 * Ved å spesifisere lastStartTime så vil tidligere eventer bli filtrert bort.
 * @param limit Antall elementer som skal hentes ut
 * @param lastStartTime Tidspunktet til det siste eventet som ble hentet ut. Ved å la denne være tom vil alle neste eventer bli hentet ut fram til limit.
 * @returns En liste med de neste eventene. Hvis ingen ble funnet, returneres en tom liste.
 * @example getFutureEvents(4, cards[cards.length - 1].start_time) // Henter de fire neste
 * @see https://www.sanity.io/docs/paginating-with-groq
 */
export async function getFutureEvents( // TODO edge case: hvis det er flere cards med samme starttidspunkt, vil ikke alle bli hentet ut
    limit = 4,
    lastStartTime = "",
): Promise<ReadonlyArray<RootEvent>> {
    return client.fetch(
        '*[_type == "event" && start_time >= now() && start_time > $last_start_time] | order(start_time asc)[0...$limit]',
        {
            limit,
            last_start_time: lastStartTime,
        },
    )
}

/**
 * Henter ut de forrige eventene fra sanity, sortert etter starttidspunkt.
 * Ved å spesifisere lastStartTime så vil senere eventer bli filtrert bort.
 * @param limit Antall elementer som skal hentes ut
 * @param lastStartTime Tidspunktet til det siste eventet som ble hentet ut. Ved å la denne være tom vil alle tidligere eventer bli hentet ut fram til limit.
 * @returns En liste med de forrige eventene. Hvis ingen ble funnet, returneres en tom liste.
 * @example getPastEvents(4, cards[cards.length - 1].event_start_time) // Henter de fire neste
 * @see https://www.sanity.io/docs/paginating-with-groq
 */
export async function getPastEvents(
    limit = 4,
    lastStartTime = "",
): Promise<ReadonlyArray<RootEvent>> {
    return client.fetch(
        '*[_type == "event" && start_time < now() && start_time < $last_start_time] | order(start_time desc)[0...$limit]',
        {
            limit,
            last_start_time: lastStartTime,
        },
    )
}
