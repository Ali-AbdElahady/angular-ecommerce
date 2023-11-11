export class Product {
  public id: number;
  public title: string;
  public description: string;
  public category: string;
  public image: string[];
  public price: number;
  public rating: { rate: number; count: number };

  constructor(
    id: number,
    title: string,
    description: string,
    category: string,
    image: string[],
    price: number,
    rating: { rate: number; count: number }
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.category = category;
    this.image = image;
    this.price = price;
    this.rating = rating;
  }
}
