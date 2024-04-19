// import useMediaQuery from "@/hooks/useMediaQuery";
import Htex from "@/shared/Htex";
import logo_transparent from "@/assets/logo_transparent.png";
import shopping_cart1 from "@/assets/shopping_cart1.png";
import { motion } from "framer-motion";

const Home = () => {
  // const isAboveMediumScreen = useMediaQuery("(min-width: 1060px)");
  return (
    <section id="home" className="gap-16 bg-gray-20 py-10 md:h-full md:pb-0">
      {/*image nd headers*/}
      <div className="mx-auto w-5/6 items-center justify-center md:flex md:h-5/6">
        {/*main header*/}
        <div className="z-10 mt-32 md:basis-3/5">
          {/*header*/}
          <motion.div
            className="md:-mt-50"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1 }}
            variants={{
              hidden: { opacity: 0, x: -100 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <div className="h-64 w-64">
              <img alt="home-page-pic" src={logo_transparent} className="" />
            </div>
            <Htex>
              Welcome to <span className="text-primary-500">shop prophet</span>
            </Htex>
            <br></br>
            <p>
              Our platform utilizes advanced machine learning algorithms to
              analyze customer data and predict whether they are likely to
              contribute to your revenue.By leveraging this predictive model,
              you can tailor your marketing strategies and product offerings to
              target high-value customers more effectively.
            </p>
          </motion.div>
        </div>
        {/*image*/}
        <div className="md:justify-item-end flex basis-3/5 justify-center md:z-10 md:ml-40 md:mt-16">
          <img
            alt="shopping-cart1"
            src={shopping_cart1}
            className="animate-wiggle"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
