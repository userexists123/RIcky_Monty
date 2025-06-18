import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    ColumnDef,
} from '@tanstack/react-table';
import { Character } from '../types/types';

type Props = {
    data: Character[];
    columns: ColumnDef<Character, any>[];
    page: number;
    hasPrev: boolean;
    hasNext: boolean;
    onPageChange: (page: number) => void;
    onRefresh: () => void;
};

const CharacterTable = ({
    data,
    columns,
    page,
    hasPrev,
    hasNext,
    onPageChange,
    onRefresh,
}: Props) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1rem',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                }}
            >
                <button
                    onClick={onRefresh}
                    style={{
                        backgroundColor: '#2563eb',
                        color: '#ffffff',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.25rem',
                        cursor: 'pointer',
                        border: 'none',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1d4ed8')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
                >
                    Refresh
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button
                        onClick={() => onPageChange(page - 1)}
                        disabled={!hasPrev}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '0.25rem',
                            backgroundColor: hasPrev ? '#10b981' : '#e5e7eb',
                            color: hasPrev ? '#ffffff' : '#374151',
                            cursor: hasPrev ? 'pointer' : 'not-allowed',
                            opacity: hasPrev ? 1 : 0.5,
                            border: 'none',
                        }}
                        onMouseOver={(e) => {
                            if (hasPrev) e.currentTarget.style.backgroundColor = '#059669';
                        }}
                        onMouseOut={(e) => {
                            if (hasPrev) e.currentTarget.style.backgroundColor = '#10b981';
                        }}
                    >
                        Previous
                    </button>
                    <span
                        style={{
                            fontSize: '1.125rem',
                            fontWeight: '500',
                            color: '#374151',
                        }}
                    >
                        Page {page}
                    </span>
                    <button
                        onClick={() => onPageChange(page + 1)}
                        disabled={!hasNext}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '0.25rem',
                            backgroundColor: hasNext ? '#10b981' : '#e5e7eb',
                            color: hasNext ? '#ffffff' : '#374151',
                            cursor: hasNext ? 'pointer' : 'not-allowed',
                            opacity: hasNext ? 1 : 0.5,
                            border: 'none',
                        }}
                        onMouseOver={(e) => {
                            if (hasNext) e.currentTarget.style.backgroundColor = '#059669';
                        }}
                        onMouseOut={(e) => {
                            if (hasNext) e.currentTarget.style.backgroundColor = '#10b981';
                        }}
                    >
                        Next
                    </button>

                </div>
            </div>
            <table border={1} cellPadding={8} style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>
                <thead>
                    {table.getHeaderGroups().map((hg) => (
                        <tr key={hg.id}>
                            {hg.headers.map((header) => (
                                <th
                                    key={header.id}
                                    style={{ backgroundColor: '#f3f4f6', padding: '0.5rem', textAlign: 'left' }}
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} style={{ padding: '0.5rem', borderTop: '1px solid #e5e7eb' }}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CharacterTable;
