import { useRef } from "react";
import "./portfolio.scss";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const items = [
  {
    id: 1,
    title: "Pot Pasta",
    img: "https://www.allrecipes.com/thmb/zeV3_FbaeU5Pq_yuFlflv2Vsgq0=/771x514/filters:no_upscale():max_bytes(150000):strip_icc():focal(2060x1373:2062x1375):format(webp)/AR_RR_InstantPotBolognese_STILLSDSC07203-4x3-d29912d240184b409416d691e314284b.jpg",
    desc: "On a hectic weeknight, nothing beats the convenience of a one-pot meal. And luckily, with the help of the Instant Pot, even sophisticated dishes like homemade bolognese can be simplified into effortless, single-dish meals—provided you have the right recipe.",
  },
  {
    id: 2,
    title: "Grilled Chicken Recipes",
    img: "https://www.allrecipes.com/thmb/2_NsCoaHuJuqNyf9JfNjjh2uQ2M=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GrilledFiveSpiceChicken.4x3-3a9a8efdbf554c42825297b82186f7e6.jpg",
    desc: "We love chicken on the grill. It's easy to cook, endlessly versatile, and a real family-pleaser. And these five-star grilled chicken recipes are some of our absolute favorites — featuring classics like tangy barbecue chicken and grilled chicken taco salad, along with everything from teriyaki to tandoori-style grilled chicken. There's enough variety here to keep you thrilled about grilled chicken all season long.",
  },


];

const Single = ({ item }) => {
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
  });

  const y = useTransform(scrollYProgress, [0, 1], [-300, 300]);

  return (
    <section >
      <div className="container">
        <div className="wrapper">
          <div className="imageContainer" ref={ref}>
            <img src={item.img} alt="" />
          </div>
          <motion.div className="textContainer" style={{y}}>
            <h2>{item.title}</h2>
            <p>{item.desc}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <div className="portfolio" ref={ref}>
      <div className="progress">
        <h1>Recipe </h1>
        <motion.div style={{ scaleX }} className="progressBar"></motion.div>
      </div>
      {items.map((item) => (
        <Single item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Portfolio;
