export interface Outfit {
  id: number
  createTime: string
  updateTime: string
  tenantId: number | null
  coverImage: string
  title: string
  description: string
  content: string | null
  category: number
  season: number
  viewNmber: number
  likeCount: number
  collectCount: number
  authorId: number
}

export interface OutfitDisplay extends Omit<Outfit, 'coverImage' | 'viewNmber'> {
  image: string
  views: number
  publishDate: string
  author: {
    name: string
    avatar: string
  }
}
