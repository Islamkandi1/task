import React, {  useState } from "react";
import Form from "../form/Form";

const AddTask = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="mt-[1rem]">
      <section className="flex justify-between items-center px-[.5rem] mx-[.7rem] md:mx-[1rem] border-b-1 pb-[1rem] border-b-[#adadad]">
        <h2 className="capitalize text-[1.5rem] font-[600]">my tasks</h2>
        <button
          onClick={() => setShowModal(true)}
          type="button"
          className="px-[1rem] py-[.4rem] capitalize bg-main text-white rounded-[10px] cursor-pointer hover:bg-[#113448e6] transition-all duration-300"
        >
          add task
        </button>
      </section>
      {showModal && <Form setShowModal={setShowModal} /> }
    </div>
  );
};

export default AddTask;
