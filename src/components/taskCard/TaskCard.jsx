import React from "react";

import { Link } from "react-router-dom";
import imgError from "./../../assets/imgError.png";
const TaskCard = ({ task }) => {
  return (
    <section className="py-[.6rem] px-[.5rem] mx-[.7rem] md:mx-[1rem] relative">
      <section className="rounded-[10px] overflow-hidden shadow flex flex-col sm:flex-row items-center gap-[1rem]">
        <img
          className=" w-full sm:w-[150px] h-[150px] object-cover"
          src={task.image_url ? task.image_url : imgError}
          alt={task.title}
        />
        <section className="px-3">
          <section className="mb-[1rem]">
            <h3 className="text-[1.3rem] capitalize font-[500]">
              {task.title}
            </h3>
            <p className="text-[#858B96] line-clamp-2 mb-[.2rem] max-w-[600px]">
              {task.description}
            </p>
          </section>
          <section className="flex py-3 items-center gap-7 ">
            {task.completed ? (
              <p className="bg-[#DCFCE7] text-[#216D3E] w-fit px-[1rem] py-[.1rem] rounded-2xl capitalize">
                completed
              </p>
            ) : (
              <p className="bg-[#D0E5FB] text-main w-fit px-[1rem] py-[.1rem] rounded-2xl capitalize">
                in progress
              </p>
            )}

            <Link
              to={`/taskDetails/${task.id}`}
              className="capitalize text-[#0c8eeb] cursor-pointer text-[.9rem]"
            >
              view details
            </Link>
          </section>
        </section>
      </section>
      <section style={{ backgroundColor: task?.category?.color }} className="absolute p-2 rounded-[8px] top-[20px] right-[20px]">
        <img src={task?.category?.icon_url} alt={task?.category?.name} />
      </section>
    </section>
  );
};

export default TaskCard;
