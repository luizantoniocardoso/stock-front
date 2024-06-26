import { Dropdown, Topbar } from "@/Components"


export const Home = () => {
    
    
    
    return (
        <>
        <Topbar.Root> 
            <Topbar.Logo path="img/1.png" alt="logo"/>
            <Topbar.Nav />
            <Topbar.User user="https://i.pravatar.cc/300" />
        </Topbar.Root>
            <div className="flex flex-col items-center justify-center h-screen bg-backgroundVar">
                <Dropdown></Dropdown>
            </div>
        </>
      
    )
}