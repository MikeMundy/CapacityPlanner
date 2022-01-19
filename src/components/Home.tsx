import { Typography } from "@mui/material";
import React from "react";

export interface IProps {
    userRole: string;
}

const Home: React.FC<IProps> = (props: IProps) => {

    return (
        <div>
            <Typography variant="h3" component="div" gutterBottom>
                Home
            </Typography>

            <h4>How to use this application for Capacity Planning:</h4>

            {props.userRole === "MANAGER" &&
                <>
                    <p>A Manager should complete the following set-up steps:</p>

                    <ol className="home">
                        <li><b>Create Teams:</b> Every person will belong to one or more Teams. Click the 'Teams' link to create, edit and delete teams. </li>
                        <li><b>Create Locations and Holidays: </b> Every person will live in a Location, which will have its own set of local public holidays. Click the 'Locations & Holidays' link to create, edit and delete Locations. Then edit each location to create, edit or delete the Holidays for each Location. </li>
                        <li><b>Create People: </b> Click the 'People' link to create, edit and delete People. You can also set which Location each person lives in, as well as set their title, which Teams they are part of, and what percentage of their available time they can commit to each Team.</li>
                        <li><b>Create Program Increments: </b> Click the 'Program Increments' link to create, edit or delete the upcoming Program Increments. You can set the Increment Number, Start Date, Number of Iterations, Days per Iteration, and Points per Iteration. </li>
                    </ol>

                    <p>Then each staff member can enter their planned vacation time:</p>

                    <ul className="home">
                        <li><b>Vacations: </b> Click the 'Vacations' link to set the Vacation days that you plan to take.</li>
                    </ul>

                    <p>Once that's all done, you are ready to see the resulting Program Increment Capacity (Velocity) for your people and teams:</p>

                    <ul className="home">
                        <li><b>P.I Capacity: </b> Click the 'P.I. Capacity' link, then select a Program Increment. You'll see the calculated Velocity for each person in the P.I. You can use the filters to limit the results to specific teams and/or persons.</li>
                    </ul>
                </>
            }

            {props.userRole === "USER" &&
                <>
                    <p>Click the 'Vacations' link, and add your planned vacation days to the calendar.</p>
                    <p>Then click the 'P.I. Capacity' link, then select a Program Increment. You'll see the calculated Velocity for each person in the P.I. You can use the filters to limit the results to specific teams and/or persons.</p>
                </>
            }

        </div>
    )

}

export default Home;