import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { CharacterForPage } from '../types/types';

const fetchCharacterById = async (id: string): Promise<CharacterForPage> => {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  if (!res.ok) throw new Error('Character not found');
  return res.json();
};

const CharacterDetails = () => {
  const { id } = useParams({ from: '/character/$id' });

  const { data, isLoading, isError } = useQuery<CharacterForPage, Error>({
    queryKey: ['character', id],
    queryFn: () => fetchCharacterById(id),
  });

  if (isLoading) return <p style={{ padding: '2rem', fontSize: '1.25rem' }}>Loading...</p>;
  if (isError || !data)
    return <p style={{ padding: '2rem', fontSize: '1.25rem', color: 'red' }}>Error loading character.</p>;

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '2rem auto',
        padding: '2rem',
        border: '1px solid #e5e7eb',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#ffffff',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1
        style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          textAlign: 'center',
        }}
      >
        {data.name}
      </h1>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <img
          src={data.image}
          alt={data.name}
          style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '4px solid #10b981',
          }}
        />
        <div style={{ textAlign: 'center' }}>
          <p style={{ margin: '0.5rem 0' }}>
            <strong>Status:</strong> {data.status}
          </p>
          <p style={{ margin: '0.5rem 0' }}>
            <strong>Species:</strong> {data.species}
          </p>
          <p style={{ margin: '0.5rem 0' }}>
            <strong>Gender:</strong> {data.gender}
          </p>
          <p style={{ margin: '0.5rem 0' }}>
            <strong>Origin:</strong> {data.origin.name}
          </p>
          <p style={{ margin: '0.5rem 0' }}>
            <strong>Location:</strong> {data.location.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
