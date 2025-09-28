import React, { useCallback, useContext, useEffect, useState } from "react";
import TaskCard from "../taskCard/TaskCard";
import axios from "axios";
import { DotLoader } from "react-spinners";
import ApiError from "./../../assets/ApiError.jpg";
import toast from "react-hot-toast";
import { AllDataContext } from "../../context/AllTasksProvider";
import Filter from "./../filter/Filter";
import { useSearchParams } from "react-router-dom";
import { getAllCategoriesAction } from "../../api/category.api";
const AllTasks = () => {
  const { data, setData } = useContext(AllDataContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category_id");
  const [categoryData, setCategoryData] = useState([]);
  // get all tasks======================================================================
  const getAllTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      let url = "https://kbybdtacoqvgcijrkzkv.supabase.co/rest/v1/tasks";
      if (categoryId) {
        url += `?category_id=eq.${categoryId}`;
      }
      const { data } = await axios.get(url, {
        headers: {
          Authorization:
            "Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtieWJkdGFjb3F2Z2NpanJremt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwMzUwNjAsImV4cCI6MjA3MTYxMTA2MH0.SAF_9jupuaVLHq0l7Zbew7t6avUdg_UkdVGqLZmHTQE",
          apikey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtieWJkdGFjb3F2Z2NpanJremt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwMzUwNjAsImV4cCI6MjA3MTYxMTA2MH0.SAF_9jupuaVLHq0l7Zbew7t6avUdg_UkdVGqLZmHTQE",
          ContentType: "application/json",
          Prefer: "return=representation",
        },
      });
      setData(data);
    } catch (error) {
      toast.error(error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [setData, categoryId]);

  // get categories======================================================
  async function getAllCategories() {
    try {
      const data = await getAllCategoriesAction();
      setCategoryData(data);
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getAllTasks();
    getAllCategories();
  }, [getAllTasks]);
  // loading=========================
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

  return (
    <>
      <section className="text-right mx-5">
        <Filter />
      </section>
      <div className="my-[1rem]">
        {[...data]?.reverse().map((task, idx) => {
          const category = categoryData.find((c) => c.id === task.category_id);
          const mergedTask = { ...task, category };
          return <TaskCard task={mergedTask} key={idx} />;
        })}
      </div>
    </>
  );
};

export default AllTasks;
