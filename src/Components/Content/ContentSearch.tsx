
interface ContentSearchProps {
    handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
    search: string;
}
export const ContentSearch = ({handleSearch,search}:ContentSearchProps) => {

    return (
        <section className='flex justify-end w-full py-2 sm:px-8 lg:px-8 '>
            <div>
            <input type="text" className='w-full px-4 py-1 border rounded-lg border-textVar' placeholder='Pesquisar' onChange={handleSearch} value={search}/>
            </div>
        </section>
    )
}