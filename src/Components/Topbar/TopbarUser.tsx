

interface TopbarUserProps {
    user: string;
}


export const TopbarUser = ( {user}: TopbarUserProps) => {
    return (
        <div className="flex items-center">
            <div className="flex items-center">
                <div className="mr-2 ">
                    <p className="text-sm font-semibold">John Doe</p>
                    <p className="text-xs text-gray-500">Admin</p>
                </div>
                <img src={user} alt="user" className="w-12 rounded-full"/>
            </div>
        </div>
    )
}