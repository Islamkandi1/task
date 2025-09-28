import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ScaleLoader } from "react-spinners";

const DeleteBtn = ({ id }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
//   delete task==============================================================
  async function deleteTask() {
    setIsLoading(true);
    try {
      const { data } = await axios.delete(
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
      if (data.length > 0) {
        toast.success("success");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }
//   jsx code================================================================
  return (
    <>
      <button
        onClick={deleteTask}
        disabled={isLoading}
        type="button"
        className="bg-red-500 cursor-pointer hover:bg-red-400 transition-all duration-300 capitalize px-4 text-white rounded-[10px] py-[3px]"
      >
        {isLoading ? (
          <ScaleLoader color="#fff" height={20} radius={0} width={2} />
        ) : (
          "delete"
        )}
      </button>
    </>
  );
};

export default DeleteBtn;
