import React from "react";

export interface IProps {
    page: string;
    onSelectPage: (page: string) => void;
}

const Menu: React.FC<IProps> = (props: IProps) => {

    const getClassName = (page: string): string => {
        if (page === props.page) {
            return "selectedMenuItem";
        }
        return "";
    }

    const pages = [
        { name: "TEAMS", title: "Teams" },
        { name: "LOCATIONS", title: "Locations & Holidays" },
        { name: "PEOPLE", title: "People" },
        { name: "VACATIONS", title: "Vacations" },
        { name: "PROGRAM_INCREMENTS", title: "Program Increments" },
        { name: "CAPACITY", title: "P.I. Capacity" },
        { name: "CAPACITY_OLD", title: "Capacity (Old)" }
    ];

    const pageElements = pages.map((p) =>
        <>
            <button key={p.name} onClick={(e) => props.onSelectPage(p.name)} className={getClassName(p.name)}>{p.title}</button>
            <span className="rightArrow">&#187;</span>
        </>
    )

    return (
        <div className="menu">
            {pageElements}
        </div>
    )

}

export default Menu