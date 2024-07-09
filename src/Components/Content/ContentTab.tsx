
interface TabProps {
    tabs: { label: string }[];
    activeTab: number;
    setActiveTab: (index: number) => void;
}

export const ContentTabs: React.FC<TabProps> = ({ tabs, activeTab, setActiveTab }) => {

    return (
        <div className="w-full">
            <ul className="flex border-b">
                {tabs.map((tab, index) => (
                    <li
                        key={index}
                        className={`cursor-pointer py-2 px-4 ${activeTab === index ? 'border-b-2 border-blue-500' : ''}`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab.label}
                    </li>
                ))}
            </ul>
        </div>
    );
}