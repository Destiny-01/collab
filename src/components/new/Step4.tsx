import React, { ChangeEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import Divider from "../Divider";
import { ChevronLeft, Edit, UploadCloud } from "react-feather";
import Image from "next/image";
import API from "@/utils/api";
import { renderList } from "../project/Details";
import EditProjectModal from "../EditProjectModal";

function Step4({ data, setStep, group, handleChange, mutate, isPending }: any) {
  const [showModal, setShowModal] = useState(false);
  const [previewURL, setPreviewURL] = useState<string | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!data.project) {
      toast.error("Please choose a project");
      return;
    }
    mutate({
      id: group.uuid,
      data: { ...data, category: data.category.value },
    });
  };

  const ALLOWED_EXTENSIONS = ["png", "jpg", "jpeg", "gif"];

  const handleFileInputChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      if (fileExtension && !ALLOWED_EXTENSIONS.includes(fileExtension)) {
        toast.error(
          "Invalid file type. Please select a PNG, JPG, JPEG, or GIF file."
        );
        return;
      }
      if (file && file.size > 5 * 1024 * 1024) {
        toast.error("File exceeds 5mb");
        return;
      }

      const loadingToastId = toast.loading("Uploading file....");
      console.log(file);
      const formData = new FormData();
      formData.set("file", file);

      for (let key of Array.from(formData.entries())) {
        console.log(key[0] + ", " + key[1]);
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewURL(reader.result as string);
      };
      reader.readAsDataURL(file);

      const { data } = await API.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data);
      toast.dismiss(loadingToastId);
      if (!data?.success) {
        toast.error("An error occurred while uploading file");
      }

      handleChange({ target: { name: "photo", value: data?.data?.url } });
      toast.success("File Upload Successful");
    }
  };

  return (
    <div className="bg-white w-full rounded-10 border border-milk px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="font-medium text-lg text-[#1A1A21]">
            Review your project
          </p>
          <p className="text-sm text-[#8C94A6]">
            Take one more look at your project before publishing
          </p>
        </div>
        <div
          onClick={() => setShowModal(true)}
          className="bg-milk cursor-pointer rounded-full h-10 w-10 p-2.5"
        >
          <Edit color="#334054" size={20} />
        </div>
      </div>
      <label className="text-lg">Project Cover</label>
      <div className="flex gap-4 my-4 items-center">
        <div className="h-16 w-16 flex justify-center rounded-lg items-center bg-milk">
          {previewURL ? (
            <Image
              src={previewURL}
              alt="logo"
              width={64}
              height={64}
              className="object-cover rounded-lg w-16 h-16 object-center"
            />
          ) : (
            <UploadCloud color="#475367" />
          )}
        </div>
        <div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileInputChange}
          />
          <button
            onClick={handleButtonClick}
            className="border-[1.5px] rounded-lg border-purple600 mb-1 text-sm px-4 py-2 text-purple600 bg-transparent font-semibold"
          >
            Upload Image
          </button>
          <p className="text-dimegrey text-sm">Max. 5MB</p>
        </div>
      </div>
      <EditProjectModal
        showModal={showModal}
        setShowModal={setShowModal}
        project={data.project}
        handleChange={handleChange}
      />
      <div className="mt-8">
        <h5 className="font-medium mb-2 text-lg">About Project</h5>
        <p className="text-sm">{data.project?.short_description}</p>
      </div>
      <div className="mt-8">
        <h5 className="font-medium mb-2 text-lg">Project Brief</h5>
        <p className="text-sm">{data.project?.description}</p>
      </div>
      <div className="mt-8">
        <h5 className="font-medium mb-2 text-lg">Impact</h5>
        <p className="text-sm">{data.project?.impact}</p>
      </div>
      <div className="mt-8">
        <h5 className="font-medium mb-2 text-lg">Problem</h5>
        <p className="text-sm">{data.project?.problem}</p>
      </div>
      <div className="mt-8">
        <h5 className="font-medium mb-2 text-lg">Solution</h5>
        <p className="text-sm">{data.project?.solution}</p>
      </div>
      <div className="mt-8">
        <h5 className="font-medium mb-2 text-lg">Estimated Timeline</h5>
        <p className="text-sm">{data.project?.estimated_timeline}</p>
      </div>
      <div className="mt-8">
        <h5 className="font-medium mb-2 text-lg">Key Features</h5>
        <p className="text-sm">{renderList(data.project?.key_features)}</p>
      </div>
      <Divider />
      <div className="flex justify-between mt-6 items-center">
        <a href="#" onClick={() => setStep(3)}>
          <div className="flex items-center gap-1 text-sm">
            <ChevronLeft size={16} /> Back
          </div>
        </a>
        <button
          className="bg-purple500 text-white lg:py-3 py-2 lg:px-4 px-4 rounded-lg"
          onClick={handleSubmit}
        >
          {isPending ? <span className="loader small"></span> : "Finish"}
        </button>
      </div>
    </div>
  );
}

export default Step4;
