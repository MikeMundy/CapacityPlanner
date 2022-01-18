import { Typography } from "@mui/material";
import React from "react";

export interface IProps {
}

const Footer: React.FC<IProps> = (props: IProps) => {

    return (
        <Typography variant="body2" component="div" gutterBottom>
            Questions and bug reports to Michael Mundy at <a href="mailto:mmundy@west.com">mmundy@west.com</a>
        </Typography>
    )

}

export default Footer;