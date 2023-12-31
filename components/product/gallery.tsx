'use client';

import { GridTileImage } from 'components/grid/tile';
import { createUrl } from 'lib/utils';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export function Gallery({ images, percentOff }: { images: { src: string; altText: string }[]; percentOff: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const imageSearchParam = searchParams.get('image');
  const imageIndex = imageSearchParam ? parseInt(imageSearchParam) : 0;

  const nextSearchParams = new URLSearchParams(searchParams.toString());
  const nextImageIndex = imageIndex + 1 < images.length ? imageIndex + 1 : 0;
  nextSearchParams.set('image', nextImageIndex.toString());
  const nextUrl = createUrl(pathname, nextSearchParams);

  const previousSearchParams = new URLSearchParams(searchParams.toString());
  const previousImageIndex = imageIndex === 0 ? images.length - 1 : imageIndex - 1;
  previousSearchParams.set('image', previousImageIndex.toString());
  const previousUrl = createUrl(pathname, previousSearchParams);

  

  const buttonClassName =
    'h-full px-6 transition-all ease-in-out hover:scale-110 flex items-center justify-center';

  return (
    <>
      <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
        {images[imageIndex] && (
          <Image
            className="h-full w-full object-contain"
            fill
            sizes="(min-width: 1024px) 66vw, 100vw"
            alt={images[imageIndex]?.altText as string}
            src={images[imageIndex]?.src as string}
            priority={true}
          />
        )}
{ percentOff > 0 && (
                <span className='p-4 bg-red-600 text-white font-bold absolute md:top-2 2xl:right-[18%] xl:right-[15%] lg:right-12 md:right-[12%] sm:right-4 sm:top-10 right-2 top-8 rounded-lg'>{percentOff?.toFixed(0)}% OFF!</span>
              )
              }



      </div>

      {images.length > 1 ? (
        <ul className="md:my-4 flex items-center justify-center gap-2 overflow-auto mb-2">
          {images.map((image, index) => {
            const isActive = index === imageIndex;
            const imageSearchParams = new URLSearchParams(searchParams.toString());

            imageSearchParams.set('image', index.toString());

            return (
              <li key={image.src} className="h-20 w-20">
                <Link
                  aria-label="Enlarge product image"
                  href={createUrl(pathname, imageSearchParams)}
                  scroll={false}
                  className="h-full w-full"
                >
                  <GridTileImage
                    alt={image.altText}
                    src={image.src}
                    width={80}
                    height={80}
                    active={isActive}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}

{images.length > 1 ? (
          <div className="w-full justify-center mt-2 hidden lg:flex">
            <div className="mx-auto flex h-11 items-center rounded-full border backdrop-blur">
              <Link
                aria-label="Previous product image"
                href={previousUrl}
                className={buttonClassName}
                scroll={false}
              >
                <ArrowLeftIcon className="h-5" />
              </Link>
              <div className="mx-1 h-6 w-px bg-foreground"></div>
              <Link
                aria-label="Next product image"
                href={nextUrl}
                className={buttonClassName}
                scroll={false}
              >
                <ArrowRightIcon className="h-5" />
              </Link>
            </div>
          </div>
        ) : null}
    </>
  );
}
