import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart } from "lucide-react";

interface DetailPageProps {
  title: string;
  description: JSX.Element;
  imageUrl: string;
  imageAlt: string;
  price: number;
  rating: number;
  reviews: number;
}

export default function DetailPage({
  title,
  description,
  imageUrl,
  imageAlt,
  price,
  rating,
  reviews,
}: DetailPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <div className="md:flex">
          <div className="md:flex-shrink-0 md:w-1/2">
            <Image
              src={imageUrl}
              alt={imageAlt}
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
          <CardContent className="p-8 md:w-1/2">
            <h1 className="text-3xl font-bold mb-4">{title}</h1>
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">
                {reviews} reviews
              </span>
            </div>
            <div className="text-2xl font-bold mb-4">€{price.toFixed(2)}</div>
            {description}
            <Button className="w-full mb-4">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
            <div className="text-sm text-gray-500">
              <p>Free delivery on orders over $50</p>
              <p>30-day money-back guarantee</p>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
