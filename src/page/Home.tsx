import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { TfiSearch } from "react-icons/tfi";
import Pagination from "../components/Pagination";
import { getNotes, trashNote } from "../apis/user";
import { RiDeleteBinFill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import AddNote from "../components/AddNote";
import EditNote from "../components/EditNote";
import { toast } from "sonner";
import noNote from "../assets/OIG2.jpg";
import { FaFilePen } from "react-icons/fa6";

interface Note {
  id: number;
  title: string;
  content: string;
  userId: number;
  isDeleted: number;
}

const Home = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteId, setNoteId] = useState(0);
  const [editModal, setEditModal] = useState(false);
  const [check, setCheck] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [addNote, setAddNote] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      const res = await getNotes(searchTerm, currentPage);
      console.log(res)
      if (res?.data) {
        setTotalPages(res.data.totalPages);
        const filteredNotes = res.data.allNotes.filter(
          (note: Note) => note.isDeleted === 0
        );
        setNotes(filteredNotes);
      }
    };
    fetchNote();
  }, [editModal, check, searchTerm, currentPage, addNote]);

  const handleEdit = async (id: number) => {
    setNoteId(id);
    setEditModal(true);
  };
  const handleMovetoBin = async (id: number) => {
    const res = await trashNote(id);
    setCheck(true);
    if (res) {
      toast.success(res.data.message);
    }
  };

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="bg-violet-200 h-screen w-full overflow-hidden ">
          <div className="flex justify-end items-end mt-5 me-10 rounded-md  ">
            <div className=" flex border border-violet-700 rounded-md">
              <input
                type="text"
                className="w-full border-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="bg-gray-100 p-2">
                <TfiSearch className="text-3xl" />
              </div>
            </div>
          </div>

          <div className="m-6 flex justify-between w-full">
            <h1 className="font-bold text-2xl"> Your Notes</h1>
            <div
              className="flex gap-2 p-3  text-black text-xl cursor-pointer"
              data-modal-target="default-modal"
              data-modal-toggle="default-modal"
              onClick={() => setAddNote(true)}
            >
              <h1 className="mt-1">
                <FaFilePen />
              </h1>
              <p className="font-bold me-6">Add Note</p>
            </div>
          </div>

          <div className="mt-10" style={{ height: "60vh" }}>
            {notes && notes.length > 0 ? (
              notes?.map((note) => (
                <div
                  key={note.id}
                  className=" flex border rounded w-75 mx-10 p-2 bg-white mt-3"
                >
                  <div className="w-3/4 p-2">
                    <h1 className="text-2xl font-bold">{note.title}</h1>
                    <hr className="my-2" />
                    <h1 className="text-md">{note.content}</h1>
                  </div>
                  <div className="w-1/4 p-2 flex gap-3 justify-end">
                    <FaEdit
                      className="mt-1 text-xl cursor-pointer"
                      onClick={() => handleEdit(note.id)}
                    />
                    <RiDeleteBinFill
                      className="mt-1 text-xl cursor-pointer"
                      onClick={() => handleMovetoBin(note.id)}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center mt-10">
                <img
                  src={noNote}
                  alt=""
                  style={{ width: "300px", height: "400px" }}
                />
              </div>
            )}
          </div>

          <div className="mt-12">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          </div>
        </div>
      </div>

      {addNote && <AddNote setOpenModal={setAddNote} />}

      {editModal && <EditNote setOpenModal={setEditModal} noteId={noteId} />}
    </>
  );
};

export default Home;
