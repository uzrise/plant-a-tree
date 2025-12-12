import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import Logo from "../logo";
import LanguageSelector from "../components/language-selector";
import FooterLinks from "../components/footer-links";
import FooterCopyright from "../components/footer-copyright";
import NavInfoButton from "../components/nav-info-button";
import { Poppins } from "next/font/google";
import { routing } from "../../middleware";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const messages = (await import(`../../locales/${locale}.json`)).default;

  return {
    title: "Plant a Tree",
    description: messages.welcome.description,
    openGraph: {
      title: "Plant a Tree",
      description: messages.welcome.description,
      images: [
        {
          url: "/logo.svg",
          width: 1200,
          height: 630,
          alt: "Plant a Tree Logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Plant a Tree",
      description: messages.welcome.description,
      images: ["/logo.svg"],
    },
    icons: {
      icon: "/logo.svg",
      apple: "/logo.svg",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className={poppins.variable}>
      <body
        className={`antialiased bg-[url('/images/home.png')] bg-no-repeat min-h-screen bg-cover bg-center lg:bg-fixed`}
      >
        <NextIntlClientProvider messages={messages}>
          <header className="mx-4 sm:mx-6 md:mx-8 lg:mx-10 py-4 sm:py-5 md:py-6 lg:py-7 min-h-[80px] sm:h-[88px] md:h-[96px] flex sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 border-b-2 border-b-[#EEEEEE]">
            <Link href="/">
              <Logo />
            </Link>
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 w-full sm:w-auto justify-end">
              <LanguageSelector />
              <NavInfoButton />
            </div>
          </header>
          {children}
          <footer className="min-h-auto sm:h-auto md:h-[336px] bg-[#08743E] text-[#FCFDFE] pt-8 sm:pt-12 md:pt-16 lg:pt-[64px] pb-6 sm:pb-8 md:pb-12 lg:pb-[48px]">
            <div className="flex flex-col justify-center gap-6 sm:gap-8 md:gap-[32px] items-center px-4 sm:px-6 md:px-8">
            <Logo />


              <FooterLinks />
            </div>
            <div className="container mx-auto mt-6 sm:mt-8 md:mt-12 lg:mt-[64px] border-t flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 border-[#37A16C] pt-6 sm:pt-8 md:pt-[32px] px-4 sm:px-6 md:px-8 lg:px-[32px]">
              <FooterCopyright />
            </div>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
