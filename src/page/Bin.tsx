import Sidebar from "../components/Sidebar";
import { MdRestorePage } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import { getNotes, restoreNote } from "../apis/user";
import { toast } from "sonner";
import DeleteModal from "../components/DeleteModal";
import { TfiSearch } from "react-icons/tfi";
import Pagination from "../components/Pagination";

interface Note {
  id: number;
  title: string;
  content: string;
  userId: number;
  isDeleted: number;
}

const Bin = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [check, setCheck] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [noteId, setNoteId] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchNote = async () => {
      const res = await getNotes(searchTerm, currentPage);
      if (res?.data) {
        setTotalPages(totalPages);
        const filteredNotes = res.data.allNotes.filter(
          (note: Note) => note.isDeleted === 1
        );
        setNotes(filteredNotes);
      }
    };
    fetchNote();
  }, [check, deleteModal, searchTerm, currentPage]);

  const handleRestore = async (id: number) => {
    const res = await restoreNote(id);
    if (res) {
      setCheck(true);
      toast.success(res.data.message);
    }
  };

  const handleDelete = async (id: number) => {
    setDeleteModal(true);
    setNoteId(id);
  };
  return (
    <div className="flex bg-violet-200 overflow-hidden">
      <div className="h-screen">
        <Sidebar />
      </div>
      <div className="  w-full">
        <div className="m-10 font-bold text-3xl">Bin</div>
        <div className="flex justify-end items-end mt-5 me-10 rounded-full  ">
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
        <div className="flex flex-wrap mx-4 my-5" style={{ height: "370px" }}>
          {notes && notes.length > 0 ? (
            notes.map((note) => (
              <div className="">
                <div
                  key={note.id}
                  className="mx-4 my-5  cursor-pointer"
                  style={{ width: "200px" }}
                >
                  <div className="border  border-black rounded bg-white p-2 flex justify-between">
                    <div className="">{note.title}</div>
                    <div className="flex">
                      <MdRestorePage
                        className="text-2xl "
                        onClick={() => handleRestore(note.id)}
                      />
                      <AiFillDelete
                        className="text-2xl"
                        onClick={() => handleDelete(note.id)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>no notes</div>
          )}
        </div>
        <div className="mt-12 bg-violet-200">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      </div>

      {deleteModal && (
        <DeleteModal noteId={noteId} setDeleteModal={setDeleteModal} />
      )}
    </div>
  );
};

export default Bin;
