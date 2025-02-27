import { useState } from 'react'

interface CarouselProps {
  images: Array<{
    src: string
    alt: string
  }>
}

function Carousel({ images }: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleSlideChange = (
    direction: 'prev' | 'next',
    e: React.MouseEvent
  ) => {
    e.preventDefault()
    if (direction === 'prev') {
      setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    } else {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }
  }

  return (
    <div className="carousel w-full">
      {images.map((image, index) => (
        <div
          key={index}
          className="carousel-item relative w-full"
          style={{ display: currentSlide === index ? 'block' : 'none' }}
        >
          <img src={image.src} alt={image.alt} className="w-full rounded-box" />
          <div className="absolute inset-x-5 top-1/2 flex -translate-y-1/2 justify-between">
            <button
              onClick={(e) => handleSlideChange('prev', e)}
              className="btn btn-circle"
            >
              ❮
            </button>
            <button
              onClick={(e) => handleSlideChange('next', e)}
              className="btn btn-circle"
            >
              ❯
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Carousel
