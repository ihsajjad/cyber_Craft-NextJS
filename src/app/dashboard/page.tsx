import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { IoMdMail, IoMdMenu } from "react-icons/io";

const Dashboard = () => {
  const isLogin = true;

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}

        {/* navbar for dashboard */}
        <div className="sticky top-0 left-0 z-10 border-b sm:px-10 px-4 md:py-0 py-4">
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
                type="search"
                placeholder="Search phone, name or email"
                className="py-2 px-4 w-full"
              />
              <button className="bg-[var(--primary-color)] absolute right-1 top-1 text-white p-0.5 w-8 h-8 inline-flex items-center justify-center">
                <FaSearch size={25} />
              </button>
            </label>
          </div>
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
    </div>
  );
};

export default Dashboard;
