import type { Metadata } from "next";
import EventCard from "@/components/events/eventCard";
import AdsCard from "@/components/events/adsCard";
import { getAllEvents } from "@/sanity/queries";

export const metadata: Metadata = {
    title: 'Hjem | Root Linjeforening',
    description: 'Generated by create next app', // TODO
}

export type Ad = {
    _id: string,
    title: string,
    dueDate: string,
    thumbnail: string,
}

const testAds: Ad[] = [ // TODO testdata skal slettes
    {
        _id: "1",
        title: "Sommerjobb hos Nav IT",
        dueDate: "2023-09-21",
        thumbnail: "/next.svg",
    }
]


const Home: AsyncComponent = async () => { // TODO
    const events = await getAllEvents();
    // console.log(events)
    return (
        <div>
            <div className={ "flex flex-wrap justify-around" }>
                <EventCard eventTitle={ "Arrangementer" } events={ events } showMoreUrl={ "arrangementer" }
                           className={ "sm:w-[550px] w-full mx-2" } />
                <AdsCard className={ "sm:w-[550px] mx-2" } ads={ testAds } showMoreUrl={ "stillingsannonser" } />
            </div>
        </div>
    )
}

export default Home;
