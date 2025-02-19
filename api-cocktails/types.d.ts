export interface UserFields {
    password: string;
    token: string;
    role: string;
    displayName: string;
    googleId: string;
    email: string;
    image: string;
}

export interface CocktailMutation {
    user: string;
    name: string;
    image: string | null;
    recipe: string;
    ingredients: string[];
}