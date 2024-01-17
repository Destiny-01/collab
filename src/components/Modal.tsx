import API from "@/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ReactSelect from "react-select";
import { toast } from "react-toastify";

export default function Modal({
  showModal,
  setShowModal,
  selectedCategory = "design",
}: any) {
  const options = [
    { value: "design", label: "Design" },
    { value: "software_development", label: "Software Development" },
    { value: "science", label: "Science/Tech" },
    { value: "human_rights", label: "Human Rights" },
    { value: "education", label: "Education" },
    { value: "business", label: "Business" },
    { value: "media", label: "Media" },
    { value: "environment", label: "Environment" },
    { value: "sociology", label: "Sociology" },
  ];
  const router = useRouter();
  const [data, setData] = useState({
    idea: "",
    bio: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const [selectedOption, setSelectedOption] = useState(selectedCategory);
  const { data: sessionData } = useSession();
  const currentUser = sessionData?.user;
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      console.log(data);
      const res = await API.post("/groups/query", {
        ...data,
        category: selectedOption.value,
      });
      console.log(res);
      setIsLoading(false);
      if (res?.status === 200) {
        toast.success("Query successful");
        router.push("/new");
      } else {
        console.log("kkkkkkk", res?.data);
        toast.error(res?.data?.message);
      }
    } catch (err: any) {
      setIsLoading(false);
      console.log("kkkk");
      console.log(err);
      toast.error(err.response?.data || err.message);
    }
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-clip fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-[620px] my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border border-[#E4E7EC] rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="p-5 border-b text-center">
                  <h3 className="text-3xl font-semibold">Create New Project</h3>
                  <p className="text-xs">
                    Fill out these details to create your project
                  </p>
                </div>
                {/*body*/}
                <div className="relative p-6">
                  <div>
                    <label htmlFor="">Category</label>
                    <ReactSelect
                      defaultValue={options[0]}
                      onChange={(newVal) =>
                        setSelectedOption(newVal || options[0])
                      }
                      options={options}
                      theme={(theme) => ({
                        ...theme,
                        colors: {
                          ...theme.colors,
                          primary25: "#F9FAFB",
                          primary: "white",
                        },
                        borderRadius: 8,
                      })}
                      styles={{
                        option: (styles) => ({
                          ...styles,
                          color: "#98A2B3",
                        }),
                        input: (styles) => ({
                          ...styles,
                          width: "100%",
                          padding: "8px",
                        }),
                        singleValue: (styles) => ({
                          ...styles,
                          color: "#98A2B3",
                          paddingLeft: "8px",
                        }),
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="idea">Base Idea</label>
                    <textarea
                      name="idea"
                      id="idea"
                      onChange={handleChange}
                      className="border h-18 text-[#98A2B3] w-full border-[#D0D5DD] px-4 py-5 outline-none rounded-md"
                      placeholder="What direction do you have in mind"
                    ></textarea>
                  </div>
                  {!currentUser && (
                    <div>
                      <label htmlFor="bio">About you</label>
                      <textarea
                        name="bio"
                        id="bio"
                        onChange={handleChange}
                        className="border h-18 text-[#98A2B3] w-full border-[#D0D5DD] px-4 py-5 outline-none rounded-md"
                        placeholder="A brief description about you. This would help us match you with teammates. Keep it simple"
                      ></textarea>
                    </div>
                  )}
                </div>
                {/*footer*/}
                <div className="flex items-center gap-8 p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    onClick={() => setShowModal(false)}
                    className="border rounded-lg border-[#5758AA] w-full px-6 py-4 text-[#5758AA] bg-transparent font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="rounded-lg bg-[#353799] w-full px-6 py-4 text-white font-semibold"
                  >
                    {isLoading ? (
                      <span className="loader small"></span>
                    ) : (
                      "Generate Ideas"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-20 fixed inset-0 filter blur-sm z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
