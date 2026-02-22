import React from 'react'
import BeforeAfterReview from '../components/beforeAfter/BeforeAfterReview'

const reviewsData = [
  {
    id: 1,
    beforeImage: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=400&h=400&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1522337360788-8b13df757e1a?q=80&w=400&h=400&fit=crop",
    title: "Clear Skin in 8 Weeks",
    name: "Sarah Johnson",
    rating: 5,
    date: "January 15, 2024",
    description: "I struggled with acne for years until I found this treatment. The results speak for themselves. Truly life-changing!"
  },
  {
    id: 2,
    beforeImage: "https://images.unsplash.com/photo-1596755094514-f87034a2612d?q=80&w=400&h=400&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1552693673-1bf958298935?q=80&w=400&h=400&fit=crop",
    title: "Anti-Aging Miracle",
    name: "Michael Chen",
    rating: 4,
    date: "February 2, 2024",
    description: "The fine lines around my eyes have significantly reduced. I feel 10 years younger. Highly recommend their service."
  },
  {
    id: 3,
    beforeImage: "https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=400&h=400&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1515377618244-24950e4c663a?q=80&w=400&h=400&fit=crop",
    title: "Glow & Radiance",
    name: "Elena Rodriguez",
    rating: 5,
    date: "February 20, 2024",
    description: "My skin has never been this radiant. The dullness is gone, replaced by a healthy, natural glow that I love."
  },
  {
    id: 4,
    beforeImage: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=400&h=400&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=400&h=400&fit=crop",
    title: "Texture Improvement",
    name: "David Smith",
    rating: 5,
    date: "December 10, 2023",
    description: "The rough texture of my skin is finally smooth. This treatment worked where everything else failed. Very satisfied."
  }
];

const ReviewsPage = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 flex flex-col items-center">
          <h1 className="text-[4.5vmax] md:text-[3.5vmax] font-juanaSemibold text-[#6A4D6F] leading-none mb-2">
            Real Results
          </h1>
          <p className="mt-2 text-sm md:text-base font-juanaMedium text-[#DF9D43] max-w-2xl mx-auto italic">
            "Family Members and their transformation journeys"
          </p>
          <div className="w-24 h-1 bg-[#DF9D43] mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviewsData.map((review) => (
            <BeforeAfterReview
              key={review.id}
              beforeImage={review.beforeImage}
              afterImage={review.afterImage}
              title={review.title}
              name={review.name}
              rating={review.rating}
              date={review.date}
              description={review.description}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ReviewsPage