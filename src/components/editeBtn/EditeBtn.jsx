import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ScaleLoader } from "react-spinners";
import z from "zod";
const EditeBtn = ({ id, data, setData }) => {
  const [categoryData, setCategoryData] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // zod schema========================================================
  const schema = z
    .object({
      title: z.string().nonempty("Title is required"),
      category_id: z.coerce.number().int().positive("Category is required"),
      description: z.string().optional().or(z.literal("")),
      priority: z.enum(["high", "medium", "low"]).optional(),
      due_date: z.string().optional().or(z.literal("")),
    })
    .partial();
  // handle form=========================================================
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
  } = useForm({
    defaultValues: {
      title: data[0]?.title,
      description: data[0]?.description,
      priority: data[0]?.priority,
      category_id: data[0]?.category_id,
      due_date: data[0]?.due_date || null,
    },
    mode: "onTouched",
    resolver: zodResolver(schema),
  });
  // get categories======================================================
  async function getAllCategories() {
    try {
      const { data } = await axios.get(
        "https://kbybdtacoqvgcijrkzkv.supabase.co/rest/v1/categories",
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
      setCategoryData(data);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  }
  useEffect(() => {
    getAllCategories();
  }, []);
  // edite task====================================================
  async function editeTask(values) {
    setIsLoading(true);
    try {
      const payload = {
        ...values,
        category_id: Number(values.category_id),
        due_date: values.due_date === "" ? null : values.due_date,
      };
      const { data } = await axios.patch(
        `https://kbybdtacoqvgcijrkzkv.supabase.co/rest/v1/tasks?id=eq.${id}`,
        payload,
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
        setData(data);
        setTimeout(() => {
          setShowModal(false);
        }, 500);
        reset(data[0]);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {showModal && (
        <div className="absolute z-10 top-[50%] left-[50%] translate-[-50%] rounded-[8px] overflow-hidden">
          {isloading && (
            <section className="flex absolute top-0 right-0 left-0 bottom-0 justify-center items-center bg-[#00000072]">
              <ScaleLoader color="#fff" height={30} radius={0} width={2} />
            </section>
          )}
          <form
            onSubmit={handleSubmit(editeTask)}
            className=" mx-auto shadow px-[1rem] py-3  bg-white w-[300px] sm:w-[500px]"
          >
            <div className="mb-3">
              <input
                {...register("title")}
                type="text"
                placeholder="title"
                id="small-input"
                className="block w-full py-1 px-3  border border-gray-300 rounded-lg bg-gray-50   outline-0"
              />
              {errors.title && touchedFields.title && (
                <p className="bg-red-400 mt-2 px-2 rounded-[8px] py-1 text-white">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div className="mb-3">
              <select
                {...register("category_id")}
                className="block w-full py-1 px-3 border border-gray-300 rounded-lg bg-gray-50 outline-0"
              >
                <option value="">Choose a category</option>
                {categoryData?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category_id && touchedFields.category_id && (
                <p className="bg-red-400 mt-2 px-2 rounded-[8px] py-1 text-white">
                  {errors.category_id.message}
                </p>
              )}
            </div>
            <div className="mb-3">
              <input
                {...register("description")}
                type="text"
                placeholder="Description"
                id="Description"
                className="block w-full py-1 px-3  border border-gray-300 rounded-lg bg-gray-50   outline-0"
              />
            </div>
            <div className="mb-3">
              <select
                {...register("priority")}
                className="block w-full py-1 px-3 border border-gray-300 rounded-lg bg-gray-50 outline-0"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div className="mb-3">
              <input
                {...register("due_date")}
                type="date"
                placeholder="Description"
                id="Description"
                className="block w-full py-1 px-3  border border-gray-300 rounded-lg bg-gray-50   outline-0"
              />
            </div>
            <section className="flex items-center justify-between gap-4 mt-[1rem]">
              <button
                onClick={() => {
                  setShowModal(false);
                  reset(data[0]);
                }}
                type="button"
                className="bg-red-500 hover:bg-red-300 transition-all duration-300 px-[1rem] py-1 rounded-[10px] text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-main px-[1rem] py-1 rounded-[10px] text-white cursor-pointer"
              >
                save
              </button>
            </section>
          </form>
        </div>
      )}

      <button
        onClick={() => setShowModal(true)}
        type="button"
        className="bg-yellow-500 cursor-pointer hover:bg-yellow-400 transition-all duration-300 capitalize px-4 text-white rounded-[10px] py-[3px]"
      >
        edite
      </button>
    </>
  );
};

export default EditeBtn;
