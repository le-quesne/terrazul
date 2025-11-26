export interface Product {
    id: string;
    name: string;

    priceNumber: number; // Numeric price for default weight
    prices: {
        [key: string]: number;
    };
    img: string;
    isNew?: boolean;
    description: string;
    region?: string;
    roastLevel?: string;
    tastingNotes?: string[];
    acidity?: number;
    intensity?: number;
    bitterness?: number;
    grindOptions?: string[];
    tastingProfileImage?: string;
    artInfo?: {
        title: string;
        description: string;
        artistName: string;
        artistDescription: string;
        artistSocials?: {
            instagram?: string;
            web?: string;
        };
        illustration?: string;
    };
}
