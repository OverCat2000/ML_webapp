import { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { SelectedPage } from "../shared/types";
import Htex from "@/shared/Htex";

type FormData = {
  BounceRates: string;
  ExitRates: string;
  PageValues: string;
  Administrative_Duration_Page: string;
  Informational_Duration_Page: string;
  ProductRelated_Duration_Page: string;
  Weekend: string;
  Month: string;
  VisitorType: string;
  OperatingSystems: string;
  Browser: string;
  TrafficType: string;
};

type Props = {
  setSelectedPage: (selectedPage: SelectedPage) => void;
};

const myForm = ({ setSelectedPage }: Props) => {
  // const [formData, setFormData] = useState<FormData>({
  //   predictor1: "",
  //   predictor2: "",
  //   predictor3: "",
  //   // Initialize other predictors as needed
  // });

  const Weekend = [
    { value: "01", label: "Yes" },
    { value: "02", label: "No" },
  ];

  const Month = [
    { value: "02", label: "Feb" },
    { value: "03", label: "Mar" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "Jul" },
    { value: "08", label: "Aug" },
    { value: "09", label: "Sep" },
    { value: "10", label: "Oct" },
    { value: "11", label: "Nov" },
    { value: "12", label: "Dec" },
  ];

  const VisitorType = [
    { value: "01", label: "Returning Visitor" },
    { value: "02", label: "New Visitor" },
    { value: "03", label: "Other" },
  ];

  const OperatingSystems = [
    { value: "01", label: "Windows" },
    { value: "02", label: "iOS" },
    { value: "03", label: "Mac" },
    { value: "04", label: "Other" },
  ];

  const Browser = [
    { value: "01", label: "Chrome" },
    { value: "02", label: "Safari" },
    { value: "03", label: "Other" },
  ];
  const TrafficType = [
    { value: "01", label: "Direct" },
    { value: "02", label: "Referring Sites" },
    { value: "03", label: "Search Engine" },
    { value: "04", label: "Social" },
    { value: "05", label: "Paid" },
    { value: "06", label: "Other" },
  ];

  //const [prediction, setPrediction] = useState<string>("");

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    register("BounceRates", {
      required: "BounceRates is required",
      validate: (value) => {
        const floatValue = parseFloat(value);
        return (
          (floatValue >= 0 && floatValue <= 1) ||
          "BounceRates should be between 0 and 1"
        );
      },
    });
    register("ExitRates", {
      required: "ExitRates is required",
      validate: (value) => {
        const floatValue = parseFloat(value);
        return (
          (floatValue >= 0 && floatValue <= 1) ||
          "ExitRates should be between 0 and 1"
        );
      },
    });
  }, [register]);

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  // const validate = async (e: ChangeEvent<HTMLInputElement>) => {
  //   const isValid = await trigger();
  //   if (!isValid) {
  //     e.preventDefault();
  //   }
  // };

  const onSubmit = async (data: FormData, e: any) => {
    const isValid = await trigger();
    if (!isValid) {
      e.preventDefault();
    }
    try {
      const response = await axios.post("http://localhost:5000/predict", data);
      // console.log(response.data);
      //setPrediction(response.data.prediction);
      const predictionResult = response.data.prediction;
      let clusterResult: string =
        response.data.cluster === "1"
          ? "Casual Buyers"
          : response.data.cluster === "0"
            ? "Regular Buyers"
            : "error";
      console.log(predictionResult);
      console.log(clusterResult);
      if (predictionResult === "[ True]") {
        Swal.fire({
          title: "Prediction Result",
          text: `This user will contribute to revenue`,
          icon: "success",
          confirmButtonText: "Done",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Cluster Result",
              text: `This user belongs to cluster of ${clusterResult}`,
              icon: "info",
              confirmButtonText: "Done",
            });
          }
        });
      } else if (predictionResult === "[False]") {
        Swal.fire({
          title: "Prediction Result",
          text: `This user will not contribute to revenue`,
          icon: "error",
          confirmButtonText: "Done",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Cluster Result",
              text: `This user belongs to cluster of ${clusterResult}`,
              icon: "info",
              confirmButtonText: "Done",
            });
          }
        });
      }
    } catch (error) {
      console.error("Error:", error);
      // console.log("hi");
    }
  };

  const inputStyle =
    "mb-5 mt-1 w-full rounded-lg bg-primary-300 p-5 placeholder-white";

  return (
    <section
      id="predict"
      className="mx-auto flex w-full items-center justify-center bg-gray-20 pb-32 pt-24"
    >
      <div className="basis-5/6">
        <motion.div
          onViewportEnter={() => setSelectedPage(SelectedPage.Predict)}
        >
          <motion.div
            className="md:w-3/5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1 }}
            variants={{
              hidden: { opacity: 0, x: -100 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <Htex>Enter data to predict users contribution to revenue</Htex>
          </motion.div>
          <form target="_blank" onSubmit={handleSubmit(onSubmit)}>
            <div className="md:flex">
              <div className="mt-10 items-center justify-between gap-8 md:flex md:w-1/3">
                <motion.div
                  className="mx-auto w-5/6"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 1 }}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <input
                    className={inputStyle}
                    type="text"
                    placeholder="Bounce Rates"
                    {...register("BounceRates", {
                      // required: true,
                      maxLength: 10,
                    })}
                  ></input>
                  {errors.BounceRates && (
                    <p>
                      {errors.BounceRates && errors.BounceRates.message}
                      {/* {errors.BounceRates && "This field is required"} */}
                      {errors.BounceRates &&
                        errors.BounceRates.type === "maxLength" &&
                        "Your input exceed maximum length"}
                    </p>
                  )}

                  <input
                    className={inputStyle}
                    type="text"
                    placeholder="Exit Rates"
                    {...register("ExitRates", {
                      // required: true,
                      maxLength: 10,
                    })}
                  ></input>
                  {errors.ExitRates && (
                    <p>
                      {errors.ExitRates && errors.ExitRates.message}
                      {/* {errors.ExitRates && "This field is required"} */}
                      {errors.ExitRates &&
                        errors.ExitRates.type === "maxLength" &&
                        "Your input exceed maximum length"}
                    </p>
                  )}

                  <input
                    className={inputStyle}
                    type="text"
                    placeholder="Page Values"
                    {...register("PageValues", {
                      required: true,
                      maxLength: 10,
                    })}
                  ></input>
                  {errors.PageValues && (
                    <p>
                      {errors.PageValues && "This field is required"}
                      {errors.PageValues &&
                        errors.PageValues.type === "maxLength" &&
                        "Your input exceed maximum length"}
                    </p>
                  )}

                  <input
                    className={inputStyle}
                    type="text"
                    placeholder="Administrative Durationa Per Page"
                    {...register("Administrative_Duration_Page", {
                      required: true,
                      maxLength: 10,
                    })}
                  ></input>
                  {errors.Administrative_Duration_Page && (
                    <p>
                      {errors.Administrative_Duration_Page &&
                        "This field is required"}
                      {errors.Administrative_Duration_Page &&
                        errors.Administrative_Duration_Page.type ===
                          "maxLength" &&
                        "Your input exceed maximum length"}
                    </p>
                  )}

                  {/* <button
                type="submit"
                className="mt-5 rounded-lg bg-blue-600 px-20 py-3 text-white transition duration-500 hover:text-secondary-400"
              >
                Predict
              </button> */}
                  {/* </form> */}
                </motion.div>
              </div>

              {/* second set of form */}

              <div className="items-center justify-between gap-8 md:mt-10 md:flex md:w-1/3">
                <motion.div
                  className="mx-auto w-5/6"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 1 }}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  {/* <form target="_blank" onSubmit={handleSubmit(onSubmit)}> */}
                  {/* <label htmlFor="predictor1" className="p-5">
              predictor 1
            </label> */}
                  <input
                    className={inputStyle}
                    type="text"
                    placeholder="Informational Duration Per Page"
                    {...register("Informational_Duration_Page", {
                      required: true,
                      maxLength: 10,
                    })}
                  ></input>
                  {errors.Informational_Duration_Page && (
                    <p>
                      {errors.Informational_Duration_Page &&
                        "This field is required"}
                      {errors.Informational_Duration_Page &&
                        errors.Informational_Duration_Page.type ===
                          "maxLength" &&
                        "Your input exceed maximum length"}
                    </p>
                  )}

                  {/* <label htmlFor="predictor2" className="p-5">
              predictor 2
            </label> */}
                  <input
                    className={inputStyle}
                    type="text"
                    placeholder="ProductRelated Duration Per Page"
                    {...register("ProductRelated_Duration_Page", {
                      required: true,
                      maxLength: 10,
                    })}
                  ></input>
                  {errors.ProductRelated_Duration_Page && (
                    <p>
                      {errors.ProductRelated_Duration_Page &&
                        "This field is required"}
                      {errors.ProductRelated_Duration_Page &&
                        errors.ProductRelated_Duration_Page.type ===
                          "maxLength" &&
                        "Your input exceed maximum length"}
                    </p>
                  )}

                  <select
                    {...register("Weekend", { required: true })}
                    className={inputStyle}
                  >
                    <option value="">Weekend record?</option>
                    {Weekend.map((month) => (
                      <option key={month.value} value={month.label}>
                        {month.label}
                      </option>
                    ))}
                  </select>
                  {errors.Weekend && (
                    <p>{errors.Weekend && "This field is required"}</p>
                  )}

                  <select
                    {...register("Month", { required: true })}
                    className={inputStyle}
                  >
                    <option value="">Select Month</option>
                    {Month.map((month) => (
                      <option key={month.value} value={month.label}>
                        {month.label}
                      </option>
                    ))}
                  </select>
                  {errors.Month && (
                    <p>{errors.Month && "This field is required"}</p>
                  )}

                  {/* <label htmlFor="predictor3" className="p-5">
              predictor 3
            </label> */}

                  {/* <label htmlFor="predictor4" className="p-5">
              predictor 4
            </label> */}
                  {/* <button
                type="submit"
                className="mt-5 rounded-lg bg-blue-600 px-20 py-3 text-white transition duration-500 hover:text-secondary-400"
              >
                Predict
              </button> */}
                  {/* </form> */}
                </motion.div>
              </div>

              {/* third set of form */}

              <div className="items-center justify-between gap-8 md:mt-10 md:flex md:w-1/3">
                <motion.div
                  className="mx-auto w-5/6"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 1 }}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  {/* <form target="_blank" onSubmit={handleSubmit(onSubmit)}> */}
                  {/* <label htmlFor="predictor1" className="p-5">
              predictor 1
            </label> */}
                  <select
                    {...register("VisitorType", { required: true })}
                    className={inputStyle}
                  >
                    <option value="">Visitor Type</option>
                    {VisitorType.map((month) => (
                      <option key={month.value} value={month.label}>
                        {month.label}
                      </option>
                    ))}
                  </select>
                  {errors.VisitorType && (
                    <p>{errors.VisitorType && "This field is required"}</p>
                  )}

                  <select
                    {...register("OperatingSystems", { required: true })}
                    className={inputStyle}
                  >
                    <option value="">Operating System used</option>
                    {OperatingSystems.map((month) => (
                      <option key={month.value} value={month.label}>
                        {month.label}
                      </option>
                    ))}
                  </select>
                  {errors.OperatingSystems && (
                    <p>{errors.OperatingSystems && "This field is required"}</p>
                  )}

                  <select
                    {...register("Browser", { required: true })}
                    className={inputStyle}
                  >
                    <option value="">Browser used</option>
                    {Browser.map((month) => (
                      <option key={month.value} value={month.label}>
                        {month.label}
                      </option>
                    ))}
                  </select>
                  {errors.Browser && (
                    <p>{errors.Browser && "This field is required"}</p>
                  )}

                  {/* <label htmlFor="predictor2" className="p-5">
              predictor 2
            </label> */}

                  {/* <label htmlFor="predictor3" className="p-5">
              predictor 3
            </label> */}

                  {/* <label htmlFor="predictor8" className="p-5">
              predictor 4
            </label> */}
                  <select
                    {...register("TrafficType", { required: true })}
                    className={inputStyle}
                  >
                    <option value="">Traffic type</option>
                    {TrafficType.map((month) => (
                      <option key={month.value} value={month.label}>
                        {month.label}
                      </option>
                    ))}
                  </select>
                  {errors.TrafficType && (
                    <p>{errors.TrafficType && "This field is required"}</p>
                  )}
                  {/* <button
                type="submit"
                className="mt-5 rounded-lg bg-blue-600 px-20 py-3 text-white transition duration-500 hover:text-secondary-400"
              >
                Predict
              </button> */}
                  {/* </form> */}
                </motion.div>
              </div>
            </div>
            <div>
              <div className="w-5/6">
                <motion.div
                  className="mx-auto w-5/6 items-center justify-center"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 1 }}
                  variants={{
                    hidden: { opacity: 0, x: 100 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <button
                    type="submit"
                    className="mt-5 rounded-lg bg-gray-500 px-5 py-5 text-primary-100 transition duration-500 hover:text-white"
                  >
                    Predict
                  </button>
                </motion.div>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default myForm;

{
  /* <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="predictor1"
            value={formData.predictor1}
            onChange={handleChange}
            placeholder="Predictor 1"
          />
          <input
            type="text"
            name="predictor2"
            value={formData.predictor2}
            onChange={handleChange}
            placeholder="Predictor 2"
          />
          <input
            type="text"
            name="predictor3"
            value={formData.predictor3}
            onChange={handleChange}
            placeholder="Predictor 3"
          /> */
}
{
  /* Add more input fields for additional predictors */
}
{
  /* <button type="submit">Predict</button>
        </form> */
}
