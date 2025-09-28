import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdDateRange } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import DeleteBtn from "../deleteBtn/DeleteBtn";
import EditeBtn from "../editeBtn/EditeBtn";
import { DotLoader } from "react-spinners";
import toast from "react-hot-toast";
import ApiError from "./../../assets/ApiError.jpg";
import Toggle from "../toggle/Toggle";
import imgError from "./../../assets/imgError.png"
const TaskDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const Navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  // get taskDetails===========================================
  const taskDetails = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://kbybdtacoqvgcijrkzkv.supabase.co/rest/v1/tasks?id=eq.${id}`,
        {
          headers: {
            Authorization:
              "Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtieWJkdGFjb3F2Z2NpanJremt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwMzUwNjAsImV4cCI6MjA3MTYxMTA2MH0.SAF_9jupuaVLHq0l7Zbew7t6avUdg_UkdVGqLZmHTQE",
            apikey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtieWJkdGFjb3F2Z2NpanJremt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwMzUwNjAsImV4cCI6MjA3MTYxMTA2MH0.SAF_9jupuaVLHq0l7Zbew7t6avUdg_UkdVGqLZmHTQE",
            ContentType: "application/json",
            Prefer: "return=representation",
          },
        }
      );
      setData(data);
    } catch (error) {
      toast.error(error.message);
      setError(error)
    } finally {
      setIsLoading(false);
    }
  }, [id]);
  useEffect(() => {
    taskDetails();
  }, [taskDetails]);
  // get back to home==========================================
  function back() {
    Navigate(-1);
  }
  // loading====================================================
  if (isLoading) {
    return (
      <section className="flex justify-center items-center h-dvh">
        <DotLoader color="#0084d1e6" />
      </section>
    );
  }
  // error=============================================
  if (error) {
    return (
      <section className="flex justify-center mt-[1rem] py-1 text-white">
        <img src={ApiError} className="w-[500px]" alt="" />
      </section>
    );
  }
  // jsx code ===============================================================
  return (
    <>
      <section className="min-h-dvh  ">
        <section className="container pt-[4rem] md:pt-[0] mx-auto px-5 min-h-dvh flex items-center  relative">
          <button
            type="button"
            onClick={back}
            className="absolute top-[30px]    hover:bg-main hover:text-white hover:border-main transition-all duration-300  border-[1px] border-gray-500  capitalize px-4 py-2 rounded-[10px] cursor-pointer flex  items-center gap-2"
          >
            <span>
              <FaArrowLeft />
            </span>
            back
          </button>
          <section className="flex justify-center md:justify-start flex-wrap gap-6 mt-9">
            <figure className="relative">
              <img
                className="w-[300px] object-cover h-[400px] rounded-2xl shadow-2xl"
                src={data[0]?.image_url? data[0]?.image_url : imgError  }
                alt={data[0]?.title}
              />
            </figure>
            <section className="pt-[1.6rem]">
              <p className="flex items-center gap-2 text-[#767676] px-3 py-[3px] capitalize rounded-[15px]">
                <MdDateRange />
                {data[0]?.due_date}
              </p>
              <section className="head  mb-4">
                <h2 className="text-[1.9rem] lg:text-[2rem] capitalize mb-4  md:max-w-[400px] lg:max-w-[500px] ">
                  {data[0]?.title}
                </h2>
                <p className=" text-[1.1rem]  text-[#aeadad] capitalize md:max-w-[400px] lg:max-w-[450px]">
                  {data[0]?.description}
                </p>
              </section>
              <section className="flex items-center gap-4 mb-[2rem]">
                <p className="bg-[#0e88ece0] text-white px-3 py-[3px] capitalize rounded-[15px]">
                  {data[0]?.priority}
                </p>
                {data[0]?.completed ? (
                  <p className="bg-[#DCFCE7] text-[#216D3E] w-fit px-[1rem] py-[.1rem] rounded-2xl capitalize">
                    completed
                  </p>
                ) : (
                  <p className="bg-[#D0E5FB] text-main w-fit px-[1rem] py-[.1rem] rounded-2xl capitalize">
                    in progress
                  </p>
                )}
              </section>
              <section className="flex items-center gap-6 mb-4">
                <DeleteBtn id={data[0]?.id} />
                <EditeBtn id={data[0]?.id} data={data} setData={setData} />
              </section>
              <Toggle completed ={data[0]?.completed} id={data[0]?.id} setData={setData}/>
            </section>
          </section>
        </section>
      </section>
    </>
  );
};

export default TaskDetails;
