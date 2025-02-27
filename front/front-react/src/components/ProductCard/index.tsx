interface ProductCardProps {
  image: string
  title: string
  price: number
}

function ProductCard({ image, title, price }: ProductCardProps) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt={title} className="h-48 w-full object-cover" />
      </figure>
      <div className="card-body flex items-center justify-center p-4">
        <h3 className="card-title text-center">{title}</h3>
        <p className="text-xl font-bold text-pink-500">¥{price}</p>
        <div className="card-actions">
          <button className="btn btn-info btn-sm text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-1 size-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            加入购物车
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
