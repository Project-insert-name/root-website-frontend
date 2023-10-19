import { ExternalLink, MailLink } from "@/components/link";
import { Facebook, GitHub, Instagram } from "@/components/icons/socials";

const iconSize = 30;

const Footer: Component = ({ className, ...props }) => (
    <footer className={ `w-full min-h-[100px] absolute bottom-0 ${ className }` } { ...props }>
        <div className={ "flex flex-col justify-center items-center" }>
            <div className={ "w-3/4 border shadow-2xl shadow-black mx-auto my-3" } />
            <div className={ "flex gap-5 mb-2" }>
                <ExternalLink href={ "https://www.facebook.com/RootLinjeforening" }>
                    <Facebook fill={ "#0866FF" } width={ iconSize } alt={ "Facebook logo" } />
                </ExternalLink>
                <ExternalLink href={ "https://www.instagram.com/linjeforeningenroot/" }>
                    <Instagram fill={ "#E4405F" } width={ iconSize } alt={ "Instagram logo" } />
                </ExternalLink>
                <ExternalLink href={ "https://github.com/Project-insert-name/root-website-frontend" }>
                    <GitHub width={ iconSize } alt={ "GitHub logo" } />
                </ExternalLink>
            </div>
            <p>Kontakt oss: <MailLink mail={ "linjeforening.root@hvl.no" } /></p>
        </div>
    </footer>
);

export default Footer;
