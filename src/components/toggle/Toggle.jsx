import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { ScaleLoader } from "react-spinners";

const Toggle = ({ completed, id, setData }) => {
  const [select, setSelect] = useState(completed);
  const [isLoading, setIsLoading] = useState(false);
  // change status ================================
  async function changeUi(status) {
    setIsLoading(true)
    try {
      const value = {
        completed: status,
      };
      const { data } = await axios.patch(
        `https://kbybdtacoqvgcijrkzkv.supabase.co/rest/v1/tasks?id=eq.${id}`,
        value,
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
      if (data.length > 0) {
        setSelect(status);
        setData(data);
        toast.success("success");
      }
    } catch (error) {
      toast.error(error.message);
    }finally{
        setIsLoading(false)
    }
  }
//   handle loading=============================================
  if(isLoading){
    return  <section className=""> <ScaleLoader color="#0084d1e6" height={20} radius={0} width={2} /></section>
  }
//   jsx code====================================================
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="relative flex items-center w-[200px] h-10 rounded-full p-1 select-none cursor-pointer">
          <div className="absolute inset-0 rounded-full bg-blue-50" />

          <div className="relative flex items-center justify-between w-full px-2 text-sm font-medium text-gray-700">
            <span
              onClick={() => changeUi(false)}
              className={`${
                select == false && "bg-white shadow-md"
              }    flex-1 capitalize   p-1 rounded-[15px] text-left pl-2 text-blue-600`}
            >
              in progress
            </span>
            <span
              onClick={() => changeUi(true)}
              className={`${
                select == true && "bg-white shadow-md"
              } flex-1 p-1 rounded-[15px] capitalize text-right pr-2 text-green-500 `}
            >
              completed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toggle;
