import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Carousel1() {
  return (
    <>
      <Carousel className="flex justify-center mx-52 py-10 ">
        <CarouselContent>
          <CarouselItem className="basis 1/3">movie</CarouselItem>
          <CarouselItem className="basis 1/3">movie</CarouselItem>
          <CarouselItem className="basis 1/3">movie</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
}
