import React from "react";

export interface IProps {
}

const Footer: React.FC<IProps> = (props: IProps) => {

    return (
        <div className="footer">Questions and bug reports to Michael Mundy at <a href="mailto:mmundy@west.com">mmundy@west.com</a></div>
    )

}

export default Footer;