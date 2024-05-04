import { ChevronLeft } from "react-feather";
import { toast } from "react-toastify";

function Step3({ handleChange, setStep, mutate, isPending, data }: any) {
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (data.bio?.length < 50) {
      toast.error("Bio must be at least 50 characters");
      return;
    }
    if (!data?.avatar || !data.name || !data.username || !data.country) {
      toast.error("All fields are required");
      return;
    }
    data.interests = data.interests.map((interest: any) => interest.value);
    mutate(data);
  };

  return (
    <div className="bg-white px-5 lg:max-w-[450px] max-w-[90%] lg:px-7 lg:py-8 py-6">
      <p>3/3</p>
      <h5 className="mt-6 mb-2 text-[28px]">Lastly, Tell us about you</h5>
      <p>We want to know a little about you. Intrigue us</p>
      <form className="pt-2">
        <label>Bio</label>
        <textarea
          name="bio"
          value={data.bio}
          id="bio"
          onChange={handleChange}
          className="border h-28 placeholder:text-[#98A2B3] mb-2 text-[#101928] w-full border-[#D0D5DD] px-3 py-3 outline-none rounded-md"
          placeholder="Tell us about yourself and what you love"
        ></textarea>
        <p className="text-dimegrey text-sm">Min 50 characters</p>
        <label>Sample bio</label>
        <textarea
          readOnly
          className="border h-36 bg-[#F7F3FE] mb-2 text-gray600 w-full border-[#D0D5DD] px-3 py-3 outline-none rounded-md"
          value="Hi there, I am a senior full stack developer with several years of experience working with different companies. Nice to meet you"
        ></textarea>

        <div className="flex mt-4 justify-between items-center">
          <a href="#" onClick={() => setStep(2)}>
            <div className="flex items-center gap-1 text-sm">
              <ChevronLeft size={16} /> Back
            </div>
          </a>
          <button
            className="bg-purple500 flex justify-center items-center text-white lg:py-3 py-2 lg:px-4 px-4 rounded-lg"
            onClick={handleSubmit}
          >
            {isPending ? <span className="loader small"></span> : "Finish"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Step3;
