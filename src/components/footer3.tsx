import {
  FaDiscord,
  FaLinkedin,
  FaRedditAlien,
  FaTelegramPlane,
  FaTwitter,
} from "react-icons/fa";

import { Logo, LogoImage, LogoText } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const sections = [
  {
    title: "Product",
    links: [
      { name: "Overview", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "Marketplace", href: "#" },
      { name: "Features", href: "#" },
      { name: "Integrations", href: "#" },
      { name: "Pricing", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#" },
      { name: "Team", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#" },
      { name: "Privacy", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Help", href: "#" },
      { name: "Sales", href: "#" },
      { name: "Advertise", href: "#" },
    ],
  },
];

interface Footer3Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
}
const Footer3 = ({
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "Shadcnblocks.com",
  },
}: Footer3Props) => {
  return (
    <section className="py-32">
      <div className="container mx-auto px-4">
        <footer>
          <Logo url="https://shadcnblocks.com">
            <LogoImage
              src={logo.src}
              alt={logo.alt}
              title={logo.title}
              className="h-10"
            />
            <LogoText className="text-xl">{logo.title}</LogoText>
          </Logo>
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-4">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="text-muted-foreground space-y-4">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="hover:text-primary font-medium"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="lg:col-span-2 xl:col-span-1">
              <ul className="text-muted-foreground mb-10 flex items-center gap-2">
                <li className="font-medium">
                  <a href="#">
                    <span className="bg-muted hover:text-primary flex size-12 items-center justify-center rounded-full transition-colors">
                      <FaDiscord className="size-6" />
                    </span>
                  </a>
                </li>
                <li className="font-medium">
                  <a href="#">
                    <span className="bg-muted hover:text-primary flex size-12 items-center justify-center rounded-full transition-colors">
                      <FaRedditAlien className="size-6" />
                    </span>
                  </a>
                </li>
                <li className="font-medium">
                  <a href="#">
                    <span className="bg-muted hover:text-primary flex size-12 items-center justify-center rounded-full transition-colors">
                      <FaTwitter className="size-6" />
                    </span>
                  </a>
                </li>
                <li className="font-medium">
                  <a href="#">
                    <span className="bg-muted hover:text-primary flex size-12 items-center justify-center rounded-full transition-colors">
                      <FaTelegramPlane className="size-6" />
                    </span>
                  </a>
                </li>
                <li className="font-medium">
                  <a href="#">
                    <span className="bg-muted hover:text-primary flex size-12 items-center justify-center rounded-full transition-colors">
                      <FaLinkedin className="size-6" />
                    </span>
                  </a>
                </li>
              </ul>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Subscribe to our newsletter</Label>
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <Input type="email" placeholder="Email" />
                  <Button type="submit">Subscribe</Button>
                </div>
                <p className="text-muted-foreground mt-1 text-xs">
                  By submitting, you agree to our
                  <a href="#" className="text-primary ml-1 hover:underline">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="text-muted-foreground mt-24 flex flex-col flex-wrap justify-between gap-4 border-t pt-8 text-sm font-medium md:flex-row md:items-center">
            <p>© 2024 Shadcnblocks.com. All rights reserved.</p>
            <ul className="flex gap-4">
              <li className="hover:text-primary whitespace-nowrap underline">
                <a href="#">Terms and Conditions</a>
              </li>
              <li className="hover:text-primary whitespace-nowrap underline">
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer3 };
