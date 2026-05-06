import React from "react";
import { v4 as uuidv4 } from "uuid";

export const CardDesign = (props) => {
    return (
        <div className="border-2 border-red-300 p-3 flex flex-col items-center justify-center gap-4 shadow-xl shadow-red-500/35 rounded-md m-4">
            <div className="w-[90%]">
                <img src={props?.card_img} alt="demo_img" className="rounded-lg" />
            </div>
            <div className="flex flex-col items-center justify-center">
                <h1 className="font-bold text-lg">{props?.name}</h1>
                <p className="font-medium">{props?.discription}</p>
                <p>{props?.projects}</p>
            </div>
        </div>
    );
};

export const Card = () => {
    const CardData = [
        {
            name: "Santhosh M",
            discription: "I'm a react developer",
            projects: "Food Store",
            card_img:
                "https://ik.imagekit.io/frr8txkzi/MERN%20Stack/marvels-spider-man-3840x2160-11990.jpeg?updatedAt=1771982673478",
        },
        {
            name: "Sandy M",
            discription: "I'm a Software Developer",
            projects: "Protfolio",
            card_img:
                "https://ik.imagekit.io/frr8txkzi/MERN%20Stack/marvels-spider-man-3840x2160-11990.jpeg?updatedAt=1771982673478",
        },
        {
            name: "Akash",
            discription: "I'm a .NET Developer",
            projects: "Tourism",
            card_img:
                "https://ik.imagekit.io/frr8txkzi/MERN%20Stack/marvels-spider-man-3840x2160-11990.jpeg?updatedAt=1771982673478",
        },
    ];

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  w-[90%] md:w-[80%] lg:w-[70%] mx-auto py-5 ">
                {CardData.map((item, index) => {
                    return (
                        <div key={uuidv4()}>
                            <CardDesign
                                name={item.name}
                                discription={item.discription}
                                projects={item.projects}
                                card_img={item.card_img}
                            />
                        </div>
                    );
                })}
                {/* <CardDesign name={"Santhosh M"} 
                discription={""}
                projects={""} 
                card_img={""} /> */}
            </div>
        </div>
    );
};
