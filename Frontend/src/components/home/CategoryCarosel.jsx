import React from "react";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "Full Stack Developer",
  "Mobile App Developer",
  "DevOps Engineer",
  "UI/UX Designer",
  "Product Manager",
  "QA Engineer",
  "Cybersecurity Analyst",
  "Cloud Engineer",
  "Machine Learning Engineer",
  "Blockchain Developer",
  "Game Developer",
  "Technical Writer",
  "IT Support Specialist",
  "Systems Administrator",
  "Business Analyst",
  "Database Administrator",
];

function CategoryCarosel() {
  return (
    <div>
      <Carousel className={"w-full max-w-xl mx-auto my-10 "}>
        <CarouselContent>
          {category.map((cat, index) => {
            return (
              <CarouselItem
                key={index}
                className={
                  "basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/3 flex justify-center"
                }
              >
                <Button className={"rounded-full"} variant={"outline"}>
                  {cat}
                </Button>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex bg-black text-white" />
        <CarouselNext className="hidden md:flex bg-black text-white" />
      </Carousel>
    </div>
  );
}

export default CategoryCarosel;
