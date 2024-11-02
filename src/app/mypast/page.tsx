import MyPastUI from "@/components/Presentations/MyPast";

const MyPast = () => {
  return (
    <section style={{ position: "relative", zIndex: 2 }}>
      <div className="app-container ">
        <div className="md:mt-20">
          <div className="text-center my-10">
            <h1 className="text-4xl md:text-6xl text-primary-color">
              Your past
            </h1>
          </div>
          <MyPastUI />
        </div>
      </div>
    </section>
  );
};

export default MyPast;
