"use client";
import { ContactDataType } from "@/lib/types";
import { useForm } from "react-hook-form";

const Contact = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ContactDataType>();

  const onSubmit = handleSubmit((value: ContactDataType) => {
    console.log(value);
  });

  const showInputError = () => {
    return (
      <span className="text-sm text-red-500">This field is required!</span>
    );
  };

  return (
    <div className="">
      {/* nav bar */}
      <div className="flex sm:flex-row py-3 items-center justify-between bg-[var(--primary-color)] contact-container">
        <span className="font-bold text-white sm:text-3xl text-xl">
          DEMO LOGO
        </span>
        <div>
          <input
            type="search"
            placeholder="search"
            className="sm:py-2 sm:px-5 px-2 py-1 rounded focus:outline-none text-lg sm:w-fit w-[120px] "
          />
          <button className="bg-white py-2 px-3 rounded-full sm:text-sm text-xs ml-3 my-auto">
            Logout
          </button>
        </div>
      </div>

      {/*  */}
      <div className="flex sm:flex-row flex-col-reverse contact-container h-[calc(100vh-68px)]">
        {/* Contact form */}
        <div className="flex-1">
          <div>
            <h1 className="font-semibold text-5xl text-slate-600 sm:my-8 my-2">
              Contact us
            </h1>
            <form onSubmit={onSubmit} className="flex flex-col gap-4 text-lg">
              <label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="Name"
                  className="bg-[#EDF6FD] py-2 px-4 rounded-full w-full"
                />
                {errors.name && showInputError()}
              </label>
              <label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Email"
                  className="bg-[#EDF6FD] py-2 px-4 rounded-full w-full"
                />
                {errors.email && showInputError()}
              </label>
              <label>
                <input
                  type="tel"
                  {...register("phone", { required: true })}
                  placeholder="Phone"
                  className="bg-[#EDF6FD] py-2 px-4 rounded-full w-full"
                />
                {errors.phone && showInputError()}
              </label>
              <label>
                <textarea
                  rows={3}
                  {...register("message", { required: true })}
                  className="bg-[#EDF6FD] py-2 px-4 rounded-2xl w-full resize-none"
                  placeholder="Message"
                ></textarea>
                {errors.message && showInputError()}
              </label>

              <input
                type="submit"
                value="Send Message"
                className="custom-btn rounded-3xl"
              />
            </form>
          </div>
        </div>

        {/* contact SVG */}
        <div className="flex-1 h-full bg-[url(/contact.png)] bg-contain bg-no-repeat bg-center"></div>
      </div>
    </div>
  );
};

export default Contact;
