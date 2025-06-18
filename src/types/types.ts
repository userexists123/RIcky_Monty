export type Character = {
    id: number;
    name: string;
    image: string;
    status: string;
};

export type APIResponse = {
    results: Character[];
    info: {
        pages: number;
        next: string | null;
        prev: string | null;
    };
};

export type CharacterForPage = {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  origin: { name: string };
  location: { name: string };
};