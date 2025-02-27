interface OutfitCardProps {
  image: string
  title: string
  description: string
  author: {
    name: string
    avatar: string
  }
  publishDate: string
}

function OutfitCard({
  image,
  title,
  description,
  author,
  publishDate
}: OutfitCardProps) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt={title} className="h-48 w-full object-cover" />
      </figure>
      <div className="card-body p-4">
        <h3 className="card-title font-bold">{title}</h3>
        <p className="line-clamp-2 text-gray-600">{description}</p>
        <div className="card-actions mt-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="avatar mr-2">
              <div className="w-8 rounded-full">
                <img src={author.avatar} alt={author.name} />
              </div>
            </div>
            <span className="text-sm font-medium">{author.name}</span>
          </div>
          <span className="text-sm text-gray-500">{publishDate}</span>
        </div>
      </div>
    </div>
  )
}

export default OutfitCard
