import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "men",
    description: "",
    image:"https://assets.myntassets.com/f_webp,w_102,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/26/0390ad1a-1262-4f7a-8f81-37c1644142a91598445950839-Sports---HRX-by-Hrithik-Roshan.png"
  },
  {
    _id: uuid(),
    categoryName: "women",
    description: "",
    image:"https://assets.myntassets.com/f_webp,w_102,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/31/8238147e-a86e-4fe4-a830-ab5c2c49beba1598892141840-W.jpg",
  },
  {
    _id: uuid(),
    categoryName: "kids",
    description: "",
    image:"https://assets.myntassets.com/f_webp,w_117,c_limit,fl_progressive,dpr_2.0/assets/images/2022/3/14/d7e692a5-e41d-4c1e-b50c-77d7d2f2ff101647247892167-Tops-_-Tees.jpg"

  },
];
