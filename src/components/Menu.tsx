import React from "react";

export interface IProps {
    page: string;
    userRole: string;
    onSelectPage: (page: string) => void;
    onLogOut: () => void;
}

const Menu: React.FC<IProps> = (props: IProps) => {

    const getClassName = (page: string): string => {
        if (page === props.page) {
            return "selectedMenuItem";
        }
        return "";
    }

    const pages = [
        { name: "HOME", title: "Home", ManagerOnly: false },
        { name: "TEAMS", title: "Teams", ManagerOnly: true },
        { name: "LOCATIONS", title: "Locations & Holidays", ManagerOnly: true },
        { name: "PEOPLE", title: "People", ManagerOnly: true },
        { name: "VACATIONS", title: "Vacations", ManagerOnly: false },
        { name: "PROGRAM_INCREMENTS", title: "Program Increments", ManagerOnly: true },
        { name: "CAPACITY", title: "P.I. Capacity", ManagerOnly: false },
    ];

    const GetAllowedPage = (p: any): boolean => {
        if (props.userRole === "MANAGER") { return true; }
        if (props.userRole === "USER") {
            return !p.ManagerOnly;
        }
        return false;
    }

    const pageElements = pages.map((p, index) =>
        <span key={p.name}>
            {GetAllowedPage(p) &&
                <>
                    <button onClick={(e) => props.onSelectPage(p.name)} className={getClassName(p.name)}>{p.title}</button>
                    {index < pages.length - 1 &&
                        <span className="rightArrow">&#187;</span>
                    }
                </>
            }
        </span>
    )

    return (
        <div className="menu">
            {pageElements}
            <button className="marginLeft10" onClick={props.onLogOut}>Log Out</button>
        </div>
    )

}

export default Menu