"use client";
import TablePagination from "@/components/TablePagination";
import { ContactDataType } from "@/lib/types";
import { errorToast, successToast } from "@/lib/utils";
import { AuthContext } from "@/providers/AuthProvider";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdMail, IoMdMenu } from "react-icons/io";

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext) || {};
  const [contacts, setContacts] = useState<ContactDataType[]>([]);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>();
  const searchRef = useRef<HTMLInputElement>(null);
  const [refetch, setRefetch] = useState<boolean>(false);

  useEffect(() => {
    const loadContacts = async () => {
      const response = await fetch(
        `/api/contacts/allContacts?page=${page}&search=${search}`,
        {
          credentials: "include",
        }
      );
      const result = await response.json();

      if (response.ok) {
        setContacts(result?.data);
        setPages(result.pagination.pages);
        setPage(result.pagination.page);
      }
    };

    user?.role === "Admin" && loadContacts();
  }, [user, search, page, refetch]);

  const handleSearch = () => {
    if (searchRef?.current) setSearch(searchRef?.current?.value);
  };

  const changePageNumber = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const handleDeleteContact = async (id: string) => {
    const response = await fetch(
      `/api/contacts/deleteContact?contactId=${id}`,
      { method: "DELETE", credentials: "include" }
    );

    const result = await response.json();
    if (response.ok) {
      setRefetch((p) => !p);
      successToast("Contact was deleted successfully");
    } else {
      errorToast("Something went wrong");
    }
  };

  const isAdmin = user?.role === "Admin";
  if (loading) {
    return <span>Loading...</span>;
  }

  if (!isAdmin) {
    return <h2 className="text-3xl">Unauthorized Access</h2>;
  }

  return (
    <main className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* navbar for dashboard */}
        <div className="sticky top-0 left-0 z-10 border-b sm:px-10 px-4 md:py-0 py-4 bg-white">
          <div className="relative flex gap-2 sm:flex-row flex-col items-center justify-between md:min-h-14 min-h-12">
            <label
              htmlFor="my-drawer-2"
              className="fixed top-3 left-4 drawer-button md:hidden bg-[var(--primary-color)] text-white rounded p-0.5"
            >
              <IoMdMenu size={30} />
            </label>

            <h3 className="sm:text-3xl text-2xl text-right sm:w-fit w-full text-[var(--primary-color)] font-bold">
              Contact Management
            </h3>

            <label className="border border-[var(--primary-color)] relative rounded overflow-hidden sm:w-fit w-full">
              <input
                ref={searchRef}
                type="search"
                placeholder="Search phone, name or email"
                className="py-2 px-4 w-full"
              />
              <button
                onClick={handleSearch}
                className="bg-[var(--primary-color)] absolute right-1 top-1 text-white p-0.5 w-8 h-8 inline-flex items-center justify-center rounded"
              >
                <FaSearch size={25} />
              </button>
            </label>
          </div>
        </div>

        {/* Page content here */}

        <div className="p-5 min-h-[calc(100vh-58px)] flex flex-col justify-between">
          <div className="overflow-x-auto shadow-xl shadow-[#00000011]">
            <table className="table bg-white  text-center rounded-none">
              {/* head */}
              <thead className="bg-[var(--primary-color)] text-lg text-white">
                <tr>
                  <th>SL</th>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Email Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="bg-[#DADADA]">
                {contacts &&
                  contacts.map((contact, i) => (
                    <tr key={contact?._id}>
                      <th>{i + 1}</th>
                      <td>{contact.name}</td>
                      <td>{contact.phone}</td>
                      <td>{contact.email}</td>
                      <td>
                        <span className="flex items-center justify-center gap-4">
                          <button className="w-8 h-8 bg-white border border-[var(--primary-color)] text-red-500 rounded-full flex items-center justify-center">
                            <Image
                              src={"/msg-icon.png"}
                              alt="message icon"
                              width={18}
                              height={18}
                              onClick={() =>
                                (
                                  document.getElementById(
                                    `my_modal_${contact._id}`
                                  ) as HTMLDialogElement
                                ).showModal()
                              }
                            />
                          </button>

                          <dialog
                            id={`my_modal_${contact._id}`}
                            className="modal modal-bottom sm:modal-middle"
                          >
                            <div className="modal-box">
                              <h3 className="font-bold text-lg">
                                {contact.name}
                              </h3>
                              <p className="py-4 text-left">
                                {contact.message}
                              </p>
                              <div className="modal-action">
                                <form method="dialog">
                                  {/* if there is a button in form, it will close the modal */}
                                  <button className="btn">Close</button>
                                </form>
                              </div>
                            </div>
                          </dialog>
                          <button
                            onClick={() =>
                              handleDeleteContact(contact?._id as string)
                            }
                            className="w-8 h-8 bg-white border border-[var(--primary-color)] text-red-500 rounded-full flex items-center justify-center"
                          >
                            <Image
                              src={"/delete-icon.png"}
                              alt="delete icon"
                              width={18}
                              height={18}
                            />
                          </button>
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <TablePagination
            changePageNumber={changePageNumber}
            page={page}
            pages={pages as number}
          />
        </div>
      </div>

      {/* sidebar */}
      <div className="drawer-side z-20 bg-[#E6E6E6] border-r">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="py-2 bg-white">
          <Image
            src={"/CClogo.png"}
            alt="cc logo"
            width={122}
            height={40}
            className="mx-auto"
          />
        </div>
        <ul className="p-4 w-60 bg-[#E6E6E6] ">
          {/* Sidebar content here */}
          <li className="flex gap-2 items-center">
            <IoMdMail size={18} />
            <span className="font-bold text-[var(--primary-color)]">
              Contact Management
            </span>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default Dashboard;
