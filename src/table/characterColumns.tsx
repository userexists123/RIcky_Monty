import { ColumnDef } from '@tanstack/react-table';
import { Character } from '../types/types';
import { Link } from '@tanstack/react-router';

export const characterColumns: ColumnDef<Character>[] = [
  {
    accessorKey: 'image',
    header: 'Image',
    cell: (info) => (
      <img src={info.getValue() as string} alt="thumb" width={50} />
    ),
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: (info) => {
      const char = info.row.original;
      return (
        <Link to="/character/$id" params={{ id: String(char.id) }}>
          {char.name}
        </Link>
      );
    },
  },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'species', header: 'Species' },
];
