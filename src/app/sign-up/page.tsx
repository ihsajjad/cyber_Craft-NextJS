import Image from "next/image";

const SignUp = () => {
  return (
    <div className="min-w-screen min-h-screen flex items-center justify-center">
      <div className="custom-form-container">
        <Image
          src={"/CClogo.png"}
          alt="Cyber Craft"
          width={116}
          height={38}
          className="mx-auto"
        />

        <form className="custom-form">
          <label className="w-full">
            <input
              type="text"
              placeholder="Full Name"
              className="custom-input"
            />
          </label>
          <label className="w-full">
            <input
              type="text"
              placeholder="Email Address"
              className="custom-input"
            />
          </label>
          <label className="w-full">
            <input
              type="password"
              placeholder="Password"
              className="custom-input"
            />
          </label>
          <input type="submit" value="Signup" className="custom-btn rounded" />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
