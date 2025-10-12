import React from "react";
import {Input, Button, Select} from "../index";

function ChairmanDashboard() {

    return (
        <div className="">
            <div className="">
                <div className="flex flex-wrap justify-between">
                    <h1>Chairman Dashboard</h1>
                    {/* Chairman role and name fetch from backend */}
                </div>
                <div className="mt-4 p-4">
                    <Input 
                        label="Teacher"
                        type="text"
                        placeholder="Enter Teacher Name"
                        className="border border-black p-1 mt-2 outline-none rounded-lg w-full"
                       
                    />
                    <div className="flex justify-between">
                        <Input 
                            label="Subject"
                            type="text"
                            placeholder="Add Subject"
                            className="border border-black p-1 mt-2 outline-none rounded-lg w-full"
                        />
                        <Input 
                            label="Batch"
                            type="text"
                            placeholder="Add Batch"
                            className="border border-black p-1 mt-2 outline-none rounded-lg w-full"
                        />
                    </div>
                    <div className="flex justify-between">
                        <select
                            className="border border-black p-1 mt-2 outline-none rounded-lg w-full"
                        >
                            <option value="">Monday</option>
                            <option value="">Tuesday</option>
                            <option value="">Wednessday</option>
                            <option value="">Thursday</option>
                            <option value="">Friday</option>
                        </select>
                        <Input 
                            label="Time"
                            type="time"
                            placeholder="Add Batch"
                            className="border border-black p-1 mt-2 outline-none rounded-lg w-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChairmanDashboard;