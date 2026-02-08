export interface Watch {
  slug: any;
  id: string;
  name: string;
  price: string;
  tagline: string;
  description: string;
  mainImage: string;
  gallery: string[];
  specs: {
    movement: string;
    case: string;
    strap: string;
    resistance: string;
  };
}
