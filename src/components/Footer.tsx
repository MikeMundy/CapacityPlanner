import { Typography } from "@mui/material";
import React from "react";

export interface IProps {
}

const Footer: React.FC<IProps> = (props: IProps) => {

    return (
        <Typography variant="body2" component="div" gutterBottom sx={{ marginTop: 3 }}>
            Admin Contacts:  Michael Mundy (<a href="mailto:mmundy@west.com">mmundy@west.com</a>) or Keikhosro Safavi (<a href="mailto:ksafavi@west.com">ksafavi@west.com</a>)
        </Typography>
    )

}

export default Footer;