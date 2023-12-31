import Link from 'next/link';

import FooterMenu from 'components/layout/footer-menu';
import LogoSquare from 'components/logo-square';
import { getMenu } from 'lib/shopify';
import { Suspense } from 'react';
import { FaGithub, FaLinkedin } from "react-icons/fa";


const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const skeleton = 'w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700';
  const menu = await getMenu('next-js-frontend-footer-menu');
  const copyrightName = COMPANY_NAME || SITE_NAME || '';

  return (
    <footer className="text-sm text-muted-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 border-t px-6 py-12 text-sm md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0">
        <div>
          <Link className="flex items-center gap-2 text-foreground md:pt-1" href="/">
            <LogoSquare size="sm" />
            <span className="uppercase">{SITE_NAME}</span>
          </Link>
        </div>
        <Suspense
          fallback={
            <div className="flex h-[188px] w-[200px] flex-col gap-2">
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
            </div>
          }
        >
          <FooterMenu menu={menu} />
        </Suspense>

      </div>
      <div className="border-t py-6 text-sm">
        <div className="mx-auto flex w-full max-w-7xl flex-col justify-between items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
          <p>
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''} All rights reserved.
          </p>



          <div className="flex space-x-4 text-3xl">
            <Link href="https://www.linkedin.com/in/gabe-cloud-644066229/" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-all duration-300" aria-label="Gabe's LinkedIn">
              <FaLinkedin />
            </Link>
            <Link href="https://github.com/GabeCloud94" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-all duration-300" aria-label="Gabe's GitHub">
              <FaGithub />
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}
