"use client";
import DetailPage from "@/components/ui/detailPage";
import bottle from "../../public/bottle.webp";
import ecoBottle from "../../public/ecoBottle.jpg";
import { useState } from "react";
import { Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "react-query";

export default function Home() {
  const [age, setAge] = useState("");
  const [likesInFreetime, setLikesInFreetime] = useState("");
  const [worksInSector, setWorksInSector] = useState("");
  const [isEcoFriendly, setIsEcoFriendly] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [imageUrl, setImageUrl] = useState(bottle.src);

  const { data, isLoading, isError, refetch } = useQuery({
    queryFn: async () => {
      const response = await fetch("/getProductDescription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          age,
          likesInFreetime,
          worksInSector,
          isEcoFriendly,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    queryKey: [
      age,
      likesInFreetime,
      worksInSector,
      isEcoFriendly,
    ],
    enabled: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEcoFriendly) {
      setImageUrl(ecoBottle.src);
    } 
    if (age && likesInFreetime && worksInSector) {
      setFormSubmitted(true);
      refetch();
    }
  };

  const isFormValid = age && likesInFreetime && worksInSector;

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-4xl">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2  gap-4 w-full"
        >
          <div>
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
              required
            />
          </div>
          <div>
            <Label htmlFor="likesInFreetime">Likes in Freetime</Label>
            <Input
              id="likesInFreetime"
              value={likesInFreetime}
              onChange={(e) => setLikesInFreetime(e.target.value)}
              placeholder="What do you like to do?"
              required
            />
          </div>
          <div>
            <Label htmlFor="worksInSector">Works in Sector</Label>
            <Select
              onValueChange={setWorksInSector}
              value={worksInSector}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="isEcoFriendly"
              checked={isEcoFriendly}
              onCheckedChange={setIsEcoFriendly}
            />
            <Label htmlFor="isEcoFriendly">Is Eco-Friendly</Label>
          </div>
          <Button
            type="submit"
            className="col-span-full"
            disabled={!isFormValid}
          >
            Get Product Description
          </Button>
        </form>
        <DetailPage
          title={"REactive | 500ml"}
          description={
            isLoading ? (
              <div className="flex items-center justify-center h-80">
                <Loader className="animate-spin" />
              </div>
            ) : isError ? (
              <p className="text-red-500 mb-6">
                Error: Failed to fetch product description
              </p>
            ) : data ? (
              <p className="text-gray-600 mb-6">{data.description}</p>
            ) : (
              <p className="text-gray-600 mb-6 h-80">
                {formSubmitted
                  ? "Fetching your personalized product description..."
                  : "Fill in the details above and click 'Get Product Description' to see a personalized product description."}
              </p>
            )
          }
          imageUrl={imageUrl}
          imageAlt={"REactive 500ml bottle"}
          price={27}
          rating={5}
          reviews={8997}
        />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
