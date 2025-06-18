type Character = {
    id: number;
    name: string;
    image: string;
    status: string;
};

type APIResponse = {
    results: Character[];
    info: {
        pages: number;
        next: string | null;
        prev: string | null;
    };
};

export const fetchCharacters = async (page: number): Promise<APIResponse> => {
    const finalPage = page || 1;
    const res = await fetch(`https://rickandmortyapi.com/api/character?page=${finalPage}`);
    if (!res.ok) {
        throw new Error('Failed to fetch characters');
    }
    return res.json();
};

export const fetchCharacterById = async (id: string): Promise<Character> => {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  if (!res.ok) throw new Error('Character not found');
  return res.json();
};