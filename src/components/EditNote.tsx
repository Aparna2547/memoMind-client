import { useState, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";

import { displaySingleNote, editNote } from "../apis/user";
import { FaPenFancy } from "react-icons/fa";

import { toast } from "sonner";

interface Props {
  setOpenModal:(value:boolean)=>void;
  noteId: number;
}

// interface Note {
//   id: string;
//   title: string;
//   content: string;
// }
const EditNote = ({ setOpenModal, noteId }: Props) => {

  // const [noteData, setNoteData] = useState<Note | null>(null);
  const [content,setContent]  = useState('')
  const [title,setTitle] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await displaySingleNote(noteId);
        if (res?.data) {
          // setNoteData(res.data[0]);
          setTitle(res.data[0].title)
          setContent(res.data[0].content)

        }
      } catch (error) {
        console.error("Error fetching note:", error);
      }
    };

    fetchData();
  }, [noteId]);

  

  const handleEditSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const id = noteId;
    if(title.trim().length==0){
      toast.error("Write a title.")
      return 
    }
    else if(content.trim().length ==0){
      toast.error("Write your notes..")
      return 
    }

    const res = await editNote(id,title,content)
    if(res){
      toast.success(res.data.message)
      setOpenModal(false)
    }
  }
  return (
    <>
    <div className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg ">
          <div
            className="flex items-center justify-between p-4 md:p-5 rounded-t dark:border-gray-600"
            style={{ backgroundColor: "#B51B75" }}
          >
            <div className="text-xl flex font-semibold text-white ">
              <FaPenFancy className="mx-1 mt-1" />{" "}
              EDIT NOTES
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

            <form action="" onSubmit={handleEditSubmit}>
              <div className="p-4 md:p-5 space-y-4">
                <input
                  type="text"
                  name=""
                  className="w-full"
                  placeholder="jjjb"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  name=""
                  rows={10}
                  cols={80}
                  id=""
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                >
                  dnlj
                </textarea>
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
    </>
  );
};

export default EditNote;
