import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { FaPenFancy } from "react-icons/fa";
import { toast } from "sonner";
import { addNote } from "../apis/user";

interface Props {
  setOpenModal: (value: boolean) => void;
}

const AddNote = ({ setOpenModal }: Props) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim().length == 0) {
      toast.error("Write a title.");
      return;
    } else if (content.trim().length == 0) {
      toast.error("Write your notes..");
      return;
    }
    const res = await addNote(title, content);
    if (res?.data) {
      toast.success(res.data.message);
      setOpenModal(false);
    }
  };

  return (
    <div
      id="default-modal"
      tabIndex={-1}
      aria-hidden="true"
      className=" flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg ">
          <div
            className="flex items-center justify-between p-4 md:p-5 rounded-t dark:border-gray-600"
            style={{ backgroundColor: "#B51B75" }}
          >
            <div className="text-xl flex font-semibold text-white ">
              <FaPenFancy className="mx-1 mt-1" /> ADD NOTES
            </div>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="default-modal"
              onClick={() => setOpenModal(false)}
            >
              <IoCloseSharp className="text-4xl text-white font-bold" />
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <form action="" onSubmit={handleSubmit}>
            <div className="p-4 md:p-5 space-y-4">
              <input
                type="text"
                name=""
                className="w-full"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                name=""
                rows={10}
                cols={80}
                id=""
                placeholder="Write your content here"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
            <div className="flex items-end justify-end p-4 md:p-5  border-gray-200 rounded-b gap-2 dark:border-gray-600">
              <button
                type="button"
                className="bg-red-600 text-white font-bold py-1 px-3 rounded-sm"
                onClick={() => setOpenModal(false)}
              >
                Discard
              </button>
              <button
                type="submit"
                className="bg-violet-900 text-white font-bold py-1 px-3 rounded-sm"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNote;
