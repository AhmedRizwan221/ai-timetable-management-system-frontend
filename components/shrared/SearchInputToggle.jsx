import { useEffect, useState, useRef } from "react";
import Input from "./Input";

export default function SearchInput({
    icon,
    HeadingIcon,
    search,
    heading,
    setSearch,
    desktopIcon
}) {
    const [showSearchBar, setShowSearchBar] = useState(false);
    const searchRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSearchBar(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <div className="md:hidden p-3">
                <div className="flex justify-between items-center gap-3">
                    <h1 className="mb-2 md:m-0 text-xl md:text-2xl font-bold tracking-tight text-foreground">
                        {heading}
                    </h1>
                    <button onClick={() => setShowSearchBar(!showSearchBar)}>
                        {icon}
                    </button>
                </div>
                {showSearchBar && (
                    <div
                        ref={searchRef}
                        className="relative w-full sm:w-72 md:ml-auto py-1 items-center"
                    >
                        {/* <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /> */}
                        {/* {icon} */}
                        <Input
                            autoFocus
                            type="text"
                            className="h-10 w-full pl-10 pr-10"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <button
                            onClick={() => setShowSearchBar(false)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-sm"
                        >
                            ✕
                        </button>
                    </div>
                )}
            </div>
            {/* desktop view */}
            <div className="hidden md:block mx-auto max-w-5xl space-y-6">
                <div className="bg-card">
                    <div className="block md:flex items-center container mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8 border-b">
                        <div className="flex items-center gap-3">
                            <div className="hidden md:flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                                {HeadingIcon}
                                {/* <Users className="h-10 w-10 text-primary-foreground" /> */}
                            </div>
                            <h1 className="mb-2 md:m-0 text-xl md:text-2xl font-bold tracking-tight text-foreground">
                                {heading}
                            </h1>
                        </div>


                        {/* desktop view */}
                        <div className="relative w-full sm:w-72 md:ml-auto">
                            {/* <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /> */}
                            {desktopIcon}
                            <Input
                                type="text"
                                className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm pl-10 focus:ring-2 focus:ring-ring"
                                placeholder="Search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}