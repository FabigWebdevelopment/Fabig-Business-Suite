interface ImageBannerProps {
  imageSrc: string
  imageAlt: string
  caption?: string
  className?: string
}

/**
 * Full-width image banner with optional caption overlay.
 * Use between content sections for visual breaks.
 */
const ImageBanner = ({
  imageSrc,
  imageAlt,
  caption,
  className = '',
}: ImageBannerProps) => {
  return (
    <section className={`py-8 lg:py-12 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl shadow-xl">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-auto object-cover aspect-[21/9]"
          />
          {caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 lg:p-8">
              <p className="text-white text-base lg:text-lg font-medium max-w-3xl">
                {caption}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export { ImageBanner }
