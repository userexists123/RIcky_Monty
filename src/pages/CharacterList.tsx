import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearch } from '@tanstack/react-router';
import {
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { fetchCharacters } from '../api/api';
import { APIResponse } from '../types/types';
import { characterColumns } from '../table/characterColumns';
import CharacterTable from '../table/characterTable';

const CharacterList = () => {
  const search = useSearch({ from: '/' });
  const page = search.page ?? 1;
  const navigate = useNavigate();

  const { data, isLoading, isError, refetch } = useQuery<APIResponse, Error>({
    queryKey: ['characters', page],
    queryFn: () => fetchCharacters(page),
    enabled: !!page,
    keepPreviousData: true,
  } as import('@tanstack/react-query').UseQueryOptions<APIResponse, Error>);

  const table = useReactTable({
    data: data?.results ?? [],
    columns: characterColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handlePageChange = (newPage: number) => {
    navigate({
      to: '/',
      search: (prev: any) => ({ ...prev, page: newPage }),
    });
  };

  if (isLoading) return <p style={{ padding: '2rem', fontSize: '1.2rem' }}>Loading...</p>;
  if (isError || !data)
    return <p style={{ padding: '2rem', fontSize: '1.2rem', color: 'red' }}>Error loading characters.</p>;

  return (
    <div
      style={{
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>
        Rick & Morty Characters
      </h1>
      <CharacterTable
        data={data.results}
        columns={characterColumns}
        page={page}
        hasPrev={!!data.info.prev}
        hasNext={!!data.info.next}
        onPageChange={handlePageChange}
        onRefresh={refetch}
      />
    </div>
  );
};

export default CharacterList;
