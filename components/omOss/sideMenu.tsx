import {InfoSide} from "@/sanity/types";
import {getAllInfoPages} from "@/sanity/queries/omOss";
import {Suspense} from "react";
import Link from "next/link"

interface SideMenuProps extends DefaultProps {
    selectedItem?: string,
    infoSider: ReadonlyArray<InfoSide>,
    emptyMessage?: string,
    className?: string,
}

const SideMenu: Component<SideMenuProps> = ({
    selectedItem,
    infoSider,
    emptyMessage,
    className,
}) => {
    const listItems = infoSider.map(item =>
        <Link key={item._id} className={` text-start text-2xl p-2 hover:text-rootBlueDark`} href={`om-oss#${item._id}`} >
            {item.info_slug.current === selectedItem? <div className={`text-rootBlue`}>{item.info_title}</div>:
                item.info_title
            }
        </Link>
    )
    return (
        <div
            className={`flex flex-col divide-y pl-1 h-fit max-w-xxs w-full rounded-r-2xl border bg-white p-2 shadow-lg`}>
            {listItems.length > 0 ? listItems : emptyMessage}
        </div>
    )
}

export default SideMenu
